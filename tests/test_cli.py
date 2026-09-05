import argparse
import base64
import json

from pywidevine.license_protocol_pb2 import ClientIdentification

from wvdump import adb, cli, fridaserver, pipeline
from wvdump.models import ContentKey, CaptureTemplate

def test_run_keys_writes_keys_json(tmp_path, monkeypatch):
    wvd = tmp_path / "device.wvd"; wvd.write_bytes(b"WVD")
    cap = tmp_path / "capture.json"
    cap.write_text(json.dumps(CaptureTemplate("AAAA", "https://lic", {}).to_dict()))
    out = tmp_path / "keys.json"

    monkeypatch.setattr(
        pipeline, "fetch_keys",
        lambda wvd_bytes, tmpl: [ContentKey("eb67", "100b", "CONTENT")],
    )
    keys = pipeline.run_keys(str(wvd), str(cap), str(out))
    assert keys == [ContentKey("eb67", "100b", "CONTENT")]
    assert json.loads(out.read_text())[0]["kid"] == "eb67"


class _FakeDevice:
    serial = "emulator-5554"


class _FakeSession:
    """Stands in for WidevineSession: records handlers registered via .on()
    and, on .run(), synchronously fires the messages a real device would
    have emitted -- no Frida/adb involved."""

    def __init__(self, agent_source, device_name=None):
        self._handlers = {}

    def on(self, kind, handler):
        self._handlers[kind] = handler

    def attach_all(self, invoke=None):
        pass

    def run(self, timeout=None, until=None):
        client_id = ClientIdentification()
        client_id.type = ClientIdentification.TokenType.DRM_DEVICE_CERTIFICATE
        client_id.token = b"real-provisioning-token"
        self._handlers["device_client_id"](
            {"data": base64.b64encode(client_id.SerializeToString()).decode()}, None
        )
        self._handlers["device_rsa_key"](
            {"data": base64.b64encode(b"wrapped-rsa-key-bytes").decode()}, None
        )


def test_run_device_falls_back_when_wvd_build_fails(tmp_path, monkeypatch):
    """Reproduces the live-integration finding: a captured RSA key that is
    wrapped/non-importable makes save_wvd raise ValueError (pywidevine's
    RSA.importKey rejects it) -- run_device must not let that escape, and
    must save the raw artifacts it did capture instead of crashing."""
    monkeypatch.setattr(pipeline, "WidevineSession", _FakeSession)

    def _raise_not_importable(identity, path):
        raise ValueError("RSA key format is not supported")

    monkeypatch.setattr(pipeline, "save_wvd", _raise_not_importable)

    result = pipeline.run_device(_FakeDevice(), str(tmp_path))  # must not raise

    assert result == str(tmp_path)
    assert not (tmp_path / "device.wvd").exists()
    assert (tmp_path / "license_request.bin").exists()
    assert (tmp_path / "device_rsa_key.bin").read_bytes() == b"wrapped-rsa-key-bytes"


class _FakeNeverReadySession:
    """Stands in for WidevineSession in the capture path: attach_app is a
    no-op (as if hookJava silently found no Java bridge -- see agent.js's
    hookJava guard) and run() never fires any pssh/license_url/headers
    message, so the CaptureCollector never becomes ready."""

    def __init__(self, agent_source, device_name=None):
        pass

    def on(self, kind, handler):
        pass

    def attach_app(self, package, invoke=None, spawn=True):
        pass

    def run(self, timeout=None, until=None):
        pass


def test_run_capture_returns_cleanly_when_never_ready(tmp_path, monkeypatch):
    """Reproduces the live-integration finding: on Frida 17 without the Java
    bridge bundled, hookJava can't hook anything, so the capture never
    completes. run_capture must not raise IncompleteIdentity in that case --
    it should log and return None without writing capture.json."""
    monkeypatch.setattr(pipeline, "WidevineSession", _FakeNeverReadySession)
    out = tmp_path / "capture.json"

    result = pipeline.run_capture(_FakeDevice(), "com.example.app", str(out))  # must not raise

    assert result is None
    assert not out.exists()


def _capture_args() -> argparse.Namespace:
    return argparse.Namespace(
        serial=None, package="com.example.app", out="out/capture.json",
        timeout=15.0, stream=False, out_dir=None, fetch_keys=False, wvd=None,
    )


