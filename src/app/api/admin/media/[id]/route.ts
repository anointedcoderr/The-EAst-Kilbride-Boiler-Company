import { NextResponse } from "next/server";
import { deleteMedia, updateMediaMeta } from "@/lib/cmsMedia";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PatchBody {
  alt_text?: unknown;
  caption?: unknown;
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
  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }
  const patch: { alt_text?: string; caption?: string } = {};
  if (typeof body.alt_text === "string") patch.alt_text = body.alt_text;
  if (typeof body.caption === "string") patch.caption = body.caption;
  const result = await updateMediaMeta(id, patch);
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
  const result = await deleteMedia(id);
  if (!result.ok) {
    const status = result.reason === "Supabase is not configured." ? 503 : 502;
    return NextResponse.json(
      { ok: false, message: result.reason },
      { status }
    );
  }
  return NextResponse.json({ ok: true });
}
