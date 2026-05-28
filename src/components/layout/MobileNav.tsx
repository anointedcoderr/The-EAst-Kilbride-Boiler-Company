"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteSettings } from "@/data/siteSettings";
import { mainNav } from "@/data/navigation";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-carbon-900/98 backdrop-blur-md">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 text-white hover:text-mint-500 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="space-y-1">
            {mainNav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    onClick={() => setServicesExpanded(!servicesExpanded)}
                    className="flex items-center justify-between w-full py-3 text-xl uppercase tracking-widest text-white hover:text-mint-500 transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform",
                        servicesExpanded && "rotate-180"
                      )}
                    />
                  </button>
                  {servicesExpanded && (
                    <ul className="pl-4 pb-2 space-y-1">
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
                    className="block py-3 text-xl uppercase tracking-widest text-white hover:text-mint-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="px-6 pb-8 space-y-4">
          <a
            href={siteSettings.phoneHref}
            className="flex items-center justify-center gap-3 py-3 text-mint-500 text-lg font-bold"
          >
            <Phone className="h-5 w-5" />
            {siteSettings.phone}
          </a>
          <Link
            href="/#quote"
            onClick={onClose}
            className="block w-full text-center bg-mint-500 text-carbon-900 font-bold py-3 rounded-lg text-lg uppercase tracking-wide hover:bg-mint-400 transition-colors"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
