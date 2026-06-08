import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "East Kilbride Boiler Company | EKBC - Boiler Replacement G74 / G75",
    template: "%s | East Kilbride Boiler Company",
  },
  description:
    "East Kilbride's #1 boiler replacement company. Fixed-price installations across 35 EK areas. Gas Safe engineers, up to 12-year warranties. Call 01355 204045.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-carbon-900 text-white font-sans has-sticky-cta">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
