from wvdump.capture import CaptureCollector


def test_collector_prefers_correlated_license_request():
    c = CaptureCollector()
    assert not c.ready
    c.feed({"kind": "pssh", "data": "AAAA"})
    # A loose url/headers alone is NOT enough to be `ready` -- it might be an
    # unrelated request -- but it is a usable fallback.
    c.feed({"kind": "license_url", "url": "https://graphql.example/api"})
    c.feed({"kind": "license_headers", "headers": {"Authorization": "Bearer x"}})
    assert not c.ready
    assert c.has_template and not c.correlated

    # The correlated license request (POST body matched the challenge) wins.
    c.feed({"kind": "license_request",
            "url": "https://lic.example/license",
            "headers": {"Authorization": "Bearer y", "Content-Type": "application/octet-stream"}})
    assert c.ready and c.correlated
    t = c.template()
    assert t.pssh == "AAAA"
    assert t.url == "https://lic.example/license"       # matched, not the graphql url
    assert t.headers["Authorization"] == "Bearer y"


def test_collector_falls_back_to_loose_signals():
    c = CaptureCollector()
    c.feed({"kind": "pssh", "data": "AAAA"})
    c.feed({"kind": "license_url", "url": "https://loose.example"})
    c.feed({"kind": "license_headers", "headers": {"H": "v"}})
    assert c.has_template and not c.correlated
    t = c.template()                                    # loose fallback
    assert t.url == "https://loose.example"
    assert t.headers == {"H": "v"}


def test_collector_ignores_unrelated_kinds():
    c = CaptureCollector()
    c.feed({"kind": "keybox", "data": "..."})
    assert not c.ready
    assert not c.has_template
