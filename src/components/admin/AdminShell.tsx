"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import {
  LayoutDashboard,
  Settings,
  Tag,
  Megaphone,
  Search,
  ClipboardList,
  LogOut,
  FileText,
  Network,
  Globe,
  ShieldCheck,
  Boxes,
  MapPinned,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSection {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const sections: AdminSection[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "pages", label: "Pages (Content Manager)", icon: FileText },
  { id: "brand-pages", label: "Brand Pages", icon: Boxes },
  { id: "district-pages", label: "District Pages", icon: MapPinned },
  { id: "silo", label: "Silo Preview", icon: Network },
  { id: "sitemap", label: "Sitemap & Crawling", icon: Globe },
  { id: "schema", label: "SEO & Schema Foundation", icon: ShieldCheck },
  { id: "settings", label: "Global Settings", icon: Settings },
  { id: "brands", label: "Brand Pricing", icon: Tag },
  { id: "promotions", label: "Promotions", icon: Megaphone },
  { id: "seo", label: "SEO Preview", icon: Search },
  { id: "quote", label: "Quote Form", icon: ClipboardList },
];

interface AdminShellProps {
  activeSection: string;
  onSectionChange: (id: string) => void;
  children: ReactNode;
}

export function AdminShell({
  activeSection,
  onSectionChange,
  children,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-carbon-950 text-white">
      <header className="sticky top-0 z-30 border-b border-carbon-800 bg-carbon-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Back to website">
              <Image
                src="/images/logo.png"
                alt="The East Kilbride Boiler Company"
                width={192}
                height={90}
                style={{ height: 44, width: "auto" }}
                className="block"
                priority
              />
            </Link>
            <span className="hidden sm:inline-flex items-center rounded-full border border-mint-500/40 bg-mint-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mint-400">
              Stage 2 local preview
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-1.5 rounded-full border border-mint-500/40 bg-mint-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-mint-300 transition-colors hover:border-mint-500/60 hover:bg-mint-500/15 hover:text-mint-200"
            >
              <Inbox className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">View leads</span>
              <span className="xs:hidden">Leads</span>
            </Link>
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 hover:text-mint-400"
            >
              View site
            </Link>
            <form method="POST" action="/api/admin/logout" className="inline-flex">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-carbon-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 transition-colors hover:border-mint-500/50 hover:text-mint-400"
                aria-label="Sign out"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside>
            <nav aria-label="Admin sections" className="lg:sticky lg:top-[88px]">
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const active = activeSection === section.id;
                  return (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => onSectionChange(section.id)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                          active
                            ? "border-mint-500/50 bg-mint-500/10 text-mint-400 shadow-[0_0_16px_rgba(91,254,177,0.15)]"
                            : "border-carbon-800 bg-carbon-900/40 text-carbon-300 hover:border-carbon-700 hover:bg-carbon-900 hover:text-white"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{section.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <main className="min-w-0 space-y-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
