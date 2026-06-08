import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, destroySession } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clearAndRedirect(request: Request): NextResponse {
  const token = request.headers
    .get("cookie")
    ?.split(/;\s*/)
    .find((c) => c.startsWith(`${ADMIN_COOKIE_NAME}=`))
    ?.slice(ADMIN_COOKIE_NAME.length + 1);
  if (token) destroySession(token);

  const url = new URL("/admin/login", request.url);
  const res = NextResponse.redirect(url, { status: 303 });
  res.cookies.set(ADMIN_COOKIE_NAME, "", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 0,
  });
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function POST(request: Request) {
  return clearAndRedirect(request);
}

// Allow GET for convenience (e.g., bookmarked /api/admin/logout link).
// Logging out is idempotent and not state-changing in a security-relevant
// way, so this is fine.
export async function GET(request: Request) {
  return clearAndRedirect(request);
}
