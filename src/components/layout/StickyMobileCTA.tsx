"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { siteSettings } from "@/data/siteSettings";

export default function StickyMobileCTA() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-carbon-950/95 backdrop-blur-lg border-t border-carbon-700 shadow-[0_-8px_20px_rgba(0,0,0,0.35)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={siteSettings.phoneHref}
          className="flex-1 flex items-center justify-center gap-2 bg-mint-500 text-carbon-900 font-bold py-3 rounded-lg text-sm min-h-[48px] shadow-lg shadow-mint-500/20 active:scale-95 transition-transform"
          aria-label={`Call ${siteSettings.phone}`}
        >
          <Phone className="h-4 w-4" />
          <span className="tracking-wide">{siteSettings.phone}</span>
        </a>
        <Link
          href="/#quote-form"
          className="flex-1 flex items-center justify-center border border-mint-500 text-white font-bold py-3 rounded-lg text-sm min-h-[48px] hover:bg-mint-500/10 active:scale-95 transition-all"
        >
          Get Quote
        </Link>
      </div>
    </div>
  );
}
