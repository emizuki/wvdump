"""Tests for Frida session and message router."""
from wvdump.session import is_drm_process, MessageRouter


def test_is_drm_process():
    assert is_drm_process("android.hardware.drm@1.1-service.widevine")
    assert is_drm_process("mediadrmserver")
    assert not is_drm_process("com.android.systemui")


def test_router_dispatches_by_kind():
    seen = []
    r = MessageRouter()
    r.register("pssh", lambda m, d: seen.append(m["data"]))
    r.dispatch({"type": "send", "payload": {"kind": "pssh", "data": "AAAA"}}, None)
    r.dispatch({"type": "send", "payload": {"kind": "other"}}, None)
    assert seen == ["AAAA"]
