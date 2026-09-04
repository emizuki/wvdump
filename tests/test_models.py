from wvdump.models import ContentKey, CaptureTemplate

def test_content_key_str():
    k = ContentKey(kid="eb676abb", key="100b6c20", type="CONTENT")
    assert str(k) == "eb676abb:100b6c20"

def test_capture_template_roundtrip():
    t = CaptureTemplate(pssh="AAAA", url="https://lic", headers={"X": "1"})
    assert CaptureTemplate.from_dict(t.to_dict()) == t
