import { NextResponse } from "next/server";
import { listMedia } from "@/lib/cmsMedia";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("q") ?? undefined;
  const { rows, error } = await listMedia({ search, limit: 500 });
  if (error) {
    const status = error === "Supabase is not configured." ? 503 : 502;
    return NextResponse.json(
      { ok: false, message: error },
      { status }
    );
  }
  return NextResponse.json({ ok: true, rows });
}
