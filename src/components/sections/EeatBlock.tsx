import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteSettings } from "@/data/siteSettings";

interface EeatBlockProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
}

export function EeatBlock({
  eyebrow = "Local experience you can verify",
  heading = "Why East Kilbride homeowners trust EKBC",
  description = "We are a real local East Kilbride boiler company that works with experienced self-employed Gas Safe engineers, each carrying their own Gas Safe registration and public liability insurance. No call centre, no overseas lead farms, no fake reviews.",
}: EeatBlockProps) {
  const cards = [
    {
      icon: Award,
      title: "Established and local",
      body: `Trading from East Kilbride since ${siteSettings.establishedYear}. ${siteSettings.happyCustomers} happy customers across G74 and G75.`,
    },
    {
      icon: ShieldCheck,
      title: "Gas Safe engineers",
      body: (
        <>
          Every install, repair and service is signed off by the self-employed Gas Safe registered engineers we work with. Verify any UK Gas Safe registration at{" "}
          <a
            href="https://www.gassaferegister.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-mint-400 underline underline-offset-2 hover:text-mint-300"
          >
            gassaferegister.co.uk
          </a>
          .
        </>
      ),
    },
    {
      icon: MapPin,
      title: "East Kilbride based",
      body: `${siteSettings.address.street}, ${siteSettings.address.city}, ${siteSettings.address.postcode}. Covering every G74 and G75 district.`,
    },
    {
      icon: Phone,
      title: "Talk to a real engineer",
      body: (
        <>
          Call{" "}
          <a
            href={siteSettings.phoneHref}
            className="font-bold text-mint-400 hover:text-mint-300"
          >
            {siteSettings.phone}
          </a>{" "}
          and speak to a Gas Safe registered engineer, not a sales script.
        </>
      ),
    },
  ];

  return (
    <section className="bg-carbon-950 py-14 sm:py-20">
      <Container>
        <ScrollReveal>
          <header className="max-w-3xl">
            <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
              {eyebrow}
            </p>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-carbon-300">
              {description}
            </p>
          </header>
        </ScrollReveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, body }, index) => (
            <ScrollReveal
              key={title}
              direction="up"
              delay={Math.min(index * 0.05, 0.25)}
            >
              <div className="hover-card h-full rounded-2xl border border-carbon-700 bg-carbon-900 p-5">
                <div className="hover-icon-glow mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-mint-500/40 bg-carbon-950">
                  <Icon className="h-5 w-5 text-mint-500" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-carbon-300">
                  {body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-mint-500/30 bg-carbon-900 px-5 py-4">
          <p className="text-sm text-carbon-200">
            Need to verify a Gas Safe registered engineer?
          </p>
          <Link
            href="https://www.gassaferegister.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-mint-500/50 bg-carbon-950 px-4 py-2 text-xs font-bold uppercase tracking-wider text-mint-400 transition-colors hover:bg-mint-500/10"
          >
            Visit Gas Safe Register
          </Link>
        </div>
      </Container>
    </section>
  );
}
