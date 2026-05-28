import Link from "next/link";
import {
  ShieldCheck,
  Star,
  Phone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteSettings } from "@/data/siteSettings";

const trustPoints = [
  "FIXED PRICE",
  "GAS SAFE EXPERTS",
  "12-YR WARRANTY",
  "UNBEATABLE BOILER DEALS",
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-carbon-950">
      <div className="absolute inset-0 bg-gradient-to-br from-carbon-900 via-carbon-950 to-carbon-900" />
      <div className="absolute inset-0 bg-gradient-to-t from-mint-500/5 to-transparent" />

      <Container className="relative z-10 py-10 sm:py-16 lg:py-24">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5 sm:gap-6">
            <ScrollReveal direction="up" delay={0}>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-mint-500/30 bg-mint-500/10 px-3 py-1.5 sm:px-4 sm:py-2">
                <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-mint-500" />
                <span className="text-xs sm:text-sm font-medium text-mint-400">
                  East Kilbride&apos;s #1 Boiler Company
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-gold text-gold"
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <div>
                <h1 className="text-[2rem] font-extrabold uppercase tracking-tight leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
                  <span className="text-white">EAST KILBRIDE&apos;S #1</span>
                  <br />
                  <span className="text-white">BOILER REPLACEMENT</span>
                  <br />
                  <span className="text-mint-500">COMPANY</span>
                </h1>
                <p className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-white">
                  Serving all areas of East Kilbride G74/G75
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="max-w-lg text-base sm:text-lg text-carbon-300 leading-relaxed">
                New boiler installations, replacements and repairs across all 35
                areas of East Kilbride. Unbeatable fixed-price quotes with no
                hidden extras, East Kilbride&apos;s boiler experts you can trust.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <a
                  href={siteSettings.phoneHref}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-mint-500 px-6 py-3 text-base font-bold text-carbon-900 transition-all hover:bg-mint-400 hover:scale-[1.02] active:scale-95 shadow-lg shadow-mint-500/20"
                >
                  <Phone className="h-5 w-5" />
                  CALL {siteSettings.phone}
                </a>
                <Link
                  href="#quote"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-mint-500 px-6 py-3 text-base font-semibold text-mint-500 transition-all hover:bg-mint-500/10 hover:scale-[1.02] active:scale-95"
                >
                  Get my fixed price
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trustPoints.map((point, index) => (
                <ScrollReveal key={point} direction="up" delay={0.3 + index * 0.05}>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 text-mint-500" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-white">
                      {point}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal direction="right" delay={0.3}>
            <div className="flex items-start justify-center lg:justify-end">
              <div id="quote" className="w-full max-w-md">
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
