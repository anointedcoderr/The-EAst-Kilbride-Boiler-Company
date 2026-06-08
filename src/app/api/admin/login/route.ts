import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_TTL_SECONDS,
  checkAdminCredentials,
  createSession,
} from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeNext(input: string): string {
  // Refuse anything that isn't an /admin path so an attacker can't craft
  // an open-redirect via ?next=https://evil.example.com.
  if (!input.startsWith("/admin")) return "/admin";
  return input;
}

async function readCredentials(request: Request): Promise<{
  email: string;
  password: string;
  next: string;
}> {
  const ct = request.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    try {
      const body = (await request.json()) as Record<string, unknown>;
      return {
        email: typeof body.email === "string" ? body.email : "",
        password: typeof body.password === "string" ? body.password : "",
        next: typeof body.next === "string" ? body.next : "",
      };
    } catch {
      return { email: "", password: "", next: "" };
    }
  }
  const form = await request.formData();
  return {
    email: String(form.get("email") ?? "").trim(),
    password: String(form.get("password") ?? ""),
    next: String(form.get("next") ?? ""),
  };
}

export async function POST(request: Request) {
  const { email, password, next } = await readCredentials(request);

  if (!checkAdminCredentials(email, password)) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("error", "invalid");
    if (next) url.searchParams.set("next", next);
    const res = NextResponse.redirect(url, { status: 303 });
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  const token = createSession(email);
  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Admin sessions are not configured. Set ADMIN_SESSION_SECRET or ADMIN_PASS.",
      },
      { status: 503 }
    );
  }

  const target = safeNext(next || "/admin");
  const res = NextResponse.redirect(new URL(target, request.url), {
    status: 303,
  });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });
  res.headers.set("Cache-Control", "no-store");
  return res;
}
