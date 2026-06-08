import type { SupabaseClient } from "@supabase/supabase-js";

// Server-side Supabase client factory for EKBC.
//
// Reads credentials at runtime from the Hostinger environment. The
// service role key is preferred when present because it bypasses RLS
// for admin reads / writes from the Node.js process; if it is absent
// the anon key is used and you must configure RLS policies on the
// `quote_leads` table that allow inserts and selects from the server.
// Both keys are read from env vars and never embedded in source.
//
// Returns null when Supabase is not configured, when the
// @supabase/supabase-js package can't be loaded at runtime, or when
// any other initialisation error occurs - so the quote form keeps
// working through SMTP alone even if anything Supabase-related breaks.

let cached: SupabaseClient | null = null;
let cachedKeyKind: "service" | "anon" | null = null;
let initialised = false;

export type QuoteLeadStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "won"
  | "lost";

export const QUOTE_LEAD_STATUSES: QuoteLeadStatus[] = [
  "new",
  "contacted",
  "quoted",
  "won",
  "lost",
];

export interface QuoteLeadRow {
  id: string;
  created_at: string;
  reference: string;
  name: string;
  phone: string;
  email: string;
  service_type: string | null;
  property_type: string | null;
  district: string | null;
  postcode: string | null;
  message: string | null;
  page_url: string | null;
  source: string | null;
  submitted_at: string;
  status: QuoteLeadStatus;
  notes: string;
  delivery_mode: string | null;
  delivery_ok: boolean | null;
}

export interface QuoteLeadInsert {
  reference: string;
  name: string;
  phone: string;
  email: string;
  service_type: string | null;
  property_type: string | null;
  district: string | null;
  postcode: string | null;
  message: string | null;
  page_url: string | null;
  source: string | null;
  submitted_at: string;
  delivery_mode: string;
  delivery_ok: boolean;
}

export async function getSupabaseServer(): Promise<SupabaseClient | null> {
  if (initialised) return cached;
  const url = process.env.SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();
  const key = serviceKey || anonKey;
  if (!url || !key) {
    initialised = true;
    return null;
  }
  try {
    // Lazy import so a missing @supabase/supabase-js install at runtime
    // can never crash the rest of the app. Failures here drop us back
    // to the null fallback - SMTP keeps working.
    const mod = await import("@supabase/supabase-js");
    cached = mod.createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    cachedKeyKind = serviceKey ? "service" : "anon";
  } catch (err) {
    console.error(
      "[ekbc.supabase]",
      `init failed: ${(err as Error).message}`
    );
    cached = null;
  }
  initialised = true;
  return cached;
}

export async function getSupabaseKeyKind(): Promise<"service" | "anon" | null> {
  await getSupabaseServer();
  return cachedKeyKind;
}

export const QUOTE_LEADS_TABLE = "quote_leads";
