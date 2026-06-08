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
  pageUrl?: unknown;
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

  // Page URL precedence: explicit pageUrl field in body, then the
  // Referer header (set automatically by the browser when the form posts
  // from a website page), then the source label, then "(unknown)".
  const referer = request.headers.get("referer") ?? "";
  const pageUrl = str(body.pageUrl) || referer;

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
    pageUrl: pageUrl || undefined,
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
