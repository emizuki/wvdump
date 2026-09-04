# wvdump

`wvdump` extracts a Widevine L3 device identity from an Android device or
emulator, and — via capture-and-replay of a real playback session — the
content keys for a piece of DRM-protected media. It works by attaching Frida
to the platform DRM process and hooking the native OEMCrypto entry points
(and, where available, the Java-layer MediaDrm/license-request path).

## Authorized use only

This tool is for security research and testing **on devices you control and
are authorized to test**. It does not bundle any DRM-protected content,
license server credentials, or provisioning material. Do not use it against
devices, services, or content you do not own or have explicit permission to
test.

## Install

```bash
uv sync
uv run wvdump --help
```

Requires Python 3.11+ (managed by `uv`) and a Frida **17.17.0** Python client
(pinned in `pyproject.toml`, installed automatically by `uv sync`).

### Building the Frida agent (optional)

The Frida agent is committed pre-built at `wvdump/agent/agent.js`, so most
users need **no** JavaScript toolchain — `uv sync` is enough. The agent is
built from `wvdump/agent/agent.src.js`, which bundles `frida-java-bridge`
(Frida 17 no longer exposes `Java` as an implicit global, so the bridge must
be compiled in for the Java-layer capture hooks to work). Rebuild it only if
you edit `agent.src.js`:

```bash
npm ci            # installs frida-compile + frida-java-bridge (dev-only)
npm run build:agent
```

This requires Node.js (tested with Node 24) and regenerates
`wvdump/agent/agent.js`. It is a dev-only build step; the Python package does
not depend on Node at runtime.

## Usage

All subcommands accept `--serial <SERIAL>` to select a device when more than
one is attached, and the `device`/`capture` commands accept `--timeout
<SECONDS>` to control how long they wait for hooks to fire.

### `doctor`

Sanity-checks that adb sees the device and reports its serial and ABI:

```bash
uv run wvdump doctor
```

### `device`

Attaches to the DRM process and captures the device identity, writing a
`.wvd` file (or a `keybox.json` fallback) into the output directory:

```bash
uv run wvdump device --out out
```

Trigger some DRM playback on the device while this runs so the native
OEMCrypto hooks fire.

### `capture`

Attaches to a given app and records a PSSH + license-request template (URL,
headers, body) while you play protected content in that app:

```bash
uv run wvdump capture --package <PKG> --out out/capture.json
```

### `keys`

Replays a captured license request against the license server using a
previously captured device identity, printing `KID:key` pairs:

```bash
uv run wvdump keys --wvd out/device.wvd --capture out/capture.json --out out/keys.json
```

### `auto`

Runs `device` + `capture` + `keys` end-to-end against a single app:

```bash
uv run wvdump auto --package <PKG> --out out
```

## Enabling adb root

`frida-server` needs root to run. `wvdump` calls `adb root` for you
(`wvdump.adb.ensure_root`) before doing anything device-side; if the device
refuses (a non-rootable build), it raises a clear `DeviceError` rather than
failing obscurely later. If a matching `frida-server` is already running on
the device, `wvdump` reuses it; otherwise it downloads, pushes, and starts
`frida-server` **17.17.0** for the device's ABI under `/data/local/tmp`.

## Tested environment

- Android Emulator, **API 28 (Android 9), Google APIs, arm64**
- **Frida 17.17.0** — Python client and on-device `frida-server` matched
- Python 3.11+, managed via `uv`

## Tested outcome

On the environment above:

- **`doctor`** — works: reports the device serial and ABI.
- **`device`** — works: the native OEMCrypto hooks
  (`OEMCrypto_GetKeyData`, `OEMCrypto_LoadDeviceRSAKey`, `PrepareKeyRequest`)
  fire during DRM playback, and `wvdump` saves the raw artifacts
  (`license_request.bin`, `device_rsa_key.bin`, `device_token.bin`). On this
  emulator a usable `device.wvd` is **not** produced, and `wvdump` degrades
  gracefully by saving those raw artifacts instead — see Limitations below.
- **`capture`** — runs; the Java bridge now loads on Frida 17 (verified
  live), so `hookJava` installs the MediaDrm/HTTP hooks rather than no-opping.
  Whether it captures a full template depends on the target app — see
  Limitations below.

## Limitations

**`.wvd` on keybox-provisioned devices.** This emulator provisions Widevine
via a **keybox**, not an RSA device certificate. The device token it exposes
is 72 bytes (not a full ≥128-byte keybox), and the RSA key returned by
`LoadDeviceRSAKey` is the device's **wrapped/encrypted** key rather than an
importable PEM/DER key, so `RSA.importKey` rejects it. Producing a usable
`.wvd` therefore requires either a device that provisions a real RSA device
certificate (typically a physical phone) or additional agent hooks — e.g.
assembling a full keybox from `device_id` + `device_key` + `device_token`, or
extracting the plaintext RSA key. On a keybox-only device, `wvdump` saves the
raw captured artifacts instead of a `.wvd`.

**`capture` and Frida 17's Java bridge.** Frida 17 no longer exposes the
`Java` bridge in a plain agent script's global scope. This is handled by
compiling the agent from `agent.src.js` with `frida-java-bridge` bundled in
(see *Building the Frida agent* above); the committed `agent.js` already
contains it, so `hookJava` installs the PSSH / license-URL / header hooks
normally. Verified live on the tested emulator: the compiled agent loads on
Frida 17 with no RPC exception and `Java.available` is true inside app
processes. The agent hooks three HTTP paths — OkHttp (`Request$Builder`),
`java.net.HttpURLConnection`, and media3/ExoPlayer's `HttpMediaDrmCallback` —
so it covers players that POST the license request through any of them.

Whether `capture` then yields a full replayable template still depends on the
target app: it must actually drive a license exchange through one of those
paths while attached, and offline `keys` replay additionally needs a usable
`.wvd`, which is subject to the keybox limitation above.

## Credits

This is a clean rewrite of an older L3 keybox dumper; thanks to the author of
the original script for the approach this project builds on.
