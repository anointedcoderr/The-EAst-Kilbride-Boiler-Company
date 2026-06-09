import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { listAllPages } from "@/lib/cmsPages";
import { PagesListView } from "./PagesListView";

export const metadata: Metadata = {
  title: "Manage pages | EKBC Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPagesPage() {
  const pages = await listAllPages();

  return (
    <div className="min-h-screen bg-carbon-950 text-white">
      <header className="sticky top-0 z-30 border-b border-carbon-800 bg-carbon-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-carbon-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 transition-colors hover:border-mint-500/50 hover:text-mint-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to dashboard
            </Link>
            <h1 className="text-base font-bold uppercase tracking-wider text-white">
              Manage pages
            </h1>
            <span className="inline-flex items-center rounded-full border border-mint-500/40 bg-mint-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mint-400">
              {pages.length} pages
            </span>
          </div>
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 hover:text-mint-400"
          >
            Open live site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <PagesListView initialPages={pages} />
      </div>
    </div>
  );
}
