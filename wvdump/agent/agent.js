// wvdump Frida agent: native OEMCrypto interceptors + Java MediaDrm/HTTP hooks.
//
// This is a plain Frida script (no TypeScript, no build step) loaded verbatim
// via `session.create_script(source)`. It exports two entry points that the
// Python controller invokes selectively per attached process:
//   rpc.exports.hookNative()  -- attach OEMCrypto native interceptors
//   rpc.exports.hookJava()    -- attach android.media.MediaDrm / OkHttp hooks
//
// Native interceptor logic is ported from the verified reference script at
// dumper/Helpers/script.js (checked against a real Android emulator's
// Widevine L3 HAL). Only the identity-producing hooks are kept:
//   OEMCrypto_GetKeyData          -> emit("keybox", ...)
//   OEMCrypto_LoadDeviceRSAKey     -> emit("device_rsa_key", ...)
//   OEMCrypto_RewrapDeviceRSAKey   -> emit("device_rsa_key", ...)
//   OEMCrypto_LoadKeys             -> emit("log", ...)          (context only)
//   PrepareKeyRequest              -> emit("device_client_id", ...)
"use strict";

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

// --- Java hooks ------------------------------------------------------------

function hookJava() {
    // Frida 17 removed the `Java` bridge from a plain script's global scope
    // -- it must be bundled via frida-compile (not done here), so `Java` is
    // entirely undefined unless frida-java-bridge was injected some other
    // way. Guard against that BEFORE touching `Java.available`, which would
    // otherwise throw a ReferenceError that propagates out of this rpc
    // export as an frida.RPCException and crashes the Python controller.
    if (typeof Java === 'undefined' || !Java.available) {
        emit("log", { message: "Java bridge unavailable (Frida 17 needs frida-java-bridge bundled) -- capture hooks not installed" });
        return;
    }
    Java.perform(function () {
        try {
            var MediaDrm = Java.use("android.media.MediaDrm");
            MediaDrm.getKeyRequest.overload("[B", "[B", "java.lang.String", "int", "java.util.HashMap")
                .implementation = function (scope, initData, mime, keyType, params) {
                    if (initData) emit("pssh", { data: bytesToBase64(initData) });
                    return this.getKeyRequest(scope, initData, mime, keyType, params);
                };
        } catch (e) {
            emit("log", { message: "MediaDrm.getKeyRequest hook failed: " + e });
        }

        // URL + headers: hook the app HTTP client that POSTs the challenge.
        // OkHttp Request.Builder captures url + headers before the call is made.
        // Not every app uses OkHttp -- apps built on HttpURLConnection directly
        // will need an additional hook on HttpURLConnection.setRequestProperty /
        // connect, which is not wired up here since the reference target
        // (androidx.media3 ExoPlayer demo) uses OkHttp.
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
    });
}

// The controller decides which hook set to run per attached process; do not
// auto-invoke either at load time.
rpc.exports = { hookNative: hookNative, hookJava: hookJava };
