"""Thin wrapper over adbutils for device selection and root."""
from __future__ import annotations
import re
import time

import adbutils
from adbutils.errors import AdbError

from wvdump.errors import DeviceError

_MEDIADRM_STORES = ("/data/vendor/mediadrm", "/data/mediadrm")
_INIT_SVC_RE = re.compile(r"\[init\.svc\.([^\]]+)\]:\s*\[(\w+)\]")


def shell_checked(dev: adbutils.AdbDevice, cmd: str) -> str:
    """dev.shell() that turns transient transport errors into DeviceError."""
    try:
        return dev.shell(cmd)
    except AdbError as exc:
        raise DeviceError(f"device {dev.serial} went offline: {exc}") from exc


def parse_abi(getprop_out: str) -> str:
    return getprop_out.strip().splitlines()[0].strip()


def pick_device(serial: str | None = None) -> adbutils.AdbDevice:
    client = adbutils.AdbClient()
    devices = client.device_list()
    if not devices:
        raise DeviceError("no adb devices connected")
    if serial:
        for d in devices:
            if d.serial == serial:
                return d
        raise DeviceError(f"device {serial!r} not found")
    if len(devices) > 1:
        raise DeviceError(f"multiple devices; pass --serial: {[d.serial for d in devices]}")
    return devices[0]


def device_abi(dev: adbutils.AdbDevice) -> str:
    return parse_abi(shell_checked(dev, "getprop ro.product.cpu.abi"))


def ensure_root(dev: adbutils.AdbDevice) -> None:
    out = shell_checked(dev, "id")
    if "uid=0" in out:
        return
    dev.root()  # adbutils restarts adbd as root
    out = shell_checked(dev, "id")
    if "uid=0" not in out:
        raise DeviceError("adb root denied; device is not rootable")


def _widevine_hal_services(dev) -> list[str]:
    """Init service names of the Widevine DRM HAL(s) currently known to init."""
    services = []
    for line in dev.shell("getprop").splitlines():
        m = _INIT_SVC_RE.match(line.strip())
        if m and "widevine" in m.group(1).lower():
            services.append(m.group(1))
    return services


def _widevine_hal_pids(dev) -> set[str]:
    """PIDs of the currently-running Widevine DRM HAL process(es).

    `ps -A` columns are `USER PID PPID ... NAME`; the pid is the second
    field. Matching on the process name ('widevine') is build-agnostic.
    """
    pids = set()
    for line in dev.shell("ps -A").splitlines():
        if "widevine" not in line.lower():
            continue
        parts = line.split()
        if len(parts) >= 2 and parts[1].isdigit():
            pids.add(parts[1])
    return pids


def reprovision_widevine(dev, wait: float = 12.0) -> list[str]:
    """Force a fresh Widevine device-certificate provision.

    The plaintext device RSA key is only materialized while the CDM
    provisions a certificate; once provisioned, the credentials are cached
    and the HAL keeps them in memory, so the key never reappears. To capture
    it we must make the HAL provision again: wipe the cached credential
    stores and restart the HAL init service so it comes up unprovisioned. The
    next license request then triggers a fresh provision.

    This de-provisions Widevine for *every* app on the device; they each
    re-provision automatically on their next playback, so the effect is
    transient, but it is disruptive enough that callers must opt in.

    Returns the HAL init service name(s) that were restarted.
    """
    ensure_root(dev)
    services = _widevine_hal_services(dev)
    if not services:
        raise DeviceError(
            "no Widevine DRM HAL init service found (looked for an "
            "init.svc.* entry containing 'widevine'); cannot force a reprovision"
        )
    old_pids = _widevine_hal_pids(dev)
    for store in _MEDIADRM_STORES:
        dev.shell(f"rm -rf {store}/* 2>/dev/null")
    for name in services:
        dev.shell(f"setprop ctl.restart {name}")
    # Wait for a genuinely NEW HAL process before returning, so the caller
    # attaches to the freshly-restarted (unprovisioned) HAL rather than the
    # old instance being torn down. Polling init.svc state instead would race:
    # right after `ctl.restart`, init has usually not yet transitioned the
    # service, so it still reports the old instance as "running". A changed
    # pid is unambiguous. Best-effort: if no new pid appears within `wait`
    # (e.g. an unusual build), return anyway and let the caller proceed.
    deadline = time.time() + wait
    while time.time() < deadline:
        current = _widevine_hal_pids(dev)
        if current - old_pids:
            break
        time.sleep(0.5)
    return services
