import Image from "next/image";
import { Container } from "@/components/ui/Container";

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

function BadgeCard({ className, children }: BadgeProps) {
  return (
    <div
      className={`flex h-24 w-[210px] shrink-0 items-center justify-center rounded-xl border border-mint-500/30 bg-carbon-900 shadow-[0_0_18px_rgba(91,254,177,0.12)] px-4 py-3 mx-3 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

const badgeContent = [
  <BadgeCard key="which">
    <div className="flex flex-col items-center text-center leading-tight">
      <span className="font-serif text-2xl font-extrabold italic text-white">
        Which<span className="text-mint-500">?</span>
      </span>
      <span className="mt-1 text-[8px] font-bold uppercase tracking-wider text-carbon-300">
        Recommended Brand
      </span>
      <span className="mt-1 inline-flex items-center rounded-sm bg-mint-500 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-carbon-900">
        Gas Boilers · Sept 2025
      </span>
    </div>
  </BadgeCard>,

  <BadgeCard key="trustpilot">
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 fill-mint-500 drop-shadow-[0_0_8px_rgba(91,254,177,0.5)]"
        aria-hidden="true"
      >
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.443l-7.416 3.97 1.48-8.279L0 9.306l8.332-1.151z" />
      </svg>
      <span className="text-lg font-bold text-white">Trustpilot</span>
    </div>
  </BadgeCard>,

  <BadgeCard key="scottish">
    <div className="flex w-full flex-col items-start leading-tight">
      <span className="text-2xl font-extrabold italic text-mint-500 [text-shadow:0_0_12px_rgba(91,254,177,0.4)]">
        2026
      </span>
      <div className="mt-1 flex w-full flex-col gap-0.5">
        <span className="rounded-sm border border-mint-500/40 bg-carbon-800 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-mint-400">
          Scottish Home
        </span>
        <span className="rounded-sm border border-mint-500/40 bg-carbon-800 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-mint-400">
          Improvement
        </span>
        <span className="rounded-sm border border-mint-500/40 bg-carbon-800 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-mint-400">
          Awards
        </span>
      </div>
    </div>
  </BadgeCard>,

  <BadgeCard key="glasgow">
    <div className="flex flex-col items-center text-center leading-tight">
      <span className="text-xl font-extrabold tracking-tight text-mint-500 [text-shadow:0_0_12px_rgba(91,254,177,0.4)]">
        GLASGOW
      </span>
      <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-carbon-300">
        Chamber of Commerce
      </span>
      <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-mint-400">
        Member
      </span>
    </div>
  </BadgeCard>,

  <BadgeCard key="checkatrade">
    <div className="flex flex-col items-center text-center leading-tight">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-carbon-300">
        Proud Members of
      </span>
      <span className="mt-1 text-base font-extrabold text-mint-500 [text-shadow:0_0_10px_rgba(91,254,177,0.4)]">
        Checka<span className="text-white">✓</span>trade
      </span>
    </div>
  </BadgeCard>,

  <BadgeCard key="worcester">
    <div className="flex flex-col items-center text-center leading-tight">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-carbon-300">
        Accredited Installer
      </span>
      <span className="mt-1 text-sm font-extrabold uppercase tracking-tight text-mint-500 [text-shadow:0_0_10px_rgba(91,254,177,0.4)]">
        Worcester
      </span>
      <span className="text-[9px] font-bold uppercase tracking-wider text-carbon-300">
        Bosch Group
      </span>
    </div>
  </BadgeCard>,

  <BadgeCard key="gas-safe">
    <a
      href="https://www.gassaferegister.co.uk"
      target="_blank"
      rel="nofollow noopener"
      className="flex items-center gap-3 transition-all hover:drop-shadow-[0_0_12px_rgba(91,254,177,0.45)]"
      aria-label="Gas Safe Register"
    >
      <Image
        src="/images/gas-safe.png"
        alt="Gas Safe Register"
        width={48}
        height={60}
        className="h-12 w-auto"
      />
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-extrabold uppercase text-white">
          Gas Safe
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-wider text-mint-400">
          Registered
        </span>
      </div>
    </a>
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
