import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

function Logo({ className, showTagline = true, size = "md" }: LogoProps) {
  const sizes = {
    sm: {
      eyebrow: "text-[8px]",
      main: "text-[14px]",
      company: "text-[11px]",
      tagline: "text-[7px]",
    },
    md: {
      eyebrow: "text-[9px]",
      main: "text-[16px] sm:text-[17px]",
      company: "text-[12px] sm:text-[13px]",
      tagline: "text-[8px]",
    },
    lg: {
      eyebrow: "text-[11px]",
      main: "text-2xl",
      company: "text-base",
      tagline: "text-[10px]",
    },
  } as const;

  const s = sizes[size];

  return (
    <Link
      href="/"
      aria-label="The East Kilbride Boiler Company"
      className={cn("inline-block leading-[1.05] group", className)}
    >
      <span
        className={cn(
          "block uppercase tracking-[0.3em] text-carbon-200 font-medium",
          s.eyebrow
        )}
      >
        The
      </span>
      <span
        className={cn(
          "block font-black uppercase tracking-tight whitespace-nowrap",
          s.main
        )}
      >
        <span className="text-[#3FA9F5] brand-blue-glow">EAST KILBRIDE</span>{" "}
        <span className="text-mint-500 mint-glow">BOILER</span>
      </span>
      <span
        className={cn(
          "block font-black uppercase tracking-tight text-white",
          s.company
        )}
      >
        Company
      </span>
      {showTagline && (
        <span
          className={cn(
            "block uppercase tracking-[0.28em] text-carbon-400 mt-1 font-medium",
            s.tagline
          )}
        >
          EST 2017 · East Kilbride
        </span>
      )}
    </Link>
  );
}

export { Logo };
