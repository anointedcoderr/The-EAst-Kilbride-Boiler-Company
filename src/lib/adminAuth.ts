// HMAC-signed session cookie for the EKBC admin area.
//
// Uses the Web Crypto API (globalThis.crypto.subtle) instead of
// node:crypto so this module loads cleanly on both the Node runtime
// AND the Edge runtime - some Next.js adapters (including the one
// Hostinger ships) treat proxy.ts as edge code regardless of the
// Next.js docs saying it defaults to Node, and a node:crypto import
// crashes the process at boot in that case.
//
// Secret is read at runtime from ADMIN_SESSION_SECRET, falling back to
// ADMIN_PASS so an existing deploy keeps working without adding another
// env var. Cookies are httpOnly so JS can't read them, SameSite=Lax so
// they survive normal navigation but are blocked on cross-site POST,
// Secure so they only travel over HTTPS, and signed so tampering is
// detectable.

export const ADMIN_COOKIE_NAME = "ekbc_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

interface SessionPayload {
  user: string;
  exp: number;
}

function getSecret(): string | null {
  const secret =
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.ADMIN_PASS?.trim();
  return secret || null;
}

const encoder = new TextEncoder();

function bytesToBase64Url(bytes: Uint8Array): string {
  // Build a binary string from the byte array, then base64-encode and
  // convert to URL-safe form. btoa is available in both Node 18+ and
  // Edge runtimes.
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function stringToBase64Url(input: string): string {
  return bytesToBase64Url(encoder.encode(input));
}

function base64UrlToBytes(input: string): Uint8Array {
  let s = input.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const binary = atob(s);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function base64UrlToString(input: string): string {
  return new TextDecoder().decode(base64UrlToBytes(input));
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return await globalThis.crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

async function hmacSign(secret: string, data: string): Promise<string> {
  const key = await importHmacKey(secret);
  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );
  return bytesToBase64Url(new Uint8Array(signature));
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function signSession(user: string): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const payload: SessionPayload = {
    user,
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS,
  };
  const body = stringToBase64Url(JSON.stringify(payload));
  const sig = await hmacSign(secret, body);
  return `${body}.${sig}`;
}

export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  const secret = getSecret();
  if (!secret) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  let expected: string;
  try {
    expected = await hmacSign(secret, body);
  } catch {
    return null;
  }
  if (!safeEqual(sig, expected)) return null;
  try {
    const decoded = base64UrlToString(body);
    const payload = JSON.parse(decoded) as SessionPayload;
    if (typeof payload.exp !== "number") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (typeof payload.user !== "string" || !payload.user) return null;
    return payload;
  } catch {
    return null;
  }
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
