"""Unit tests for forcing a fresh Widevine provision (adb.reprovision_widevine).

Uses a fake device that records the adb shell commands it receives, so the
side effects (wipe cached creds + restart the HAL init service) can be
asserted without a real device."""
from wvdump.adb import reprovision_widevine

GETPROP = (
    "[init.svc.adbd]: [running]\n"
    "[init.svc.vendor.drm-widevine-hal-1-1]: [running]\n"
    "[ro.product.cpu.abi]: [arm64-v8a]\n"
)


def _ps(pid):
    return f"media {pid} 1 49720 11044 x 0 S android.hardware.drm@1.1-service.widevine\n"


class FakeDevice:
    def __init__(self):
        self.commands = []
        self._restarted = False

    def shell(self, cmd):
        self.commands.append(cmd)
        if cmd == "id":
            return "uid=0(root) gid=0(root)"
        if cmd == "getprop":
            return GETPROP
        if cmd == "ps -A":
            # A fresh HAL pid appears only after the restart is issued, so
            # reprovision's pid-change poll terminates deterministically.
            return _ps("9999" if self._restarted else "1386")
        if cmd.startswith("setprop ctl.restart"):
            self._restarted = True
            return ""
        return ""

    def root(self):
        pass


def test_reprovision_wipes_creds_and_restarts_hal():
    dev = FakeDevice()
    services = reprovision_widevine(dev)

    # Discovered the widevine HAL init service (and only that one).
    assert services == ["vendor.drm-widevine-hal-1-1"]

    joined = "\n".join(dev.commands)
    # Wiped the cached provisioning stores.
    assert any("rm -rf" in c and "/data/vendor/mediadrm" in c for c in dev.commands)
    assert any("rm -rf" in c and "/data/mediadrm" in c for c in dev.commands)
    # Restarted the discovered HAL service via init.
    assert "setprop ctl.restart vendor.drm-widevine-hal-1-1" in dev.commands
    # Restart happened AFTER the wipe (so the HAL comes up unprovisioned).
    wipe_i = min(i for i, c in enumerate(dev.commands) if "rm -rf" in c)
    restart_i = dev.commands.index("setprop ctl.restart vendor.drm-widevine-hal-1-1")
    assert restart_i > wipe_i


def test_reprovision_no_widevine_service_raises():
    import pytest
    from wvdump.errors import DeviceError

    class NoWv(FakeDevice):
        def shell(self, cmd):
            if cmd == "getprop":
                return "[init.svc.adbd]: [running]\n"
            return super().shell(cmd)

    with pytest.raises(DeviceError):
        reprovision_widevine(NoWv())
