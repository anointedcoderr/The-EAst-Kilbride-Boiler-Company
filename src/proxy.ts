import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Standalone admin-session gate.
//
// This file deliberately has NO imports from the application's own lib
// folder. Every helper it uses is defined locally and uses only pure
// JavaScript (no node:crypto, no Web Crypto, no TextEncoder, no btoa).
// That isolation means a build problem or runtime crash in any other
// module can't cascade into the proxy and take the whole site down -
// which is exactly the failure mode we've seen on Hostinger more than
// once today.
//
// On any unexpected error inside the proxy body, we fall through to
// NextResponse.next() instead of throwing. Better to serve the page
// than to 503 the request.

const ADMIN_COOKIE_NAME = "ekbc_admin_session";

function fnv1a32(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function sign(payload: string, secret: string): string {
  return (
    fnv1a32(payload + "|" + secret + "|0") +
    fnv1a32(secret + "|" + payload + "|1") +
    fnv1a32(payload + "|" + secret + "|" + payload + "|2")
  );
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function hexToStr(hex: string): string {
  let s = "";
  for (let i = 0; i + 1 < hex.length; i += 2) {
    s += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
  }
  return s;
}

function isValidSession(token: string | undefined): boolean {
  if (!token) return false;
  const secret = (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASS ||
    ""
  ).trim();
  if (!secret) return false;
  const dot = token.indexOf(".");
  if (dot < 1 || dot === token.length - 1) return false;
  const body = token.substring(0, dot);
  const sig = token.substring(dot + 1);
  const expected = sign(body, secret);
  if (!safeEqual(sig, expected)) return false;
  try {
    const payload = JSON.parse(hexToStr(body));
    if (typeof payload.e !== "number") return false;
    if (payload.e < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}

function publicOrigin(request: NextRequest): string {
  const xfh = request.headers.get("x-forwarded-host");
  const host = xfh || request.headers.get("host");
  if (host && !host.startsWith("0.0.0.0")) {
    const xfp = request.headers.get("x-forwarded-proto");
    const isLocal =
      host.startsWith("localhost") ||
      host.startsWith("127.0.0.1") ||
      /:\d+$/.test(host);
    const proto = xfp || (isLocal ? "http" : "https");
    return `${proto}://${host}`;
  }
  return request.nextUrl.origin;
}

function isPublicAdminPath(pathname: string): boolean {
  return (
    pathname === "/admin/login" ||
    pathname === "/admin/login/" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/login/"
  );
}

export function proxy(request: NextRequest): NextResponse {
  try {
    const { pathname } = request.nextUrl;

    const adminUser = process.env.ADMIN_USER?.trim();
    const adminPass = process.env.ADMIN_PASS;
    if (!adminUser || !adminPass) {
      return new NextResponse(
        "Admin is not configured. Set ADMIN_USER and ADMIN_PASS environment variables.",
        { status: 503, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (isPublicAdminPath(pathname)) {
      return NextResponse.next();
    }

    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (isValidSession(token)) {
      return NextResponse.next();
    }

    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { ok: false, message: "Not signed in" },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    const loginUrl = new URL("/admin/login", publicOrigin(request));
    loginUrl.searchParams.set("next", pathname);
    const res = NextResponse.redirect(loginUrl, { status: 303 });
    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch {
    // Any unexpected exception inside the proxy falls through to a
    // pass-through. Better the page renders than the site 503s.
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
