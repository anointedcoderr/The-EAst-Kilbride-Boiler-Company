import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  Flame,
  PoundSterling,
  Settings,
  Wrench,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "./PageHero";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LocalFAQSection } from "@/components/sections/LocalFAQSection";
import { SiloLinks } from "@/components/sections/SiloLinks";
import { BottomQuoteSection } from "@/components/sections/BottomQuoteSection";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schemas";
import { blogPosts } from "@/data/blogPosts";
import { pageContent } from "@/data/pageContent";

const SITE_URL = "https://www.eastkilbrideboilercompany.co.uk";

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function categoryIcon(category: string): LucideIcon {
  const c = category.toLowerCase();
  if (c.includes("pric")) return PoundSterling;
  if (c.includes("servic")) return Settings;
  if (c.includes("repair")) return Wrench;
  if (c.includes("buy") || c.includes("advice")) return Flame;
  return BookOpen;
}

function postAltText(post: { title: string; category: string }): string {
  return `${post.title} - ${post.category} guide for East Kilbride homes by The East Kilbride Boiler Company`;
}

function collectionPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "East Kilbride boiler guides and heating advice",
    url: `${SITE_URL}/blogs/`,
    mainEntity: blogPosts.map((post) => ({
      "@type": "Article",
      headline: post.title,
      datePublished: post.date,
      url: `${SITE_URL}/blogs/${post.slug}/`,
      description: post.excerpt,
    })),
  };
}

export function BlogTemplate() {
  const page = pageContent.blogs;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blogs/" },
  ];

  const uniqueCategories = Array.from(
    new Set(blogPosts.map((post) => post.category))
  );

  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema(),
          faqSchema(
            page.faqs.map((f) => ({
              question: f.question,
              answer: f.answer,
              pageTypes: [],
            }))
          ),
        ]}
      />

      <PageHero
        eyebrow={page.heroEyebrow}
        h1={page.h1}
        highlightedWord={page.highlightedWord}
        subtitle={page.heroSubtitle}
        description={page.heroDescription}
        trustPoints={page.heroTrustPoints}
        breadcrumbs={breadcrumbs}
        primaryCtaLabel={page.ctaPrimaryLabel}
      />

      <section className="bg-carbon-950 py-12 sm:py-16">
        <Container className="max-w-4xl">
          <ScrollReveal>
            <p className="text-base sm:text-lg leading-relaxed text-carbon-200">
              {page.introCopy}
            </p>
          </ScrollReveal>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-mint-400">
              <Tag className="h-3 w-3" />
              Topics
            </span>
            {uniqueCategories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-carbon-700 bg-carbon-900 px-3 py-1 text-[11px] font-semibold text-carbon-200"
              >
                {category}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-carbon-900 py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <ScrollReveal key={post.slug} direction="up" delay={index * 0.1}>
                <article className="hover-card group flex h-full flex-col overflow-hidden rounded-2xl border border-carbon-700 bg-carbon-800 transition-colors hover:border-mint-500/50">
                  <Link
                    href={`/blogs/${post.slug}/`}
                    className="block"
                    aria-label={post.title}
                  >
                    {(() => {
                      const Icon = categoryIcon(post.category);
                      return (
                        <div
                          role="img"
                          aria-label={postAltText(post)}
                          className="relative h-44 overflow-hidden bg-gradient-to-br from-carbon-700 via-carbon-800 to-carbon-900"
                        >
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 opacity-40"
                            style={{
                              backgroundImage:
                                "radial-gradient(ellipse at 30% 30%, rgba(91, 254, 177, 0.18) 0%, transparent 50%), linear-gradient(rgba(91, 254, 177, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(91, 254, 177, 0.05) 1px, transparent 1px)",
                              backgroundSize: "auto, 32px 32px, 32px 32px",
                            }}
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-mint-500/30 bg-carbon-950/70 backdrop-blur shadow-[0_0_22px_rgba(91,254,177,0.18)]">
                              <Icon className="h-7 w-7 text-mint-400" />
                            </span>
                          </div>
                          <div
                            aria-hidden="true"
                            className="absolute left-4 top-4 inline-flex items-center rounded-full border border-mint-500/40 bg-carbon-900/70 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-mint-400"
                          >
                            {post.category}
                          </div>
                        </div>
                      );
                    })()}
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-carbon-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.date)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readMinutes} min read
                      </span>
                    </div>

                    <h2 className="mt-3 text-lg font-bold leading-tight text-white group-hover:text-mint-400 transition-colors">
                      <Link href={`/blogs/${post.slug}/`}>{post.title}</Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-carbon-300">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-carbon-700 bg-carbon-900 px-2 py-0.5 text-[10px] font-semibold text-carbon-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blogs/${post.slug}/`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint-500"
                    >
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <LocalFAQSection
        eyebrow="Blog FAQs"
        heading="About the EKBC blog"
        faqs={page.faqs}
      />

      <SiloLinks
        eyebrow="Continue from the blog"
        heading="Pick up where you left off"
        intro="Every guide is linked into the rest of the site. Jump back to a service, see prices, or check your postcode."
        links={page.internalLinks}
      />

      <BottomQuoteSection />

      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
