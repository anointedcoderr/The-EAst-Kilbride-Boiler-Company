"use client";

import dynamic from "next/dynamic";

const EkbcMap = dynamic(
  () => import("@/components/ui/EkbcMap").then((m) => m.EkbcMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-carbon-900">
        <span className="text-xs uppercase tracking-widest text-carbon-400">
          Loading map
        </span>
      </div>
    ),
  }
);

export function EkbcMapClient() {
  return <EkbcMap />;
}
