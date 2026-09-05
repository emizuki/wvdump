// wvdump Frida agent SOURCE (compiled to agent.js via `npm run build:agent`).
//
// This module is bundled by frida-compile into the single loadable script
// `agent.js`, which the Python controller loads verbatim via
// `session.create_script(source)`. Do NOT edit agent.js by hand -- edit this
// file and rebuild. The build inlines `frida-java-bridge`, which Frida 17
// no longer exposes as an implicit `Java` global; that is the whole reason a
// build step exists.
//
// It exports two entry points the controller invokes selectively per process:
//   rpc.exports.hookNative()  -- attach OEMCrypto native interceptors
//   rpc.exports.hookJava()    -- attach android.media.MediaDrm / HTTP hooks
//
// Native interceptor logic is ported from the verified reference script at
// dumper/Helpers/script.js (checked against a real Android emulator's
// Widevine L3 HAL). Only the identity-producing hooks are kept:
//   OEMCrypto_GetKeyData          -> emit("keybox", ...)
//   OEMCrypto_LoadDeviceRSAKey     -> emit("device_rsa_key", ...)
//   OEMCrypto_RewrapDeviceRSAKey   -> emit("device_rsa_key", ...)
//   OEMCrypto_LoadKeys             -> emit("log", ...)          (context only)
//   PrepareKeyRequest              -> emit("device_client_id", ...)
import Java from "frida-java-bridge";
import { ChallengeQueue } from "./correlate.mjs";

// --- Frida 17 compatibility shim -------------------------------------------
// Frida 17+ removed the legacy Memory.read* helpers in favour of the
// NativePointer instance methods. Restore them so the rest of this script
// keeps working on both old and new Frida runtimes. Copied verbatim from the
// verified reference (dumper/Helpers/script.js).
if (typeof Memory.readByteArray === 'undefined') {
    Memory.readByteArray = function (p, n) { return ptr(p).readByteArray(n); };
    Memory.readPointer = function (p) { return ptr(p).readPointer(); };
    Memory.readUtf8String = function (p) { return ptr(p).readUtf8String(); };
    Memory.readUInt = function (p) { return ptr(p).readUInt(); };
}

// --- Helpers -----------------------------------------------------------

// Plain-JS base64 encoder (no btoa/atob dependency -- Frida's QuickJS
// runtime does not provide the browser Web APIs). Accepts an ArrayBuffer
// (as returned by Memory.readByteArray) or a Uint8Array.
function bytesToBase64(buffer) {
    if (buffer === null || buffer === undefined) return null;
    var bytes = new Uint8Array(buffer);
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var result = '';
    var i = 0;
    for (; i + 3 <= bytes.length; i += 3) {
        result += chars[bytes[i] >> 2];
        result += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        result += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        result += chars[bytes[i + 2] & 63];
    }
    var remaining = bytes.length - i;
    if (remaining === 1) {
        result += chars[bytes[i] >> 2];
        result += chars[(bytes[i] & 3) << 4];
        result += '==';
    } else if (remaining === 2) {
        result += chars[bytes[i] >> 2];
        result += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        result += chars[(bytes[i + 1] & 15) << 2];
        result += '=';
    }
    return result;
}

// Typed envelope: every agent -> Python message carries a `kind`.
function emit(kind, fields) { send(Object.assign({ kind: kind }, fields || {})); }

// Ported verbatim from the reference: reads a libc++ std::string in-place
// (small-string-optimization-agnostic layout: [ptr/cap][size][data-or-ptr]).
// Used by PrepareKeyRequest to pull out the captured license request bytes.
function readStdString(str) {
    var size = str.add(Process.pointerSize).readUInt();
    return str.add(Process.pointerSize * 2).readPointer().readByteArray(size);
}

// --- Native hooks --------------------------------------------------------

function hookGetKeyData(address, lib) {
    Interceptor.attach(ptr(address), {
        onEnter: function (args) {
            this.keyData = args[0];
            this.keyDataLength = args[1];
        },
        onLeave: function (retvalue) {
            try {
                if (retvalue.toInt32() !== 0) return; // only capture on OEMCrypto_SUCCESS
                var length = Memory.readPointer(this.keyDataLength).toInt32();
                var bytes = Memory.readByteArray(this.keyData, length);
                emit("keybox", { data: bytesToBase64(bytes) });
                emit("log", { message: lib + ": OEMCrypto_GetKeyData size=" + length });
            } catch (e) {
                emit("log", { message: lib + ": OEMCrypto_GetKeyData read failed: " + e });
            }
        }
    });
}

