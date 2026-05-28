import Link from "next/link";
import { MapPin, Star, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteSettings } from "@/data/siteSettings";
import { reviews } from "@/data/reviews";
import type { PageServiceAreaProof } from "@/data/pageContent";

interface ServiceAreaProofProps {
  proof: PageServiceAreaProof;
}

export function ServiceAreaProof({ proof }: ServiceAreaProofProps) {
  const review = reviews.find((r) => r.id === proof.reviewId) ?? reviews[0];
  const ctaHref = proof.ctaHref ?? "/#quote";
  const ctaLabel = proof.ctaLabel ?? "Get my fixed price";

  return (
    <section className="bg-carbon-900 py-14 sm:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <ScrollReveal direction="left" className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-carbon-700 bg-carbon-800/60 p-6 sm:p-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-mint-400">
                Service area
              </p>
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
                {proof.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-carbon-300">
                {proof.intro}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {proof.districts.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1.5 rounded-full border border-mint-500/30 bg-carbon-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-mint-300"
                  >
                    <MapPin className="h-3 w-3" />
                    {d}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link
                  href={ctaHref}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-mint-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-carbon-900 transition-colors hover:bg-mint-400"
                >
                  {ctaLabel}
                </Link>
                <Link
                  href="/areas-we-serve/g74/"
                  className="text-sm font-semibold uppercase tracking-wide text-mint-400 hover-underline"
                >
                  G74 hub
                </Link>
                <Link
                  href="/areas-we-serve/g75/"
                  className="text-sm font-semibold uppercase tracking-wide text-mint-400 hover-underline"
                >
                  G75 hub
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-mint-500/30 bg-carbon-800/40 p-6 sm:p-8 glow-mint">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-mint-400">
                  Local review
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-carbon-300">
                  <MapPin className="h-3 w-3 text-mint-400" />
                  {review.location}, {review.postcode}
                </span>
              </div>
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold text-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 text-lg leading-relaxed text-white">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-carbon-200">
                {review.name}
              </p>

              <div className="mt-auto pt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={siteSettings.phoneHref}
                  className="flex items-center gap-3 rounded-xl border border-carbon-700 bg-carbon-900 p-4 transition-colors hover:border-mint-500/40"
                >
                  <Phone className="h-5 w-5 shrink-0 text-mint-500" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-carbon-400">
                      Gas Safe Experts
                    </p>
                    <p className="text-base font-extrabold text-white">
                      {siteSettings.phone}
                    </p>
                  </div>
                </a>
                <a
                  href="https://www.gassaferegister.co.uk"
                  rel="nofollow noopener"
                  target="_blank"
                  className="flex items-center gap-3 rounded-xl border border-carbon-700 bg-carbon-900 p-4 transition-colors hover:border-mint-500/40"
                >
                  <ShieldCheck className="h-5 w-5 shrink-0 text-mint-500" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-carbon-400">
                      Verify
                    </p>
                    <p className="text-sm font-bold text-white">
                      Gas Safe Register
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
