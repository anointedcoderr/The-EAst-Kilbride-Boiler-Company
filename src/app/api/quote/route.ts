import { NextResponse } from "next/server";
import {
  deliverQuoteForm,
  type QuoteFormSubmission,
} from "@/lib/formDelivery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface IncomingBody {
  serviceType?: unknown;
  propertyType?: unknown;
  district?: unknown;
  postcode?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
  source?: unknown;
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
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

  const submission: QuoteFormSubmission = {
    serviceType: str(body.serviceType),
    propertyType: str(body.propertyType),
    district: str(body.district),
    postcode: str(body.postcode),
    name: str(body.name),
    phone: str(body.phone),
    email: str(body.email),
    message: str(body.message),
    submittedAt: new Date().toISOString(),
    source: str(body.source) || "website-quote-form",
  };

  if (!submission.name || !submission.phone || !submission.email) {
    return NextResponse.json(
      { ok: false, message: "Name, phone and email are required." },
      { status: 400 }
    );
  }

  const result = await deliverQuoteForm(submission);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
