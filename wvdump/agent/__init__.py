"""Expose the Frida agent source (a plain JS script, no build step) for the CLI."""
from __future__ import annotations
from pathlib import Path

AGENT_SOURCE = (Path(__file__).parent / "agent.js").read_text(encoding="utf-8")
