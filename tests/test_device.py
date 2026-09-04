# tests/test_device.py
from Crypto.PublicKey import RSA
from pywidevine.device import Device
from pywidevine.license_protocol_pb2 import ClientIdentification

from wvdump.device import build_wvd
from wvdump.models import DeviceIdentity


def _identity() -> DeviceIdentity:
    # pywidevine depends on pycryptodome (Crypto.PublicKey.RSA), not the
    # separate `cryptography` package, which isn't installed in this project.
    key = RSA.generate(2048)
    pem = key.export_key("PEM")
    cid = ClientIdentification()
    cid.type = ClientIdentification.TokenType.DRM_DEVICE_CERTIFICATE
    return DeviceIdentity(client_id=cid.SerializeToString(), private_key=pem, system_id=7283)


def test_build_wvd_roundtrips_through_pywidevine():
    wvd = build_wvd(_identity())
    dev = Device.loads(wvd)          # must not raise
    assert dev.private_key is not None
    assert dev.client_id is not None
