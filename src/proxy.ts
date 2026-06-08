import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  isAdminConfigured,
  verifySession,
} from "@/lib/adminAuth";

// Build the public-facing origin (https://your-domain) from request
// headers. Hostinger's reverse proxy forwards the public hostname in
// the Host (and sometimes X-Forwarded-Host) header even though the
// underlying Node process binds to 0.0.0.0:3000. Without this, redirects
// leak the internal "0.0.0.0:3000" address to the browser and produce
// ERR_ADDRESS_INVALID.
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

// Cookie-session gate for the /admin area.
//
// Public endpoints (no session required):
//   - /admin/login
//   - /api/admin/login   (used to create the session)
//
// Everything else under /admin and /api/admin requires a valid signed
// session cookie. Page routes get a 303 redirect to /admin/login with
// a ?next= param so we can come back after sign-in. API routes get a
// 401 JSON response so client fetches can react sensibly.
//
// Note for Next.js 16: this file used to be called middleware.ts and
// has been renamed to proxy.ts. Function name and matcher behaviour
// are otherwise unchanged.

function isPublicAdminPath(pathname: string): boolean {
  if (pathname === "/admin/login" || pathname === "/admin/login/") return true;
  if (pathname === "/api/admin/login" || pathname === "/api/admin/login/") {
    return true;
  }
  return false;
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Deny by default if admin credentials aren't set in env. Safer than
  // shipping an open admin area when ADMIN_USER / ADMIN_PASS are missing.
  if (!isAdminConfigured()) {
    return new NextResponse(
      "Admin is not configured. Set ADMIN_USER and ADMIN_PASS environment variables.",
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (isPublicAdminPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = token ? verifySession(token) : null;
  if (session) {
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
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
