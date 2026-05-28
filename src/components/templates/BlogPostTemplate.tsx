import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, Phone, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteSettings } from "@/data/siteSettings";
import type { BlogPost } from "@/types";

const SITE_URL = "https://www.eastkilbrideboilercompany.co.uk";

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.h1,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: siteSettings.businessName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: siteSettings.businessName,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${post.slug}/`,
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };
}

interface BlogPostTemplateProps {
  post: BlogPost;
}

export function BlogPostTemplate({ post }: BlogPostTemplateProps) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blogs/" },
    { label: post.title, href: `/blogs/${post.slug}/` },
  ];

  return (
    <>
      <JsonLd data={articleSchema(post)} />

      <article className="bg-carbon-950 pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container className="max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wider text-carbon-400">
            <span className="inline-flex items-center rounded-full border border-mint-500/40 bg-carbon-900/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-mint-400">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readMinutes} min read
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {post.h1}
          </h1>

          <p className="mt-5 text-base sm:text-lg leading-relaxed text-carbon-300">
            {post.excerpt}
          </p>

          {post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-mint-400">
                <Tag className="h-3 w-3" />
                Tagged
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-carbon-700 bg-carbon-900 px-2.5 py-0.5 text-[11px] font-semibold text-carbon-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 prose-article">
            {post.body.map((paragraph, index) => (
              <p
                key={index}
                className="mt-5 text-base leading-relaxed text-carbon-200 first:mt-0 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {post.internalLinks.length > 0 && (
            <ScrollReveal>
              <aside className="mt-10 rounded-2xl border border-carbon-700 bg-carbon-900 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-mint-400">
                  Helpful next steps
                </p>
                <h2 className="mt-2 text-lg font-bold text-white">
                  Related pages on this site
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {post.internalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between gap-3 rounded-lg border border-carbon-800 bg-carbon-950 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:border-mint-500/40 hover:text-mint-400"
                      >
                        <span className="truncate">{link.label}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-mint-500 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </ScrollReveal>
          )}

          <div className="mt-10 rounded-2xl border border-mint-500/30 bg-carbon-900 p-6 shadow-[0_0_30px_rgba(91,254,177,0.08)]">
            <p className="text-sm font-bold uppercase tracking-wider text-mint-400">
              Ready for a fixed price?
            </p>
            <p className="mt-2 text-base text-white">
              Get a quote online in 60 seconds, or call our Gas Safe Experts on{" "}
              <a
                href={siteSettings.phoneHref}
                className="font-bold text-mint-400 hover:text-mint-300"
              >
                {siteSettings.phone}
              </a>
              .
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/#quote"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-mint-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-carbon-900 transition-all hover:bg-mint-400 hover:scale-[1.02] active:scale-95"
              >
                Get my fixed price quote
              </Link>
              <a
                href={siteSettings.phoneHref}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-mint-500/40 px-5 py-2.5 text-sm font-semibold text-mint-400 transition-all hover:bg-mint-500/10"
              >
                <Phone className="h-4 w-4" />
                Call now
              </a>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/blogs/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-mint-400 hover:text-mint-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>
          </div>
        </Container>
      </article>

      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