function hookLoadDeviceRSAKey(address, lib) {
    Interceptor.attach(ptr(address), {
        onEnter: function (args) {
            this.session = args[0];
            this.wrappedKey = args[1];
            this.wrappedKeyLength = args[2];
        },
        onLeave: function (retvalue) {
            try {
                if (retvalue.toInt32() !== 0) return; // only capture on OEMCrypto_SUCCESS
                var length = this.wrappedKeyLength.toInt32();
                var bytes = Memory.readByteArray(this.wrappedKey, length);
                emit("device_rsa_key", { data: bytesToBase64(bytes) });
                emit("log", { message: lib + ": OEMCrypto_LoadDeviceRSAKey size=" + length });
            } catch (e) {
                emit("log", { message: lib + ": OEMCrypto_LoadDeviceRSAKey read failed: " + e });
            }
        }
    });
}

function hookRewrapDeviceRSAKey(address, lib) {
    Interceptor.attach(ptr(address), {
        onEnter: function (args) {
            // Signature (verified): session, message, message_length, signature,
            // signature_length, nonce, enc_rsa_key, enc_rsa_key_length,
            // enc_rsa_key_iv, wrapped_rsa_key (out), wrapped_rsa_key_length (out, by ptr).
            this.wrappedKeyOut = args[9];
            this.wrappedKeyOutLength = args[10];
        },
        onLeave: function (retvalue) {
            try {
                if (retvalue.toInt32() !== 0) return; // only capture on OEMCrypto_SUCCESS
                var length = Memory.readPointer(this.wrappedKeyOutLength).toInt32();
                var bytes = Memory.readByteArray(this.wrappedKeyOut, length);
                emit("device_rsa_key", { data: bytesToBase64(bytes) });
                emit("log", { message: lib + ": OEMCrypto_RewrapDeviceRSAKey size=" + length });
            } catch (e) {
                emit("log", { message: lib + ": OEMCrypto_RewrapDeviceRSAKey read failed: " + e });
            }
        }
    });
}

function hookLoadKeys(address, lib) {
    // Context-only: confirms a license was loaded into OEMCrypto. No typed
    // identity kind maps to this call; emit a log line for visibility.
    Interceptor.attach(ptr(address), {
        onLeave: function (retvalue) {
            try {
                emit("log", { message: lib + ": OEMCrypto_LoadKeys status=" + retvalue.toInt32() });
            } catch (e) {
                emit("log", { message: lib + ": OEMCrypto_LoadKeys log failed: " + e });
            }
        }
    });
}

function hookPrepareKeyRequest(address, lib) {
    Interceptor.attach(ptr(address), {
        onEnter: function (args) {
            this.ret = args[4];
        },
        onLeave: function () {
            try {
                if (!this.ret) return;
                var bytes = readStdString(this.ret);
                emit("device_client_id", { data: bytesToBase64(bytes) });
                emit("log", { message: lib + ": PrepareKeyRequest captured license request" });
            } catch (e) {
                emit("log", { message: lib + ": PrepareKeyRequest read failed: " + e });
            }
        }
    });
}

// Match an exported symbol name against the hooks above. The reference
// script matched only the obfuscated ordinal-style names it observed on the
// verified emulator build (e.g. '_lcc04'/'_oecc04'); those exact matches are
// kept first. Substring matches against the real OEMCrypto C symbol names
// are added as a fallback so this generalizes to non-obfuscated builds --
// this is an extension beyond the literal reference, added conservatively
// and guarded by try/catch like everything else here.
function attachExport(exp, lib) {
    var name = exp.name;
    var address = exp.address;
    try {
        if (name === '_lcc04' || name === '_oecc04' || name.indexOf('GetKeyData') !== -1) {
            hookGetKeyData(address, lib);
        } else if (name === '_lcc18' || name === '_oecc18' || name.indexOf('RewrapDeviceRSAKey') !== -1) {
            hookRewrapDeviceRSAKey(address, lib);
        } else if (name === '_lcc19' || name === '_oecc19' || name.indexOf('LoadDeviceRSAKey') !== -1) {
            hookLoadDeviceRSAKey(address, lib);
        } else if (name === 'OEMCrypto_LoadKeys_Back_Compat' || name.indexOf('LoadKeys') !== -1) {
            hookLoadKeys(address, lib);
        } else if (name.indexOf('PrepareKeyRequest') !== -1) {
            hookPrepareKeyRequest(address, lib);
        }
    } catch (e) {
        emit("log", { message: "attach failed for " + name + " in " + lib + ": " + e });
    }
}

