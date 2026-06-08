import { NextResponse } from "next/server";
import {
  isQuoteLeadStatus,
  updateQuoteLead,
} from "@/lib/quoteLeads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PatchBody {
  status?: unknown;
  notes?: unknown;
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json(
      { ok: false, message: "Missing lead id." },
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

  const status = isQuoteLeadStatus(body.status) ? body.status : undefined;
  const notes = typeof body.notes === "string" ? body.notes : undefined;
  if (!status && notes === undefined) {
    return NextResponse.json(
      { ok: false, message: "Provide status and/or notes." },
      { status: 400 }
    );
  }

  const result = await updateQuoteLead(id, { status, notes });
  if (!result.ok) {
    const code = result.reason === "not-configured" ? 503 : 502;
    return NextResponse.json(
      { ok: false, message: result.reason ?? "Update failed." },
      { status: code }
    );
  }

  return NextResponse.json({ ok: true });
}
