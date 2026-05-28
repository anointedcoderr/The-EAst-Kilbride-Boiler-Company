"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteSettings } from "@/data/siteSettings";
import { mainNav } from "@/data/navigation";
import MobileNav from "./MobileNav";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setServicesOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-6 lg:px-8">
        <nav
          className={cn(
            "glass-strong max-w-7xl mx-auto rounded-full px-4 sm:px-6 lg:px-8 transition-all duration-300",
            scrolled && "!bg-[rgba(10,10,10,0.92)] shadow-2xl shadow-black/30"
          )}
        >
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <Link href="/" className="shrink-0 group pl-2">
              <div className="leading-none">
                <span className="block text-[9px] uppercase tracking-[0.2em] text-carbon-300 font-medium">
                  The
                </span>
                <span className="block text-sm font-bold tracking-tight text-white">
                  <span className="border-b-2 border-mint-500">EAST KILBRIDE</span>
                </span>
                <span className="block text-base font-extrabold tracking-tight text-white">
                  <span className="border-b-2 border-mint-500">BOILER</span>
                </span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-carbon-300 font-medium">
                  Company
                </span>
                <span className="block text-[7px] uppercase tracking-[0.15em] text-carbon-400 mt-0.5">
                  EST 2017 - East Kilbride
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              {mainNav.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-2 rounded-full text-[11px] uppercase tracking-widest font-medium transition-all duration-200",
                        "text-white/80 hover:text-white hover:bg-white/[0.06]",
                        servicesOpen && "text-mint-400 bg-white/[0.06]"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          servicesOpen && "rotate-180"
                        )}
                      />
                    </Link>
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200",
                        servicesOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      )}
                    >
                      <div className="glass-strong rounded-2xl py-2 min-w-[240px] shadow-2xl shadow-black/40">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2.5 text-sm text-white/80 hover:text-mint-400 hover:bg-white/[0.04] transition-colors duration-150"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-3 py-2 rounded-full text-[11px] uppercase tracking-widest font-medium text-white/80 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            <div className="hidden lg:flex items-center gap-3 pr-2">
              <a
                href={siteSettings.phoneHref}
                className="group/phone flex items-center gap-2 px-3 py-1.5 rounded-full text-mint-400 hover:text-mint-300 transition-all duration-200 hover:shadow-[0_0_16px_rgba(91,254,177,0.15)]"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="text-sm font-bold tracking-wide">{siteSettings.phone}</span>
              </a>
              <Link
                href="/get-a-quote/"
                className="bg-mint-500 text-carbon-900 font-bold px-5 py-2 rounded-full text-xs uppercase tracking-wide hover:bg-mint-400 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-mint-500/20"
              >
                Get Quote
              </Link>
            </div>

            <button
              className="lg:hidden p-2 rounded-full text-white hover:text-mint-400 hover:bg-white/[0.06] transition-all duration-200"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      <div className="h-[88px] lg:h-[96px]" />

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
