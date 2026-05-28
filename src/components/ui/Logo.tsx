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
      main: "text-[13px]",
      company: "text-[9px]",
      tagline: "text-[7px]",
    },
    md: {
      eyebrow: "text-[8px] sm:text-[9px]",
      main: "text-[13px] sm:text-[14px]",
      company: "text-[10px] sm:text-[11px]",
      tagline: "text-[7px] sm:text-[8px]",
    },
    lg: {
      eyebrow: "text-[10px]",
      main: "text-lg",
      company: "text-xs",
      tagline: "text-[9px]",
    },
  } as const;

  const s = sizes[size];

  return (
    <Link
      href="/"
      aria-label="The East Kilbride Boiler Company"
      className={cn("inline-block leading-tight group", className)}
    >
      <span
        className={cn(
          "block uppercase tracking-[0.2em] text-carbon-300 font-medium",
          s.eyebrow
        )}
      >
        The
      </span>
      <span
        className={cn(
          "block font-extrabold tracking-tight whitespace-nowrap",
          s.main
        )}
      >
        <span className="text-[#3FA9F5] brand-blue-glow">EAST KILBRIDE</span>{" "}
        <span className="text-mint-500">BOILER</span>
      </span>
      <span
        className={cn("block font-bold uppercase tracking-wide text-white", s.company)}
      >
        Company
      </span>
      {showTagline && (
        <span
          className={cn(
            "block uppercase tracking-[0.18em] text-carbon-400 mt-0.5",
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
