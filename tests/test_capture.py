from wvdump.capture import CaptureCollector


def test_collector_builds_template():
    c = CaptureCollector()
    assert not c.ready
    c.feed({"kind": "pssh", "data": "AAAA"})
    c.feed({"kind": "license_url", "url": "https://lic"})
    assert not c.ready
    c.feed({"kind": "license_headers", "headers": {"Authorization": "Bearer x"}})
    assert c.ready
    t = c.template()
    assert t.pssh == "AAAA"
    assert t.url == "https://lic"
    assert t.headers["Authorization"] == "Bearer x"


def test_collector_ignores_unrelated_kinds():
    c = CaptureCollector()
    c.feed({"kind": "keybox", "data": "..."})
    assert not c.ready
