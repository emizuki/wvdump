import json
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
