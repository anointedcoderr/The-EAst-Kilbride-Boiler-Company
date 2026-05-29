import { Check, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { siteSettings } from "@/data/siteSettings";

const trustPoints = [
  "Fixed price, no hidden extras",
  "Gas Safe Experts",
  "Up to 12-year warranty",
  "Free wireless thermostat",
  "Full system flush",
  "Same-week fitting available",
];

interface BottomQuoteSectionProps {
  id?: string;
  heading?: string;
  intro?: string;
}

export function BottomQuoteSection({
  id = "quote-form",
  heading = "Get Your Fixed Price Quote",
  intro = "No obligation. No hidden extras. Fitted by our Gas Safe Experts across all 35 East Kilbride districts.",
}: BottomQuoteSectionProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-carbon-950 py-14 sm:py-20 scroll-mt-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-carbon-900 via-carbon-950 to-carbon-900"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 20%, rgba(63, 169, 245, 0.10) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(91, 254, 177, 0.10) 0%, transparent 50%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(91, 254, 177, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(91, 254, 177, 0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Container className="relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:items-center">
          <ScrollReveal direction="left">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
              {heading}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              60 seconds to a{" "}
              <span className="text-mint-500 neon-company">fixed price</span>
            </h2>
            <p className="mt-5 max-w-md text-base sm:text-lg leading-relaxed text-carbon-200">
              {intro}
            </p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {trustPoints.map((tp) => (
                <li
                  key={tp}
                  className="flex items-start gap-2 text-sm text-carbon-200"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-500" />
                  <span>{tp}</span>
                </li>
              ))}
            </ul>

            <a
              href={siteSettings.phoneHref}
              className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-mint-500 px-5 py-3 text-base font-semibold text-mint-400 transition-all hover:bg-mint-500/10"
            >
              <Phone className="h-5 w-5" />
              Prefer to talk? Call {siteSettings.phone}
            </a>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="mx-auto w-full max-w-md">
              <QuoteForm />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
