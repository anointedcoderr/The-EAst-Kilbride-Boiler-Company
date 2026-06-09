"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Save,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import type { Block } from "@/lib/cmsBlocks";
import type { BlogStatus } from "@/lib/cmsBlogs";
import type { MediaRow } from "@/lib/cmsMedia";
import { SectionsEditor } from "@/app/admin/pages/[...slug]/SectionsEditor";
import { MediaPicker } from "@/app/admin/pages/[...slug]/MediaPicker";

interface BlogEditorInitial {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  status: BlogStatus;
  featuredImageId: string | null;
  featuredImageUrl: string | null;
  contentBlocks: Block[];
}

interface BlogEditorProps {
  mode: "create" | "edit";
  initial: BlogEditorInitial;
}

type SaveStatus =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved" }
  | { kind: "error"; message: string };

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function BlogEditor({ mode, initial }: BlogEditorProps) {
  const router = useRouter();
  const [values, setValues] = useState<BlogEditorInitial>(initial);
  const [status, setStatus] = useState<SaveStatus>({ kind: "idle" });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");

  function update<K extends keyof BlogEditorInitial>(
    field: K,
    value: BlogEditorInitial[K]
  ) {
    setValues((v) => ({ ...v, [field]: value }));
    if (status.kind !== "idle") setStatus({ kind: "idle" });
  }

  function onTitleChange(next: string) {
    update("title", next);
    if (!slugTouched) {
      setValues((v) => ({ ...v, slug: slugify(next) }));
    }
  }

  function pickImage(row: MediaRow) {
    setValues((v) => ({
      ...v,
      featuredImageId: row.id,
      featuredImageUrl: row.file_url,
    }));
    setPickerOpen(false);
  }

  async function save() {
    setStatus({ kind: "saving" });
    const payload = {
      title: values.title,
      slug: values.slug,
      excerpt: values.excerpt,
      meta_title: values.metaTitle,
      meta_description: values.metaDescription,
      category: values.category,
      status: values.status,
      featured_image_id: values.featuredImageId,
      content_blocks: values.contentBlocks,
    };
    try {
      const url =
        mode === "create"
          ? "/api/admin/blogs"
          : `/api/admin/blogs/${encodeURIComponent(values.id)}`;
      const method = mode === "create" ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        id?: string;
        message?: string;
      };
      if (!res.ok || body.ok === false) {
        throw new Error(body.message || `HTTP ${res.status}`);
      }
      if (mode === "create" && body.id) {
        router.push(`/admin/blogs/${body.id}`);
        return;
      }
      setStatus({ kind: "saved" });
    } catch (err) {
      setStatus({ kind: "error", message: (err as Error).message });
    }
  }

  async function destroy() {
    if (
      !confirm(
        `Delete "${values.title}" permanently? This cannot be undone.`
      )
    ) {
      return;
    }
    setStatus({ kind: "saving" });
    try {
      const res = await fetch(
        `/api/admin/blogs/${encodeURIComponent(values.id)}`,
        { method: "DELETE" }
      );
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };
      if (!res.ok || body.ok === false) {
        throw new Error(body.message || `HTTP ${res.status}`);
      }
      router.push("/admin/blogs");
    } catch (err) {
      setStatus({ kind: "error", message: (err as Error).message });
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <StatusPill
          status={values.status}
          onChange={(s) => update("status", s)}
        />
        <div className="flex items-center gap-2">
          {mode === "edit" && (
            <button
              type="button"
              onClick={destroy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-400/40 px-3 py-2 text-xs font-bold uppercase tracking-wider text-rose-200 hover:bg-rose-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          )}
          <SaveButton status={status} onClick={save} />
        </div>
      </div>

      <StatusBanner status={status} />

      <Section title="Post details">
        <Field
          label="Title"
          value={values.title}
          onChange={onTitleChange}
        />
        <Field
          label="Slug (URL)"
          value={values.slug}
          onChange={(v) => {
            setSlugTouched(true);
            update("slug", slugify(v));
          }}
          helper="The post's web address. Auto-generated from the title; edit if you need a custom one."
        />
        <Field
          label="Category"
          value={values.category}
          onChange={(v) => update("category", v)}
          helper="Free text. Shown next to the post on the blog index."
        />
        <Field
          label="Excerpt"
          value={values.excerpt}
          onChange={(v) => update("excerpt", v)}
          multiline
          helper="Short summary for the blog index. Keep under 200 characters."
        />
      </Section>

      <Section title="Featured image">
        {values.featuredImageUrl ? (
          <div className="overflow-hidden rounded-lg border border-carbon-800 bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={values.featuredImageUrl}
              alt=""
              className="block max-h-64 w-full object-contain"
            />
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-carbon-700 bg-carbon-900/40 p-6 text-center text-xs text-carbon-400">
            No featured image yet.
          </div>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-mint-500 px-3 py-2 text-xs font-bold uppercase tracking-wider text-carbon-900 hover:bg-mint-400"
          >
            <ImageIcon className="h-3.5 w-3.5" />
            {values.featuredImageUrl ? "Replace image" : "Choose image"}
          </button>
          {values.featuredImageUrl && (
            <button
              type="button"
              onClick={() => {
                update("featuredImageId", null);
                update("featuredImageUrl", null);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-carbon-700 px-3 py-2 text-xs font-bold uppercase tracking-wider text-carbon-300 hover:border-rose-400/40 hover:text-rose-200"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </button>
          )}
        </div>
        <p className="text-[11px] text-carbon-400">
          Upload images in the{" "}
          <Link
            href="/admin/media"
            className="text-mint-400 underline hover:text-mint-300"
          >
            Media library
          </Link>{" "}
          first, then pick one here.
        </p>
        {pickerOpen && (
          <MediaPicker onClose={() => setPickerOpen(false)} onSelect={pickImage} />
        )}
      </Section>

      <Section title="Body content">
        <p className="-mt-2 mb-2 text-[11px] text-carbon-400">
          Add paragraphs, images, video embeds, CTAs and FAQs. Same block
          types as the page editor.
        </p>
        <SectionsEditor
          value={values.contentBlocks}
          onChange={(next) => update("contentBlocks", next)}
        />
      </Section>

      <Section title="Search engines (SEO)">
        <Field
          label="Meta title"
          value={values.metaTitle}
          onChange={(v) => update("metaTitle", v)}
          helper="Shown as the blue link in Google. Keep under 60 characters."
        />
        <Field
          label="Meta description"
          value={values.metaDescription}
          onChange={(v) => update("metaDescription", v)}
          multiline
          helper="The grey snippet under the link in Google. Keep under 160 characters."
        />
      </Section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <StatusPill
          status={values.status}
          onChange={(s) => update("status", s)}
        />
        <SaveButton status={status} onClick={save} />
      </div>
    </div>
  );
}

function StatusPill({
  status,
  onChange,
}: {
  status: BlogStatus;
  onChange: (s: BlogStatus) => void;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-[11px] font-bold uppercase tracking-wider text-carbon-400">
        Status
      </span>
      <div className="inline-flex rounded-lg border border-carbon-700 bg-carbon-900 p-0.5">
        <button
          type="button"
          onClick={() => onChange("draft")}
          className={`rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
            status === "draft"
              ? "bg-amber-500/20 text-amber-200"
              : "text-carbon-400 hover:text-white"
          }`}
        >
          Draft
        </button>
        <button
          type="button"
          onClick={() => onChange("published")}
          className={`rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
            status === "published"
              ? "bg-mint-500/20 text-mint-200"
              : "text-carbon-400 hover:text-white"
          }`}
        >
          Published
        </button>
      </div>
    </div>
  );
}

function StatusBanner({ status }: { status: SaveStatus }) {
  if (status.kind === "saved") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-mint-500/40 bg-mint-500/10 p-3 text-sm text-mint-200">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        Saved.
      </div>
    );
  }
  if (status.kind === "error") {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-rose-400/40 bg-rose-500/10 p-3 text-sm text-rose-200">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <span>Could not save: {status.message}</span>
      </div>
    );
  }
  return null;
}

function SaveButton({
  status,
  onClick,
}: {
  status: SaveStatus;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={status.kind === "saving"}
      className="inline-flex items-center gap-2 rounded-lg bg-mint-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-carbon-900 transition-colors hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {status.kind === "saving" ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Save
        </>
      )}
    </button>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-carbon-800 bg-carbon-900/40 p-5 sm:p-6">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-mint-400">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
  multiline?: boolean;
}

function Field({ label, value, onChange, helper, multiline }: FieldProps) {
  const id = `f-${label.replace(/\W+/g, "-").toLowerCase()}`;
  const baseClasses =
    "mt-1 w-full rounded-lg border border-carbon-600 bg-carbon-800 px-3 py-2.5 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:ring-1 focus:ring-mint-500 focus:outline-none";
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-bold uppercase tracking-wider text-carbon-300"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={baseClasses}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClasses}
        />
      )}
      {helper && (
        <p className="mt-1 text-[11px] text-carbon-400">{helper}</p>
      )}
    </div>
  );
}
