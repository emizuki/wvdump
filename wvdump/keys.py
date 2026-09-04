"""Capture-and-replay: turn a .wvd + captured template into content keys."""
from __future__ import annotations
from typing import Callable

from wvdump.errors import LicenseServerError
from wvdump.models import CaptureTemplate, ContentKey


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
            if getattr(k, "type", None) == "SIGNING":
                continue
            keys.append(ContentKey(kid=k.kid.hex, key=k.key.hex(), type=k.type))
        return keys
    finally:
        cdm.close(session_id)
