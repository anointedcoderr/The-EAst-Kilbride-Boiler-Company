"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, ChevronDown, Phone, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteSettings } from "@/data/siteSettings";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import MobileNav from "./MobileNav";

const trustPoints = [
  "Which? Best Boiler Approved Installers",
  "8200+ Happy EK Customers",
  "Unbeatable Fixed-Price Quotes, No Hidden Extras",
  "East Kilbride Gas Safe engineers",
  "Up to 12-Year Warranties on All New Boilers",
  "East Kilbride's No.1 Boiler Company",
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-carbon-950 border-b border-carbon-800 overflow-hidden">
          <div
            className="animate-marquee flex w-max whitespace-nowrap py-1.5"
            aria-hidden="true"
          >
            {[...trustPoints, ...trustPoints].map((point, i) => (
              <span
                key={i}
                className="inline-flex shrink-0 items-center mx-5 text-[11px] sm:text-xs"
              >
                <Check className="h-3 w-3 text-mint-500 mr-1.5 shrink-0" />
                <span className="text-white">{point}</span>
                <span className="ml-5 text-carbon-600">|</span>
              </span>
            ))}
          </div>
        </div>

        <header
          className={cn(
            "bg-carbon-950 border-b border-carbon-800 transition-all duration-300",
            scrolled && "shadow-2xl shadow-black/40"
          )}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 h-16 lg:h-[84px]">
              <Logo size="md" priority />

              <nav
                aria-label="Primary"
                className="hidden lg:flex items-center rounded-full border border-carbon-700 bg-carbon-900/60 px-2 py-1.5 backdrop-blur"
              >
                {mainNav.map((item, idx) => (
                  <div key={item.label} className="flex items-center">
                    {idx > 0 && (
                      <span
                        aria-hidden="true"
                        className="text-carbon-600 text-[10px] px-0.5 select-none"
                      >
                        |
                      </span>
                    )}
                    {item.children ? (
                      <div
                        className="relative"
                        onMouseEnter={() => handleDropdownEnter(item.label)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] uppercase tracking-[0.08em] font-medium transition-colors duration-200",
                            "text-white/90 hover:text-mint-400",
                            openDropdown === item.label &&
                              "text-mint-400 bg-white/[0.04]"
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "h-3 w-3 transition-transform duration-200",
                              openDropdown === item.label && "rotate-180"
                            )}
                          />
                        </Link>
                        <div
                          className={cn(
                            "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200",
                            openDropdown === item.label
                              ? "opacity-100 translate-y-0 pointer-events-auto"
                              : "opacity-0 -translate-y-2 pointer-events-none"
                          )}
                        >
                          <div className="rounded-2xl border border-carbon-700 bg-carbon-950/95 backdrop-blur py-2 min-w-[240px] shadow-2xl shadow-black/40">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block whitespace-nowrap px-5 py-2.5 text-sm text-white/80 hover:text-mint-400 hover:bg-white/[0.04] transition-colors duration-150"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] uppercase tracking-[0.08em] font-medium text-white/90 hover:text-mint-400 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="hidden lg:flex items-center gap-4">
                <a
                  href={siteSettings.phoneHref}
                  className="group/phone flex items-center gap-2.5 transition-all duration-200"
                  aria-label={`Call ${siteSettings.phone}`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint-500/10 border border-mint-500/30 text-mint-500 group-hover/phone:bg-mint-500/20 group-hover/phone:shadow-[0_0_16px_rgba(91,254,177,0.25)] transition-all">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[9px] uppercase tracking-[0.15em] text-carbon-300">
                      Free Phone
                    </span>
                    <span className="block text-sm font-bold tracking-wide text-mint-400">
                      {siteSettings.phone}
                    </span>
                  </span>
                </a>
                <Link
                  href="/#quote-form"
                  className="bg-mint-500 text-carbon-900 font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wide hover:bg-mint-400 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-mint-500/30"
                >
                  Get Quote
                </Link>
              </div>

              <div className="flex lg:hidden items-center gap-2">
                <a
                  href={siteSettings.phoneHref}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-mint-500/10 border border-mint-500/40 text-mint-500 active:scale-95 transition-transform"
                  aria-label={`Call ${siteSettings.phone}`}
                >
                  <Phone className="h-4 w-4" />
                </a>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:text-mint-400 hover:bg-white/[0.06] transition-all duration-200"
                  onClick={() => setMobileNavOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="h-[88px] lg:h-[120px]" aria-hidden="true" />

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
