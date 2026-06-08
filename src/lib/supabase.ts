import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-side Supabase client factory for EKBC.
//
// Reads credentials at runtime from the Hostinger environment. The
// service role key is preferred when present because it bypasses RLS
// for admin reads / writes from the Node.js process; if it is absent
// the anon key is used and you must configure RLS policies on the
// `quote_leads` table that allow inserts and selects from the server.
// Both keys are read from env vars and never embedded in source.
//
// Returns null when Supabase is not configured so callers can fall back
// gracefully (the quote form keeps working off SMTP alone).

let cached: SupabaseClient | null = null;
let cachedKeyKind: "service" | "anon" | null = null;

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

export function getSupabaseServer(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();
  const key = serviceKey || anonKey;
  if (!url || !key) return null;
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  cachedKeyKind = serviceKey ? "service" : "anon";
  return cached;
}

export function getSupabaseKeyKind(): "service" | "anon" | null {
  // Touch the lazy init so the kind reflects the actual configured key.
  getSupabaseServer();
  return cachedKeyKind;
}

export const QUOTE_LEADS_TABLE = "quote_leads";
