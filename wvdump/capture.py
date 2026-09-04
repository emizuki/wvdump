"""Correlate Java-layer agent messages into one license request template."""
from __future__ import annotations
import json
from pathlib import Path

from wvdump.errors import IncompleteIdentity
from wvdump.models import CaptureTemplate


class CaptureCollector:
    """Accumulate the agent's Java-layer capture messages into one template.

    Two grades of signal are tracked:

    - A **correlated** `license_request`: the OkHttp POST whose body matched a
      MediaDrm challenge, so its URL and headers are definitively the license
      request. This is what `ready` waits for.
    - **Loose** `license_url` / `license_headers`: every OkHttp url()/header()
      the app set, with no proof they belong to the license request. Kept only
      as a best-effort fallback (see `correlated`), since the "last URL seen"
      is frequently an unrelated API call.
    """

    def __init__(self) -> None:
        self._pssh: str | None = None
        self._matched_url: str | None = None
        self._matched_headers: dict[str, str] | None = None
        self._loose_url: str | None = None
        self._loose_headers: dict[str, str] | None = None

    def feed(self, msg: dict) -> None:
        kind = msg.get("kind")
        if kind == "pssh":
            self._pssh = msg["data"]
        elif kind == "license_request":            # correlated: authoritative
            self._matched_url = msg["url"]
            self._matched_headers = dict(msg["headers"])
        elif kind == "license_url":                # loose fallback
            self._loose_url = msg["url"]
        elif kind == "license_headers":            # loose fallback
            if self._loose_headers is None:
                self._loose_headers = {}
            self._loose_headers.update(msg["headers"])

    @property
    def correlated(self) -> bool:
        """True once a license POST was matched to a challenge (reliable)."""
        return self._pssh is not None and self._matched_url is not None and self._matched_headers is not None

    @property
    def ready(self) -> bool:
        """A fully correlated template is available. `run_capture` waits on
        this so it keeps observing until the real license POST is seen."""
        return self.correlated

    @property
    def has_template(self) -> bool:
        """Enough to emit *some* template -- correlated, or the loose
        fallback (pssh + a last-seen URL + some headers)."""
        return self.correlated or (
            self._pssh is not None and self._loose_url is not None and self._loose_headers is not None
        )

    def template(self) -> CaptureTemplate:
        """Prefer the correlated request; fall back to the loose signals."""
        if self.correlated:
            return CaptureTemplate(pssh=self._pssh, url=self._matched_url, headers=self._matched_headers)
        if self._pssh is not None and self._loose_url is not None and self._loose_headers is not None:
            return CaptureTemplate(pssh=self._pssh, url=self._loose_url, headers=self._loose_headers)
        raise IncompleteIdentity("capture incomplete: need a pssh and a license request")


def save_capture(template: CaptureTemplate, path: str | Path) -> Path:
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(template.to_dict(), indent=2))
    return path
