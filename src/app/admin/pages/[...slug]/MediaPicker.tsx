"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, X, Image as ImageIcon } from "lucide-react";
import type { MediaRow } from "@/lib/cmsMedia";

interface MediaPickerProps {
  onSelect: (row: MediaRow) => void;
  onClose: () => void;
  // Limit the picker to a specific kind of asset. Defaults to images
  // (used by image blocks); video blocks pass "video".
  filter?: "image" | "video" | "any";
}

export function MediaPicker({
  onSelect,
  onClose,
  filter = "image",
}: MediaPickerProps) {
  const [rows, setRows] = useState<MediaRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/media/list");
        const body = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          rows?: MediaRow[];
          message?: string;
        };
        if (!res.ok || body.ok === false) {
          throw new Error(body.message || `HTTP ${res.status}`);
        }
        if (!cancelled) setRows(body.rows ?? []);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = (rows ?? []).filter((r) => {
    if (filter === "image" && !r.file_type.startsWith("image/")) return false;
    if (filter === "video" && !r.file_type.startsWith("video/")) return false;
    if (!search) return true;
    const q = search.trim().toLowerCase();
    return [r.file_name, r.alt_text, r.caption]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="flex h-full max-h-[80vh] w-full max-w-3xl flex-col rounded-2xl border border-mint-500/30 bg-carbon-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2 border-b border-carbon-800 p-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {filter === "video" ? "Pick a video" : "Pick an image"}
            </h3>
            <p className="mt-1 text-xs text-carbon-400">
              {filter === "video"
                ? "Click a video to use it, or paste a YouTube / Vimeo URL in the block instead."
                : "Click an image to use it."}{" "}
              Upload new files in the
              <span className="text-mint-400"> Media library</span> first.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded p-1 text-carbon-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-carbon-800 p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-carbon-500" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files"
              className="w-full rounded-lg border border-carbon-700 bg-carbon-800 py-2 pl-10 pr-3 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500/60 focus:outline-none focus:ring-1 focus:ring-mint-500/40"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {error && (
            <p className="rounded-lg border border-rose-400/40 bg-rose-500/10 p-3 text-sm text-rose-200">
              {error}
            </p>
          )}
          {rows === null && !error && (
            <div className="flex items-center justify-center gap-2 p-10 text-sm text-carbon-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          )}
          {rows !== null && visible.length === 0 && (
            <div className="flex flex-col items-center gap-2 p-10 text-center text-sm text-carbon-400">
              <ImageIcon className="h-6 w-6" />
              {rows.length === 0
                ? "No files in the media library yet."
                : "No files match your search."}
            </div>
          )}
          {visible.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {visible.map((row) => (
                <button
                  type="button"
                  key={row.id}
                  onClick={() => onSelect(row)}
                  className="overflow-hidden rounded-xl border border-carbon-800 bg-carbon-900/40 text-left transition-colors hover:border-mint-500/60"
                >
                  <div className="relative aspect-square bg-black">
                    {row.file_type.startsWith("image/") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={row.file_url}
                        alt={row.alt_text || row.file_name}
                        loading="lazy"
                        decoding="async"
                        className="block h-full w-full object-cover"
                      />
                    ) : row.file_type.startsWith("video/") ? (
                      <video
                        src={row.file_url}
                        muted
                        playsInline
                        preload="metadata"
                        className="block h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-carbon-400">
                        {row.file_type}
                      </div>
                    )}
                    {row.file_type.startsWith("video/") && (
                      <span className="absolute right-1.5 top-1.5 rounded-full bg-black/70 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-mint-300">
                        Video
                      </span>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="truncate text-[11px] font-bold text-white">
                      {row.file_name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
