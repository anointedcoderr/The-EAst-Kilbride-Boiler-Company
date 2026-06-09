import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { PublicBlocks } from "./PublicBlocks";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/templates/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";
import type { BlogRow } from "@/lib/cmsBlogs";

interface CmsBlogPostViewProps {
  post: BlogRow;
}

const SITE_URL = "https://eastkilbrideboilercompany.co.uk";

export function CmsBlogPostView({ post }: CmsBlogPostViewProps) {
  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blogs/" },
    { label: post.title, href: `/blogs/${post.slug}/` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.featured_image_url ? [post.featured_image_url] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    description: post.excerpt ?? post.meta_description ?? undefined,
    author: {
      "@type": "Organization",
      name: "The East Kilbride Boiler Company",
    },
    publisher: {
      "@type": "Organization",
      name: "The East Kilbride Boiler Company",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${post.slug}/`,
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), articleSchema]} />
      <PageHero
        eyebrow={post.category ?? "Blog"}
        h1={post.title}
        highlightedWord=""
        subtitle={publishedDate ?? ""}
        description={post.excerpt ?? ""}
        trustPoints={[]}
        breadcrumbs={breadcrumbs}
      />

      {post.featured_image_url && (
        <section className="bg-carbon-950 pb-4 pt-8">
          <Container>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-carbon-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featured_image_url}
                alt={post.title}
                loading="eager"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          </Container>
        </section>
      )}

      <section className="bg-carbon-950 py-10">
        <Container>
          <div className="mx-auto max-w-3xl space-y-3 text-sm text-carbon-300">
            {post.category && (
              <p className="inline-flex items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-mint-400" />
                <span>{post.category}</span>
              </p>
            )}
            {publishedDate && (
              <p className="inline-flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-mint-400" />
                <span>Published {publishedDate}</span>
              </p>
            )}
          </div>
        </Container>
      </section>

      <PublicBlocks raw={post.content_blocks} />

      <section className="bg-carbon-950 py-12">
        <Container>
          <Link
            href="/blogs/"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-mint-400 hover:text-mint-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Link>
        </Container>
      </section>
    </>
  );
}
