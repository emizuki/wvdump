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

import frida
from google.protobuf.message import DecodeError

from wvdump.agent import AGENT_SOURCE
from wvdump.capture import CaptureCollector, save_capture
from wvdump.device import extract_client_id, save_wvd
from wvdump.errors import FridaError, IncompleteIdentity
from wvdump.keybox import parse_keybox
from wvdump.keys import fetch_keys
from wvdump.models import CaptureTemplate, ContentKey, DeviceIdentity
from wvdump.session import WidevineSession


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
    `dev`, collect a device identity for up to `timeout` seconds, and save
    it under `out_dir`.

    This never raises for an incomplete/unusable capture -- Widevine L3
    provisioning varies across devices (e.g. some only ever expose a wrapped,
    non-importable RSA key -- the documented keybox-only case), and that is
    an expected outcome, not a bug. On success, returns the `device.wvd`
    path. Otherwise, it saves whatever raw buffers were captured (and a
    parsed `keybox.json` if a full keybox arrived) under `out_dir`, logs an
    actionable message, and returns `out_dir` itself.
    """
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
        # Saved unconditionally for debugging, even if extraction/build below fails.
        (out / "license_request.bin").write_bytes(state["client_id"])

    if state["client_id"] and state["rsa_key"]:
        try:
            client_id = extract_client_id(state["client_id"])
            identity = DeviceIdentity(client_id=client_id, private_key=state["rsa_key"])
            path = save_wvd(identity, out / "device.wvd")
            print(f"wrote {path}")
            return str(path)
        except (ValueError, DecodeError, IncompleteIdentity) as exc:
            # Do NOT attempt to decrypt/unwrap the key -- a wrapped RSA key
            # (RSA.importKey raising ValueError) or an unrecoverable
            # ClientIdentification are both expected outcomes on some
            # devices. Fall through to the raw-artifact fallback below
            # instead of crashing.
            print(f"[wvdump] could not build a .wvd: {exc}")

    if not any(state.values()):
        print(
            "No device identity signals were captured within the timeout "
            "(no client_id, rsa_key, or keybox message arrived); nothing to save."
        )
        return str(out)

    # Identity incomplete, or the .wvd build above failed. Save whatever raw
    # buffers were captured so the run isn't a total loss, and degrade
    # gracefully instead of crashing.
    if state["rsa_key"] is not None:
        (out / "device_rsa_key.bin").write_bytes(state["rsa_key"])
    if state["keybox"] is not None:
        (out / "device_token.bin").write_bytes(state["keybox"])
        if len(state["keybox"]) >= 128:
            try:
                keybox = parse_keybox(state["keybox"])
                (out / "keybox.json").write_text(json.dumps(keybox.to_dict(), indent=2))
            except ValueError:
                pass  # captured buffer too short/malformed to be a full keybox

    print(
        "Could not build a .wvd on this device (RSA key not importable / "
        "identity incomplete -- likely keybox-only provisioning). "
        f"Saved raw artifacts to {out}/. See README 'Limitations'."
    )
    return str(out)


def run_capture(dev, package: str, out_path: str, timeout: float = 15.0) -> CaptureTemplate | None:
    """Attach the agent's Java capture hooks inside `package`, collect a
    pssh + license URL + headers for up to `timeout` seconds (stopping
    early once complete), and save the resulting CaptureTemplate.

    Returns None (without writing `out_path`) instead of raising if the
    capture never completed -- e.g. the target process has no Java runtime,
    the Frida Java bridge isn't available (Frida 17 needs frida-java-bridge
    bundled, which this plain-script agent doesn't do -- see agent.js's
    hookJava guard), or attaching/invoking hookJava itself failed. These are
    expected, loggable outcomes on some apps/devices, not bugs.
    """
    collector = CaptureCollector()

    def on_log(payload, data):
        print(f"[agent] {payload.get('message', '')}")

    session = WidevineSession(AGENT_SOURCE, device_name=dev.serial)
    for kind in ("pssh", "license_url", "license_headers"):
        session.on(kind, lambda payload, data: collector.feed(payload))
    session.on("log", on_log)

    try:
        session.attach_app(package, invoke="hookJava")
        session.run(timeout=timeout, until=lambda: collector.ready)
    except (frida.RPCException, FridaError) as exc:
        print(
            f"[wvdump] capture attach/hook failed: {exc}; "
            "no capture.json written -- see README Limitations"
        )
        return None

    if not collector.ready:
        print(
            "capture incomplete: did not observe a full pssh + license URL + "
            "headers within the timeout; no capture.json written -- see "
            "README Limitations"
        )
        return None

    template = collector.template()
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
    if not capture_path.exists():
        raise IncompleteIdentity(
            f"auto: capture step did not produce {capture_path}; "
            "cannot fetch keys without a complete pssh/license URL/headers capture"
        )

    keys_path = out / "keys.json"
    return run_keys(str(wvd_path), str(capture_path), str(keys_path))
