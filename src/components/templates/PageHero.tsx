import Link from "next/link";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteSettings } from "@/data/siteSettings";

interface PageHeroProps {
  eyebrow?: string;
  h1: string;
  highlightedWord?: string;
  subtitle?: string;
  description?: string;
  trustPoints?: string[];
  breadcrumbs?: BreadcrumbItem[];
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
}

export function PageHero({
  eyebrow,
  h1,
  highlightedWord,
  subtitle,
  description,
  trustPoints,
  breadcrumbs,
  primaryCtaLabel = "Get my fixed price",
  primaryCtaHref = "/#quote",
}: PageHeroProps) {
  const renderHeading = () => {
    if (!highlightedWord) return h1;
    const lower = h1.toLowerCase();
    const idx = lower.indexOf(highlightedWord.toLowerCase());
    if (idx === -1) return h1;
    const before = h1.slice(0, idx);
    const match = h1.slice(idx, idx + highlightedWord.length);
    const after = h1.slice(idx + highlightedWord.length);
    return (
      <>
        {before}
        <span className="text-mint-500 neon-company">{match}</span>
        {after}
      </>
    );
  };

  return (
    <section className="relative overflow-hidden bg-carbon-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-carbon-900 via-carbon-950 to-carbon-900"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 70% 30%, rgba(63, 169, 245, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 25% 80%, rgba(91, 254, 177, 0.1) 0%, transparent 50%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(91, 254, 177, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(91, 254, 177, 0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Container className="relative z-10 py-12 sm:py-16 lg:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        <div className="flex flex-col gap-5 max-w-4xl">
          {eyebrow && (
            <ScrollReveal direction="up">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
                {eyebrow}
              </p>
            </ScrollReveal>
          )}

          <ScrollReveal direction="up" delay={0.05}>
            <h1 className="text-3xl font-extrabold uppercase tracking-tight leading-[1] sm:text-5xl lg:text-6xl text-white">
              {renderHeading()}
            </h1>
          </ScrollReveal>

          {subtitle && (
            <ScrollReveal direction="up" delay={0.1}>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-white">
                {subtitle}
              </p>
            </ScrollReveal>
          )}

          {description && (
            <ScrollReveal direction="up" delay={0.15}>
              <p className="max-w-2xl text-base sm:text-lg text-carbon-300 leading-relaxed">
                {description}
              </p>
            </ScrollReveal>
          )}

          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href={siteSettings.phoneHref}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-mint-500 px-6 py-3 text-base font-bold text-carbon-900 transition-all hover:bg-mint-400 hover:scale-[1.02] active:scale-95 shadow-lg shadow-mint-500/30"
              >
                <Phone className="h-5 w-5" />
                Call {siteSettings.phone}
              </a>
              <Link
                href={primaryCtaHref}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-mint-500 bg-carbon-900/40 px-6 py-3 text-base font-semibold text-mint-500 transition-all hover:bg-mint-500/10 hover:scale-[1.02] active:scale-95"
              >
                {primaryCtaLabel}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>

          {trustPoints && trustPoints.length > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trustPoints.map((point, index) => (
                <ScrollReveal key={point} direction="up" delay={0.25 + index * 0.05}>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 text-mint-500" />
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-white leading-tight">
                      {point}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
