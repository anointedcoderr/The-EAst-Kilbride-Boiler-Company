import crypto from "node:crypto";

// HMAC-signed session cookie for the EKBC admin area.
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

function b64url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf
    .toString("base64")
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function b64urlDecode(input: string): Buffer {
  let s = input.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return Buffer.from(s, "base64");
}

function hmac(secret: string, data: string): string {
  return b64url(crypto.createHmac("sha256", secret).update(data).digest());
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function signSession(user: string): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const payload: SessionPayload = {
    user,
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS,
  };
  const body = b64url(JSON.stringify(payload));
  const sig = hmac(secret, body);
  return `${body}.${sig}`;
}

export function verifySession(token: string): SessionPayload | null {
  const secret = getSecret();
  if (!secret) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  const expected = hmac(secret, body);
  if (!safeEqual(sig, expected)) return null;
  try {
    const decoded = b64urlDecode(body).toString("utf8");
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
  const userOk = safeEqual(email.trim().toLowerCase(), expectedUser.toLowerCase());
  const passOk = safeEqual(password, expectedPass);
  return userOk && passOk;
}

export function isAdminConfigured(): boolean {
  const u = process.env.ADMIN_USER?.trim();
  const p = process.env.ADMIN_PASS;
  return Boolean(u && p);
}
