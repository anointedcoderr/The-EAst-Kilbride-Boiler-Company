import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteSettings } from "@/data/siteSettings";

interface PhoneLinkProps {
  className?: string;
  children?: ReactNode;
  showIcon?: boolean;
}

function PhoneLink({
  className,
  children,
  showIcon = true,
}: PhoneLinkProps) {
  return (
    <a
      href={siteSettings.phoneHref}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {showIcon && <Phone className="h-4 w-4" />}
      {children ?? siteSettings.phone}
    </a>
  );
}

export { PhoneLink };
export type { PhoneLinkProps };
