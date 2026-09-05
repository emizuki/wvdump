"""High-level orchestration used by CLI subcommands.

`run_keys` is the unit-tested core (stubs out `fetch_keys` entirely, no
device involved). `run_device`, `run_capture`, and `run_auto` wire up a live
`WidevineSession` against a real adb device and cannot be exercised without
one; they are covered by manual/live verification instead (see Task 12).
"""
from __future__ import annotations
import json
import queue
import threading
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


def run_keys_from_template(wvd_path: str, template: CaptureTemplate, out_path: str) -> list[ContentKey]:
    """Fetch content keys for an already-built template and write them out.

    `fetch_keys` is imported into this module's namespace so tests can
    monkeypatch `pipeline.fetch_keys` without touching wvdump.keys.
    """
    wvd = Path(wvd_path).read_bytes()
    keys = fetch_keys(wvd, template)
    out = Path(out_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps([k.__dict__ for k in keys], indent=2))
    return keys


def run_keys(wvd_path: str, capture_path: str, out_path: str) -> list[ContentKey]:
    """Load a .wvd device file and a captured license-request template,
    fetch content keys via capture-and-replay, and write them to out_path."""
    tmpl = CaptureTemplate.from_dict(json.loads(Path(capture_path).read_text()))
    return run_keys_from_template(wvd_path, tmpl, out_path)