function hookNative() {
    ["libwvhidl.so", "libwvdrmengine.so", "liboemcrypto.so", "libmediadrm.so"].forEach(function (lib) {
        var mod;
        try {
            mod = Process.getModuleByName(lib);
        } catch (e) {
            return; // library not loaded in this process -- no-op
        }
        try {
            emit("log", { message: "hooking " + lib + " @ " + mod.base });
        } catch (e) { /* ignore */ }
        try {
            mod.enumerateExports().forEach(function (exp) {
                attachExport(exp, lib);
            });
        } catch (e) {
            emit("log", { message: "enumerateExports failed for " + lib + ": " + e });
        }
    });
}

// --- Provisioning-time plaintext RSA key capture ---------------------------
//
// On this software-L3 build the device RSA key handed to LoadDeviceRSAKey is
// wrapped/encrypted and never passes through a public BoringSSL RSA call
// during steady-state signing, so it cannot be imported. The *plaintext* DER
// key is only materialized briefly, inside an obfuscated OEMCrypto function,
// while a device certificate is being provisioned. This generalizes the
// reference dumper's `polorucp` sniff (dumper/Helpers/script.js): instead of
// matching one hard-coded obfuscated symbol name, hook every obfuscated-style
// export (short lowercase names) plus the ordinal `_oeccNN` set, and on entry
// scan their pointer arguments for a DER-encoded RSA private key
// (SEQUENCE, 0x30 0x82, of RSA-2048-ish length). Verified live: the key
// surfaces as `<fn>#arg5` during HandleProvisioningResponse.
//
// This must be installed BEFORE a fresh provision runs (the controller wipes
// the cached credentials and restarts the HAL first). It is separate from
// hookNative because sniffing every function's args is only worthwhile during
// that one provisioning event.
function scanForDerKey(p, where, seen) {
    if (p.isNull()) return;
    var head;
    try { head = new Uint8Array(p.readByteArray(4)); } catch (e) { return; }
    // DER SEQUENCE with a 2-byte long-form length (0x30 0x82 hi lo).
    if (head[0] !== 0x30 || head[1] !== 0x82) return;
    var length = (head[2] << 8 | head[3]) + 4; // whole structure incl. header
    if (length < 600 || length > 4000) return;   // RSA-2048 private key ~1.2 KB
    var key = p.toString() + ':' + length;
    if (seen[key]) return; // one emit per distinct buffer
    seen[key] = true;
    var bytes;
    try { bytes = p.readByteArray(length); } catch (e) { return; }
    emit("device_rsa_key", { data: bytesToBase64(bytes), plaintext: true });
    emit("log", { message: "captured plaintext RSA key at " + where + " len=" + length });
}

function hookProvisioningKey() {
    var seen = {};
    var libs = ["libwvhidl.so", "libwvdrmengine.so", "liboemcrypto.so", "libmediadrm.so"];
    var exports = [];
    libs.forEach(function (lib) {
        var mod;
        try { mod = Process.getModuleByName(lib); } catch (e) { return; }
        mod.enumerateExports().forEach(function (e) { exports.push(e); });
    });
    var hooked = 0;
    exports.forEach(function (exp) {
        var name = exp.name;
        // Obfuscated OEMCrypto helpers are short all-lowercase names; the
        // ordinal set is `_oeccNN`. Everything else is skipped to keep the
        // number of interceptors (and the per-call arg scan) bounded.
        if (!/^[a-z]{4,12}$/.test(name) && !/^_oecc\d+$/.test(name)) return;
        try {
            Interceptor.attach(exp.address, {
                onEnter: function (args) {
                    for (var i = 0; i < 8; i++) {
                        try { scanForDerKey(args[i], name + "#arg" + i, seen); } catch (e) { /* ignore */ }
                    }
                }
            });
            hooked++;
        } catch (e) { /* skip un-hookable exports */ }
    });
    emit("log", { message: "provisioning key sniff installed on " + hooked + " functions" });
}

