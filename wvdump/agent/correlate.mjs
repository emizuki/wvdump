// Pure correlation logic for the capture agent. No frida imports, so it is
// unit-testable with plain `node --test` (frida-compile bundles it into
// agent.js for the device build).

// Unpadded base64 length of n bytes.
export function b64Len(n) {
  return Math.ceil(n / 3) * 4;
}

// Does a POST's Content-Length plausibly carry `challengeLen` bytes, either
// raw or as base64 (standard or url-safe, possibly padding-stripped)?
export function lengthMatches(contentLength, challengeLen) {
  if (contentLength === null || contentLength === undefined) return false;
  const b = b64Len(challengeLen);
  return contentLength === challengeLen ||
         contentLength === b ||
         contentLength === b - 1 ||
         contentLength === b - 2;
}

export function bytesContain(hay, needle) {
  if (needle.length === 0 || needle.length > hay.length) return false;
  const last = hay.length - needle.length;
  for (let i = 0; i <= last; i++) {
    let j = 0;
    while (j < needle.length && hay[i + j] === needle[j]) j++;
    if (j === needle.length) return true;
  }
  return false;
}

export function latin1(u8) {
  let s = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < u8.length; i += CHUNK) {
    s += String.fromCharCode.apply(null, u8.subarray(i, i + CHUNK));
  }
  return s;
}

// Pending MediaDrm challenges, claimed by the first POST that matches.
// Entry shape: { u8, len, b64, b64url, pssh, at }.
export class ChallengeQueue {
  constructor(maxAgeMs = 30000, now = Date.now) {
    this._entries = [];
    this._maxAgeMs = maxAgeMs;
    this._now = now;
  }

  get size() { return this._entries.length; }

  push(entry) {
    if (!entry || !entry.len) return;
    this.prune();
    this._entries.push({ ...entry, at: this._now() });
  }

  prune() {
    const cutoff = this._now() - this._maxAgeMs;
    this._entries = this._entries.filter((e) => e.at >= cutoff);
  }

  // Tier 1: the POST body equals/embeds a challenge (raw or base64 text).
  claimByBody(bodyU8, bodyB64) {
    this.prune();
    const text = latin1(bodyU8);
    for (let i = 0; i < this._entries.length; i++) {
      const e = this._entries[i];
      if (bodyB64 === e.b64) return this._remove(i);
      if (bytesContain(bodyU8, e.u8)) return this._remove(i);
      if (text.indexOf(e.b64) !== -1) return this._remove(i);
      if (text.indexOf(e.b64url) !== -1) return this._remove(i);
    }
    return null;
  }

  // Tier 2: Content-Length matches a challenge's raw or encoded size.
  claimByLength(contentLength) {
    this.prune();
    for (let i = 0; i < this._entries.length; i++) {
      if (lengthMatches(contentLength, this._entries[i].len)) return this._remove(i);
    }
    return null;
  }

  // Tier 3: URL heuristic claims the newest pending entry.
  claimByUrl(looksLikeLicenseUrl) {
    if (!looksLikeLicenseUrl) return null;
    this.prune();
    if (this._entries.length === 0) return null;
    return this._remove(this._entries.length - 1);
  }

  _remove(i) {
    return this._entries.splice(i, 1)[0];
  }
}
