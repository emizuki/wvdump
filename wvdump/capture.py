"""Correlate Java-layer agent messages into one license request template."""
from __future__ import annotations
import json
import threading
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
        best = min(enumerate(self._candidates),
                   key=lambda p: (p[1][0], -p[1][4], -p[0]))
        return next(name for name, rank in TIER_ORDER.items()
                    if rank == best[1][0])

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
            best = min(enumerate(self._candidates),
                       key=lambda p: (p[1][0], -p[1][4], -p[0]))
            _, pssh, url, headers, ts = best[1]
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


class StreamCollector:
    """Collect every correlated (pssh, url, headers) pair until the timeout.

    Each new pair is saved immediately as `capture-<seq>.json` (crash-safe)
    and handed to `on_pair` (the `--fetch-keys` replay worker). Dedupe rules:
    - skip a URL already seen (a retried POST);
    - skip a pssh that already produced keys;
    - replay a pssh at most twice: when the first replay returned no keys,
      the next POST carrying the same pssh gets one more attempt.
    """

    def __init__(self, out_dir: str) -> None:
        self._out_dir = Path(out_dir)
        self._out_dir.mkdir(parents=True, exist_ok=True)
        self._seq = 0
        self._seen_urls: set[str] = set()
        self._attempts: dict[str, int] = {}
        self._ok_psshs: set[str] = set()
        self._templates: list[str] = []
        self._lock = threading.Lock()

    @property
    def out_dir(self) -> Path:
        return self._out_dir

    def feed(self, msg: dict, on_pair=None) -> None:
        if msg.get("kind") != "license_request":
            return
        pssh = msg.get("pssh")
        url = msg["url"]
        if pssh is None or url is None:
            return
        with self._lock:
            if url in self._seen_urls:
                return
            if pssh in self._ok_psshs:
                return
            if self._attempts.get(pssh, 0) >= 2:
                return
            self._seen_urls.add(url)
            self._attempts[pssh] = self._attempts.get(pssh, 0) + 1
            self._seq += 1
            path = self._out_dir / f"capture-{self._seq:04d}.json"
            template = CaptureTemplate(pssh=pssh, url=url, headers=dict(msg["headers"]))
            save_capture(template, str(path))
            self._templates.append(str(path))
            self._write_list()
        if on_pair is not None:
            on_pair(template)

    def mark_keys(self, pssh: str, ok: bool) -> None:
        with self._lock:
            if ok:
                self._ok_psshs.add(pssh)

    def _write_list(self) -> None:
        (self._out_dir / "capture-list.json").write_text(
            json.dumps(self._templates, indent=2)
        )
