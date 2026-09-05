import json

from wvdump import pipeline
from wvdump.models import CaptureTemplate, ContentKey


class _FakeStreamSession:
    """Fires pssh + license_request messages synchronously on .run()."""

    def __init__(self, agent_source, device_name=None):
        self._handlers = {}

    def on(self, kind, handler):
        self._handlers[kind] = handler

    def attach_app(self, package, invoke=None):
        pass

    def run(self, timeout=None, until=None):
        self._handlers["pssh"]({"data": "AAAA"}, None)
        self._handlers["license_request"](
            {"kind": "license_request", "url": "https://lic/1",
             "headers": {"H": "v"}, "pssh": "AAAA", "via": "length"}, None,
        )
        self._handlers["license_request"](
            {"kind": "license_request", "url": "https://lic/2",
             "headers": {"H": "v"}, "pssh": "AAAA", "via": "url"}, None,
        )


def test_run_capture_stream_saves_all_pairs(tmp_path, monkeypatch):
    monkeypatch.setattr(pipeline, "WidevineSession", _FakeStreamSession)
    monkeypatch.setattr(
        pipeline, "fetch_keys",
        lambda wvd_bytes, tmpl: [ContentKey("eb67", "100b", "CONTENT")],
    )
    collected = []
    out = pipeline.run_capture_stream(
        _FakeStreamSession(""), "com.example", str(tmp_path),
        wvd=b"WVD", on_keys=lambda keys: collected.extend(keys),
    )
    assert (tmp_path / "capture-0001.json").exists()
    assert (tmp_path / "capture-0002.json").exists()
    assert len(json.loads((tmp_path / "capture-list.json").read_text())) == 2
    # Both POSTs carry the same pssh; the first replay succeeds, so the
    # second POST is deduped and never replayed.
    assert collected == [ContentKey("eb67", "100b", "CONTENT")]


def test_key_fetcher_worker_replays_pairs_off_thread(monkeypatch):
    replayed = []
    monkeypatch.setattr(
        pipeline, "fetch_keys",
        lambda wvd, tmpl: [ContentKey("eb67", "100b", "CONTENT")],
    )
    outcomes = []
    w = pipeline.KeyFetcherWorker(
        b"WVD",
        on_keys=lambda keys: replayed.extend(keys),
        on_outcome=lambda pssh, ok: outcomes.append((pssh, ok)),
    )
    w.start()
    w.submit(CaptureTemplate(pssh="P1", url="https://lic", headers={}))
    w.stop()
    w.join(timeout=5)
    assert replayed == [ContentKey("eb67", "100b", "CONTENT")]
    assert outcomes == [("P1", True)]


def test_run_keys_many_dedupes_by_kid(tmp_path, monkeypatch):
    wvd = tmp_path / "device.wvd"
    wvd.write_bytes(b"WVD")
    d = tmp_path / "stream"
    d.mkdir()
    (d / "capture-0001.json").write_text(json.dumps(
        CaptureTemplate("AAAA", "https://lic/1", {}).to_dict()))
    (d / "capture-0002.json").write_text(json.dumps(
        CaptureTemplate("BBBB", "https://lic/2", {}).to_dict()))

    def fake_fetch(wvd_bytes, tmpl):
        return [ContentKey("eb67", "100b", "CONTENT")]  # same KID for every template

    monkeypatch.setattr(pipeline, "fetch_keys", fake_fetch)
    out = tmp_path / "keys.json"
    keys = pipeline.run_keys_many(str(wvd), str(d), str(out))
    assert keys == [ContentKey("eb67", "100b", "CONTENT")]
    assert len(json.loads(out.read_text())) == 1


def test_run_keys_many_skips_corrupt_files_and_reports_missing_dir(tmp_path, monkeypatch, capsys):
    monkeypatch.setattr(
        pipeline, "fetch_keys",
        lambda wvd_bytes, tmpl: [ContentKey("eb67", "100b", "CONTENT")],
    )
    wvd = tmp_path / "device.wvd"; wvd.write_bytes(b"WVD")
    d = tmp_path / "stream"; d.mkdir()
    (d / "capture-0001.json").write_text("{not json")
    (d / "capture-0002.json").write_text(json.dumps(
        CaptureTemplate("AAAA", "https://lic", {}).to_dict()))
    out = tmp_path / "keys.json"
    keys = pipeline.run_keys_many(str(wvd), str(d), str(out))
    assert keys == [ContentKey("eb67", "100b", "CONTENT")]
    assert "skipping unreadable" in capsys.readouterr().out

    empty = tmp_path / "nope"
    pipeline.run_keys_many(str(wvd), str(empty), str(tmp_path / "keys2.json"))
    assert "no capture-*.json files found" in capsys.readouterr().out
