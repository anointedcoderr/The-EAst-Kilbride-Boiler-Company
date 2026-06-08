import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// HTTP Basic Auth gate for the /admin route. Credentials are read at
// request time from ADMIN_USER and ADMIN_PASS environment variables - set
// these in the Hostinger Node.js environment configuration. Secrets are
// never embedded in source.
//
// Note for Next.js 16: this file used to be called middleware.ts and has
// been renamed to proxy.ts per the framework change. Function name and
// matcher behaviour are otherwise unchanged.

const REALM = 'Basic realm="EKBC Admin", charset="UTF-8"';

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function unauthorized(): NextResponse {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": REALM,
      "Cache-Control": "no-store",
    },
  });
}

export function proxy(request: NextRequest): NextResponse {
  const expectedUser = process.env.ADMIN_USER?.trim() ?? "";
  const expectedPass = process.env.ADMIN_PASS ?? "";

  // Deny by default if credentials are not configured. This is safer than
  // letting an unconfigured deploy ship an open admin route.
  if (!expectedUser || !expectedPass) {
    return new NextResponse(
      "Admin is not configured. Set ADMIN_USER and ADMIN_PASS environment variables.",
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  const header = request.headers.get("authorization");
  if (!header || !header.toLowerCase().startsWith("basic ")) {
    return unauthorized();
  }

  let decoded = "";
  try {
    decoded = atob(header.slice(6).trim());
  } catch {
    return unauthorized();
  }

  const sep = decoded.indexOf(":");
  if (sep < 0) return unauthorized();
  const user = decoded.slice(0, sep);
  const pass = decoded.slice(sep + 1);

  if (safeEqual(user, expectedUser) && safeEqual(pass, expectedPass)) {
    return NextResponse.next();
  }

  return unauthorized();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
