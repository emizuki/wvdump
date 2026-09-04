"""Command-line entry point for wvdump."""
import argparse
import os
import re
import sys

from wvdump import __version__


def _device_out_dir(base: str, serial: str) -> str:
    """Per-device output directory `<base>/<serial>` (spec output layout).
    The serial is sanitized so network serials like '192.168.0.5:5555' are
    still valid path segments."""
    safe = re.sub(r"[^A-Za-z0-9._-]", "_", serial)
    return os.path.join(base, safe)


def _parse_headers(pairs: list[str]) -> dict[str, str]:
    """Parse repeated `--header "Key: Value"` options into a dict."""
    headers = {}
    for p in pairs:
        if ":" not in p:
            raise SystemExit(f"wvdump keys: --header must be 'Key: Value', got {p!r}")
        k, v = p.split(":", 1)
        headers[k.strip()] = v.strip()
    return headers


def _cmd_keys(args) -> int:
    from wvdump.pipeline import run_keys, run_keys_from_template
    from wvdump.models import CaptureTemplate
    if args.capture:
        keys = run_keys(args.wvd, args.capture, args.out)
    elif args.pssh and args.url:
        template = CaptureTemplate(pssh=args.pssh, url=args.url,
                                   headers=_parse_headers(args.header or []))
        keys = run_keys_from_template(args.wvd, template, args.out)
    else:
        print("wvdump keys: provide --capture, or both --pssh and --url", file=sys.stderr)
        return 2
    for k in keys:
        print(f"{k.kid}:{k.key}")
    return 0


def _cmd_doctor(args) -> int:
    from wvdump.adb import pick_device, device_abi
    dev = pick_device(args.serial)
    print(f"device: {dev.serial} abi={device_abi(dev)}")
    # Read-only checks -- doctor never mutates device state (no adb root here).
    is_root = "uid=0" in dev.shell("id")
    print("root: " + ("yes" if is_root
                       else "no (device/capture will attempt 'adb root')"))
    running = "frida-server" in dev.shell("ps -A")
    print("frida-server: " + ("running" if running
                              else "not running (pushed/started on demand)"))
    return 0


def _cmd_device(args) -> int:
    from wvdump.adb import pick_device
    from wvdump.fridaserver import ensure_frida_server
    from wvdump.pipeline import run_device
    dev = pick_device(args.serial)
    ensure_frida_server(dev)
    # Provisioning needs a network round-trip plus playback, so give the
    # reprovision flow a longer default window unless the operator set one.
    timeout = args.timeout
    if timeout is None:
        timeout = 45.0 if args.reprovision else 10.0
    # run_device logs its own outcome (wrote device.wvd, or a fallback
    # message with the raw artifacts it saved instead); it never raises for
    # an incomplete/unusable capture.
    run_device(dev, _device_out_dir(args.out, dev.serial),
               timeout=timeout, reprovision=args.reprovision)
    return 0


def _cmd_capture(args) -> int:
    from wvdump.adb import pick_device
    from wvdump.fridaserver import ensure_frida_server
    from wvdump.pipeline import run_capture
    dev = pick_device(args.serial)
    ensure_frida_server(dev)
    # Default the capture under the per-device output dir; an explicit --out
    # is honored verbatim.
    out = args.out or os.path.join(_device_out_dir("out", dev.serial), "capture.json")
    result = run_capture(dev, args.package, out, timeout=args.timeout)
    # run_capture returns None (and writes nothing) when the capture never
    # completed -- e.g. the Frida Java bridge is unavailable -- and already
    # logs an actionable message in that case, so only claim success here
    # when a file was actually written.
    if result is not None:
        print(f"wrote {out}")
    return 0


def _cmd_auto(args) -> int:
    from wvdump.adb import pick_device
    from wvdump.fridaserver import ensure_frida_server
    from wvdump.pipeline import run_auto
    dev = pick_device(args.serial)
    ensure_frida_server(dev)
    for k in run_auto(dev, args.package, _device_out_dir(args.out, dev.serial)):
        print(f"{k.kid}:{k.key}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="wvdump")
    parser.add_argument("--version", action="version", version=__version__)
    sub = parser.add_subparsers(dest="command")

    doctor = sub.add_parser("doctor", help="check adb/device/root/frida-server")
    doctor.add_argument("--serial")
    doctor.set_defaults(func=_cmd_doctor)

    device = sub.add_parser("device", help="capture device identity (.wvd, or keybox.json as fallback)")
    device.add_argument("--serial")
    device.add_argument("--out", default="out", help="output directory")
    device.add_argument("--timeout", type=float, default=None,
                        help="seconds to wait for identity hooks to fire "
                             "(default 10, or 45 with --reprovision)")
    device.add_argument("--reprovision", action="store_true",
                        help="force a fresh Widevine provision to capture the plaintext "
                             "device RSA key needed for a usable .wvd. Wipes cached "
                             "Widevine credentials and restarts the DRM HAL (all apps "
                             "re-provision automatically). Play protected content while "
                             "this runs.")
    device.set_defaults(func=_cmd_device)

    capture = sub.add_parser("capture", help="capture a pssh + license-request template from an app")
    capture.add_argument("--package", required=True, help="target app package/process name")
    capture.add_argument("--serial")
    capture.add_argument("--out", default=None,
                         help="output capture template path (default: out/<serial>/capture.json)")
    capture.add_argument("--timeout", type=float, default=15.0, help="seconds to wait for a complete capture")
    capture.set_defaults(func=_cmd_capture)

    keys = sub.add_parser("keys", help="fetch content keys from a .wvd + a captured or supplied template")
    keys.add_argument("--wvd", required=True)
    keys.add_argument("--capture", help="captured template JSON (alternative to --pssh/--url)")
    keys.add_argument("--pssh", help="base64 PSSH box (use with --url instead of --capture)")
    keys.add_argument("--url", help="license server URL (use with --pssh)")
    keys.add_argument("--header", action="append", metavar="K:V",
                      help="license-request header, e.g. --header 'Authorization: Bearer x' (repeatable)")
    keys.add_argument("--out", default="out/keys.json")
    keys.set_defaults(func=_cmd_keys)

    auto = sub.add_parser("auto", help="run device + capture + keys end-to-end")
    auto.add_argument("--package", required=True, help="target app package/process name")
    auto.add_argument("--serial")
    auto.add_argument("--out", default="out", help="output directory")
    auto.set_defaults(func=_cmd_auto)

    parser.set_defaults(func=None)
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    if getattr(args, "func", None) is None:
        parser.print_help()
        return 0
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
