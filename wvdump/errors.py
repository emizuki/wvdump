"""Exception hierarchy for wvdump."""


class WvdumpError(Exception):
    """Base class for all wvdump errors."""


class DeviceError(WvdumpError):
    """adb/device problems: none found, multiple, or not rooted."""


class FridaError(WvdumpError):
    """frida-server push/run or client/server version mismatch."""


class NoWidevineProcess(WvdumpError):
    """No Widevine/DRM process was found to hook."""


class IncompleteIdentity(WvdumpError):
    """Device identity lacked a client_id or RSA private key (e.g. keybox-only)."""


class LicenseServerError(WvdumpError):
    """License server returned a non-200 or unparseable response."""
