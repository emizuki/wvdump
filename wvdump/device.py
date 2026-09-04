"""Assemble a pywidevine .wvd device file from a captured DeviceIdentity."""
from __future__ import annotations
from pathlib import Path

from google.protobuf.message import DecodeError
from pywidevine.device import Device, DeviceTypes
from pywidevine.license_protocol_pb2 import ClientIdentification, LicenseRequest, SignedMessage

from wvdump.errors import IncompleteIdentity
from wvdump.models import DeviceIdentity


def _has_content(client_id: ClientIdentification) -> bool:
    """A permissive protobuf parse can "succeed" against the wrong message
    type and yield an all-default (empty) ClientIdentification. Only accept
    a candidate that actually carries identity content."""
    return client_id.HasField("type") or bool(client_id.token) or len(client_id.client_info) > 0


def extract_client_id(request: bytes) -> bytes:
    """Recover a serialized ClientIdentification from a raw captured buffer.

    The Frida hook on PrepareKeyRequest captures whatever buffer that native
    call receives, which in practice is the Widevine LICENSE REQUEST (or its
    SignedMessage wrapper), not a bare ClientIdentification -- the
    ClientIdentification is nested inside it. Candidate interpretations,
    most specific first:
      c) `request` is a serialized SignedMessage -- its `.msg` is a
         serialized LicenseRequest; use that LicenseRequest's `.client_id`;
      b) `request` is a serialized LicenseRequest -- use its `.client_id`;
      a) `request` is already a serialized ClientIdentification.

    Tried MOST-specific first, not least: ClientIdentification's and
    SignedMessage's first two field numbers happen to share the same wire
    types (an enum then a length-delimited field), so a SignedMessage- or
    LicenseRequest-shaped buffer can also parse "successfully" -- with no
    DecodeError -- as a bare ClientIdentification with bogus but non-empty
    content (its `token` ends up holding the raw `msg`/`client_id` bytes).
    Trying the deepest interpretation first avoids ever accepting that false
    positive: on genuine SignedMessage/LicenseRequest input the correct,
    content-bearing candidate is found before the falsely-matching direct
    parse is even attempted; on genuine bare-ClientIdentification input, the
    deeper interpretations fail outright (DecodeError) or yield an empty
    inner client_id, so control still reaches the direct parse.

    Each attempt is guarded independently so a DecodeError from one
    candidate doesn't prevent trying the next, and each parsed candidate is
    only accepted if `_has_content` confirms it isn't just an empty message
    that happened to parse without error.
    """

    def parse_signed_message() -> ClientIdentification:
        signed_message = SignedMessage()
        signed_message.ParseFromString(request)
        license_request = LicenseRequest()
        license_request.ParseFromString(signed_message.msg)
        return license_request.client_id

    def parse_license_request() -> ClientIdentification:
        license_request = LicenseRequest()
        license_request.ParseFromString(request)
        return license_request.client_id

    def parse_direct() -> ClientIdentification:
        client_id = ClientIdentification()
        client_id.ParseFromString(request)
        return client_id

    for parser in (parse_signed_message, parse_license_request, parse_direct):
        try:
            client_id = parser()
        except DecodeError:
            continue
        if _has_content(client_id):
            return client_id.SerializeToString()

    raise IncompleteIdentity(
        "could not recover a ClientIdentification from the captured license request"
    )


def normalize_private_key(key: bytes) -> bytes:
    """Return the RSA private key as PEM, accepting either PEM or raw DER.

    The provisioning-time capture yields a DER-encoded RSAPrivateKey, while
    other paths (and pywidevine's own expectations) use PEM. Import via
    pycryptodome -- which auto-detects PEM vs DER -- and re-export as PEM so
    the rest of the pipeline has a single representation. Raises ValueError
    (from RSA.import_key) if `key` is not an importable RSA key, e.g. the
    wrapped/encrypted key handed to LoadDeviceRSAKey.
    """
    from Crypto.PublicKey import RSA
    return RSA.import_key(key).export_key("PEM")


def build_wvd(identity: DeviceIdentity) -> bytes:
    client_id = ClientIdentification()
    client_id.ParseFromString(identity.client_id)
    device = Device(
        type_=DeviceTypes.ANDROID,
        security_level=3,
        flags=None,
        private_key=normalize_private_key(identity.private_key),
        client_id=client_id.SerializeToString(),
    )
    return device.dumps()


def save_wvd(identity: DeviceIdentity, path: str | Path) -> Path:
    path = Path(path)
    path.write_bytes(build_wvd(identity))
    return path
