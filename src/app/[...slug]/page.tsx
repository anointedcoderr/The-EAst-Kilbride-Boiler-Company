import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/templates/PageHero";
import { Container } from "@/components/ui/Container";
import { PublicBlocks } from "@/components/cms/PublicBlocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";
import { getCustomPageBySlug } from "@/lib/cmsPages";

// Catch-all public route. Lower priority than every other file-system
// route, so it only fires for paths that aren't matched by anything
// else. We use it for CMS "custom" pages - pages the client created
// from /admin/pages/new with their own slug.

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

function partsToSlug(parts: string[]): string {
  return "/" + parts.map((p) => decodeURIComponent(p)).join("/") + "/";
}

// Force dynamic so newly published pages appear immediately without
// rebuilding.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: parts } = await params;
  const slug = partsToSlug(parts);
  const row = await getCustomPageBySlug(slug);
  if (!row) return {};
  return {
    title: row.meta_title || row.title,
    description: row.meta_description ?? undefined,
    alternates: { canonical: slug },
    robots: row.is_indexable === false ? { index: false, follow: false } : undefined,
  };
}

export default async function CustomCmsPage({ params }: PageProps) {
  const { slug: parts } = await params;
  const slug = partsToSlug(parts);
  const row = await getCustomPageBySlug(slug);
  if (!row) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: row.title, href: slug },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs)]} />
      <PageHero
        eyebrow=""
        h1={row.h1 || row.title}
        highlightedWord=""
        subtitle={row.hero_subtitle || ""}
        description=""
        trustPoints={[]}
        breadcrumbs={breadcrumbs}
      />
      <PublicBlocks raw={row.sections} />
      <section className="bg-carbon-950 py-6">
        <Container>
          <p className="text-center text-xs text-carbon-500">
            <a href="/" className="text-mint-400 hover:text-mint-300">
              Back to homepage
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}
