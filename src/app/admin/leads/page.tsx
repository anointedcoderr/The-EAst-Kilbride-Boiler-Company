import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { listQuoteLeads } from "@/lib/quoteLeads";
import { LeadsView } from "./LeadsView";

export const metadata: Metadata = {
  title: "Leads | EKBC Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLeadsPage() {
  const { rows, error } = await listQuoteLeads({ limit: 500 });

  return (
    <div className="min-h-screen bg-carbon-950 text-white">
      <header className="sticky top-0 z-30 border-b border-carbon-800 bg-carbon-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-carbon-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 transition-colors hover:border-mint-500/50 hover:text-mint-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to admin
            </Link>
            <h1 className="text-base font-bold uppercase tracking-wider text-white">
              Quote leads
            </h1>
            <span className="hidden sm:inline-flex items-center rounded-full border border-mint-500/40 bg-mint-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mint-400">
              Live
            </span>
          </div>
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 hover:text-mint-400"
          >
            View site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {error ? (
          <div className="rounded-xl border border-amber-400/40 bg-amber-500/10 p-5 text-sm text-amber-100">
            <p className="font-bold">Leads unavailable.</p>
            <p className="mt-1 text-amber-100/90">{error}</p>
            <p className="mt-3 text-xs text-amber-100/80">
              Confirm SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or
              SUPABASE_ANON_KEY) are set in Hostinger and the quote_leads
              table exists.
            </p>
          </div>
        ) : (
          <LeadsView initialRows={rows} />
        )}
      </div>
    </div>
  );
}
