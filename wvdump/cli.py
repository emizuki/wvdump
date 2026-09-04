"""Command-line entry point for wvdump."""
import argparse
import sys

from wvdump import __version__


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="wvdump")
    parser.add_argument("--version", action="version", version=__version__)
    parser.set_defaults(func=None)
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    if args.func is None:
        parser.print_help()
        return 0
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
