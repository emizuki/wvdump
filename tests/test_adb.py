from adbutils.errors import AdbError

from wvdump import adb
from wvdump.adb import parse_abi
from wvdump.errors import DeviceError


def test_parse_abi_takes_first_line():
    assert parse_abi("arm64-v8a\n") == "arm64-v8a"
    assert parse_abi("  x86_64 \n") == "x86_64"


def test_shell_checked_wraps_adb_error():
    class Offline:
        serial = "emulator-5554"
        def shell(self, cmd):
            raise AdbError("device offline")

    try:
        adb.shell_checked(Offline(), "id")
    except DeviceError as exc:
        assert "emulator-5554" in str(exc) and "went offline" in str(exc)
    else:
        raise AssertionError("expected DeviceError")


def test_shell_checked_passes_through_output():
    class Ok:
        serial = "emulator-5554"
        def shell(self, cmd):
            return "uid=0(root)"

    assert adb.shell_checked(Ok(), "id") == "uid=0(root)"
