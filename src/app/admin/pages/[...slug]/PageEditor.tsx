"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Save,
} from "lucide-react";
import { type Block } from "@/lib/cmsBlocks";
import { SectionsEditor } from "./SectionsEditor";

interface PageEditorInitial {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroTitle: string;
  heroSubtitle: string;
  status: "draft" | "published";
  isIndexable: boolean;
  sections: Block[];
}

interface PageEditorProps {
  slug: string;
  initial: PageEditorInitial;
}

type SaveStatus =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved" }
  | { kind: "error"; message: string };

export function PageEditor({ slug, initial }: PageEditorProps) {
  const [values, setValues] = useState<PageEditorInitial>(initial);
  const [status, setStatus] = useState<SaveStatus>({ kind: "idle" });

  function update<K extends keyof PageEditorInitial>(
    field: K,
    value: PageEditorInitial[K]
  ) {
    setValues((v) => ({ ...v, [field]: value }));
    if (status.kind !== "idle") setStatus({ kind: "idle" });
  }

  async function save() {
    setStatus({ kind: "saving" });
    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          patch: {
            title: values.title,
            meta_title: values.metaTitle,
            meta_description: values.metaDescription,
            h1: values.h1,
            hero_title: values.heroTitle,
            hero_subtitle: values.heroSubtitle,
            status: values.status,
            is_indexable: values.isIndexable,
            sections: values.sections,
          },
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };
      if (!res.ok || body.ok === false) {
        setStatus({
          kind: "error",
          message: body.message || `HTTP ${res.status}`,
        });
        return;
      }
      setStatus({ kind: "saved" });
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
        <SaveButton status={status} onClick={save} />
      </div>

      <StatusBanner status={status} />

      <Section title="Basic">
        <Field
          label="Page title"
          value={values.title}
          onChange={(v) => update("title", v)}
          helper="Shown in the admin list. Customers see metaTitle instead."
        />
        <Field
          label="H1"
          value={values.h1}
          onChange={(v) => update("h1", v)}
          helper="The main heading on the page. There is only one H1 per page."
        />
      </Section>

      <Section title="Hero">
        <Field
          label="Hero title"
          value={values.heroTitle}
          onChange={(v) => update("heroTitle", v)}
          helper="Big text in the dark banner at the top of the page."
        />
        <Field
          label="Hero subtitle"
          value={values.heroSubtitle}
          onChange={(v) => update("heroSubtitle", v)}
          helper="Smaller line under the hero title."
          multiline
        />
      </Section>

      <Section title="Body content">
        <p className="-mt-2 mb-2 text-[11px] text-carbon-400">
          Add headings, paragraphs, images, video embeds, calls-to-action and
          FAQs. Drag-and-drop ordering and image library come later in the
          roadmap; for now reorder with the arrows.
        </p>
        <SectionsEditor
          value={values.sections}
          onChange={(next) => update("sections", next)}
        />
      </Section>

      <Section title="Search engines (SEO)">
        <Field
          label="Meta title"
          value={values.metaTitle}
          onChange={(v) => update("metaTitle", v)}
          helper="Shown as the blue link in Google search results. Keep under 60 characters."
        />
        <Field
          label="Meta description"
          value={values.metaDescription}
          onChange={(v) => update("metaDescription", v)}
          helper="The grey snippet under the link in Google. Keep under 160 characters."
          multiline
        />
        <Checkbox
          label="Allow search engines to index this page"
          checked={values.isIndexable}
          onChange={(v) => update("isIndexable", v)}
          helper="Turn this off only for pages you don't want appearing in Google."
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
  status: "draft" | "published";
  onChange: (s: "draft" | "published") => void;
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
        Saved. Changes will show on the live page within a minute.
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
          Save changes
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

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  helper?: string;
}

function Checkbox({ label, checked, onChange, helper }: CheckboxProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-carbon-500 bg-carbon-800 text-mint-500 focus:ring-mint-500"
      />
      <div>
        <div className="text-sm text-white">{label}</div>
        {helper && (
          <p className="text-[11px] text-carbon-400">{helper}</p>
        )}
      </div>
    </label>
  );
}