// --- Java hooks ------------------------------------------------------------

// Pending MediaDrm challenges with the PSSH each was asked for. A license
// POST claims the entry it carries, so each emitted license_request is
// self-contained (pssh embedded) and the Python side never re-pairs by
// ordering. Matching tiers, strongest first: body bytes > Content-Length >
// license-looking URL (the last only while a challenge is pending, so
// unrelated POSTs to the same endpoint are ignored once nothing is pending).
var _pending = new ChallengeQueue(30000);

function _rememberChallenge(u8, pssh) {
    if (!u8 || !u8.length) return;
    var b64 = bytesToBase64(u8);
    _pending.push({
        u8: u8,
        len: u8.length,
        b64: b64,                                                      // standard base64
        b64url: b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),  // url-safe, unpadded
        pssh: pssh || null,
    });
}

// PSSH: android.media.MediaDrm.getKeyRequest exposes the init data the app
// asks a license for. This is framework-level, so it fires regardless of
// which HTTP client the app uses. The returned KeyRequest's getData() is the
// challenge the app is about to POST -- remember it for correlation.
function hookMediaDrm() {
    try {
        var MediaDrm = Java.use("android.media.MediaDrm");
        MediaDrm.getKeyRequest.overload("[B", "[B", "java.lang.String", "int", "java.util.HashMap")
            .implementation = function (scope, initData, mime, keyType, params) {
                if (initData) emit("pssh", { data: bytesToBase64(initData) });
                var req = this.getKeyRequest(scope, initData, mime, keyType, params);
                try {
                    var data = req.getData();
                    if (data !== null) _rememberChallenge(new Uint8Array(data),
                                                          initData ? bytesToBase64(initData) : null);
                } catch (e) { /* correlation just won't fire for this request */ }
                try {
                    var durl = req.getDefaultUrl();
                    if (durl && ("" + durl).length > 0) emit("license_url", { url: "" + durl });
                } catch (e) { /* not all KeyRequests carry a default URL */ }
                return req;
            };
    } catch (e) {
        emit("log", { message: "MediaDrm.getKeyRequest hook failed: " + e });
    }
}

// The authoritative URL + headers: the OkHttp POST that carries the license
// challenge. Hooking Request.Builder.build() surfaces each fully-formed
// request; for each POST we read the body's bytes and, if they carry a
// challenge we saw from getKeyRequest, that request is the license request.
// Body bytes are read by reflection (see _bodyBytesByReflection) so it works
// even when the app's okhttp/okio method names are R8-minified, with a plain
// okio read as a fallback for un-minified builds.
function hookLicensePost() {
    var Builder, Buffer;
    try { Builder = Java.use("okhttp3.Request$Builder"); }
    catch (e) { emit("log", { message: "licensePost: okhttp3.Request$Builder not found: " + e }); return; }
    try { Buffer = Java.use("okio.Buffer"); }
    catch (e) { Buffer = null; } // reflection path still works without okio
    try {
        Builder.build.implementation = function () {
            var request = this.build();
            try { _inspectRequest(request, Buffer); }
            catch (e) { emit("log", { message: "licensePost: inspect threw: " + e }); }
            return request;
        };
        emit("log", { message: "licensePost: build() hook installed" });
    } catch (e) {
        emit("log", { message: "licensePost: could not hook build(): " + e });
    }
}

// okhttp Headers.toString() emits "name: value\n" per header -- parse that
// rather than name(i)/value(i), which R8 may have minified away.
function _extractHeaders(request) {
    var out = {};
    try {
        ("" + request.headers().toString()).split("\n").forEach(function (line) {
            var idx = line.indexOf(": ");
            if (idx > 0) out[line.substring(0, idx).toLowerCase()] = line.substring(idx + 2);
        });
    } catch (e) { /* headers unreadable -- URL alone is still useful */ }
    return out;
}

function _emitLicense(request, headers, entry, via) {
    var url = "" + request.url().toString();
    emit("license_request", {
        url: url,
        headers: headers,
        pssh: entry.pssh,
        via: via,
        // matched is informational -- the Python side ranks by `via`, not `matched`.
        matched: via !== "url",
    });
    emit("log", { message: "correlated license POST (" + via + "): " + url });
}