def test_cmd_capture_does_not_claim_wrote_on_incomplete_capture(monkeypatch, capsys):
    """Reproduces the whole-branch-review finding: run_capture returning
    None (nothing written) must not be followed by a false 'wrote ...' line."""
    monkeypatch.setattr(adb, "pick_device", lambda serial: _FakeDevice())
    monkeypatch.setattr(fridaserver, "ensure_frida_server", lambda dev: None)
    monkeypatch.setattr(pipeline, "run_capture", lambda dev, package, out, timeout=15.0: None)

    rc = cli._cmd_capture(_capture_args())

    assert rc == 0
    assert "wrote" not in capsys.readouterr().out


def test_cmd_capture_reports_wrote_on_success(monkeypatch, capsys):
    monkeypatch.setattr(adb, "pick_device", lambda serial: _FakeDevice())
    monkeypatch.setattr(fridaserver, "ensure_frida_server", lambda dev: None)
    monkeypatch.setattr(
        pipeline, "run_capture", lambda dev, package, out, timeout=15.0: out
    )

    rc = cli._cmd_capture(_capture_args())

    assert rc == 0
    assert "wrote out/capture.json" in capsys.readouterr().out


def _keys_args(**kw) -> argparse.Namespace:
    base = dict(wvd="d.wvd", capture=None, captures=None, pssh=None, url=None,
                header=None, out="out/keys.json")
    base.update(kw)
    return argparse.Namespace(**base)


def test_cmd_keys_direct_input_builds_template(monkeypatch, capsys):
    captured = {}

    def fake(wvd_path, template, out_path):
        captured["template"] = template
        return [ContentKey("dd", "04", "CONTENT")]

    monkeypatch.setattr(pipeline, "run_keys_from_template", fake)
    rc = cli._cmd_keys(_keys_args(pssh="AAAA", url="https://lic",
                                  header=["Authorization: Bearer x"]))

    assert rc == 0
    tmpl = captured["template"]
    assert (tmpl.pssh, tmpl.url) == ("AAAA", "https://lic")
    assert tmpl.headers == {"Authorization": "Bearer x"}
    assert "dd:04" in capsys.readouterr().out


def test_cmd_keys_requires_capture_or_pssh_url(capsys):
    rc = cli._cmd_keys(_keys_args())  # neither --capture nor --pssh/--url
    assert rc == 2
    assert "provide --capture" in capsys.readouterr().err


def test_device_out_dir_sanitizes_serial():
    assert cli._device_out_dir("out", "emulator-5554") == "out/emulator-5554"
    assert cli._device_out_dir("out", "192.168.0.5:5555") == "out/192.168.0.5_5555"


def test_parser_has_stream_and_captures_flags():
    p = cli.build_parser()
    args = p.parse_args(["capture", "--package", "com.x", "--stream",
                         "--fetch-keys", "--wvd", "d.wvd",
                         "--out-dir", "stream", "--timeout", "60"])
    assert args.stream and args.fetch_keys
    assert args.wvd == "d.wvd" and args.out_dir == "stream" and args.timeout == 60
    args2 = p.parse_args(["keys", "--wvd", "d.wvd", "--captures", "stream",
                          "--out", "keys.json"])
    assert args2.captures == "stream"


def test_keys_captures_writes_and_prints(tmp_path, monkeypatch, capsys):
    wvd = tmp_path / "device.wvd"; wvd.write_bytes(b"WVD")
    d = tmp_path / "stream"; d.mkdir()
    (d / "capture-0001.json").write_text(json.dumps(
        CaptureTemplate("AAAA", "https://lic", {}).to_dict()))

    monkeypatch.setattr(
        pipeline, "fetch_keys",
        lambda wvd_bytes, tmpl: [ContentKey("eb67", "100b", "CONTENT")],
    )
    out = tmp_path / "keys.json"
    rc = cli.main(["keys", "--wvd", str(wvd), "--captures", str(d),
                   "--out", str(out)])
    assert rc == 0
    assert "eb67:100b" in capsys.readouterr().out
    assert json.loads(out.read_text())[0]["kid"] == "eb67"
