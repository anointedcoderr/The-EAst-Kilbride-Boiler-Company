"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { siteSettings } from "@/data/siteSettings";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-carbon-900 border-t border-carbon-600">
      <div className="flex items-center gap-2 p-2">
        <a
          href={siteSettings.phoneHref}
          className="flex-1 flex items-center justify-center gap-2 bg-mint-500 text-carbon-900 font-bold py-3 rounded text-sm"
        >
          <Phone className="h-4 w-4" />
          {siteSettings.phone}
        </a>
        <Link
          href="/get-a-quote/"
          className="flex-1 flex items-center justify-center border border-mint-500 text-white font-bold py-3 rounded text-sm hover:bg-mint-500/10 transition-colors"
        >
          Get Quote
        </Link>
      </div>
    </div>
  );
}