// A URL that is clearly a DRM license endpoint. Used only while a challenge is
// pending, so it discriminates the license POST (e.g. a path containing
// "license" or a "drm_type=" query) from unrelated app POSTs (API calls,
// analytics), which carry none of these markers.
function _looksLikeLicenseUrl(url) {
    var u = url.toLowerCase();
    return u.indexOf("license") !== -1 || u.indexOf("drm_type=") !== -1 ||
        u.indexOf("widevine") !== -1 || u.indexOf("acquirelicense") !== -1 ||
        u.indexOf("getlicense") !== -1 || u.indexOf("licenseserver") !== -1;
}

// Read a RequestBody's content bytes by reflection: an okhttp byte-array body
// (RequestBody.toRequestBody) captures the payload in a `byte[]` field. The
// reflection API is framework code, never minified, so this reads the payload
// even when okhttp/okio method names are stripped. Walks a few superclasses
// and returns the first plausibly-sized byte[] field value.
function _bodyBytesByReflection(body) {
    try {
        var cls = body.getClass();
        for (var depth = 0; depth < 3 && cls !== null; depth++) {
            var fields = cls.getDeclaredFields();
            for (var i = 0; i < fields.length; i++) {
                var f = fields[i];
                if (("" + f.getType().getName()) !== "[B") continue;
                try {
                    f.setAccessible(true);
                    var val = f.get(body);
                    if (val !== null && val.length > 0 && val.length <= 262144) return new Uint8Array(val);
                } catch (e) { /* skip this field */ }
            }
            cls = cls.getSuperclass();
        }
    } catch (e) { /* reflection unavailable -- fall back to okio */ }
    return null;
}

// Best-effort okio read for the fallback path (non-minified okio only).
function _bufferBytes(buf) {
    try { return buf.readByteArray(); } catch (e) {}
    try { return buf.snapshot().toByteArray(); } catch (e) {}
    return null;
}

function _inspectRequest(request, Buffer) {
    if (("" + request.method()).toUpperCase() !== "POST") return;
    var body = request.body();
    if (body === null) return;
    var headers = _extractHeaders(request);
    var contentLength = null;
    try {
        var cl = headers["content-length"];
        if (cl !== undefined) contentLength = parseInt(cl, 10);
    } catch (e) { /* unknown length */ }

    // (1) Definitive: the POST body carries a pending challenge. Read the
    //     body's bytes by reflection (minification-proof), or via okio on
    //     un-minified builds. Works regardless of the license URL.
    var u8 = _bodyBytesByReflection(body);
    if (u8 === null && Buffer !== null) {
        try {
            if (!body.isDuplex() && !body.isOneShot()) {
                var len = -1;
                try { len = body.contentLength(); } catch (e) { /* unknown */ }
                if (len <= 262144) {
                    var buf = Buffer.$new();
                    body.writeTo(buf);
                    var bb = _bufferBytes(buf);
                    if (bb !== null) u8 = new Uint8Array(bb);
                }
            }
        } catch (e) { /* body unreadable -- fall through */ }
    }
    if (u8 !== null) {
        var entry = _pending.claimByBody(u8, bytesToBase64(u8));
        if (entry) { _emitLicense(request, headers, entry, "body"); return; }
    }

    // (2) When the body could not be read at all (hardened app), fall back
    //     to Content-Length: it carries a pending challenge's raw or
    //     base64 size. Only runs when u8 is null -- with a readable body
    //     that didn't match, a coincidental length equality would be a
    //     false positive.
    if (u8 === null) {
        var entryLen = _pending.claimByLength(contentLength);
        if (entryLen) { _emitLicense(request, headers, entryLen, "length"); return; }
    }

    // (3) Heuristic: license-looking URL while a challenge is pending.
    //     Claims the newest pending entry; without a pending challenge
    //     nothing is emitted, so unrelated POSTs to the license endpoint
    //     no longer flood the controller.
    if (_looksLikeLicenseUrl("" + request.url().toString())) {
        var entryUrl = _pending.claimByUrl(true);
        if (entryUrl) _emitLicense(request, headers, entryUrl, "url");
    }
}

