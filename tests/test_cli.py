import base64
import json

from pywidevine.license_protocol_pb2 import ClientIdentification

from wvdump import pipeline
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
