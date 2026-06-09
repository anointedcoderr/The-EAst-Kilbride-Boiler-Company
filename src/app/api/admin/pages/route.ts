import { NextResponse } from "next/server";
import { savePageBySlug, type PageEditPatch } from "@/lib/cmsPages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface IncomingBody {
  slug?: unknown;
  patch?: unknown;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function pickPatch(input: unknown): PageEditPatch {
  if (!input || typeof input !== "object") return {};
  const src = input as Record<string, unknown>;
  const out: PageEditPatch = {};
  if (isString(src.title)) out.title = src.title;
  if (isString(src.meta_title)) out.meta_title = src.meta_title;
  if (isString(src.meta_description)) out.meta_description = src.meta_description;
  if (isString(src.h1)) out.h1 = src.h1;
  if (isString(src.hero_title)) out.hero_title = src.hero_title;
  if (isString(src.hero_subtitle)) out.hero_subtitle = src.hero_subtitle;
  if (src.status === "draft" || src.status === "published") {
    out.status = src.status;
  }
  if (typeof src.is_indexable === "boolean") {
    out.is_indexable = src.is_indexable;
  }
  // Sections come through as an array of plain JSON objects. The
  // public renderer revalidates each block via parseBlocks() before
  // rendering, so it's safe to pass through any array shape here.
  if (Array.isArray(src.sections)) {
    out.sections = src.sections;
  }
  return out;
}

export async function POST(request: Request) {
  let body: IncomingBody;
  try {
    body = (await request.json()) as IncomingBody;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  if (!isString(body.slug) || !body.slug) {
    return NextResponse.json(
      { ok: false, message: "Missing or invalid slug." },
      { status: 400 }
    );
  }

  const patch = pickPatch(body.patch);
  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { ok: false, message: "No editable fields provided." },
      { status: 400 }
    );
  }

  const result = await savePageBySlug(body.slug, patch);
  if (!result.ok) {
    const status = result.reason === "Supabase is not configured." ? 503 : 502;
    return NextResponse.json(
      { ok: false, message: result.reason },
      { status }
    );
  }
  return NextResponse.json({ ok: true });
}
