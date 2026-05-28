import { Container } from "@/components/ui/Container";

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

function BadgeCard({ className, children }: BadgeProps) {
  return (
    <div
      className={`flex h-24 w-[200px] shrink-0 items-center justify-center rounded-xl bg-white px-4 py-3 mx-3 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

const badgeContent = [
  <BadgeCard key="which">
    <div className="flex flex-col items-center text-center leading-tight">
      <span className="font-serif text-2xl font-extrabold italic text-carbon-900">
        Which<span className="text-mint-700">?</span>
      </span>
      <span className="mt-1 text-[8px] font-bold uppercase tracking-wider text-carbon-700">
        Recommended Brand
      </span>
      <span className="mt-1 inline-flex items-center rounded-sm bg-[#F5C518] px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-carbon-900">
        Gas Boilers · Sept 2025
      </span>
    </div>
  </BadgeCard>,

  <BadgeCard key="trustpilot">
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 fill-[#00B67A]"
        aria-hidden="true"
      >
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.443l-7.416 3.97 1.48-8.279L0 9.306l8.332-1.151z" />
      </svg>
      <span className="text-lg font-bold text-carbon-900">Trustpilot</span>
    </div>
  </BadgeCard>,

  <BadgeCard key="scottish">
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
  </BadgeCard>,

  <BadgeCard key="glasgow">
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
  </BadgeCard>,

  <BadgeCard key="checkatrade">
    <div className="flex flex-col items-center text-center leading-tight">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-carbon-700">
        Proud Members of
      </span>
      <span className="mt-1 text-base font-extrabold text-[#F4733A]">
        Checka<span className="text-mint-700">✓</span>trade
      </span>
    </div>
  </BadgeCard>,

  <BadgeCard key="worcester">
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
  </BadgeCard>,

  <BadgeCard key="gas-safe">
    <div className="flex items-center gap-2">
      <div className="flex h-12 w-12 items-center justify-center bg-[#F5C518]">
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-carbon-900" aria-hidden="true">
          <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-base font-extrabold uppercase text-carbon-900">
          Gas Safe
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-wider text-carbon-700">
          Registered
        </span>
      </div>
    </div>
  </BadgeCard>,
];

function TrustBadgesBar() {
  return (
    <section className="border-y border-carbon-700 bg-carbon-900 py-6 sm:py-8 overflow-hidden">
      <Container className="!max-w-none !px-0">
        <div
          className="group relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div
            className="flex w-max group-hover:[animation-play-state:paused]"
            style={{
              animation: "scroll-marquee 40s linear infinite",
            }}
          >
            {badgeContent.map((badge, i) => (
              <div key={`a-${i}`}>{badge}</div>
            ))}
            {badgeContent.map((badge, i) => (
              <div key={`b-${i}`}>{badge}</div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export { TrustBadgesBar };