// URL + headers, client 1: OkHttp. Request.Builder captures url + headers
// before the call is made. Apps that ship okhttp3 hit this.
function hookOkHttp() {
    try {
        var Builder = Java.use("okhttp3.Request$Builder");
        Builder.url.overload("java.lang.String").implementation = function (u) {
            emit("license_url", { url: u });
            return this.url(u);
        };
        Builder.addHeader.implementation = function (k, v) {
            var h = {};
            h[k] = v;
            emit("license_headers", { headers: h });
            return this.addHeader(k, v);
        };
    } catch (e) {
        emit("log", { message: "okhttp not present: " + e });
    }
}

// URL + headers, client 2: java.net.HttpURLConnection. Many players (and the
// androidx.media3 default HttpDataSource) POST the challenge through this
// rather than OkHttp, so the OkHttp hook alone would miss them. We record the
// URL at construction and each request property as it is set.
function hookHttpURLConnection() {
    try {
        var URL = Java.use("java.net.URL");
        URL.openConnection.overload().implementation = function () {
            var conn = this.openConnection();
            try { emit("license_url", { url: this.toString() }); } catch (e) { /* ignore */ }
            return conn;
        };
    } catch (e) {
        emit("log", { message: "URL.openConnection hook failed: " + e });
    }
    try {
        // HttpURLConnection is abstract; the concrete impl is
        // com.android.okhttp.internal.huc.HttpURLConnectionImpl on Android.
        // Hook the abstract setRequestProperty so both the platform impl and
        // any subclass funnel through it.
        var HUC = Java.use("java.net.HttpURLConnection");
        HUC.setRequestProperty.implementation = function (k, v) {
            var h = {};
            h[k] = v;
            emit("license_headers", { headers: h });
            return this.setRequestProperty(k, v);
        };
    } catch (e) {
        emit("log", { message: "HttpURLConnection.setRequestProperty hook failed: " + e });
    }
}

// URL + headers, client 3: androidx.media3 / ExoPlayer's own DRM callback.
// media3's HttpMediaDrmCallback.executePost(url, data, headers) carries the
// license URL and the app-supplied key-request properties directly, which is
// the cleanest capture point for the media3 demo player. Class names differ
// across the media3 (androidx.media3.exoplayer.drm) and legacy ExoPlayer
// (com.google.android.exoplayer2.drm) namespaces, so try both.
function hookMediaDrmCallback() {
    ["androidx.media3.exoplayer.drm.HttpMediaDrmCallback",
     "com.google.android.exoplayer2.drm.HttpMediaDrmCallback"].forEach(function (cls) {
        try {
            var Callback = Java.use(cls);
            // executePost signatures vary by version; hook every overload.
            Callback.executePost.overloads.forEach(function (ov) {
                ov.implementation = function () {
                    try {
                        var url = arguments[1];
                        if (url) emit("license_url", { url: "" + url });
                        var headers = arguments[3];
                        if (headers && headers.keySet) {
                            var it = headers.keySet().iterator();
                            var h = {};
                            while (it.hasNext()) {
                                var k = it.next();
                                h["" + k] = "" + headers.get(k);
                            }
                            emit("license_headers", { headers: h });
                        }
                    } catch (e) {
                        emit("log", { message: cls + ".executePost read failed: " + e });
                    }
                    return ov.apply(this, arguments);
                };
            });
        } catch (e) {
            // Class not present in this app -- expected for non-ExoPlayer players.
        }
    });
}

function hookJava() {
    // frida-java-bridge is bundled into this script by frida-compile, so `Java`
    // is always defined here. It is only usable once a JVM is present in the
    // target process, though -- guard on Java.available so a pure-native
    // process degrades cleanly instead of throwing out of this rpc export.
    if (!Java.available) {
        emit("log", { message: "no JVM in this process -- Java capture hooks not installed" });
        return;
    }
    Java.perform(function () {
        hookMediaDrm();
        hookLicensePost();
        hookOkHttp();
        hookHttpURLConnection();
        hookMediaDrmCallback();
    });
}

// The controller decides which hook set to run per attached process; do not
// auto-invoke either at load time.
rpc.exports = {
    hookNative: hookNative,
    hookJava: hookJava,
    hookProvisioningKey: hookProvisioningKey,
};
