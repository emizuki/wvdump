import test from "node:test";
import assert from "node:assert/strict";
import {
  b64Len,
  lengthMatches,
  bytesContain,
  latin1,
  ChallengeQueue,
} from "../../wvdump/agent/correlate.mjs";

test("b64Len computes the unpadded base64 length", () => {
  assert.equal(b64Len(2163), 2884);   // ceil(2163/3)*4
  assert.equal(b64Len(1), 4);
  assert.equal(b64Len(3), 4);
  assert.equal(b64Len(4), 8);
});

test("lengthMatches accepts raw and padded/unpadded base64 sizes", () => {
  assert.equal(lengthMatches(2163, 2163), true);   // raw challenge
  assert.equal(lengthMatches(2884, 2163), true);   // standard b64
  assert.equal(lengthMatches(2883, 2163), true);   // one '=' stripped
  assert.equal(lengthMatches(2882, 2163), true);   // both '=' stripped
  assert.equal(lengthMatches(2885, 2163), false);
  assert.equal(lengthMatches(null, 2163), false);
  assert.equal(lengthMatches(100, 2163), false);
});

test("bytesContain finds subsequences", () => {
  const hay = new Uint8Array([1, 2, 3, 4, 5]);
  assert.equal(bytesContain(hay, new Uint8Array([3, 4])), true);
  assert.equal(bytesContain(hay, new Uint8Array([4, 3])), false);
  assert.equal(bytesContain(hay, new Uint8Array([])), false);
});

test("latin1 renders bytes as a string", () => {
  assert.equal(latin1(new Uint8Array([65, 66, 67])), "ABC");
});

test("claimByBody matches raw equality and wrapped base64 text", () => {
  const queue = new ChallengeQueue(30000, () => 1000);
  const challenge = new Uint8Array([10, 20, 30, 40]);
  const b64 = "ChQoKA==";
  queue.push({ u8: challenge, len: 4, b64, b64url: "ChQoKA", pssh: "PSSH1", at: 1000 });

  // raw body equals the challenge
  assert.equal(queue.claimByBody(challenge, b64).pssh, "PSSH1");

  // JSON-wrapped body containing the base64 text of the challenge
  queue.push({ u8: challenge, len: 4, b64, b64url: "ChQoKA", pssh: "PSSH2", at: 1000 });
  const wrapped = new TextEncoder().encode(`{"license":"${b64}"}`);
  assert.equal(queue.claimByBody(wrapped, "x").pssh, "PSSH2");

  assert.equal(queue.size, 0);
});

test("claimByLength claims the matching entry", () => {
  const queue = new ChallengeQueue(30000, () => 1000);
  queue.push({ u8: new Uint8Array(2163), len: 2163, b64: "x", b64url: "x", pssh: "P", at: 1000 });
  assert.equal(queue.claimByLength(2882).pssh, "P");
  assert.equal(queue.claimByLength(2882), null);      // already claimed
  assert.equal(queue.claimByLength(9999), null);
});

test("claimByUrl claims the newest entry and only when entries exist", () => {
  const queue = new ChallengeQueue(30000, () => 1000);
  assert.equal(queue.claimByUrl(true), null);
  queue.push({ u8: new Uint8Array(10), len: 10, b64: "a", b64url: "a", pssh: "OLD", at: 1000 });
  queue.push({ u8: new Uint8Array(10), len: 10, b64: "b", b64url: "b", pssh: "NEW", at: 1000 });
  assert.equal(queue.claimByUrl(true).pssh, "NEW");
  assert.equal(queue.claimByUrl(false), null);
});

test("prune drops stale entries", () => {
  let now = 1000;
  const queue = new ChallengeQueue(30000, () => now);
  queue.push({ u8: new Uint8Array(10), len: 10, b64: "a", b64url: "a", pssh: "STALE", at: now });
  now = 31001;
  assert.equal(queue.claimByLength(10), null);
  assert.equal(queue.size, 0);
});

test("lengthMatches coerces numeric strings and rejects garbage", () => {
  assert.equal(lengthMatches("2884", 2163), true);
  assert.equal(lengthMatches(undefined, 2163), false);
  assert.equal(lengthMatches("abc", 2163), false);
});

test("push ignores malformed entries", () => {
  const queue = new ChallengeQueue(30000, () => 1000);
  queue.push({ len: 10, b64: "a", b64url: "a", pssh: "NO-U8" });
  queue.push({ u8: new Uint8Array(4), b64: "b", b64url: "b", pssh: "NO-LEN" });
  queue.push({ u8: new Uint8Array(4), len: 4, b64: "c", b64url: "c", pssh: "OK" });
  assert.equal(queue.size, 1);
  assert.equal(queue.claimByBody(new Uint8Array(4), "c").pssh, "OK");
});

test("claimByBody returns null when nothing matches", () => {
  const queue = new ChallengeQueue(30000, () => 1000);
  queue.push({ u8: new Uint8Array([1, 2, 3]), len: 3, b64: "AQID", b64url: "AQID", pssh: "P" });
  assert.equal(queue.claimByBody(new Uint8Array([9, 9, 9]), "CQkJ"), null);
  assert.equal(queue.size, 1); // unmatched entry stays queued
});
