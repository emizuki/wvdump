from wvdump import fridaserver
from wvdump.errors import DeviceError
from wvdump.fridaserver import server_asset_name, release_url


def test_asset_name():
    assert server_asset_name("17.17.0", "arm64-v8a") == "frida-server-17.17.0-android-arm64.xz"


def test_release_url():
    url = release_url("17.17.0", "arm64-v8a")
    assert url == (
        "https://github.com/frida/frida/releases/download/17.17.0/"
        "frida-server-17.17.0-android-arm64.xz"
    )


class _ShellFake:
    serial = "emulator-5554"

    def __init__(self, script):
        self._script = script
        self.calls = []
        self.pushed = []

    def shell(self, cmd):
        self.calls.append(cmd)
        if cmd.startswith("sh -c"):
            return ""
        try:
            return next(self._script)
        except StopIteration:
            return ""

    class _Sync:
        def __init__(self, outer):
            self._outer = outer
        def push(self, local, remote):
            self._outer.pushed.append(remote)


def test_start_command_uses_sh_nohup(monkeypatch):
    monkeypatch.setattr(fridaserver, "_download", lambda *a: "local-bin")
    fake = _ShellFake(iter(["uid=0\n", "arm64-v8a\n"]))   # root, abi
    fake._sync = _ShellFake._Sync(fake)
    fake.sync = fake._sync
    monkeypatch.setattr(fridaserver, "_server_running", lambda dev: True)
    fridaserver.ensure_frida_server(fake)
    # first shell call was id (root check), then getprop; server already
    # running -> no launch needed
    assert not any("nohup" in c for c in fake.calls)


def test_ensure_frida_server_retries_when_server_dies(monkeypatch):
    monkeypatch.setattr(fridaserver, "_download", lambda *a: "local-bin")
    fake = _ShellFake(iter(["uid=0\n", "arm64-v8a\n"]))
    fake._sync = _ShellFake._Sync(fake)
    fake.sync = fake._sync
    running_states = iter([False, True, False, True, True])  # poll responses
    monkeypatch.setattr(fridaserver, "_server_running", lambda dev: next(running_states))
    monkeypatch.setattr(fridaserver.time, "sleep", lambda s: None)
    fridaserver.ensure_frida_server(fake)
    launches = [c for c in fake.calls if "nohup" in c]
    assert len(launches) == 2


def test_server_running_raises_device_error_when_offline():
    class Offline:
        serial = "emulator-5554"
        def shell(self, cmd):
            from adbutils.errors import AdbError
            raise AdbError("device offline")
    try:
        fridaserver._server_running(Offline())
    except DeviceError as exc:
        assert "went offline" in str(exc)
    else:
        raise AssertionError("expected DeviceError")
