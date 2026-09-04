"""Attach Frida to Widevine/DRM processes and route agent messages."""
from __future__ import annotations
import time
from typing import Callable

import frida

from wvdump.errors import NoWidevineProcess

_DRM_HINTS = ("drm", "mediadrm", "widevine")


def is_drm_process(name: str) -> bool:
    low = name.lower()
    return any(h in low for h in _DRM_HINTS)


class MessageRouter:
    """Dispatch Frida 'send' payloads to handlers keyed by payload['kind']."""

    def __init__(self) -> None:
        self._handlers: dict[str, Callable] = {}

    def register(self, kind: str, handler: Callable) -> None:
        self._handlers[kind] = handler

    def dispatch(self, message: dict, data: bytes | None) -> None:
        if message.get("type") != "send":
            return
        payload = message.get("payload") or {}
        handler = self._handlers.get(payload.get("kind"))
        if handler:
            handler(payload, data)


class WidevineSession:
    def __init__(self, agent_source: str, device_name: str | None = None) -> None:
        self._agent_source = agent_source
        self._device = frida.get_usb_device() if device_name is None else frida.get_device(device_name)
        self._router = MessageRouter()
        self._scripts = []

    def on(self, kind: str, handler: Callable) -> None:
        self._router.register(kind, handler)

    def _load_script(self, frida_session):
        """Create, wire, and load the agent script in an attached process.
        Loading does not invoke any rpc export -- the agent exports
        hookNative/hookJava for the caller to invoke explicitly."""
        script = frida_session.create_script(self._agent_source)
        script.on("message", lambda m, d: self._router.dispatch(m, d))
        script.load()
        self._scripts.append(script)
        return script

    def attach_all(self, invoke: str | None = None) -> None:
        """Attach the agent to every DRM/Widevine process on the device.
        If `invoke` is given (e.g. "hookNative"), call that rpc export on
        each freshly loaded script -- this is where the native OEMCrypto
        identity hooks belong, since they must run inside the DRM HAL
        process rather than the target app.
        """
        targets = [p.name for p in self._device.enumerate_processes() if is_drm_process(p.name)]
        if not targets:
            raise NoWidevineProcess("no DRM/Widevine process found")
        for name in targets:
            frida_session = self._device.attach(name)
            script = self._load_script(frida_session)
            if invoke:
                getattr(script.exports, invoke)()

    def attach_app(self, package: str, invoke: str | None = None, spawn: bool = True) -> None:
        """Attach the agent to the target app process by package/process
        name, spawning it if it is not already running and `spawn` is True.
        Used for the Java-layer capture hooks, which must run inside the
        app process rather than the DRM HAL processes attach_all() targets.
        """
        pid = None
        try:
            frida_session = self._device.attach(package)
        except frida.ProcessNotFoundError:
            if not spawn:
                raise
            pid = self._device.spawn([package])
            frida_session = self._device.attach(pid)
        script = self._load_script(frida_session)
        if invoke:
            getattr(script.exports, invoke)()
        if pid is not None:
            self._device.resume(pid)

    def invoke(self, export_name: str) -> None:
        """Call a named rpc export on every currently loaded script."""
        for script in self._scripts:
            getattr(script.exports, export_name)()

    def run(self, timeout: float | None = None, until: Callable[[], bool] | None = None) -> None:
        """Pump the Frida message loop for up to `timeout` seconds, or until
        `until()` returns truthy (checked once per poll interval), whichever
        comes first. Behaves exactly as before when `until` is omitted:
        loops until `timeout` elapses, or forever if `timeout` is None."""
        start = time.time()
        while timeout is None or time.time() - start < timeout:
            if until is not None and until():
                return
            time.sleep(0.5)
