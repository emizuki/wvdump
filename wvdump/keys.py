"""Capture-and-replay: turn a .wvd + captured template into content keys."""
from __future__ import annotations
from typing import Callable

import logging

from wvdump.errors import LicenseServerError
from wvdump.models import CaptureTemplate, ContentKey

log = logging.getLogger("wvdump")

# Headers httpx sets/manages itself; replaying captured values for them
# breaks the request (wrong Host, stale Content-Length, ...).
_MANAGED_HEADERS = {"host", "content-length", "connection",
                    "accept-encoding", "transfer-encoding"}


def sanitize_headers(headers: dict[str, str]) -> dict[str, str]:
    """Return `headers` minus values httpx manages itself and values that
    are not valid RFC 7230 field-values (e.g. a masked '██' placeholder).
    Each dropped entry is logged so the operator can see what was removed."""
    out: dict[str, str] = {}
    for k, v in (headers or {}).items():
        if k.lower() in _MANAGED_HEADERS:
            log.warning("dropping httpx-managed header %r", k)
            continue
        if any(ord(c) < 0x20 or ord(c) > 0x7e for c in v):
            log.warning("dropping header %r with non-ASCII value", k)
            continue
        out[k] = v
    return out


def _default_cdm_factory(wvd: bytes):
    from pywidevine.cdm import Cdm
    from pywidevine.device import Device
    return Cdm.from_device(Device.loads(wvd))


def _default_http_post(url: str, headers: dict, data: bytes):
    import httpx
    return httpx.post(url, headers=headers, content=data, timeout=30)


def fetch_keys(
    wvd: bytes,
    template: CaptureTemplate,
    *,
    cdm_factory: Callable[[bytes], object] = _default_cdm_factory,
    http_post: Callable[[str, dict, bytes], object] = _default_http_post,
) -> list[ContentKey]:
    cdm = cdm_factory(wvd)
    session_id = cdm.open()
    try:
        from pywidevine.pssh import PSSH
        challenge = cdm.get_license_challenge(session_id, PSSH(template.pssh))
        resp = http_post(template.url, template.headers, challenge)
        if resp.status_code != 200:
            raise LicenseServerError(f"license server {resp.status_code}: {resp.text[:200]}")
        cdm.parse_license(session_id, resp.content)
        keys = []
        for k in cdm.get_keys(session_id):
            # Only content-decryption keys are useful here. Whitelist CONTENT
            # rather than merely excluding SIGNING, so operator/session and
            # key-control entries (OPERATOR_SESSION, KEY_CONTROL, ...) don't
            # leak into the output as if they were content keys.
            if getattr(k, "type", None) != "CONTENT":
                continue
            keys.append(ContentKey(kid=k.kid.hex, key=k.key.hex(), type=k.type))
        return keys
    finally:
        cdm.close(session_id)
