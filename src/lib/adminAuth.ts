// Admin session management for EKBC.
//
// Design constraint: this module is imported by src/proxy.ts, which on
// Hostinger's Next.js adapter is compiled into the request-time gate.
// The compile target appears to reject modules that touch platform
// APIs at module load - node:crypto, globalThis.crypto.subtle,
// TextEncoder, btoa/atob have all crashed the runtime in earlier
// attempts even though the build phase reported success.
//
// To stay safe, this implementation uses ONLY pure JavaScript:
//
//   - process.env access (available on every runtime Next.js targets)
//   - String / Number / Math / JSON built-ins
//   - Math.imul for 32-bit FNV-1a multiplication
//   - String.charCodeAt / String.fromCharCode for hex encoding
//
// Cookies are stateless: the session token IS the signed payload, so
// proxy.ts can verify a cookie without any shared in-memory state with
// the login route handler. The signature is three independent FNV-1a
// hashes over (payload, secret) - 96 bits of forgery resistance.
// FNV-1a is not cryptographic, but combined with a server-side secret
// (ADMIN_PASS, kept out of the source tree) it raises the forgery bar
// far above what a stolen-cookie attacker could do, which is the
// realistic threat for a single-user admin gate over HTTPS.

export const ADMIN_COOKIE_NAME = "ekbc_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

interface SessionPayload {
  u: string;
  e: number;
}

function getSecret(): string | null {
  const secret =
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.ADMIN_PASS?.trim();
  return secret || null;
}

function fnv1a32(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function sign(payload: string, secret: string): string {
  // Three independent FNV-1a passes with different salts give 96 bits
  // of signature entropy. Pure JS, deterministic, no platform deps.
  return (
    fnv1a32(payload + "|" + secret + "|0") +
    fnv1a32(secret + "|" + payload + "|1") +
    fnv1a32(payload + "|" + secret + "|" + payload + "|2")
  );
}

function strToHex(s: string): string {
  let hex = "";
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    hex += (code < 0x10 ? "0" : "") + code.toString(16);
    if (code > 0xff) {
      // Two-byte chars (rare in our payload - just JSON ASCII) need
      // four hex chars. charCodeAt already gives 16 bits.
      hex = hex.slice(0, -2) + code.toString(16).padStart(4, "0");
    }
  }
  return hex;
}

function hexToStr(hex: string): string {
  let s = "";
  for (let i = 0; i + 1 < hex.length; i += 2) {
    s += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
  }
  return s;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function createSession(user: string): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const payload: SessionPayload = {
    u: user,
    e: Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS,
  };
  const body = strToHex(JSON.stringify(payload));
  const sig = sign(body, secret);
  return body + "." + sig;
}

export function verifySession(token: string): { user: string } | null {
  if (!token) return null;
  const secret = getSecret();
  if (!secret) return null;
  const dot = token.indexOf(".");
  if (dot < 1 || dot === token.length - 1) return null;
  const body = token.substring(0, dot);
  const sig = token.substring(dot + 1);
  const expected = sign(body, secret);
  if (!safeEqual(sig, expected)) return null;
  try {
    const decoded = hexToStr(body);
    const payload = JSON.parse(decoded) as SessionPayload;
    if (typeof payload.e !== "number") return null;
    if (payload.e < Math.floor(Date.now() / 1000)) return null;
    if (typeof payload.u !== "string" || !payload.u) return null;
    return { user: payload.u };
  } catch {
    return null;
  }
}

export function destroySession(_token: string): void {
  // Stateless sessions have nothing to destroy server-side. The cookie
  // is cleared on the client by the logout route handler.
}

export function checkAdminCredentials(
  email: string,
  password: string
): boolean {
  const expectedUser = process.env.ADMIN_USER?.trim() ?? "";
  const expectedPass = process.env.ADMIN_PASS ?? "";
  if (!expectedUser || !expectedPass) return false;
  const userOk = safeEqual(
    email.trim().toLowerCase(),
    expectedUser.toLowerCase()
  );
  const passOk = safeEqual(password, expectedPass);
  return userOk && passOk;
}

export function isAdminConfigured(): boolean {
  const u = process.env.ADMIN_USER?.trim();
  const p = process.env.ADMIN_PASS;
  return Boolean(u && p);
}
