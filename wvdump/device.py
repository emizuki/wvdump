"""Assemble a pywidevine .wvd device file from a captured DeviceIdentity."""
from __future__ import annotations
from pathlib import Path

from pywidevine.device import Device, DeviceTypes
from pywidevine.license_protocol_pb2 import ClientIdentification

from wvdump.models import DeviceIdentity


def build_wvd(identity: DeviceIdentity) -> bytes:
    client_id = ClientIdentification()
    client_id.ParseFromString(identity.client_id)
    device = Device(
        type_=DeviceTypes.ANDROID,
        security_level=3,
        flags=None,
        private_key=identity.private_key,
        client_id=client_id.SerializeToString(),
    )
    return device.dumps()


def save_wvd(identity: DeviceIdentity, path: str | Path) -> Path:
    path = Path(path)
    path.write_bytes(build_wvd(identity))
    return path
