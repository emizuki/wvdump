"""Thin wrapper over adbutils for device selection and root."""
from __future__ import annotations
import adbutils

from wvdump.errors import DeviceError


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
    return parse_abi(dev.shell("getprop ro.product.cpu.abi"))


def ensure_root(dev: adbutils.AdbDevice) -> None:
    out = dev.shell("id")
    if "uid=0" in out:
        return
    dev.root()  # adbutils restarts adbd as root
    out = dev.shell("id")
    if "uid=0" not in out:
        raise DeviceError("adb root denied; device is not rootable")
