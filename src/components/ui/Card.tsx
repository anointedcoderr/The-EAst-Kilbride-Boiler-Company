import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}

function Card({ className, children, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-carbon-600 bg-carbon-800 p-6 transition-colors duration-300",
        hover && "hover:border-mint-500/50",
        className
      )}
    >
      {children}
    </div>
  );
}

export { Card };
export type { CardProps };
