"use client";

import { useRef, useState } from "react";
import {
  Search,
  Upload,
  Copy,
  Trash2,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  X,
  Save,
} from "lucide-react";
import type { MediaRow } from "@/lib/cmsMedia";

interface MediaLibraryProps {
  initial: MediaRow[];
}

const MAX_BYTES = 50 * 1024 * 1024;
const MAX_LABEL = "50 MB";

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }
  return `${bytes} bytes`;
}

export function MediaLibrary({ initial }: MediaLibraryProps) {
  const [rows, setRows] = useState<MediaRow[]>(initial);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [editing, setEditing] = useState<MediaRow | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const visible = rows.filter((r) => {
    if (!search) return true;
    const q = search.trim().toLowerCase();
    return [r.file_name, r.alt_text, r.caption]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  function flash(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }

  async function handleFiles(files: FileList) {
    setError(null);

    // Client-side size check before we waste bandwidth. The API
    // enforces the same limit, but rejecting up front gives instant
    // feedback and a clear message.
    const oversize: string[] = [];
    for (const file of Array.from(files)) {
      if (file.size > MAX_BYTES) {
        oversize.push(`${file.name} (${formatBytes(file.size)})`);
      }
    }
    if (oversize.length > 0) {
      setError(
        `Files larger than ${MAX_LABEL} can't be uploaded: ${oversize.join(", ")}. ` +
          "For longer videos, paste a YouTube or Vimeo URL into a video block instead."
      );
      if (fileInput.current) fileInput.current.value = "";
      return;
    }

    setUploading(true);
    const uploaded: MediaRow[] = [];
    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/admin/media", {
          method: "POST",
          body: form,
        });
        const body = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          row?: MediaRow;
          message?: string;
        };
        if (!res.ok || !body.ok || !body.row) {
          // Translate common Supabase Storage errors into clearer
          // language. The most common one is the bucket's own file
          // size limit being lower than our API's 50 MB cap.
          let msg = body.message || `HTTP ${res.status}`;
          if (/payload|maximum allowed size|too large/i.test(msg)) {
            msg =
              `Upload rejected by storage: ${file.name} (${formatBytes(file.size)}) ` +
              "is larger than the Supabase bucket's file size limit. " +
              "Raise it in Supabase Dashboard -> Storage -> ekbc-media -> Edit bucket.";
          }
          throw new Error(msg);
        }
        uploaded.push(body.row);
      }
      setRows((r) => [...uploaded, ...r]);
      flash(
        uploaded.length === 1
          ? "Uploaded 1 file."
          : `Uploaded ${uploaded.length} files.`
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      flash("URL copied.");
    } catch {
      flash("Could not copy.");
    }
  }

  async function deleteRow(row: MediaRow) {
    if (
      !confirm(
        `Delete ${row.file_name}? This permanently removes it from the website.`
      )
    ) {
      return;
    }
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/media/${encodeURIComponent(row.id)}`,
        { method: "DELETE" }
      );
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };
      if (!res.ok || body.ok === false) {
        throw new Error(body.message || `HTTP ${res.status}`);
      }
      setRows((r) => r.filter((x) => x.id !== row.id));
      flash("Deleted.");
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function saveMeta(row: MediaRow, altText: string, caption: string) {
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/media/${encodeURIComponent(row.id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ alt_text: altText, caption }),
        }
      );
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };
      if (!res.ok || body.ok === false) {
        throw new Error(body.message || `HTTP ${res.status}`);
      }
      setRows((r) =>
        r.map((x) =>
          x.id === row.id ? { ...x, alt_text: altText, caption } : x
        )
      );
      setEditing(null);
      flash("Saved.");
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-carbon-500" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by file name, alt text or caption"
            className="w-full rounded-xl border border-carbon-700 bg-carbon-900/60 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500/60 focus:outline-none focus:ring-1 focus:ring-mint-500/40"
          />
        </div>
        <input
          ref={fileInput}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-lg bg-mint-500 px-4 py-2 text-sm font-bold uppercase tracking-wider text-carbon-900 transition-colors hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload
            </>
          )}
        </button>
      </div>

      <p className="-mt-2 text-[11px] text-carbon-400">
        Images and videos up to <strong className="text-carbon-200">{MAX_LABEL}</strong> per file. For longer
        videos, paste a YouTube or Vimeo URL into a video block instead.
      </p>

      {toast && (
        <div className="flex items-center gap-2 rounded-lg border border-mint-500/40 bg-mint-500/10 p-3 text-sm text-mint-200">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {toast}
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-rose-400/40 bg-rose-500/10 p-3 text-sm text-rose-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-carbon-800 bg-carbon-900/40 p-10 text-center text-carbon-400">
          <ImageIcon className="h-8 w-8" />
          <p className="text-sm">
            {rows.length === 0
              ? "No files yet. Click Upload to add an image."
              : "No files match your search."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((row) => (
            <article
              key={row.id}
              className="overflow-hidden rounded-xl border border-carbon-800 bg-carbon-900/40"
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
                  <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mint-300">
                    Video
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-xs font-bold text-white" title={row.file_name}>
                  {row.file_name}
                </p>
                <p className="mt-1 truncate text-[11px] text-carbon-400">
                  {row.alt_text || "No alt text"}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => copyUrl(row.file_url)}
                    title="Copy URL"
                    className="inline-flex items-center gap-1 rounded border border-carbon-700 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-carbon-300 hover:border-mint-500/40 hover:text-mint-300"
                  >
                    <Copy className="h-3 w-3" />
                    URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(row)}
                    title="Edit alt text"
                    className="inline-flex items-center gap-1 rounded border border-carbon-700 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-carbon-300 hover:border-mint-500/40 hover:text-mint-300"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteRow(row)}
                    title="Delete file"
                    className="ml-auto inline-flex items-center gap-1 rounded border border-carbon-700 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-300 hover:border-rose-400/40"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && (
        <EditMetaDialog
          row={editing}
          onClose={() => setEditing(null)}
          onSave={(alt, caption) => saveMeta(editing, alt, caption)}
        />
      )}
    </div>
  );
}

function EditMetaDialog({
  row,
  onClose,
  onSave,
}: {
  row: MediaRow;
  onClose: () => void;
  onSave: (alt: string, caption: string) => void | Promise<void>;
}) {
  const [alt, setAlt] = useState(row.alt_text);
  const [caption, setCaption] = useState(row.caption);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-mint-500/30 bg-carbon-900 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Edit details
            </h3>
            <p className="mt-1 truncate text-xs text-carbon-400">
              {row.file_name}
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
        <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
          {row.file_type.startsWith("image/") && (
            <div className="overflow-hidden rounded-lg border border-carbon-800 bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={row.file_url}
                alt={row.alt_text || row.file_name}
                className="block h-full w-full object-cover"
              />
            </div>
          )}
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-carbon-300">
                Alt text
              </label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Describe what is in the image"
                className="mt-1 w-full rounded-lg border border-carbon-600 bg-carbon-800 px-3 py-2 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-carbon-300">
                Caption (optional)
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Caption shown under the image"
                className="mt-1 w-full rounded-lg border border-carbon-600 bg-carbon-800 px-3 py-2 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-carbon-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 hover:border-mint-500/50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(alt, caption)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-mint-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-carbon-900 hover:bg-mint-400"
          >
            <Save className="h-3.5 w-3.5" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
