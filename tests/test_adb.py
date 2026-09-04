from wvdump.adb import parse_abi


def test_parse_abi_takes_first_line():
    assert parse_abi("arm64-v8a\n") == "arm64-v8a"
    assert parse_abi("  x86_64 \n") == "x86_64"
