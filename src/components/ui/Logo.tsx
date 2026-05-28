import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

// Logo source is 385x199 (roughly 1.93:1)
const heights = {
  sm: 44,
  md: 56,
  lg: 80,
} as const;

function Logo({ className, size = "md", priority = false }: LogoProps) {
  const h = heights[size];

  return (
    <Link
      href="/"
      aria-label="The East Kilbride Boiler Company"
      className={cn("inline-block shrink-0", className)}
    >
      <Image
        src="/images/logo.png"
        alt="The East Kilbride Boiler Company"
        width={385}
        height={199}
        priority={priority}
        style={{ height: h, width: "auto" }}
        className="block"
      />
    </Link>
  );
}

export { Logo };
