import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { listMedia } from "@/lib/cmsMedia";
import { MediaLibrary } from "./MediaLibrary";

export const metadata: Metadata = {
  title: "Media library | EKBC Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminMediaPage() {
  const { rows, error } = await listMedia({ limit: 500 });

  return (
    <div className="min-h-screen bg-carbon-950 text-white">
      <header className="sticky top-0 z-30 border-b border-carbon-800 bg-carbon-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 rounded-full border border-carbon-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 transition-colors hover:border-mint-500/50 hover:text-mint-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to dashboard
            </Link>
            <h1 className="text-base font-bold uppercase tracking-wider text-white">
              Media library
            </h1>
            <span className="inline-flex items-center rounded-full border border-mint-500/40 bg-mint-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mint-400">
              {rows.length} files
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {error ? (
          <div className="flex items-start gap-2 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-5 text-sm text-amber-100">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">Media library unavailable.</p>
              <p className="mt-1">{error}</p>
              <p className="mt-3 text-xs text-amber-100/80">
                Confirm Supabase env vars are set and that you've created
                the <code className="rounded bg-amber-500/20 px-1.5 py-0.5">ekbc-media</code> storage bucket
                with the policies from <code className="rounded bg-amber-500/20 px-1.5 py-0.5">db/cms-phase-4-storage.sql</code>.
              </p>
            </div>
          </div>
        ) : (
          <MediaLibrary initial={rows} />
        )}
      </div>
    </div>
  );
}
