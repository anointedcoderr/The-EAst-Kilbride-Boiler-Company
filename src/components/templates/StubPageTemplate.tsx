import Link from "next/link";
import { Hammer, Phone, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { siteSettings } from "@/data/siteSettings";

interface StubPageTemplateProps {
  pageName: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  liveLinks?: Array<{ label: string; href: string }>;
}

export function StubPageTemplate({
  pageName,
  description,
  breadcrumbs,
  liveLinks,
}: StubPageTemplateProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-carbon-950 py-14 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-carbon-900 via-carbon-950 to-carbon-900"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(91, 254, 177, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(91, 254, 177, 0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <Container className="relative z-10 max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mt-10 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-mint-500/40 bg-carbon-800 shadow-[0_0_30px_rgba(91,254,177,0.15)]">
              <Hammer className="h-9 w-9 text-mint-500" />
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-mint-400">
              Coming soon
            </p>

            <h1 className="mt-3 text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {pageName} <span className="text-mint-500 neon-company">page</span>{" "}
              under build
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-carbon-300 sm:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/#quote-form"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-mint-500 px-6 py-3 text-base font-bold text-carbon-900 transition-all hover:bg-mint-400 hover:scale-[1.02] active:scale-95 shadow-lg shadow-mint-500/30"
              >
                Get a fixed price quote
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={siteSettings.phoneHref}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-mint-500 px-6 py-3 text-base font-semibold text-mint-500 transition-all hover:bg-mint-500/10 hover:scale-[1.02] active:scale-95"
              >
                <Phone className="h-5 w-5" />
                Call {siteSettings.phone}
              </a>
            </div>

            {liveLinks && liveLinks.length > 0 && (
              <div className="mt-12">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-carbon-400">
                  In the meantime, you can visit
                </p>
                <ul className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  {liveLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-1 rounded-full border border-carbon-700 bg-carbon-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:border-mint-500/50 hover:text-mint-400"
                      >
                        {link.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </section>

      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
