"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  PenSquare,
  ExternalLink,
  CheckCircle2,
  Circle,
  Newspaper,
} from "lucide-react";
import type { BlogListItem, BlogStatus } from "@/lib/cmsBlogs";

interface BlogsListViewProps {
  initial: BlogListItem[];
}

export function BlogsListView({ initial }: BlogsListViewProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BlogStatus | "all">("all");

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return initial.filter((row) => {
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      if (!q) return true;
      return [row.title, row.slug, row.excerpt ?? "", row.category ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [initial, search, statusFilter]);

  const counts = useMemo(() => {
    let drafts = 0;
    let published = 0;
    for (const r of initial) {
      if (r.status === "draft") drafts++;
      else published++;
    }
    return { all: initial.length, draft: drafts, published };
  }, [initial]);

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-carbon-500" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search title, slug, excerpt, category"
          className="w-full rounded-xl border border-carbon-700 bg-carbon-900/60 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500/60 focus:outline-none focus:ring-1 focus:ring-mint-500/40"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Chip
          active={statusFilter === "all"}
          onClick={() => setStatusFilter("all")}
          label="All"
          count={counts.all}
        />
        <Chip
          active={statusFilter === "published"}
          onClick={() => setStatusFilter("published")}
          label="Published"
          count={counts.published}
        />
        <Chip
          active={statusFilter === "draft"}
          onClick={() => setStatusFilter("draft")}
          label="Drafts"
          count={counts.draft}
        />
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-carbon-800 bg-carbon-900/40 p-10 text-center text-carbon-400">
          <Newspaper className="h-8 w-8" />
          <p className="text-sm">
            {initial.length === 0
              ? "No blog posts yet. Click Add post to write the first one."
              : "No posts match this filter."}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((row) => (
            <BlogCard key={row.id} row={row} />
          ))}
        </div>
      )}
    </div>
  );
}

function BlogCard({ row }: { row: BlogListItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-carbon-800 bg-carbon-900/40">
      <div className="aspect-video bg-black">
        {row.featured_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.featured_image_url}
            alt=""
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-carbon-500">
            No featured image
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          {row.status === "published" ? (
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
          {row.category && (
            <span className="text-[10px] uppercase tracking-wider text-carbon-400">
              {row.category}
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold uppercase tracking-tight text-white">
          {row.title}
        </h3>
        {row.excerpt && (
          <p className="mt-2 line-clamp-3 text-xs text-carbon-300">
            {row.excerpt}
          </p>
        )}
        <p className="mt-3 text-[11px] text-carbon-400">
          Updated{" "}
          {new Date(row.updated_at).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <Link
            href={`/admin/blogs/${row.id}`}
            className="inline-flex items-center gap-1 rounded-md border border-mint-500/40 bg-mint-500/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-mint-300 hover:bg-mint-500/15"
          >
            <PenSquare className="h-3 w-3" />
            Edit
          </Link>
          {row.status === "published" && (
            <a
              href={`/blogs/${row.slug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-carbon-700 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-carbon-300 hover:border-mint-500/40"
            >
              <ExternalLink className="h-3 w-3" />
              View
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Chip({
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
