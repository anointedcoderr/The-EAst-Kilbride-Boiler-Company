import type SMTPTransport from "nodemailer/lib/smtp-transport";

// Form delivery adapter for the quote request flow.
//
// Delivery mode is selected at runtime via EKBC_FORM_DELIVERY_MODE.
// Secrets are read from environment variables and never embedded in
// source. The customer-facing thank-you message ("Thank you. We will
// send your custom quote over as soon as possible.") is shown by the
// QuoteForm regardless of mode - this layer only logs the result and
// returns ok/fail to the API route.
//
// Modes:
//
//   EKBC_FORM_DELIVERY_MODE=mock     - default. Logs the submission to
//                                      the server console only. Used in
//                                      staging before email credentials
//                                      are wired.
//   EKBC_FORM_DELIVERY_MODE=webhook  - POSTs the submission as JSON to
//                                      EKBC_FORM_WEBHOOK_URL.
//   EKBC_FORM_DELIVERY_MODE=smtp     - production SMTP via nodemailer.
//                                      Requires the SMTP_* / QUOTE_FORM_TO
//                                      env vars below.
//
// SMTP env vars (smtp mode):
//   SMTP_HOST         e.g. smtp.hostinger.com
//   SMTP_PORT         e.g. 465
//   SMTP_SECURE       "true" for port 465, "false" for STARTTLS (587)
//   SMTP_USER         mailbox user (typically the From address)
//   SMTP_PASS         mailbox password
//   SMTP_FROM         From header, e.g.
//                     'The East Kilbride Boiler Company <info@...>'
//   QUOTE_FORM_TO     recipient mailbox for quote leads
//
// Webhook env var:
//   EKBC_FORM_WEBHOOK_URL

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
  pageUrl?: string;
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
        "Webhook mode selected but EKBC_FORM_WEBHOOK_URL is not set.",
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

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
}

function readSmtpConfig(): SmtpConfig | { missing: string[] } {
  const required: Array<[keyof SmtpConfig | "raw_port", string]> = [
    ["host", "SMTP_HOST"],
    ["raw_port", "SMTP_PORT"],
    ["user", "SMTP_USER"],
    ["pass", "SMTP_PASS"],
    ["from", "SMTP_FROM"],
    ["to", "QUOTE_FORM_TO"],
  ];
  const env = process.env;
  const missing: string[] = [];
  const rawPort = env.SMTP_PORT?.trim();
  const host = env.SMTP_HOST?.trim();
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS;
  const from = env.SMTP_FROM?.trim();
  const to = env.QUOTE_FORM_TO?.trim();

  for (const [, name] of required) {
    const value =
      name === "SMTP_HOST"
        ? host
        : name === "SMTP_PORT"
          ? rawPort
          : name === "SMTP_USER"
            ? user
            : name === "SMTP_PASS"
              ? pass
              : name === "SMTP_FROM"
                ? from
                : name === "QUOTE_FORM_TO"
                  ? to
                  : undefined;
    if (!value) missing.push(name);
  }
  if (missing.length > 0) return { missing };

  const port = Number.parseInt(rawPort as string, 10);
  if (!Number.isFinite(port) || port <= 0 || port > 65535) {
    return { missing: ["SMTP_PORT (invalid number)"] };
  }

  const secureRaw = (env.SMTP_SECURE ?? "").trim().toLowerCase();
  const secure =
    secureRaw === "true" || secureRaw === "1" || secureRaw === "yes"
      ? true
      : secureRaw === "false" || secureRaw === "0" || secureRaw === "no"
        ? false
        : port === 465;

  return {
    host: host as string,
    port,
    secure,
    user: user as string,
    pass: pass as string,
    from: from as string,
    to: to as string,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatSubmittedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      timeZone: "Europe/London",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function buildEmailBodies(
  submission: QuoteFormSubmission,
  reference: string
): { text: string; html: string } {
  const submittedAt = formatSubmittedAt(submission.submittedAt);
  const fields: Array<[string, string]> = [
    ["Customer name", submission.name],
    ["Phone number", submission.phone],
    ["Email address", submission.email],
    ["Service selected", submission.serviceType || "(not provided)"],
    ["Property type", submission.propertyType || "(not provided)"],
    [
      "Area / postcode",
      [submission.district, submission.postcode].filter(Boolean).join(" - ") ||
        "(not provided)",
    ],
    ["Message / details", submission.message || "(none)"],
    ["Page submitted from", submission.pageUrl || submission.source || "(unknown)"],
    ["Date / time submitted", submittedAt],
    ["Reference", reference],
  ];

  const text = fields
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  const rows = fields
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#0a3d26;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr>
        <td style="background:#0a3d26;color:#ffffff;padding:20px 24px;">
          <h1 style="margin:0;font-size:18px;font-weight:700;">New quote request</h1>
          <p style="margin:4px 0 0;font-size:13px;color:#A3FED6;">The East Kilbride Boiler Company</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px 8px;font-size:14px;color:#374151;">
          A homeowner has submitted a quote request through the website. Reply directly to this email to respond.
        </td>
      </tr>
      <tr>
        <td style="padding:0 24px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-size:14px;">
            ${rows}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { text, html };
}

async function deliverSmtp(
  submission: QuoteFormSubmission
): Promise<FormDeliveryResult> {
  const reference = safeRef();
  const config = readSmtpConfig();
  if ("missing" in config) {
    const message = `SMTP delivery not configured. Missing env vars: ${config.missing.join(", ")}`;
    console.error("[ekbc.quote.smtp]", message);
    return { ok: false, mode: "smtp", message, reference };
  }

  // Import nodemailer lazily so a build that never goes near smtp mode
  // doesn't pull it into the route's cold-start bundle unnecessarily.
  let nodemailer: typeof import("nodemailer");
  try {
    nodemailer = await import("nodemailer");
  } catch (err) {
    const message = `Failed to load nodemailer: ${(err as Error).message}`;
    console.error("[ekbc.quote.smtp]", message);
    return { ok: false, mode: "smtp", message, reference };
  }

  const transportOptions: SMTPTransport.Options = {
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  };

  const transporter = nodemailer.createTransport(transportOptions);
  const { text, html } = buildEmailBodies(submission, reference);

  try {
    const info = await transporter.sendMail({
      from: config.from,
      to: config.to,
      replyTo: submission.email || undefined,
      subject: "New Quote Request - East Kilbride Boiler Company",
      text,
      html,
    });
    console.log("[ekbc.quote.smtp]", "sent", {
      reference,
      messageId: info.messageId,
    });
    return {
      ok: true,
      mode: "smtp",
      message: "Quote request emailed.",
      reference,
    };
  } catch (err) {
    const message = `SMTP send failed: ${(err as Error).message}`;
    console.error("[ekbc.quote.smtp]", message, { reference });
    return { ok: false, mode: "smtp", message, reference };
  }
}

export async function deliverQuoteForm(
  submission: QuoteFormSubmission
): Promise<FormDeliveryResult> {
  const mode = getMode();
  switch (mode) {
    case "webhook":
      return deliverWebhook(submission);
    case "smtp":
      return deliverSmtp(submission);
    case "mock":
    default:
      return deliverMock(submission);
  }
}
