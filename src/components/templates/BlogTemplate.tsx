import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { PageHero } from "./PageHero";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { blogPosts } from "@/data/blogPosts";

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogTemplate() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blogs/" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Boiler advice"
        h1="East Kilbride boiler advice and heating tips"
        highlightedWord="boiler advice"
        description="Honest, practical guides from our Gas Safe Experts. Buying, replacing, repairing and servicing boilers across G74 and G75 East Kilbride."
        breadcrumbs={breadcrumbs}
        primaryCtaLabel="Get a fixed price quote"
      />

      <section className="bg-carbon-900 py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <ScrollReveal key={post.slug} direction="up" delay={index * 0.1}>
                <Link
                  href={`/blogs/${post.slug}/`}
                  className="hover-card group flex h-full flex-col overflow-hidden rounded-2xl border border-carbon-700 bg-carbon-800 transition-colors hover:border-mint-500/50"
                >
                  <div
                    aria-hidden="true"
                    className="relative h-44 overflow-hidden bg-gradient-to-br from-carbon-700 via-carbon-800 to-carbon-900"
                  >
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "radial-gradient(ellipse at 30% 30%, rgba(91, 254, 177, 0.18) 0%, transparent 50%), linear-gradient(rgba(91, 254, 177, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(91, 254, 177, 0.05) 1px, transparent 1px)",
                        backgroundSize: "auto, 32px 32px, 32px 32px",
                      }}
                    />
                    <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-mint-500/40 bg-carbon-900/70 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-mint-400">
                      {post.category}
                    </div>
                  </div>

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
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-carbon-300">
                      {post.excerpt}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint-500">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
