"""Download, push, and run a matching frida-server on the device."""
from __future__ import annotations
import lzma
import time
from pathlib import Path

import httpx

from wvdump.errors import FridaError

_ARCH = {"arm64-v8a": "arm64", "armeabi-v7a": "arm", "x86_64": "x86_64", "x86": "x86"}
_REMOTE = "/data/local/tmp/frida-server-wvdump"


def _frida_arch(abi: str) -> str:
    try:
        return _ARCH[abi]
    except KeyError as exc:
        raise FridaError(f"unsupported abi: {abi}") from exc


def server_asset_name(version: str, abi: str) -> str:
    return f"frida-server-{version}-android-{_frida_arch(abi)}.xz"


def release_url(version: str, abi: str) -> str:
    return (
        f"https://github.com/frida/frida/releases/download/{version}/"
        f"{server_asset_name(version, abi)}"
    )


def _download(version: str, abi: str, cache: Path) -> Path:
    cache.mkdir(parents=True, exist_ok=True)
    binary = cache / f"frida-server-{version}-android-{_frida_arch(abi)}"
    if binary.exists():
        return binary
    resp = httpx.get(release_url(version, abi), follow_redirects=True, timeout=120)
    if resp.status_code != 200:
        raise FridaError(f"download failed ({resp.status_code}) for {release_url(version, abi)}")
    binary.write_bytes(lzma.decompress(resp.content))
    return binary


def _server_running(dev) -> bool:
    from wvdump.adb import shell_checked
    return "frida-server" in shell_checked(dev, "ps -A")


def _start_server(dev, remote: str) -> None:
    dev.shell(f"sh -c 'nohup {remote} >/dev/null 2>&1 < /dev/null &'")


def ensure_frida_server(dev, version: str = "17.17.0") -> None:
    from wvdump.adb import device_abi, ensure_root
    ensure_root(dev)
    abi = device_abi(dev)
    if _server_running(dev):
        return
    local = _download(version, abi, Path.home() / ".cache" / "wvdump")
    dev.sync.push(str(local), _REMOTE)
    dev.shell(f"chmod 755 {_REMOTE}")
    for _attempt in range(2):
        _start_server(dev, _REMOTE)
        # Poll up to 30 s (a freshly booted emulator can be slow), then
        # require the server to STAY up for 3 more seconds -- a process that
        # dies right after its launcher shell exits is not actually serving.
        for _ in range(30):
            time.sleep(1.0)
            if _server_running(dev):
                time.sleep(3.0)
                if _server_running(dev):
                    return
                break
    raise FridaError("frida-server did not start")
