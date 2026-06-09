import { NextResponse } from "next/server";
import { createBlog, type BlogInsert } from "@/lib/cmsBlogs";

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
  if (!isString(body.title) || !body.title.trim()) {
    return NextResponse.json(
      { ok: false, message: "Title is required." },
      { status: 400 }
    );
  }
  if (!isString(body.slug) || !body.slug.trim()) {
    return NextResponse.json(
      { ok: false, message: "Slug is required." },
      { status: 400 }
    );
  }
  const input: BlogInsert = {
    title: body.title,
    slug: body.slug,
    excerpt: isString(body.excerpt) ? body.excerpt : undefined,
    meta_title: isString(body.meta_title) ? body.meta_title : undefined,
    meta_description: isString(body.meta_description)
      ? body.meta_description
      : undefined,
    featured_image_id:
      body.featured_image_id === null
        ? null
        : isString(body.featured_image_id)
          ? body.featured_image_id
          : undefined,
    content_blocks: Array.isArray(body.content_blocks)
      ? body.content_blocks
      : undefined,
    category: isString(body.category) ? body.category : undefined,
    status: body.status === "published" ? "published" : "draft",
  };
  const result = await createBlog(input);
  if (!result.ok) {
    const status = result.reason === "Supabase is not configured." ? 503 : 502;
    return NextResponse.json(
      { ok: false, message: result.reason },
      { status }
    );
  }
  return NextResponse.json({ ok: true, id: result.id });
}
