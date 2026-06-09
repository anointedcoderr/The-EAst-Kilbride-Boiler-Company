import { NextResponse } from "next/server";
import { saveSiteSettings, type EditableSiteSettings } from "@/lib/siteContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface IncomingBody {
  patch?: unknown;
}

function pickPatch(input: unknown): Partial<EditableSiteSettings> {
  if (!input || typeof input !== "object") return {};
  const src = input as Record<string, unknown>;
  const out: Partial<EditableSiteSettings> = {};
  const stringFields: Array<keyof EditableSiteSettings> = [
    "businessName",
    "phone",
    "phoneHref",
    "publicEmail",
    "addressStreet",
    "addressCity",
    "addressRegion",
    "addressPostcode",
    "openingHours",
    "mainCtaText",
    "emergencyMessage",
    "footerText",
    "facebookUrl",
  ];
  for (const field of stringFields) {
    const value = src[field];
    if (typeof value === "string") out[field] = value as never;
  }
  if (typeof src.areasServedCount === "number") {
    out.areasServedCount = src.areasServedCount;
  } else if (typeof src.areasServedCount === "string") {
    const n = Number.parseInt(src.areasServedCount, 10);
    if (Number.isFinite(n) && n >= 0 && n < 10000) {
      out.areasServedCount = n;
    }
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

  const patch = pickPatch(body.patch);
  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { ok: false, message: "No editable fields provided." },
      { status: 400 }
    );
  }

  const result = await saveSiteSettings(patch);
  if (!result.ok) {
    const status = result.reason === "Supabase is not configured." ? 503 : 502;
    return NextResponse.json({ ok: false, message: result.reason }, { status });
  }
  return NextResponse.json({ ok: true });
}
