"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import StickyMobileCTA from "./StickyMobileCTA";

interface SiteChromeProps {
  children: ReactNode;
}

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const hideChrome = pathname?.startsWith("/admin");

  if (hideChrome) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
