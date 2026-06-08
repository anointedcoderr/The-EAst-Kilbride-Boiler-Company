import type { NextConfig } from "next";

const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async headers() {
    // Prevent the Hostinger CDN from holding stale HTML across deploys.
    // The default Next.js prerender cache-control is s-maxage=31536000
    // (one year), which means a brand-new build's CSS / JS bundles don't
    // reach visitors until their CDN edge ages out - they keep getting
    // old HTML pointing at bundle filenames that no longer exist.
    //
    // Strategy:
    //   - Hashed bundle assets under /_next/static: keep the immutable
    //     1-year cache (filenames are fingerprinted, so they're safe).
    //   - Everything else (HTML, API): cache 60s on the CDN with up to
    //     24h stale-while-revalidate so visitors always get a recent
    //     build's markup without each request hitting the origin.
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=60, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
