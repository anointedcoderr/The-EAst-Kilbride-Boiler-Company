"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteSettings } from "@/data/siteSettings";
import { mainNav } from "@/data/navigation";
import MobileNav from "./MobileNav";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-colors duration-300",
          scrolled ? "bg-carbon-900/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="shrink-0 group">
              <div className="leading-none">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-carbon-300 font-medium">
                  The
                </span>
                <span className="block text-lg font-bold tracking-tight text-white">
                  <span className="border-b-2 border-mint-500">
                    EAST KILBRIDE
                  </span>
                </span>
                <span className="block text-xl font-extrabold tracking-tight text-white">
                  <span className="border-b-2 border-mint-500">BOILER</span>
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-carbon-300 font-medium">
                  Company
                </span>
                <span className="block text-[8px] uppercase tracking-[0.15em] text-carbon-400 mt-0.5">
                  EST 2017 - East Kilbride
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {mainNav.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 px-3 py-2 text-xs uppercase tracking-widest text-white hover:text-mint-500 transition-colors"
                    >
                      {item.label}
                      <ChevronDown className="h-3 w-3" />
                    </Link>
                    {servicesOpen && (
                      <div className="absolute top-full left-0 mt-0 pt-2">
                        <div className="bg-carbon-800 border border-carbon-600 rounded-lg shadow-xl py-2 min-w-[220px]">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-white hover:text-mint-500 hover:bg-carbon-700 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-3 py-2 text-xs uppercase tracking-widest text-white hover:text-mint-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-widest text-carbon-400">
                  Free Phone
                </span>
                <a
                  href={siteSettings.phoneHref}
                  className="text-mint-500 font-bold text-lg hover:text-mint-400 transition-colors"
                >
                  {siteSettings.phone}
                </a>
              </div>
              <Link
                href="/get-a-quote/"
                className="bg-mint-500 text-carbon-900 font-bold px-6 py-2 rounded hover:bg-mint-400 transition-colors text-sm uppercase tracking-wide"
              >
                Get Quote
              </Link>
            </div>

            <button
              className="lg:hidden p-2 text-white hover:text-mint-500 transition-colors"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
