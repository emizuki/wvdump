from wvdump.capture import CaptureCollector


def _req(url, via, pssh=None, headers=None):
    return {"kind": "license_request", "url": url, "via": via,
            "pssh": pssh, "headers": headers or {"Authorization": "Bearer y"}}


def test_collector_ready_only_for_body_or_length_tiers():
    c = CaptureCollector()
    c.feed({"kind": "pssh", "data": "AAAA"})
    c.feed(_req("https://lic.example/license", "url", pssh="AAAA"))
    assert not c.ready          # heuristic candidate must not stop early
    assert c.has_template
    c.feed(_req("https://lic.example/license", "body", pssh="AAAA"))
    assert c.ready


def test_collector_template_prefers_body_over_url_candidate():
    c = CaptureCollector()
    c.feed({"kind": "pssh", "data": "AAAA"})
    c.feed(_req("https://unrelated.example/license", "url", pssh="AAAA",
                headers={"H": "weak"}))
    c.feed(_req("https://real.example/license", "body", pssh="AAAA",
                headers={"H": "strong"}))
    t = c.template()
    assert t.url == "https://real.example/license"
    assert t.headers == {"H": "strong"}
    assert t.pssh == "AAAA"
    assert c.best_tier == "body"


def test_collector_template_prefers_most_recent_within_tier():
    c = CaptureCollector()
    c.feed({"kind": "pssh", "data": "AAAA"})
    c.feed(_req("https://old.example/license", "body", pssh="AAAA"))
    c.feed(_req("https://new.example/license", "body", pssh="AAAA"))
    assert c.template().url == "https://new.example/license"


def test_collector_url_tier_uses_embedded_pssh_or_last_seen():
    c = CaptureCollector()
    c.feed({"kind": "pssh", "data": "LAST"})
    c.feed(_req("https://lic.example/license", "url", pssh="EMBEDDED"))
    assert c.template().pssh == "EMBEDDED"
    c2 = CaptureCollector()
    c2.feed({"kind": "pssh", "data": "LAST"})
    c2.feed(_req("https://lic.example/license", "url", pssh=None))
    assert c2.template().pssh == "LAST"


def test_collector_defaults_missing_via_to_url():
    # Back-compat with an agent that does not stamp `via`.
    c = CaptureCollector()
    c.feed({"kind": "pssh", "data": "AAAA"})
    c.feed({"kind": "license_request", "url": "https://lic.example/license",
            "headers": {"H": "v"}})
    assert c.has_template and not c.ready
    assert c.best_tier == "url"


def test_collector_falls_back_to_loose_signals():
    c = CaptureCollector()
    c.feed({"kind": "pssh", "data": "AAAA"})
    c.feed({"kind": "license_url", "url": "https://loose.example"})
    c.feed({"kind": "license_headers", "headers": {"H": "v"}})
    assert c.has_template and not c.ready
    t = c.template()
    assert t.url == "https://loose.example"
    assert t.headers == {"H": "v"}


def test_collector_ignores_unrelated_kinds():
    c = CaptureCollector()
    c.feed({"kind": "keybox", "data": "..."})
    assert not c.ready
    assert not c.has_template
