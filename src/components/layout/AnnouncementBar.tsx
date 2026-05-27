"use client";

import { Check } from "lucide-react";

const trustPoints = [
  "Which? Best Boiler - Approved Installers",
  "8200+ Happy EK Customers",
  "Unbeatable Fixed-Price Quotes - No Hidden Extras",
  "East Kilbride Gas Safe Experts",
];

export default function AnnouncementBar() {
  return (
    <div className="bg-carbon-950 border-b border-carbon-800 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap py-2">
        {[...trustPoints, ...trustPoints].map((point, i) => (
          <span key={i} className="inline-flex items-center mx-6 text-sm">
            <Check className="h-4 w-4 text-mint-500 mr-2 shrink-0" />
            <span className="text-white">{point}</span>
            <span className="ml-6 text-carbon-600">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
