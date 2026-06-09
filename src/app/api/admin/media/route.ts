import { NextResponse } from "next/server";
import { uploadMedia } from "@/lib/cmsMedia";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Expected multipart/form-data." },
      { status: 400 }
    );
  }
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, message: "Missing file field." },
      { status: 400 }
    );
  }
  if (file.size === 0) {
    return NextResponse.json(
      { ok: false, message: "File is empty." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, message: "File is larger than 10 MB." },
      { status: 413 }
    );
  }

  const altText =
    typeof form.get("altText") === "string"
      ? (form.get("altText") as string)
      : "";
  const caption =
    typeof form.get("caption") === "string"
      ? (form.get("caption") as string)
      : "";

  const bytes = new Uint8Array(await file.arrayBuffer());
  const result = await uploadMedia({
    bytes,
    fileName: file.name,
    contentType: file.type || "application/octet-stream",
    altText,
    caption,
  });
  if (!result.ok) {
    const status = result.reason === "Supabase is not configured." ? 503 : 502;
    return NextResponse.json(
      { ok: false, message: result.reason },
      { status }
    );
  }
  return NextResponse.json({ ok: true, row: result.row });
}
