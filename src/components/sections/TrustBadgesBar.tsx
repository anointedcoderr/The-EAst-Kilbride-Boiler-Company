import { Award, Building2, ShieldCheck, BadgeCheck, Flame } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const badges = [
  {
    id: "scottish-awards",
    icon: Award,
    title: "Scottish Home",
    subtitle: "Improvement Awards",
  },
  {
    id: "glasgow-chamber",
    icon: Building2,
    title: "Glasgow Chamber",
    subtitle: "of Commerce Member",
  },
  {
    id: "checkatrade",
    icon: BadgeCheck,
    title: "Proud Member",
    subtitle: "of Checkatrade",
  },
  {
    id: "gas-safe",
    icon: ShieldCheck,
    title: "Gas Safe",
    subtitle: "Registered",
  },
  {
    id: "worcester",
    icon: Flame,
    title: "Worcester Bosch",
    subtitle: "Accredited Installer",
  },
];

function TrustBadgesBar() {
  return (
    <section className="border-y border-carbon-700 bg-carbon-900 py-6 sm:py-8">
      <Container>
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
          {badges.map((badge, index) => (
            <ScrollReveal key={badge.id} direction="up" delay={index * 0.08}>
              <div className="hover-card flex h-20 min-w-[160px] sm:min-w-[180px] shrink-0 snap-start items-center gap-3 rounded-lg border border-carbon-600 bg-carbon-800 px-4 sm:px-5">
                <div className="hover-icon-glow flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-mint-500/30 bg-carbon-900">
                  <badge.icon className="h-5 w-5 text-mint-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-white leading-tight">
                    {badge.title}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-carbon-400 leading-tight">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { TrustBadgesBar };
