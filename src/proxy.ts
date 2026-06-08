import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  isAdminConfigured,
  verifySession,
} from "@/lib/adminAuth";

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

export async function proxy(request: NextRequest): Promise<NextResponse> {
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
  const session = token ? await verifySession(token) : null;
  if (session) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { ok: false, message: "Not signed in" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  const loginUrl = new URL("/admin/login", request.nextUrl);
  loginUrl.searchParams.set("next", pathname);
  const res = NextResponse.redirect(loginUrl, { status: 303 });
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
