import Link from "next/link";
import { Phone, ArrowRight, Check, Shield } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteSettings } from "@/data/siteSettings";

const trustPoints = [
  "FIXED PRICE",
  "GAS SAFE EXPERTS",
  "12-YR WARRANTY",
  "UNBEATABLE BOILER DEALS",
];

function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-carbon-900 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(91,254,177,0.08)_0%,_transparent_70%)]" />

      <Container className="relative z-10">
        <ScrollReveal direction="scale">
          <div className="text-center">
            <h2 className="text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
              GET YOUR <span className="text-mint-500">FIXED PRICE</span> QUOTE
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-carbon-300">
              Takes 60 seconds. Fixed prices. No hidden fees. No obligation.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={siteSettings.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-mint-500 px-6 py-3 font-semibold text-mint-500 transition-all hover:bg-mint-500/10 hover:scale-105"
              >
                <Phone className="h-5 w-5" />
                CALL {siteSettings.phone}
              </Link>
              <Link
                href="#quote"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-mint-500 px-6 py-3 font-semibold text-mint-500 transition-all hover:bg-mint-500/10 hover:scale-105"
              >
                Get my fixed price
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-mint-500" />
                  <span className="text-sm font-semibold text-carbon-300">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function NeedBoilerCTA() {
  return (
    <section className="bg-mint-500">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-5 lg:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-carbon-900" />
              <p className="text-lg font-bold text-carbon-900">
                NEED A NEW BOILER? FIXED PRICE - QUICK INSTALLATION.
              </p>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                "From £1,299 fitted",
                "Gas Safe Experts",
                "12-yr warranty",
                "Unbeatable Boiler Deals",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-carbon-900" />
                  <span className="text-sm font-semibold text-carbon-900">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href={siteSettings.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg bg-carbon-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-carbon-800"
            >
              <Phone className="h-4 w-4" />
              {siteSettings.phone}
            </Link>
            <Link
              href="#quote"
              className="inline-flex items-center gap-2 rounded-lg border border-carbon-900 px-5 py-3 font-semibold text-carbon-900 transition-colors hover:bg-carbon-900/10"
            >
              Get Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { CTABanner, NeedBoilerCTA };
