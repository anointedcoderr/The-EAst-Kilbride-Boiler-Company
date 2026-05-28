import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-xs font-medium uppercase tracking-wider"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={item.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-mint-400">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-carbon-300 hover:text-mint-400 transition-colors"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <ChevronRight
                  aria-hidden="true"
                  className="h-3 w-3 text-carbon-600"
                />
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
