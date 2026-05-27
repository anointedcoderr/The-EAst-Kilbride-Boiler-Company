import { Clock, Wifi, Droplets, CreditCard } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Clock,
    title: "12 YEAR WARRANTY",
    badge: "FREE" as const,
    description:
      "Up to 12-year warranty on selected boilers. Maximum protection, complete peace of mind.",
  },
  {
    icon: Wifi,
    title: "WIRELESS THERMOSTAT",
    badge: "FREE" as const,
    description:
      "Wireless thermostat included with every new combi boiler installation. 24/7 programmable thermostat for your convenience.",
  },
  {
    icon: Droplets,
    title: "FULL SYSTEM FLUSH",
    badge: "FREE" as const,
    description:
      "We flush and clean your entire heating system as standard, extending the life of your new boiler.",
  },
  {
    icon: CreditCard,
    title: "ALL MAJOR CARDS ACCEPTED",
    badge: "PAY" as const,
    description:
      "We accept all major credit card payments to help spread costs. Klarna 3-month interest-free is available exclusively on boiler repair call-outs and annual servicing.",
  },
];

function WhatsIncluded() {
  return (
    <section className="bg-carbon-950 py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="WHAT'S INCLUDED"
          heading="EVERY NEW BOILER INSTALLATION INCLUDES"
          highlightedWord="INCLUDES"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative rounded-xl border border-carbon-600 bg-carbon-800 p-6 transition-colors hover:border-mint-500/50"
            >
              <div className="absolute right-4 top-4">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-bold uppercase",
                    feature.badge === "FREE"
                      ? "bg-mint-500 text-carbon-900"
                      : "bg-carbon-600 text-white"
                  )}
                >
                  {feature.badge}
                </span>
              </div>

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-mint-500/40 bg-carbon-900">
                <feature.icon className="h-6 w-6 text-mint-500" />
              </div>

              <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-carbon-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { WhatsIncluded };
