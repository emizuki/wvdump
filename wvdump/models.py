"""Typed data passed between wvdump modules."""
from __future__ import annotations

from dataclasses import dataclass


@dataclass
class DeviceIdentity:
    client_id: bytes            # serialized ClientIdentification protobuf
    private_key: bytes          # PEM-encoded RSA private key
    system_id: int | None = None


@dataclass
class Keybox:
    raw: bytes
    device_id: bytes
    device_key: bytes
    device_token: bytes
    system_id: int
    level: str
    crc32: int

    def to_dict(self) -> dict:
        from base64 import b64encode
        return {
            "device_id": b64encode(self.device_id).decode(),
            "device_key": b64encode(self.device_key).decode(),
            "device_token": b64encode(self.device_token).decode(),
            "system_id": self.system_id,
            "level": self.level,
            "crc32": self.crc32,
            "keybox": b64encode(self.raw).decode(),
        }


@dataclass
class CaptureTemplate:
    pssh: str                   # base64 PSSH box
    url: str                    # license server URL
    headers: dict[str, str]

    def to_dict(self) -> dict:
        return {"pssh": self.pssh, "url": self.url, "headers": self.headers}

    @classmethod
    def from_dict(cls, d: dict) -> "CaptureTemplate":
        return cls(pssh=d["pssh"], url=d["url"], headers=dict(d["headers"]))


@dataclass
class ContentKey:
    kid: str                    # hex
    key: str                    # hex
    type: str

    def __str__(self) -> str:
        return f"{self.kid}:{self.key}"
