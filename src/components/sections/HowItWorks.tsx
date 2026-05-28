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
    <section className="bg-carbon-950 py-16 lg:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="SIMPLE PROCESS"
            heading="HOW IT WORKS"
            highlightedWord="WORKS"
            subtitle="From quote to warm home in as little as 24 hours."
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} direction="up" delay={index * 0.15}>
              <div className="hover-card flex flex-col items-center text-center">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-mint-500 text-lg font-bold text-carbon-900 animate-pulse-glow">
                  {step.number}
                </div>

                <div className="hover-icon-glow mb-4 flex h-16 w-16 items-center justify-center rounded-lg border border-mint-500/40 bg-carbon-800">
                  <step.icon className="h-7 w-7 text-mint-500" />
                </div>

                <h3 className="mb-2 text-base font-bold uppercase tracking-wide text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-carbon-300">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="#quote"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-mint-500 px-8 py-4 text-lg font-bold text-carbon-900 transition-colors hover:bg-mint-400"
          >
            START MY FREE QUOTE
          </Link>
        </div>
      </Container>
    </section>
  );
}

export { HowItWorks };
