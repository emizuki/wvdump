"""Correlate Java-layer agent messages into one license request template."""
from __future__ import annotations
import json
import time
from pathlib import Path

from wvdump.errors import IncompleteIdentity
from wvdump.models import CaptureTemplate


TIER_ORDER = {"body": 0, "length": 1, "url": 2}


class CaptureCollector:
    """Accumulate the agent's Java-layer capture messages into one template.

    Candidates from `license_request` messages are kept and ranked by the
    agent's confidence tier (body > length > url); within a tier the most
    recent wins. The url tier is only a fallback: it never satisfies `ready`
    on its own, so `run_capture` keeps observing until a stronger candidate
    arrives or the timeout elapses. The loose `license_url`/`license_headers`
    signals remain as a last resort for apps where nothing correlates.
    """

    def __init__(self) -> None:
        self._pssh: str | None = None
        self._candidates: list[tuple[int, str, str, dict[str, str], float]] = []
        self._loose_url: str | None = None
        self._loose_headers: dict[str, str] | None = None

    def feed(self, msg: dict) -> None:
        kind = msg.get("kind")
        if kind == "pssh":
            self._pssh = msg["data"]
        elif kind == "license_request":
            tier = msg.get("via", "url")
            if tier not in TIER_ORDER:
                tier = "url"
            pssh = msg.get("pssh") or self._pssh
            if pssh is None:
                return
            self._candidates.append(
                (TIER_ORDER[tier], pssh, msg["url"],
                 dict(msg["headers"]), time.time())
            )
        elif kind == "license_url":
            self._loose_url = msg["url"]
        elif kind == "license_headers":
            if self._loose_headers is None:
                self._loose_headers = {}
            self._loose_headers.update(msg["headers"])

    @property
    def best_tier(self) -> str | None:
        if not self._candidates:
            return None
        best = min(self._candidates, key=lambda c: (c[0], -c[4]))
        return next(name for name, rank in TIER_ORDER.items() if rank == best[0])

    @property
    def correlated(self) -> bool:
        return bool(self._candidates)

    @property
    def ready(self) -> bool:
        return any(rank < TIER_ORDER["url"] for rank, *_ in self._candidates)

    @property
    def has_template(self) -> bool:
        return self.correlated or (
            self._pssh is not None
            and self._loose_url is not None
            and self._loose_headers is not None
        )

    def template(self) -> CaptureTemplate:
        if self._candidates:
            _, pssh, url, headers, ts = min(
                self._candidates, key=lambda c: (c[0], -c[4])
            )
            return CaptureTemplate(pssh=pssh, url=url, headers=headers)
        if (self._pssh is not None and self._loose_url is not None
                and self._loose_headers is not None):
            return CaptureTemplate(
                pssh=self._pssh, url=self._loose_url,
                headers=self._loose_headers,
            )
        raise IncompleteIdentity("capture incomplete: need a pssh and a license request")


def save_capture(template: CaptureTemplate, path: str | Path) -> Path:
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(template.to_dict(), indent=2))
    return path
