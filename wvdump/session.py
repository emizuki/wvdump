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

    def attach_all(self) -> None:
        targets = [p.name for p in self._device.enumerate_processes() if is_drm_process(p.name)]
        if not targets:
            raise NoWidevineProcess("no DRM/Widevine process found")
        for name in targets:
            session = self._device.attach(name)
            script = session.create_script(self._agent_source)
            script.on("message", lambda m, d: self._router.dispatch(m, d))
            script.load()
            self._scripts.append(script)

    def run(self, timeout: float | None = None) -> None:
        start = time.time()
        while timeout is None or time.time() - start < timeout:
            time.sleep(0.5)
