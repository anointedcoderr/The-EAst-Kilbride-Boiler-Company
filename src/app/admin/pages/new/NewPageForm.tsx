"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Save } from "lucide-react";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function NewPageForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("Page title is required.");
      return;
    }
    if (!slug.trim()) {
      setError("URL slug is required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/pages/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          metaDescription,
          status,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        slug?: string;
        message?: string;
      };
      if (!res.ok || body.ok === false || !body.slug) {
        throw new Error(body.message || `HTTP ${res.status}`);
      }
      // Land on the page editor for the just-created page.
      const editPath = body.slug.replace(/^\/|\/$/g, "");
      router.push(`/admin/pages/${editPath}`);
    } catch (err) {
      setError((err as Error).message);
      setSubmitting(false);
    }
  }

  const previewUrl = slug ? `/${slug.replace(/^\/|\/$/g, "")}/` : "";

  return (
    <form onSubmit={submit} className="space-y-5">
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-rose-400/40 bg-rose-500/10 p-3 text-sm text-rose-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="rounded-2xl border border-carbon-800 bg-carbon-900/40 p-5 sm:p-6 space-y-4">
        <div>
          <label
            htmlFor="np-title"
            className="block text-[11px] font-bold uppercase tracking-wider text-carbon-300"
          >
            Page title
          </label>
          <input
            id="np-title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. Summer Boiler Offer"
            className="mt-1 w-full rounded-lg border border-carbon-600 bg-carbon-800 px-3 py-2.5 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
          />
          <p className="mt-1 text-[11px] text-carbon-400">
            Used inside the admin and as a default H1 + meta title.
          </p>
        </div>

        <div>
          <label
            htmlFor="np-slug"
            className="block text-[11px] font-bold uppercase tracking-wider text-carbon-300"
          >
            URL slug
          </label>
          <input
            id="np-slug"
            type="text"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            placeholder="summer-boiler-offer"
            className="mt-1 w-full rounded-lg border border-carbon-600 bg-carbon-800 px-3 py-2.5 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
          />
          <p className="mt-1 text-[11px] text-carbon-400">
            Public URL will be{" "}
            <code className="rounded bg-carbon-800 px-1.5 py-0.5 text-mint-300">
              {previewUrl || "/<slug>/"}
            </code>
            . Letters, numbers and dashes only.
          </p>
        </div>

        <div>
          <label
            htmlFor="np-meta"
            className="block text-[11px] font-bold uppercase tracking-wider text-carbon-300"
          >
            Meta description (optional)
          </label>
          <textarea
            id="np-meta"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows={3}
            placeholder="The grey snippet shown under the link in Google."
            className="mt-1 w-full rounded-lg border border-carbon-600 bg-carbon-800 px-3 py-2.5 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
          />
        </div>

        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-carbon-300">
            Status
          </span>
          <div className="mt-1 inline-flex rounded-lg border border-carbon-700 bg-carbon-900 p-0.5">
            <button
              type="button"
              onClick={() => setStatus("draft")}
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
              onClick={() => setStatus("published")}
              className={`rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                status === "published"
                  ? "bg-mint-500/20 text-mint-200"
                  : "text-carbon-400 hover:text-white"
              }`}
            >
              Published
            </button>
          </div>
          <p className="mt-1 text-[11px] text-carbon-400">
            Draft pages don't appear publicly and don't show in the sitemap
            until you switch to Published.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-lg bg-mint-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-carbon-900 transition-colors hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Create page
            </>
          )}
        </button>
      </div>
    </form>
  );
}