def run_device(dev, out_dir: str, timeout: float = 10.0, reprovision: bool = False) -> str:
    """Attach the agent's native identity hooks to every DRM HAL process on
    `dev`, collect a device identity for up to `timeout` seconds, and save
    it under `out_dir`.

    With `reprovision=True`, first force a fresh Widevine provision (wipe the
    cached credentials and restart the HAL) and additionally install the
    provisioning-time plaintext-RSA-key sniff. This is what makes a usable
    `.wvd` obtainable on a keybox-provisioned emulator: the plaintext device
    RSA key is only materialized while a certificate is being provisioned, so
    the operator must play protected content *after* this starts to drive a
    fresh provision + license request. Without it, only the wrapped
    (non-importable) key is seen and the keybox-only fallback below applies.

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
    if reprovision:
        from wvdump.adb import reprovision_widevine
        services = reprovision_widevine(dev)
        print(
            f"[wvdump] forced a fresh Widevine provision (restarted {services}); "
            "play protected content now so the CDM re-provisions and the "
            "plaintext device key is captured."
        )
    # NOTE: "client_id" here holds the raw buffer captured at PrepareKeyRequest,
    # which is the Widevine LICENSE REQUEST (or its SignedMessage wrapper), not
    # a bare ClientIdentification -- extract_client_id() recovers the nested
    # ClientIdentification from it below. "rsa_plaintext" records whether the
    # captured rsa_key is the importable plaintext key (from the provisioning
    # sniff) or the wrapped key from LoadDeviceRSAKey.
    state: dict = {"client_id": None, "rsa_key": None, "keybox": None, "rsa_plaintext": False}

    def on_client_id(payload, data):
        state["client_id"] = b64decode(payload["data"])

    def on_rsa_key(payload, data):
        # Prefer the plaintext key: let it overwrite a previously-seen wrapped
        # key, but never let a later wrapped key clobber a captured plaintext.
        plaintext = bool(payload.get("plaintext"))
        if state["rsa_key"] is not None and state["rsa_plaintext"] and not plaintext:
            return
        state["rsa_key"] = b64decode(payload["data"])
        state["rsa_plaintext"] = plaintext

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
    if reprovision:
        session.invoke("hookProvisioningKey")
        # Only the plaintext key yields a usable .wvd, so wait for that
        # specifically rather than stopping at the wrapped key.
        done = lambda: state["client_id"] and state["rsa_key"] and state["rsa_plaintext"]
    else:
        # Stop as soon as we have a full identity OR a keybox: on a
        # keybox-only device the keybox is the best available result, so
        # there is no point waiting out the whole timeout for a .wvd that
        # will never come.
        done = lambda: (state["client_id"] and state["rsa_key"]) or state["keybox"]
    session.run(timeout=timeout, until=done)

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
    for kind in ("pssh", "license_request", "license_url", "license_headers"):
        session.on(kind, lambda payload, data: collector.feed(payload))
    session.on("log", on_log)

    try:
        session.attach_app(package, invoke="hookJava")
        # Wait for a correlated license POST (collector.ready), not merely any
        # url/headers -- otherwise we'd stop at the first unrelated request.
        session.run(timeout=timeout, until=lambda: collector.ready)
    except (frida.RPCException, FridaError) as exc:
        print(
            f"[wvdump] capture attach/hook failed: {exc}; "
            "no capture.json written -- see README Limitations"
        )
        return None

    if not collector.has_template:
        print(
            "capture incomplete: did not observe a pssh plus a license request "
            "within the timeout; no capture.json written -- see README "
            "Limitations"
        )
        return None

    if collector.best_tier == "url" or not collector.correlated:
        print(
            "[wvdump] warning: license POST only matched by URL heuristic "
            "(no body/length confirmation); the captured template may not be "
            "the real license endpoint. Re-run and start playback while "
            "attached, or supply --pssh/--url to `keys` directly."
        )

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


class KeyFetcherWorker:
    """Replays captured templates on a worker thread.

    The Frida message pump must never block on a network round-trip (that
    is what dropped messages during fast multi-video sessions), so the
    message callback only enqueues; this worker owns all HTTP work.
    """

    def __init__(self, wvd: bytes, on_keys, on_outcome) -> None:
        self._wvd = wvd
        self._on_keys = on_keys
        self._on_outcome = on_outcome
        self._q: queue.Queue = queue.Queue()
        self._seen_kids: set[str] = set()
        self._thread = threading.Thread(target=self._run, daemon=True)

    def start(self) -> None:
        self._thread.start()

    def submit(self, template: CaptureTemplate) -> None:
        self._q.put(template)

    def stop(self) -> None:
        self._q.put(None)

    def join(self, timeout=None) -> None:
        self._thread.join(timeout)

    def _run(self) -> None:
        while True:
            item = self._q.get()
            if item is None:
                return
            try:
                keys = fetch_keys(self._wvd, item)
                fresh = [k for k in keys if k.kid not in self._seen_kids]
                self._seen_kids.update(k.kid for k in fresh)
                if fresh:
                    self._on_keys(fresh)
                if self._on_outcome is not None:
                    self._on_outcome(item.pssh, bool(keys))
            except Exception as exc:
                print(f"[wvdump] replay failed for {item.url[:80]}: {exc}")
                if self._on_outcome is not None:
                    self._on_outcome(item.pssh, False)


def run_capture_stream(dev, package: str, out_dir: str,
                       timeout: float = 1800.0,
                       wvd: bytes | None = None,
                       on_keys=None) -> Path:
    """Attach the Java capture hooks and collect every correlated
    (pssh, url, headers) pair until `timeout`. Each pair is written to
    `capture-<seq>.json` as it arrives. When `wvd` is given, replay each
    pair on the fly from a worker thread (never inside the Frida message
    callback): `on_keys(fresh_keys)` runs per successful replay and the
    outcomes feed the collector's retry logic."""
    from wvdump.capture import StreamCollector
    collector = StreamCollector(out_dir)
    worker = None
    fetch_keys_cb = None
    if wvd is not None:
        worker = KeyFetcherWorker(
            wvd,
            on_keys=on_keys or (lambda keys: None),
            on_outcome=collector.mark_keys,
        )
        worker.start()
        fetch_keys_cb = worker.submit

    def on_log(payload, data):
        print(f"[agent] {payload.get('message', '')}")

    def feed(payload, data):
        collector.feed(payload, on_pair=fetch_keys_cb)

    session = WidevineSession(AGENT_SOURCE, device_name=getattr(dev, "serial", None))
    for kind in ("pssh", "license_request"):
        session.on(kind, feed)
    session.on("log", on_log)
    try:
        try:
            session.attach_app(package, invoke="hookJava")
            session.run(timeout=timeout)
        except (frida.RPCException, FridaError) as exc:
            print(f"[wvdump] capture attach/hook failed: {exc}")
            return collector.out_dir
    finally:
        if worker is not None:
            worker.stop()
            worker.join(timeout=5)
    return collector.out_dir


def run_keys_many(wvd_path: str, captures_dir: str, out_path: str) -> list[ContentKey]:
    """Batch-replay every capture-<seq>.json in `captures_dir` with the same
    .wvd, deduping by KID. For apps whose tokens outlive the capture session;
    short-lived tokens are better served by `capture --stream --fetch-keys`."""
    wvd = Path(wvd_path).read_bytes()
    files = sorted(Path(captures_dir).glob("capture-[0-9]*.json"))
    if not files:
        print(f"[wvdump] no capture-*.json files found in {captures_dir}")
    keys_by_kid: dict[str, ContentKey] = {}
    for f in files:
        try:
            tmpl = CaptureTemplate.from_dict(json.loads(f.read_text()))
        except (ValueError, KeyError, TypeError, json.JSONDecodeError) as exc:
            print(f"[wvdump] skipping unreadable capture file {f}: {exc}")
            continue
        for k in fetch_keys(wvd, tmpl):
            keys_by_kid.setdefault(k.kid, k)
    keys = list(keys_by_kid.values())
    out = Path(out_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps([k.__dict__ for k in keys], indent=2))
    return keys
