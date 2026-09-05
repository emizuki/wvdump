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

Sanity-checks the setup and reports the device serial and ABI, whether adb is
root, and whether `frida-server` is running (all read-only — it does not call
`adb root` or start anything):

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

On a **keybox-provisioned** device (the emulator below), the device RSA key
seen during normal playback is wrapped and cannot be imported, so plain
`device` falls back to raw artifacts. To get a **usable `.wvd`**, add
`--reprovision`:

```bash
uv run wvdump device --reprovision --out out
```

This wipes the cached Widevine credentials and restarts the DRM HAL so the
CDM provisions a fresh device certificate; the plaintext device RSA key is
only exposed during that provisioning. **Play protected content while it
runs** (e.g. the media3 demo against the public Widevine UAT test stream) so
the CDM re-provisions and issues a license request. All apps re-provision
automatically afterwards, so the effect is transient but disruptive — hence
it is opt-in. See *Producing a usable `.wvd`* below.

### `capture`

Attaches to a given app and records the license-request template (PSSH +
license-server URL + headers) while you play protected content in that app:

```bash
uv run wvdump capture --package <PKG> --out out/capture.json
```

To identify the *real* license request among all of the app's HTTP traffic,
the agent remembers the challenge that `MediaDrm.getKeyRequest` produces, then
inspects each outgoing OkHttp POST while a challenge is pending, in two tiers:

1. **Body match** — read the POST body (by Java reflection, which works even
   when the app's okhttp/okio method names are R8-minified, with a plain okio
   read as a fallback) and check whether it carries the challenge as raw bytes
   or embedded base64. A hit is definitive.
2. **URL heuristic** — if the body can't be read (a hardened app), a POST to
   an unmistakable license endpoint (URL containing `license`, `drm_type=`,
   `widevine`, …) while a challenge is pending is taken as the license
   request. Unrelated POSTs (GraphQL, analytics) carry none of those markers.

The matched request's URL and headers are recorded authoritatively. If nothing
can be correlated within the timeout, `capture` falls back to the last-seen
URL/headers with a warning (pass the right endpoint to `keys` via
`--pssh`/`--url` instead). Start playback *after* `capture` attaches so the
license request is observed.

This was verified live against a heavily R8-minified commercial player
(okhttp 5 / okio): with a freshly-provisioned playback, `capture` correlated
the real DRM license endpoint plus its PSSH and auth headers, rather than the
app's unrelated API calls.

### `capture --stream` (multi-video)

Record *every* correlated license request in one run, writing each as
`capture-<seq>.json` (plus `capture-list.json`) under `--out-dir`:

```bash
uv run wvdump capture --package <PKG> --stream --out-dir out/<serial>/stream
```

Add `--fetch-keys --wvd out/<serial>/device.wvd` to replay each request
**immediately** on a worker thread (the Frida message pump is never blocked,
so fast playlist switching is not lost) and print `KID:key` per video:

```bash
uv run wvdump capture --package <PKG> --stream --fetch-keys \
  --wvd out/<serial>/device.wvd
```

Replayed headers are sanitized first (httpx-managed headers like `Host`/
`Content-Length` and values that are not valid HTTP field-values are dropped
and logged). If a license response contains no CONTENT keys, the same PSSH is
retried once with the next license POST that carries it.

For apps whose tokens outlive the session, `keys` can batch-replay a saved
stream instead:

```bash
uv run wvdump keys --wvd out/<serial>/device.wvd --captures out/<serial>/stream --out out/<serial>/keys.json
```

### Correlation tiers

The agent pairs each license POST with the PSSH it was asked for and stamps
how it was matched: `body` (POST bytes carry the MediaDrm challenge) >
`length` (Content-Length equals the challenge's raw or base64 size) > `url`
(license-looking URL while a challenge is pending). `capture` (single) only
stops early on `body`/`length` matches; a `url`-only match is reported with a
warning. `frida-server` startup is hardened: `nohup` launch, 30 s poll, a
3 s survival check and one retry, with device transport errors reported as a
clean `DeviceError`.

### `keys`

Replays a license request against the license server using a previously
captured device identity, printing `KID:key` pairs. Supply the request
template either from a `capture.json` or directly on the command line:

```bash
# from a captured template
uv run wvdump keys --wvd out/device.wvd --capture out/capture.json --out out/keys.json

# or supply the PSSH + URL (+ optional headers) directly
uv run wvdump keys --wvd out/device.wvd \
  --pssh <BASE64_PSSH> \
  --url "https://proxy.uat.widevine.com/proxy?provider=widevine_test" \
  --header "Authorization: Bearer <token>"
```

### `auto`

Runs `device` + `capture` + `keys` end-to-end against a single app:

```bash
uv run wvdump auto --package <PKG> --out out
```

### Output layout

The device-scoped commands (`device`, `capture`, `auto`) write under a
per-device subdirectory so multiple devices don't collide:

```
out/<serial>/
  device.wvd
  keybox.json      # only when a keybox is exposed
  capture.json     # {pssh, url, headers}
  keys.json        # [{kid, key, type}]
```

Passing an explicit `--out` to `capture` overrides that path verbatim.
Content keys are also printed as `KID:key` lines.

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
  fire during DRM playback. Plain `device` sees only the wrapped RSA key and
  saves raw artifacts.
- **`device --reprovision`** — works: forcing a fresh provision captures the
  **plaintext** device RSA key and a matching `ClientIdentification`, and
  `wvdump` writes a real `device.wvd` (verified: a 2048-bit key, ~3 KB
  `.wvd`).
- **`keys`** — works: the produced `device.wvd`, replayed against the public
  Widevine UAT test proxy for the wvmedia test stream, returned **8 content
  keys** (`KID:key`). This is the full "identity + keys, on the emulator"
  path.
- **`capture`** — runs; the Java bridge now loads on Frida 17 (verified
  live), so `hookJava` installs the MediaDrm/HTTP hooks rather than no-opping.
  Whether it captures a full template depends on the target app — see
  Limitations below.

## Producing a usable `.wvd`

This emulator provisions Widevine via a **keybox** (system_id 7283, the public
AOSP test keybox), not a baked-in RSA device certificate. During normal
playback the RSA key handed to `LoadDeviceRSAKey` is the device's
**wrapped/encrypted** key, which `RSA.importKey` rejects — so it never yields
a `.wvd` on its own.

The plaintext device RSA key is materialized only briefly, inside an
obfuscated OEMCrypto function, **while a device certificate is being
provisioned**. `wvdump device --reprovision` exploits this: it wipes the
cached credentials, restarts the DRM HAL so the CDM re-provisions, and sniffs
every obfuscated / ordinal OEMCrypto export's arguments for a DER-encoded
RSA-2048 private key (`0x30 0x82 …`). On the tested emulator the key surfaced
as `ncmqbmbc#arg5` during `HandleProvisioningResponse`; combined with the
`ClientIdentification` from `PrepareKeyRequest` it produces a valid `.wvd`
that fetches content keys. This generalizes the reference dumper's
`polorucp` sniff instead of hard-coding one obfuscated symbol name.

Caveats: the exact obfuscated function/argument is **build-specific** — the
sniff scans broadly so it should adapt, but on a very different OEMCrypto
build the plaintext may not surface this way (Google changed OEMCrypto on
Android 11+). It also needs a rooted device (to wipe the credential store and
restart the HAL) and a live playback to drive provisioning.

## Limitations

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
