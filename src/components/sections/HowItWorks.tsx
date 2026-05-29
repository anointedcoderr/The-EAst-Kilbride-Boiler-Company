import Link from "next/link";
import { FileText, Calendar, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: 1,
    icon: FileText,
    title: "GET A FREE ONLINE QUOTE",
    description:
      "Answer a few quick questions about your property and current boiler. We'll give you a fixed price instantly, no middle man, no surprises.",
  },
  {
    number: 2,
    icon: Calendar,
    title: "BOOK YOUR INSTALLATION DATE",
    description:
      "Choose a date and time that suits you. Our Gas Safe Experts are available 6 days a week, with next-day installation often available.",
  },
  {
    number: 3,
    icon: Home,
    title: "ENJOY YOUR NEW BOILER",
    description:
      "We install your new boiler efficiently, clean up completely, and fully test the system before we leave. Same-day heating, same-day hot water.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-carbon-950 py-14 sm:py-16 lg:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="SIMPLE PROCESS"
            heading="HOW IT WORKS"
            highlightedWord="WORKS"
            subtitle="From quote to warm home in as little as 24 hours."
          />
        </ScrollReveal>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} direction="up" delay={index * 0.15}>
              <div
                className={`hover-card relative flex flex-col items-center rounded-2xl border p-6 text-center transition-colors ${
                  index === 0
                    ? "border-mint-500 bg-carbon-900/60 shadow-[0_0_30px_rgba(91,254,177,0.15)]"
                    : "border-carbon-700 bg-carbon-900/50"
                }`}
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-mint-500 text-lg font-bold text-carbon-900 shadow-lg shadow-mint-500/30 animate-pulse-glow">
                  {step.number}
                </div>

                <div className="hover-icon-glow mt-2 mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-lg border border-mint-500/40 bg-carbon-800">
                  <step.icon className="h-6 w-6 sm:h-7 sm:w-7 text-mint-500" />
                </div>

                <h3 className="mb-2 text-sm sm:text-base font-bold uppercase tracking-wide text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-carbon-300">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="#quote-form"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-mint-500 px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-carbon-900 transition-all hover:bg-mint-400 hover:scale-105 active:scale-95 shadow-lg shadow-mint-500/20"
          >
            START MY FREE QUOTE
          </Link>
        </div>
      </Container>
    </section>
  );
}

export { HowItWorks };
