import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { PageInternalLink } from "@/data/pageContent";

interface SiloLinksProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  links: PageInternalLink[];
}

const groupOrder: PageInternalLink["group"][] = [
  "Services",
  "Boilers",
  "Brand",
  "Areas",
  "Guides",
];

const groupLabels: Record<PageInternalLink["group"], string> = {
  Services: "Related services",
  Boilers: "Boiler prices",
  Brand: "Boiler brands",
  Areas: "Areas we serve",
  Guides: "Helpful guides",
};

export function SiloLinks({
  eyebrow = "Explore the silo",
  heading = "Continue reading across our East Kilbride silo",
  intro = "Every page on this site is linked into a clear silo. Use these visible internal links to jump to the next step, whether you are comparing boiler prices, picking a brand, or checking what your postcode is covered for.",
  links,
}: SiloLinksProps) {
  if (links.length === 0) return null;

  const grouped = groupOrder
    .map((group) => ({
      group,
      label: groupLabels[group],
      items: links.filter((link) => link.group === group),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <section className="bg-carbon-900 py-14 sm:py-20">
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
              {intro}
            </p>
          </header>
        </ScrollReveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {grouped.map(({ group, label, items }, index) => (
            <ScrollReveal
              key={group}
              direction="up"
              delay={Math.min(index * 0.05, 0.3)}
            >
              <div className="hover-card h-full rounded-2xl border border-carbon-700 bg-carbon-950/70 p-5 transition-colors hover:border-mint-500/40">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-mint-400">
                  {label}
                </p>
                <ul className="mt-4 space-y-2">
                  {items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between gap-3 rounded-lg border border-carbon-800 bg-carbon-900 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:border-mint-500/40 hover:text-mint-400"
                      >
                        <span className="truncate">{item.label}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-mint-500 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
