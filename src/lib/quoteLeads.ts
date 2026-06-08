import {
  getSupabaseServer,
  QUOTE_LEADS_TABLE,
  QUOTE_LEAD_STATUSES,
  type QuoteLeadInsert,
  type QuoteLeadRow,
  type QuoteLeadStatus,
} from "./supabase";

// Quote lead persistence layer. All functions return safely when
// Supabase is not configured (env vars missing) so the rest of the
// app keeps working. Failures are logged server-side; the API route
// never fails the customer because the DB hiccupped.

export async function persistQuoteLead(
  input: QuoteLeadInsert
): Promise<{ ok: boolean; reason?: string }> {
  const supabase = await getSupabaseServer();
  if (!supabase) {
    console.log("[ekbc.quote.db]", "skipped (Supabase not configured)");
    return { ok: false, reason: "not-configured" };
  }
  const { error } = await supabase.from(QUOTE_LEADS_TABLE).insert(input);
  if (error) {
    console.error("[ekbc.quote.db]", "insert failed", {
      reference: input.reference,
      message: error.message,
    });
    return { ok: false, reason: error.message };
  }
  console.log("[ekbc.quote.db]", "inserted", { reference: input.reference });
  return { ok: true };
}

export interface ListLeadsOptions {
  status?: QuoteLeadStatus | "all";
  limit?: number;
}

export async function listQuoteLeads(
  options: ListLeadsOptions = {}
): Promise<{ rows: QuoteLeadRow[]; error: string | null }> {
  const supabase = await getSupabaseServer();
  if (!supabase) {
    return { rows: [], error: "Supabase is not configured." };
  }
  const limit = Math.max(1, Math.min(options.limit ?? 200, 1000));
  let query = supabase
    .from(QUOTE_LEADS_TABLE)
    .select("*")
    .order("submitted_at", { ascending: false })
    .limit(limit);
  if (options.status && options.status !== "all") {
    query = query.eq("status", options.status);
  }
  const { data, error } = await query;
  if (error) {
    console.error("[ekbc.quote.db]", "list failed", { message: error.message });
    return { rows: [], error: error.message };
  }
  return { rows: (data ?? []) as QuoteLeadRow[], error: null };
}

export function isQuoteLeadStatus(value: unknown): value is QuoteLeadStatus {
  return (
    typeof value === "string" &&
    (QUOTE_LEAD_STATUSES as string[]).includes(value)
  );
}

export async function updateQuoteLead(
  id: string,
  patch: { status?: QuoteLeadStatus; notes?: string }
): Promise<{ ok: boolean; reason?: string }> {
  const supabase = await getSupabaseServer();
  if (!supabase) return { ok: false, reason: "not-configured" };
  const update: Record<string, unknown> = {};
  if (patch.status) update.status = patch.status;
  if (typeof patch.notes === "string") update.notes = patch.notes;
  if (Object.keys(update).length === 0) {
    return { ok: false, reason: "no-fields-to-update" };
  }
  const { error } = await supabase
    .from(QUOTE_LEADS_TABLE)
    .update(update)
    .eq("id", id);
  if (error) {
    console.error("[ekbc.quote.db]", "update failed", {
      id,
      message: error.message,
    });
    return { ok: false, reason: error.message };
  }
  return { ok: true };
}
