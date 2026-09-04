from wvdump.fridaserver import server_asset_name, release_url


def test_asset_name():
    assert server_asset_name("17.17.0", "arm64-v8a") == "frida-server-17.17.0-android-arm64.xz"


def test_release_url():
    url = release_url("17.17.0", "arm64-v8a")
    assert url == (
        "https://github.com/frida/frida/releases/download/17.17.0/"
        "frida-server-17.17.0-android-arm64.xz"
    )
