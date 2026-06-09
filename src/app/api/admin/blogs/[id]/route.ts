import { NextResponse } from "next/server";
import { deleteBlog, updateBlog, type BlogPatch } from "@/lib/cmsBlogs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function pickPatch(input: unknown): BlogPatch {
  if (!input || typeof input !== "object") return {};
  const src = input as Record<string, unknown>;
  const out: BlogPatch = {};
  if (isString(src.title)) out.title = src.title;
  if (isString(src.slug)) out.slug = src.slug;
  if (isString(src.excerpt)) out.excerpt = src.excerpt;
  if (isString(src.meta_title)) out.meta_title = src.meta_title;
  if (isString(src.meta_description)) out.meta_description = src.meta_description;
  if (src.featured_image_id === null || isString(src.featured_image_id)) {
    out.featured_image_id = src.featured_image_id as string | null;
  }
  if (Array.isArray(src.content_blocks)) {
    out.content_blocks = src.content_blocks;
  }
  if (isString(src.category)) out.category = src.category;
  if (src.status === "draft" || src.status === "published") {
    out.status = src.status;
  }
  if (src.published_at === null || isString(src.published_at)) {
    out.published_at = src.published_at as string | null;
  }
  return out;
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json(
      { ok: false, message: "Missing id." },
      { status: 400 }
    );
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }
  const patch = pickPatch(body);
  const result = await updateBlog(id, patch);
  if (!result.ok) {
    const status = result.reason === "Supabase is not configured." ? 503 : 502;
    return NextResponse.json(
      { ok: false, message: result.reason },
      { status }
    );
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json(
      { ok: false, message: "Missing id." },
      { status: 400 }
    );
  }
  const result = await deleteBlog(id);
  if (!result.ok) {
    const status = result.reason === "Supabase is not configured." ? 503 : 502;
    return NextResponse.json(
      { ok: false, message: result.reason },
      { status }
    );
  }
  return NextResponse.json({ ok: true });
}
