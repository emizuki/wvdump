import subprocess, sys

def test_version_runs():
    out = subprocess.run(
        [sys.executable, "-m", "wvdump", "--version"],
        capture_output=True, text=True,
    )
    assert out.returncode == 0
    assert out.stdout.strip()  # prints some version string
