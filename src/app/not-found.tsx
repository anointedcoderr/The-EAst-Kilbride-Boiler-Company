import Link from "next/link";
import { Hammer, ArrowLeft, Phone, Flame } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteSettings } from "@/data/siteSettings";

export const metadata = {
  title: "Page Under Development",
  description: "This page is currently being built. Please check back soon.",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-200px)] items-center overflow-hidden bg-carbon-950 py-16 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(91,254,177,0.08)_0%,_transparent_70%)]" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-mint-500/40 bg-carbon-800 shadow-2xl shadow-mint-500/10">
            <Hammer className="h-9 w-9 text-mint-500" />
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-mint-500">
            -- Coming Soon --
          </p>

          <h1 className="mt-3 text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
            This page is{" "}
            <span className="text-mint-500">under development</span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base text-carbon-300 sm:text-lg">
            We are still building this section of the site. The homepage is live
            now, with the full 45-page East Kilbride Boiler Company site rolling
            out over the next few weeks.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-carbon-700 bg-carbon-800 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-carbon-300">
            <Flame className="h-3.5 w-3.5 text-mint-500" />
            <span>
              Built by{" "}
              <span className="text-mint-400">Anointed Coder</span>
            </span>
          </div>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
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

          <p className="mt-10 text-sm text-carbon-400">
            Need a quote right now? Use the form on the{" "}
            <Link
              href="/#quote-form"
              className="font-semibold text-mint-500 underline hover:text-mint-400"
            >
              homepage
            </Link>{" "}
            and we will get back to you within the hour.
          </p>
        </div>
      </Container>
    </section>
  );
}
