import { NextResponse } from "next/server";
import { createCustomPage } from "@/lib/cmsPages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }
  const title = isString(body.title) ? body.title : "";
  const slug = isString(body.slug) ? body.slug : "";
  const metaDescription = isString(body.metaDescription)
    ? body.metaDescription
    : undefined;
  const status =
    body.status === "published" ? "published" : ("draft" as const);

  const result = await createCustomPage({
    title,
    slug,
    metaDescription,
    status,
  });
  if (!result.ok) {
    const code = result.reason === "Supabase is not configured." ? 503 : 400;
    return NextResponse.json(
      { ok: false, message: result.reason },
      { status: code }
    );
  }
  return NextResponse.json({ ok: true, slug: result.slug });
}
