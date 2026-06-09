import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getCmsPageBySlug } from "@/lib/cmsPages";
import { parseBlocks } from "@/lib/cmsBlocks";
import { PageEditor } from "./PageEditor";

export const metadata: Metadata = {
  title: "Edit page | EKBC Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

function partsToSlug(parts: string[]): string {
  return "/" + parts.map((p) => decodeURIComponent(p)).join("/") + "/";
}

function normaliseHomepage(slug: string): string {
  // The homepage's slug is "/". Anything that reduces to "//" maps to "/".
  return slug === "//" ? "/" : slug;
}

export default async function AdminEditPage({ params }: PageProps) {
  const { slug: parts } = await params;
  const slug = normaliseHomepage(partsToSlug(parts));
  const page = await getCmsPageBySlug(slug);
  if (!page) return notFound();

  const known = page.known;
  const initial = {
    slug,
    title: page.cmsRow?.title ?? known.title,
    metaTitle: page.cmsRow?.meta_title ?? known.defaultMetaTitle ?? "",
    metaDescription:
      page.cmsRow?.meta_description ?? known.defaultMetaDescription ?? "",
    h1: page.cmsRow?.h1 ?? known.defaultH1 ?? "",
    heroTitle: page.cmsRow?.hero_title ?? known.defaultHeroTitle ?? "",
    heroSubtitle:
      page.cmsRow?.hero_subtitle ?? known.defaultHeroSubtitle ?? "",
    status: (page.cmsRow?.status ?? "published") as "draft" | "published",
    isIndexable: page.cmsRow?.is_indexable ?? true,
    sections: parseBlocks(
      (page.cmsRow as { sections?: unknown } | null)?.sections
    ),
  };

  return (
    <div className="min-h-screen bg-carbon-950 text-white">
      <header className="sticky top-0 z-30 border-b border-carbon-800 bg-carbon-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/pages"
              className="inline-flex items-center gap-1.5 rounded-full border border-carbon-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 transition-colors hover:border-mint-500/50 hover:text-mint-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to pages
            </Link>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold uppercase tracking-wider text-white">
                {initial.title}
              </h1>
              <code className="block truncate text-[11px] text-carbon-400">
                {slug}
              </code>
            </div>
          </div>
          <a
            href={slug}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-carbon-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 transition-colors hover:border-mint-500/50 hover:text-mint-400"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open live page
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <p className="mb-6 max-w-2xl text-sm text-carbon-300">
          Edit page-level fields. More advanced content blocks (hero
          images, body sections, FAQs) come in the next CMS phase.
        </p>
        <PageEditor slug={slug} initial={initial} />
      </div>
    </div>
  );
}
