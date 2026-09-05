from wvdump.agent import AGENT_SOURCE


def test_built_agent_bundles_correlation_queue_methods():
    # Property accesses survive terser (property mangling is off), so the
    # compressed bundle must reference the new queue methods.
    assert ".claimByLength(" in AGENT_SOURCE
    assert ".claimByUrl(" in AGENT_SOURCE
    assert ".claimByBody(" in AGENT_SOURCE


def test_agent_source_stamps_pssh_via_and_matched():
    from pathlib import Path
    src = (Path(__file__).parent.parent / "wvdump" / "agent" / "agent.src.js")
    text = src.read_text(encoding="utf-8")
    assert "pssh: entry.pssh" in text
    assert "via: via" in text
    assert 'matched: via !== "url"' in text
