# tests/test_device.py
import pytest
from Crypto.PublicKey import RSA
from pywidevine.device import Device
from pywidevine.license_protocol_pb2 import ClientIdentification, LicenseRequest, SignedMessage

from wvdump.device import build_wvd, extract_client_id
from wvdump.errors import IncompleteIdentity
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


def _client_id() -> ClientIdentification:
    cid = ClientIdentification()
    cid.type = ClientIdentification.TokenType.DRM_DEVICE_CERTIFICATE
    cid.token = b"a-provisioning-token"
    return cid


def test_extract_client_id_from_bare_client_identification():
    cid = _client_id()
    out = extract_client_id(cid.SerializeToString())
    recovered = ClientIdentification()
    recovered.ParseFromString(out)
    assert recovered == cid


def test_extract_client_id_from_license_request():
    cid = _client_id()
    lr = LicenseRequest()
    lr.client_id.CopyFrom(cid)
    out = extract_client_id(lr.SerializeToString())
    recovered = ClientIdentification()
    recovered.ParseFromString(out)
    assert recovered == cid


def test_extract_client_id_from_signed_message():
    cid = _client_id()
    lr = LicenseRequest()
    lr.client_id.CopyFrom(cid)
    sm = SignedMessage()
    sm.type = SignedMessage.MessageType.LICENSE_REQUEST
    sm.msg = lr.SerializeToString()
    out = extract_client_id(sm.SerializeToString())
    recovered = ClientIdentification()
    recovered.ParseFromString(out)
    assert recovered == cid


def test_extract_client_id_raises_on_garbage():
    with pytest.raises(IncompleteIdentity):
        extract_client_id(b"\x00\x01\x02not a protobuf message at all")
