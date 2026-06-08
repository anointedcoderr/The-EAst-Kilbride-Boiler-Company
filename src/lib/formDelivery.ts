// Form delivery adapter for the quote request flow.
//
// Three delivery modes selected at runtime via env vars:
//
//   EKBC_FORM_DELIVERY_MODE=mock     - default. Logs the submission to the
//                                      server console only. Used in staging
//                                      before email credentials are wired.
//   EKBC_FORM_DELIVERY_MODE=webhook  - POSTs the submission as JSON to the
//                                      URL in EKBC_FORM_WEBHOOK_URL. Plug
//                                      into Zapier, Make, or any custom
//                                      ingest endpoint that emails on
//                                      receipt. Use during deployment until
//                                      direct SMTP is connected.
//   EKBC_FORM_DELIVERY_MODE=smtp     - reserved for production SMTP via
//                                      Hostinger. Requires the nodemailer
//                                      package and the SMTP_* env vars
//                                      below. Currently returns a "not
//                                      configured" error so staging never
//                                      claims emails were sent.
//
// SMTP env vars (used by the smtp mode once nodemailer is installed):
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO
//
// Webhook env var:
//   EKBC_FORM_WEBHOOK_URL
//
// The adapter never displays "email sent" to the user. The route handler
// returns ok/fail and a mode string. The QuoteForm shows the agreed thank
// you message regardless of mode, since the customer only needs to know
// that the request was received.

export interface QuoteFormSubmission {
  serviceType: string;
  propertyType: string;
  district: string;
  postcode: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  submittedAt: string;
  source?: string;
}

export type FormDeliveryMode = "mock" | "webhook" | "smtp";

export interface FormDeliveryResult {
  ok: boolean;
  mode: FormDeliveryMode;
  message: string;
  reference?: string;
}

function getMode(): FormDeliveryMode {
  const raw = (process.env.EKBC_FORM_DELIVERY_MODE ?? "mock")
    .trim()
    .toLowerCase();
  if (raw === "webhook" || raw === "smtp" || raw === "mock") return raw;
  return "mock";
}

function safeRef(): string {
  return `ekbc-${Date.now().toString(36)}-${Math.floor(
    Math.random() * 1e6
  ).toString(36)}`;
}

async function deliverMock(
  submission: QuoteFormSubmission
): Promise<FormDeliveryResult> {
  const reference = safeRef();
  // Server-only console log. Visible in Vercel deploy logs and local
  // `npm run dev` so we can confirm the flow during staging.
  console.log(
    "[ekbc.quote.mock]",
    JSON.stringify({ reference, ...submission })
  );
  return {
    ok: true,
    mode: "mock",
    message:
      "Quote request captured in staging log. Live email delivery activates when Hostinger SMTP or a webhook URL is configured.",
    reference,
  };
}

async function deliverWebhook(
  submission: QuoteFormSubmission
): Promise<FormDeliveryResult> {
  const url = process.env.EKBC_FORM_WEBHOOK_URL;
  if (!url) {
    return {
      ok: false,
      mode: "webhook",
      message:
        "Webhook mode selected but EKBC_FORM_WEBHOOK_URL is not set. Falling back to staging log.",
    };
  }
  const reference = safeRef();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference, ...submission }),
    });
    if (!res.ok) {
      return {
        ok: false,
        mode: "webhook",
        message: `Webhook returned status ${res.status}.`,
        reference,
      };
    }
    return {
      ok: true,
      mode: "webhook",
      message: "Quote request sent to webhook.",
      reference,
    };
  } catch (err) {
    return {
      ok: false,
      mode: "webhook",
      message: `Webhook delivery failed: ${(err as Error).message}`,
      reference,
    };
  }
}

async function deliverSmtp(): Promise<FormDeliveryResult> {
  // SMTP transport is reserved for production once Hostinger credentials
  // are connected and nodemailer is installed. While unconfigured, return
  // a clear not-configured response rather than silently swallowing the
  // submission.
  return {
    ok: false,
    mode: "smtp",
    message:
      "SMTP delivery is not configured yet. Install nodemailer and set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM and SMTP_TO during Hostinger deployment.",
  };
}

export async function deliverQuoteForm(
  submission: QuoteFormSubmission
): Promise<FormDeliveryResult> {
  const mode = getMode();
  switch (mode) {
    case "webhook":
      return deliverWebhook(submission);
    case "smtp":
      return deliverSmtp();
    case "mock":
    default:
      return deliverMock(submission);
  }
}
