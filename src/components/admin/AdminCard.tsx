import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdminCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AdminCard({
  title,
  description,
  action,
  children,
  className,
}: AdminCardProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-carbon-700 bg-carbon-900/60 backdrop-blur p-5 sm:p-6 shadow-[0_0_24px_rgba(0,0,0,0.25)]",
        className
      )}
    >
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white">{title}</h2>
          {description && (
            <p className="mt-1 text-xs text-carbon-400">{description}</p>
          )}
        </div>
        {action}
      </header>
      <div>{children}</div>
    </section>
  );
}
