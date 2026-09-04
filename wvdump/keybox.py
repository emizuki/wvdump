"""Parse a raw Widevine keybox into a structured Keybox.

Layout (128-byte core + optional 4-byte level tag):
  [0:32]    device_id
  [32:48]   device_key (AES-128)
  [48:120]  device_token (encrypted provisioning blob)
    [52:56]   system_id (big-endian u32, inside the token)
  [120:124] "kbox" magic tag
  [124:128] CRC32-MPEG over bytes [0:124]
  [128:132] level tag, e.g. "LVL3" (optional)
"""
from __future__ import annotations
import struct
from wvdump.models import Keybox

_CRC_POLY = 0x04C11DB7


def crc32_mpeg(data: bytes) -> int:
    crc = 0xFFFFFFFF
    for byte in data:
        crc ^= byte << 24
        for _ in range(8):
            crc = ((crc << 1) ^ _CRC_POLY) & 0xFFFFFFFF if crc & 0x80000000 else (crc << 1) & 0xFFFFFFFF
    return crc


def parse_keybox(raw: bytes) -> Keybox:
    if len(raw) < 128:
        raise ValueError(f"keybox too short: {len(raw)} bytes")
    device_id = raw[0:32]
    device_key = raw[32:48]
    device_token = raw[48:120]
    system_id = struct.unpack(">I", raw[52:56])[0]
    crc32 = struct.unpack(">I", raw[124:128])[0]
    level = raw[128:132].decode("ascii", "replace") if len(raw) >= 132 else ""
    return Keybox(
        raw=raw,
        device_id=device_id,
        device_key=device_key,
        device_token=device_token,
        system_id=system_id,
        level=level,
        crc32=crc32,
    )
