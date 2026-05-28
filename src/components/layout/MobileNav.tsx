"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteSettings } from "@/data/siteSettings";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-carbon-900/98 backdrop-blur-md">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-carbon-800">
          <Logo size="sm" />
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:text-mint-500 hover:bg-white/[0.06] transition-all"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="space-y-1">
            {mainNav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    onClick={() =>
                      setExpanded(expanded === item.label ? null : item.label)
                    }
                    className="flex items-center justify-between w-full py-3 text-lg uppercase tracking-widest text-white hover:text-mint-500 transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform",
                        expanded === item.label && "rotate-180"
                      )}
                    />
                  </button>
                  {expanded === item.label && (
                    <ul className="pl-4 pb-2 space-y-1 border-l border-mint-500/30 ml-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="block py-2 text-base text-carbon-300 hover:text-mint-500 transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-3 text-lg uppercase tracking-widest text-white hover:text-mint-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="px-6 pb-8 pt-4 border-t border-carbon-800 space-y-3">
          <a
            href={siteSettings.phoneHref}
            className="flex items-center justify-center gap-3 py-3.5 rounded-lg border border-mint-500/40 bg-mint-500/10 text-mint-400 text-base font-bold transition-all hover:bg-mint-500/20"
          >
            <Phone className="h-5 w-5" />
            {siteSettings.phone}
          </a>
          <Link
            href="/#quote"
            onClick={onClose}
            className="block w-full text-center bg-mint-500 text-carbon-900 font-bold py-3.5 rounded-lg text-base uppercase tracking-wide hover:bg-mint-400 transition-colors shadow-lg shadow-mint-500/20"
          >
            Get Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
