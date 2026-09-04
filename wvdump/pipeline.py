"""High-level orchestration used by CLI subcommands.

`run_keys` is the unit-tested core (stubs out `fetch_keys` entirely, no
device involved). `run_device`, `run_capture`, and `run_auto` wire up a live
`WidevineSession` against a real adb device and cannot be exercised without
one; they are covered by manual/live verification instead (see Task 12).
"""
from __future__ import annotations
import json
from base64 import b64decode
from pathlib import Path

from wvdump.capture import CaptureCollector, save_capture
from wvdump.errors import IncompleteIdentity
from wvdump.keys import fetch_keys
from wvdump.models import CaptureTemplate, ContentKey, DeviceIdentity


def run_keys(wvd_path: str, capture_path: str, out_path: str) -> list[ContentKey]:
    """Load a .wvd device file and a captured license-request template,
    fetch content keys via capture-and-replay, and write them to out_path.

    `fetch_keys` is imported into this module's namespace so tests can
    monkeypatch `pipeline.fetch_keys` without touching wvdump.keys.
    """
    wvd = Path(wvd_path).read_bytes()
    tmpl = CaptureTemplate.from_dict(json.loads(Path(capture_path).read_text()))
    keys = fetch_keys(wvd, tmpl)
    Path(out_path).write_text(json.dumps([k.__dict__ for k in keys], indent=2))
    return keys


def run_device(dev, out_dir: str, timeout: float = 10.0) -> str:
    """Attach the agent's native identity hooks to every DRM HAL process on
    `dev`, collect a device identity (or fall back to a raw keybox) for up
    to `timeout` seconds, and save it under `out_dir`. Returns the path
    written: `<out_dir>/device.wvd` on a full identity, or
    `<out_dir>/keybox.json` if only a keybox arrived.
    """
    from wvdump.agent import AGENT_SOURCE
    from wvdump.device import extract_client_id, save_wvd
    from wvdump.keybox import parse_keybox
    from wvdump.session import WidevineSession

    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    # NOTE: "client_id" here holds the raw buffer captured at PrepareKeyRequest,
    # which is the Widevine LICENSE REQUEST (or its SignedMessage wrapper), not
    # a bare ClientIdentification -- extract_client_id() recovers the nested
    # ClientIdentification from it below.
    state: dict[str, bytes | None] = {"client_id": None, "rsa_key": None, "keybox": None}

    def on_client_id(payload, data):
        state["client_id"] = b64decode(payload["data"])

    def on_rsa_key(payload, data):
        state["rsa_key"] = b64decode(payload["data"])

    def on_keybox(payload, data):
        if state["keybox"] is None:  # keep the first one captured
            state["keybox"] = b64decode(payload["data"])

    def on_log(payload, data):
        print(f"[agent] {payload.get('message', '')}")

    session = WidevineSession(AGENT_SOURCE, device_name=dev.serial)
    session.on("device_client_id", on_client_id)
    session.on("device_rsa_key", on_rsa_key)
    session.on("keybox", on_keybox)
    session.on("log", on_log)
    session.attach_all(invoke="hookNative")
    session.run(timeout=timeout, until=lambda: state["client_id"] and state["rsa_key"])

    if state["client_id"] is not None:
        # Saved unconditionally for debugging, even if extraction below fails.
        (out / "license_request.bin").write_bytes(state["client_id"])

    if state["client_id"] and state["rsa_key"]:
        try:
            client_id = extract_client_id(state["client_id"])
        except IncompleteIdentity:
            client_id = None
        if client_id is not None:
            identity = DeviceIdentity(client_id=client_id, private_key=state["rsa_key"])
            path = save_wvd(identity, out / "device.wvd")
            return str(path)

    if state["keybox"] is not None:
        keybox = parse_keybox(state["keybox"])
        path = out / "keybox.json"
        path.write_text(json.dumps(keybox.to_dict(), indent=2))
        return str(path)
    raise IncompleteIdentity("no device identity or keybox captured within timeout")


def run_capture(dev, package: str, out_path: str, timeout: float = 15.0) -> CaptureTemplate:
    """Attach the agent's Java capture hooks inside `package`, collect a
    pssh + license URL + headers for up to `timeout` seconds (stopping
    early once complete), and save the resulting CaptureTemplate.
    """
    from wvdump.agent import AGENT_SOURCE
    from wvdump.session import WidevineSession

    collector = CaptureCollector()

    def on_log(payload, data):
        print(f"[agent] {payload.get('message', '')}")

    session = WidevineSession(AGENT_SOURCE, device_name=dev.serial)
    for kind in ("pssh", "license_url", "license_headers"):
        session.on(kind, lambda payload, data: collector.feed(payload))
    session.on("log", on_log)
    session.attach_app(package, invoke="hookJava")
    session.run(timeout=timeout, until=lambda: collector.ready)

    template = collector.template()  # raises IncompleteIdentity if still incomplete
    save_capture(template, out_path)
    return template


def run_auto(dev, package: str, out_dir: str) -> list[ContentKey]:
    """Run device identity capture, app capture, and key fetch back to
    back, all under `out_dir`."""
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)

    device_path = run_device(dev, str(out))
    wvd_path = out / "device.wvd"
    if not wvd_path.exists():
        raise IncompleteIdentity(
            f"auto: device step produced {device_path}, not a .wvd; "
            "cannot fetch keys without a full device identity"
        )

    capture_path = out / "capture.json"
    run_capture(dev, package, str(capture_path))

    keys_path = out / "keys.json"
    return run_keys(str(wvd_path), str(capture_path), str(keys_path))
