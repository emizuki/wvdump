import json

from wvdump.capture import CaptureCollector, StreamCollector


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


def test_collector_most_recent_wins_even_when_timestamps_tie(monkeypatch):
    import wvdump.capture as capture_mod
    monkeypatch.setattr(capture_mod.time, "time", lambda: 1000.0)  # constant clock
    c = capture_mod.CaptureCollector()
    c.feed({"kind": "pssh", "data": "AAAA"})
    c.feed(_req("https://old.example/license", "body", pssh="AAAA"))
    c.feed(_req("https://new.example/license", "body", pssh="AAAA"))
    assert c.template().url == "https://new.example/license"
    assert c.best_tier == "body"


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


def _pair(url, pssh="P1", via="body"):
    return {"kind": "license_request", "url": url, "via": via,
            "pssh": pssh, "headers": {"H": "v"}}


def test_stream_collector_saves_pairs_and_dedupes(tmp_path):
    c = StreamCollector(str(tmp_path))
    saved = []
    c.feed(_pair("https://lic/1"), on_pair=lambda t: saved.append(t))
    assert saved and saved[0].pssh == "P1"
    assert (tmp_path / "capture-0001.json").exists()

    # same pssh, new URL, replay already OK -> skip
    c.mark_keys("P1", True)
    c.feed(_pair("https://lic/2"), on_pair=lambda t: saved.append(t))
    assert len(saved) == 1

    # duplicate URL -> skip even without key status
    c2 = StreamCollector(str(tmp_path / "d2"))
    seen = []
    c2.feed(_pair("https://lic/1"), on_pair=lambda t: seen.append(t))
    c2.feed(_pair("https://lic/1"), on_pair=lambda t: seen.append(t))
    assert len(seen) == 1


def test_stream_collector_retries_once_when_replay_empty(tmp_path):
    c = StreamCollector(str(tmp_path))
    saved = []
    c.feed(_pair("https://lic/1"), on_pair=lambda t: saved.append(t))
    c.mark_keys("P1", False)                        # first replay returned no keys
    c.feed(_pair("https://lic/2"), on_pair=lambda t: saved.append(t))
    assert len(saved) == 2
    c.mark_keys("P1", True)
    c.feed(_pair("https://lic/3"), on_pair=lambda t: saved.append(t))
    assert len(saved) == 2                          # no third attempt after success


def test_stream_collector_caps_attempts_per_pssh_without_success(tmp_path):
    c = StreamCollector(str(tmp_path))
    saved = []
    c.feed(_pair("https://lic/1"), on_pair=lambda t: saved.append(t))
    c.mark_keys("P1", False)                        # attempt 1 failed (no keys)
    c.feed(_pair("https://lic/2"), on_pair=lambda t: saved.append(t))
    c.mark_keys("P1", False)                        # attempt 2 failed (no keys)
    c.feed(_pair("https://lic/3"), on_pair=lambda t: saved.append(t))
    assert len(saved) == 2                          # cap: no third attempt
    assert not (tmp_path / "capture-0003.json").exists()


def test_stream_collector_writes_list_file(tmp_path):
    c = StreamCollector(str(tmp_path))
    c.feed(_pair("https://lic/1"))
    c.feed(_pair("https://lic/2", pssh="P2"))
    entries = json.loads((tmp_path / "capture-list.json").read_text())
    assert len(entries) == 2
    assert all((tmp_path / e).exists() for e in entries)
