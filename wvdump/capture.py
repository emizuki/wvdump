"""Correlate Java-layer agent messages into one license request template."""
from __future__ import annotations
import json
from pathlib import Path

from wvdump.errors import IncompleteIdentity
from wvdump.models import CaptureTemplate


class CaptureCollector:
    """Accumulate pssh / license_url / license_headers messages."""

    def __init__(self) -> None:
        self._pssh: str | None = None
        self._url: str | None = None
        self._headers: dict[str, str] | None = None

    def feed(self, msg: dict) -> None:
        kind = msg.get("kind")
        if kind == "pssh":
            self._pssh = msg["data"]
        elif kind == "license_url":
            self._url = msg["url"]
        elif kind == "license_headers":
            if self._headers is None:
                self._headers = {}
            self._headers.update(msg["headers"])

    @property
    def ready(self) -> bool:
        return None not in (self._pssh, self._url, self._headers)

    def template(self) -> CaptureTemplate:
        if not self.ready:
            raise IncompleteIdentity("capture incomplete: need pssh, url, and headers")
        return CaptureTemplate(pssh=self._pssh, url=self._url, headers=self._headers)


def save_capture(template: CaptureTemplate, path: str | Path) -> Path:
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(template.to_dict(), indent=2))
    return path
