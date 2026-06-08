import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Star, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteSettings } from "@/data/siteSettings";

const trustPoints = [
  "FIXED PRICE",
  "GAS SAFE ENGINEERS",
  "12-YR WARRANTY",
  "UNBEATABLE BOILER DEALS",
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-carbon-950">
      <Image
        src="/images/hero-engineer.jpg"
        alt="EKBC engineer standing next to The East Kilbride Boiler Company branded van"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-carbon-950 via-carbon-950/85 to-carbon-950/50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-transparent to-carbon-950/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 70% 50%, rgba(63, 169, 245, 0.18) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(91, 254, 177, 0.12) 0%, transparent 50%)",
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

      <Container className="relative z-10 py-10 sm:py-16 lg:py-24">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12 xl:gap-16">
          <div className="flex flex-col gap-5 sm:gap-6">
            <ScrollReveal direction="up" delay={0}>
              <div className="inline-flex w-full items-center justify-between gap-3 rounded-full border border-mint-500/40 bg-carbon-900/60 px-4 py-2 backdrop-blur sm:w-fit sm:gap-5">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-mint-500" />
                  <span className="text-xs sm:text-sm font-medium text-mint-400 whitespace-nowrap">
                    East Kilbride&apos;s #1 Boiler Company
                  </span>
                </span>
                <span className="h-4 w-px bg-carbon-600 hidden sm:block" />
                <span className="flex gap-0.5 shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-gold text-gold"
                    />
                  ))}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <div>
                <p className="mb-1 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white/90">
                  East Kilbride&apos;s #1
                </p>
                <h1 className="font-extrabold uppercase tracking-tight leading-[0.95] text-[2.25rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4rem]">
                  <span className="block text-white">BOILER</span>
                  <span className="block text-white">REPLACEMENT</span>
                  <span className="block text-mint-500 neon-company">COMPANY</span>
                </h1>
                <p className="mt-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-white">
                  Serving all areas of East Kilbride G74/G75
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="max-w-lg text-base sm:text-lg text-carbon-300 leading-relaxed">
                New boiler installations, replacements and repairs across all 35
                areas of East Kilbride. Unbeatable fixed-price quotes with no
                hidden extras. East Kilbride&apos;s boiler experts you can trust.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <a
                  href={siteSettings.phoneHref}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-mint-500 px-6 py-3 text-base font-bold text-carbon-900 transition-all hover:bg-mint-400 hover:scale-[1.02] active:scale-95 shadow-lg shadow-mint-500/30"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
                <Link
                  href="#quote-form"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-mint-500 bg-carbon-900/40 px-6 py-3 text-base font-semibold text-mint-500 transition-all hover:bg-mint-500/10 hover:scale-[1.02] active:scale-95"
                >
                  Get Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trustPoints.map((point, index) => (
                <ScrollReveal key={point} direction="up" delay={0.3 + index * 0.05}>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 text-mint-500" />
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-white leading-tight">
                      {point}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal direction="right" delay={0.3}>
            <div className="flex items-start justify-center lg:justify-end">
              <div id="quote-form" className="w-full max-w-md scroll-mt-32">
                <QuoteForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

export { HeroSection };
