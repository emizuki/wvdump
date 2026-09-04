# tests/test_keys.py
from wvdump.keys import fetch_keys
from wvdump.models import CaptureTemplate, ContentKey

class _FakeCdm:
    """Stand-in for a pywidevine Cdm to test orchestration only."""
    def __init__(self): self.calls = []
    def open(self): self.calls.append("open"); return "sess"
    def get_license_challenge(self, session_id, pssh):
        self.calls.append(("challenge", session_id, pssh)); return b"CHALLENGE"
    def parse_license(self, session_id, data):
        self.calls.append(("parse", session_id, data))
    def get_keys(self, session_id):
        return [type("K", (), {"kid": type("U", (), {"hex": "eb67"})(),
                               "key": b"\x10\x0b", "type": "CONTENT"})()]
    def close(self, session_id): self.calls.append(("close", session_id))

def test_fetch_keys_replays_to_captured_endpoint():
    posted = {}
    def fake_post(url, headers, data):
        posted.update(url=url, headers=headers, data=data)
        class R:
            status_code = 200
            content = b"LICENSE_RESPONSE"
            text = "ok"
        return R()

    tmpl = CaptureTemplate(pssh="AAAA", url="https://lic", headers={"Authorization": "Bearer x"})
    keys = fetch_keys(b"WVD", tmpl, cdm_factory=lambda wvd: _FakeCdm(), http_post=fake_post)

    assert posted["url"] == "https://lic"
    assert posted["headers"]["Authorization"] == "Bearer x"
    assert posted["data"] == b"CHALLENGE"
    assert keys == [ContentKey(kid="eb67", key="100b", type="CONTENT")]

def test_fetch_keys_raises_on_non_200():
    def fake_post(url, headers, data):
        class R:
            status_code = 403
            content = b""
            text = "forbidden"
        return R()
    import pytest
    from wvdump.errors import LicenseServerError
    with pytest.raises(LicenseServerError):
        fetch_keys(b"WVD", CaptureTemplate("AAAA", "https://lic", {}),
                   cdm_factory=lambda wvd: _FakeCdm(), http_post=fake_post)
