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


class _MultiTypeCdm(_FakeCdm):
    """Returns a mix of key types; only CONTENT should survive filtering."""
    def get_keys(self, session_id):
        def k(kid_hex, key_bytes, typ):
            return type("K", (), {"kid": type("U", (), {"hex": kid_hex})(),
                                  "key": key_bytes, "type": typ})()
        return [
            k("aaaa", b"\x01", "SIGNING"),
            k("bbbb", b"\x02", "OPERATOR_SESSION"),
            k("cccc", b"\x03", "KEY_CONTROL"),
            k("dddd", b"\x04", "CONTENT"),
        ]


def test_fetch_keys_returns_only_content_keys():
    def fake_post(url, headers, data):
        class R:
            status_code = 200
            content = b"LICENSE_RESPONSE"
            text = "ok"
        return R()

    keys = fetch_keys(b"WVD", CaptureTemplate("AAAA", "https://lic", {}),
                      cdm_factory=lambda wvd: _MultiTypeCdm(), http_post=fake_post)

    assert keys == [ContentKey(kid="dddd", key="04", type="CONTENT")]


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


from wvdump.keys import sanitize_headers


def test_sanitize_headers_drops_managed_and_non_ascii():
    h = {
        "Host": "www.example.com",
        "Content-Length": "2163",
        "Connection": "Keep-Alive",
        "Accept-Encoding": "gzip",
        "Transfer-Encoding": "chunked",
        "Authorization": "Bearer \u2588\u2588",   # non-printable ASCII placeholder
        "Content-Type": "application/octet-stream",
        "X-Custom": "ok",
    }
    out = sanitize_headers(h)
    assert out == {"Content-Type": "application/octet-stream", "X-Custom": "ok"}


def test_sanitize_headers_passes_clean_values_through():
    assert sanitize_headers({"X-A": "v", "X-B": "w"}) == {"X-A": "v", "X-B": "w"}


def test_fetch_keys_sanitizes_headers_before_post():
    posted = {}
    def fake_post(url, headers, data):
        posted.update(url=url, headers=headers, data=data)
        class R:
            status_code = 200
            content = b"LICENSE_RESPONSE"
            text = "ok"
        return R()

    tmpl = CaptureTemplate(
        pssh="AAAA", url="https://lic",
        headers={"Authorization": "Bearer \u2588\u2588", "Host": "www.example.com"},
    )
    fetch_keys(b"WVD", tmpl, cdm_factory=lambda wvd: _FakeCdm(), http_post=fake_post)
    assert posted["headers"] == {}


class _EmptyCdm(_FakeCdm):
    def get_keys(self, session_id):
        return []


def test_fetch_keys_warns_on_empty_content_keys(caplog):
    class R:
        status_code = 200
        content = b"LICENSE_RESPONSE"
        text = "ok"
    tmpl = CaptureTemplate("AAAA", "https://lic", {})
    keys = fetch_keys(b"WVD", tmpl, cdm_factory=lambda wvd: _EmptyCdm(),
                      http_post=lambda u, h, d: R())
    assert keys == []
    assert "no CONTENT keys" in caplog.text
