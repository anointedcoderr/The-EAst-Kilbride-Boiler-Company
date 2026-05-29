import Link from "next/link";
import { ArrowLeft, Phone, Search, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteSettings } from "@/data/siteSettings";

export const metadata = {
  title: "Page Not Found | The East Kilbride Boiler Company",
  description:
    "The page you were looking for could not be found. Get a fixed-price boiler quote, browse our services, or call our Gas Safe Experts on 01355 204045.",
  robots: { index: false, follow: true },
};

const quickLinks = [
  { label: "Homepage", href: "/" },
  { label: "Boiler Prices", href: "/boilers/" },
  { label: "New Boiler Installation", href: "/services/new-boiler-installation/" },
  { label: "Boiler Repair", href: "/services/boiler-repair/" },
  { label: "Annual Boiler Service", href: "/services/boiler-servicing/" },
  { label: "Areas We Serve", href: "/areas-we-serve/" },
  { label: "G74 hub", href: "/areas-we-serve/g74/" },
  { label: "G75 hub", href: "/areas-we-serve/g75/" },
  { label: "Boiler advice blog", href: "/blogs/" },
  { label: "Frequently asked questions", href: "/faq/" },
  { label: "About EKBC", href: "/about/" },
  { label: "Contact us", href: "/contact/" },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-200px)] items-center overflow-hidden bg-carbon-950 py-16 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(91,254,177,0.08)_0%,_transparent_70%)]" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-mint-400">
            Error 404
          </p>

          <h1 className="mt-3 text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
            We couldn&apos;t find that{" "}
            <span className="text-mint-500 neon-company">page</span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-carbon-300 sm:text-lg">
            The page you were looking for may have moved, or the link may be out of date. Try one of the quick links below, or call our Gas Safe Experts and we will point you in the right direction.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-mint-500 px-6 py-3 text-base font-bold text-carbon-900 shadow-lg shadow-mint-500/20 transition-all hover:bg-mint-400 hover:scale-[1.02] active:scale-95"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to homepage
            </Link>
            <a
              href={siteSettings.phoneHref}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-mint-500 px-6 py-3 text-base font-semibold text-mint-500 transition-all hover:bg-mint-500/10 hover:scale-[1.02] active:scale-95"
            >
              <Phone className="h-5 w-5" />
              Call {siteSettings.phone}
            </a>
          </div>

          <div className="mt-12">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-mint-400">
              <Compass className="h-3.5 w-3.5" />
              Popular destinations
            </p>
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 rounded-full border border-carbon-700 bg-carbon-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:border-mint-500/50 hover:text-mint-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 inline-flex items-center gap-2 text-sm text-carbon-400">
            <Search className="h-4 w-4 text-mint-500" />
            Need a quote right now? Use the{" "}
            <Link
              href="/#quote-form"
              className="font-semibold text-mint-500 underline hover:text-mint-400"
            >
              60-second form
            </Link>{" "}
            on the homepage.
          </p>
        </div>
      </Container>
    </section>
  );
}
