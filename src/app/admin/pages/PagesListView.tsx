"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ExternalLink,
  PenSquare,
  CheckCircle2,
  Circle,
  FileText,
} from "lucide-react";
import type { CmsPageType, PageListing } from "@/lib/cmsPages";

interface PagesListViewProps {
  initialPages: PageListing[];
}

const PAGE_TYPE_LABELS: Record<CmsPageType, string> = {
  homepage: "Homepage",
  service: "Service pages",
  boilers: "Boilers index",
  brand: "Brand pages",
  "blog-index": "Blog index",
  "blog-post": "Blog posts",
  "areas-hub": "Areas hub",
  "postcode-hub": "G74 / G75 hubs",
  district: "District pages",
  static: "Other pages",
};

const TYPE_ORDER: CmsPageType[] = [
  "homepage",
  "service",
  "boilers",
  "brand",
  "postcode-hub",
  "areas-hub",
  "district",
  "blog-index",
  "blog-post",
  "static",
];

export function PagesListView({ initialPages }: PagesListViewProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<CmsPageType | "all">("all");

  const typeCounts = useMemo(() => {
    const c: Record<string, number> = { all: initialPages.length };
    for (const p of initialPages) {
      c[p.pageType] = (c[p.pageType] ?? 0) + 1;
    }
    return c;
  }, [initialPages]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    let filtered = initialPages;
    if (typeFilter !== "all") {
      filtered = filtered.filter((p) => p.pageType === typeFilter);
    }
    if (q) {
      filtered = filtered.filter((p) =>
        [p.slug, p.title, p.pageType, p.postcodeArea ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    return filtered;
  }, [initialPages, search, typeFilter]);

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-carbon-500" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, URL, type or postcode"
          className="w-full rounded-xl border border-carbon-700 bg-carbon-900/60 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500/60 focus:outline-none focus:ring-1 focus:ring-mint-500/40"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <FilterChip
          active={typeFilter === "all"}
          onClick={() => setTypeFilter("all")}
          label="All"
          count={typeCounts.all ?? 0}
        />
        {TYPE_ORDER.filter((t) => typeCounts[t]).map((t) => (
          <FilterChip
            key={t}
            active={typeFilter === t}
            onClick={() => setTypeFilter(t)}
            label={PAGE_TYPE_LABELS[t]}
            count={typeCounts[t] ?? 0}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-carbon-800 bg-carbon-900/40 p-10 text-center text-carbon-400">
          <FileText className="h-8 w-8" />
          <p className="text-sm">No pages match this filter.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-carbon-800 bg-carbon-900/40">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-carbon-900 text-[11px] font-bold uppercase tracking-wider text-carbon-400">
                <tr>
                  <th className="px-3 py-2.5">Title</th>
                  <th className="px-3 py-2.5">URL</th>
                  <th className="px-3 py-2.5">Type</th>
                  <th className="px-3 py-2.5">Postcode</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5">Last updated</th>
                  <th className="px-3 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-carbon-800">
                {visible.map((page) => (
                  <PageRow key={page.slug} page={page} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function PageRow({ page }: { page: PageListing }) {
  const editHref = `/admin/pages${page.slug.replace(/\/$/, "")}`;
  return (
    <tr className="align-top hover:bg-carbon-900/60">
      <td className="px-3 py-3">
        <div className="font-semibold text-white">{page.title}</div>
        {page.inCms ? (
          <span className="text-[11px] text-mint-400">In CMS</span>
        ) : (
          <span className="text-[11px] text-carbon-400">Using defaults</span>
        )}
      </td>
      <td className="px-3 py-3 text-xs text-carbon-300">
        <code className="rounded bg-carbon-900 px-1.5 py-0.5">{page.slug}</code>
      </td>
      <td className="px-3 py-3 text-xs text-carbon-300">{page.pageType}</td>
      <td className="px-3 py-3 text-xs text-carbon-300">
        {page.postcodeArea ?? "-"}
      </td>
      <td className="px-3 py-3">
        {page.isPublished ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-mint-500/40 bg-mint-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mint-300">
            <CheckCircle2 className="h-3 w-3" />
            Published
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200">
            <Circle className="h-3 w-3" />
            Draft
          </span>
        )}
      </td>
      <td className="px-3 py-3 text-[11px] text-carbon-400">
        {page.lastUpdated
          ? new Date(page.lastUpdated).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "-"}
      </td>
      <td className="whitespace-nowrap px-3 py-3 text-right">
        <Link
          href={editHref}
          className="mr-2 inline-flex items-center gap-1 rounded-md border border-mint-500/40 bg-mint-500/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-mint-300 hover:bg-mint-500/15"
        >
          <PenSquare className="h-3 w-3" />
          Edit
        </Link>
        <a
          href={page.slug}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-carbon-700 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-carbon-300 hover:border-mint-500/40 hover:text-mint-400"
        >
          <ExternalLink className="h-3 w-3" />
          View
        </a>
      </td>
    </tr>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
        active
          ? "border-mint-500/60 bg-mint-500/10 text-mint-300"
          : "border-carbon-700 bg-carbon-900/40 text-carbon-300 hover:border-carbon-600 hover:text-white"
      }`}
    >
      <span>{label}</span>
      <span className="rounded-full border border-current/30 px-1.5 text-[10px]">
        {count}
      </span>
    </button>
  );
}
