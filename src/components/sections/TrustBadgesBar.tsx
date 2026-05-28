import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const badges = [
  "Scottish Home Improvement Awards",
  "Glasgow Chamber of Commerce Member",
  "Proud Members of Checkatrade",
  "Gas Safe Registered",
  "Worcester Bosch Accredited Installer",
];

function TrustBadgesBar() {
  return (
    <section className="border-y border-carbon-700 bg-carbon-900 py-8">
      <Container>
        <div className="flex snap-x gap-4 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
          {badges.map((badge, index) => (
            <ScrollReveal key={badge} direction="up" delay={index * 0.1}>
              <div className="hover-card flex h-20 min-w-[180px] shrink-0 snap-start items-center justify-center rounded-lg border border-carbon-600 bg-carbon-800 px-5">
                <p className="text-center text-xs font-bold uppercase tracking-wider text-white">
                  {badge}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { TrustBadgesBar };
