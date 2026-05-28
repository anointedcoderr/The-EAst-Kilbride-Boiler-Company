import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

function BadgeCard({ className, children }: BadgeProps) {
  return (
    <div
      className={`hover-card flex h-24 w-[180px] sm:w-[200px] shrink-0 snap-start items-center justify-center rounded-xl bg-white px-4 py-3 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function TrustBadgesBar() {
  return (
    <section className="border-y border-carbon-700 bg-carbon-900 py-8 sm:py-10">
      <Container>
        <ScrollReveal>
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 sm:gap-4">
            <BadgeCard>
              <div className="flex flex-col items-center text-center leading-tight">
                <span className="font-serif text-2xl font-extrabold italic text-carbon-900">
                  Which<span className="text-mint-700">?</span>
                </span>
                <span className="mt-1 text-[8px] font-bold uppercase tracking-wider text-carbon-700">
                  Recommended Brand
                </span>
                <span className="mt-1 inline-flex items-center rounded-sm bg-gold/90 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-carbon-900">
                  Gas Boilers · Sept 2025
                </span>
              </div>
            </BadgeCard>

            <BadgeCard>
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 fill-[#00B67A]"
                  aria-hidden="true"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.443l-7.416 3.97 1.48-8.279L0 9.306l8.332-1.151z" />
                </svg>
                <span className="text-lg font-bold text-carbon-900">
                  Trustpilot
                </span>
              </div>
            </BadgeCard>

            <BadgeCard>
              <div className="flex w-full flex-col items-start leading-tight">
                <span className="text-2xl font-extrabold italic text-[#1F4FB2]">
                  2026
                </span>
                <div className="mt-1 flex w-full flex-col gap-0.5">
                  <span className="rounded-sm bg-[#F4733A] px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-white">
                    Scottish Home
                  </span>
                  <span className="rounded-sm bg-[#7E3FC7] px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-white">
                    Improvement
                  </span>
                  <span className="rounded-sm bg-[#1F4FB2] px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-white">
                    Awards
                  </span>
                </div>
              </div>
            </BadgeCard>

            <BadgeCard>
              <div className="flex flex-col items-center text-center leading-tight">
                <span className="text-xl font-extrabold tracking-tight text-[#1F4FB2]">
                  GLASGOW
                </span>
                <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-carbon-700">
                  Chamber of Commerce
                </span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-mint-700">
                  Member
                </span>
              </div>
            </BadgeCard>

            <BadgeCard>
              <div className="flex flex-col items-center text-center leading-tight">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-carbon-700">
                  Proud Members of
                </span>
                <span className="mt-1 text-base font-extrabold text-[#F4733A]">
                  Checka<span className="text-mint-700">✓</span>trade
                </span>
              </div>
            </BadgeCard>

            <BadgeCard>
              <div className="flex flex-col items-center text-center leading-tight">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-carbon-700">
                  Accredited Installer
                </span>
                <span className="mt-1 text-sm font-extrabold uppercase tracking-tight text-[#003C71]">
                  Worcester
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-carbon-700">
                  Bosch Group
                </span>
              </div>
            </BadgeCard>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export { TrustBadgesBar };
