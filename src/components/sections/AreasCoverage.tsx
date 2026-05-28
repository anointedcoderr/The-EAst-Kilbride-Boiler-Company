import Link from "next/link";
import { MapPin, Phone, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { districts } from "@/data/districts";
import { siteSettings } from "@/data/siteSettings";

function AreasCoverage() {
  const sortedDistricts = [...districts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const allEntries = [
    { name: "East Kilbride", slug: "", isMain: true },
    ...sortedDistricts,
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="bg-carbon-950 py-20">
      <Container>
        <SectionHeading
          eyebrow="COVERAGE"
          heading="EAST KILBRIDE'S TRUSTED LOCAL BOILER EXPERTS"
          highlightedWord="LOCAL"
          subtitle="We cover all G74 and G75 postcodes, absolutely every area of East Kilbride from The Murray to Stewartfield, Calderwood to Greenhills and beyond."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-carbon-800 px-4 py-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  East Kilbride, G74, G75
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-mint-500/50 bg-mint-500/10 px-3 py-1 text-[10px] sm:text-xs font-semibold text-mint-500">
                  <Users className="h-3 w-3" />
                  3 ENGINEERS LIVE
                </span>
              </div>

              <div className="map-grid-bg relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden rounded-xl border border-carbon-700">
                <svg
                  className="absolute inset-0 h-full w-full opacity-40"
                  viewBox="0 0 400 320"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <path d="M 60 80 Q 120 60, 180 90 T 320 110 L 360 200 Q 300 240, 220 230 T 80 250 Z" stroke="rgba(91, 254, 177, 0.25)" strokeWidth="1.5" fill="rgba(91, 254, 177, 0.04)" />
                  <path d="M 100 50 L 140 70 L 180 60 L 220 80 L 260 75 L 300 95" stroke="rgba(91, 254, 177, 0.2)" strokeWidth="1" fill="none" />
                  <path d="M 50 150 L 100 170 L 150 165 L 200 185 L 250 175 L 300 195 L 360 185" stroke="rgba(91, 254, 177, 0.2)" strokeWidth="1" fill="none" />
                  <path d="M 80 240 L 130 230 L 180 250 L 240 240 L 290 260 L 340 250" stroke="rgba(91, 254, 177, 0.2)" strokeWidth="1" fill="none" />
                  <circle cx="200" cy="160" r="60" stroke="rgba(91, 254, 177, 0.5)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                  <circle cx="200" cy="160" r="100" stroke="rgba(91, 254, 177, 0.25)" strokeWidth="1" strokeDasharray="2 4" fill="none" />
                </svg>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <div className="absolute inset-0 animate-ping rounded-full bg-mint-500/30" />
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-mint-500 shadow-lg shadow-mint-500/40">
                      <MapPin className="h-5 w-5 text-carbon-900" />
                    </div>
                  </div>
                </div>

                {[
                  { top: "22%", left: "20%" },
                  { top: "30%", left: "70%" },
                  { top: "55%", left: "18%" },
                  { top: "62%", left: "78%" },
                  { top: "75%", left: "40%" },
                  { top: "40%", left: "85%" },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute h-2 w-2 rounded-full bg-mint-500/70"
                    style={pos}
                  />
                ))}

                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-[240px] rounded-lg border border-mint-500/30 bg-carbon-900/90 backdrop-blur p-3 shadow-2xl">
                  <p className="mb-1 text-sm font-bold text-mint-500">EKBC HQ</p>
                  <p className="text-xs text-carbon-300 leading-snug">
                    {siteSettings.address.street}
                    <br />
                    {siteSettings.address.city}, {siteSettings.address.region}, {siteSettings.address.postcode}
                  </p>
                  <a
                    href={siteSettings.phoneHref}
                    className="mt-1.5 inline-block text-xs font-semibold text-white hover:text-mint-400 transition-colors"
                  >
                    {siteSettings.phone}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint-500">
                AREAS WE COVER
              </p>
              <h3 className="mt-2 text-2xl font-bold uppercase text-white">
                35 EAST KILBRIDE DISTRICTS
              </h3>

              <h4 className="mt-8 mb-4 text-sm font-semibold uppercase tracking-wider text-carbon-300">
                ALL DISTRICTS (A-Z)
              </h4>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4">
                {allEntries.map((entry) => (
                  <Link
                    key={entry.name}
                    href={
                      "isMain" in entry
                        ? "/areas-we-serve/"
                        : `/areas-we-serve/${entry.slug}/`
                    }
                    className="hover-underline flex items-center gap-1.5 text-sm text-carbon-300 transition-colors hover:text-mint-500"
                  >
                    <span className="text-mint-500">&#8226;</span>
                    {entry.name}
                  </Link>
                ))}
              </div>

              <h4 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-carbon-300">
                G-POSTCODE COVERAGE
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/areas-we-serve/g74/"
                  className="hover-card rounded-xl border border-carbon-600 bg-carbon-800 p-5 transition-colors hover:border-mint-500/50"
                >
                  <p className="text-3xl font-bold text-mint-500">G74</p>
                  <p className="mt-1 text-sm text-carbon-300">
                    North &amp; Central East Kilbride
                  </p>
                </Link>
                <Link
                  href="/areas-we-serve/g75/"
                  className="hover-card rounded-xl border border-carbon-600 bg-carbon-800 p-5 transition-colors hover:border-mint-500/50"
                >
                  <p className="text-3xl font-bold text-mint-500">G75</p>
                  <p className="mt-1 text-sm text-carbon-300">
                    South &amp; West East Kilbride
                  </p>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-12 rounded-xl border border-mint-500/30 bg-carbon-800 px-6 py-5 text-center">
          <p className="text-carbon-300">
            Not sure if we cover your area? Call us free on{" "}
            <a
              href={siteSettings.phoneHref}
              className="font-bold text-white hover:text-mint-500"
            >
              {siteSettings.phone}
            </a>{" "}
            or{" "}
            <Link
              href="#quote"
              className="font-semibold text-mint-500 underline hover:text-mint-400"
            >
              get an instant online quote
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}

export { AreasCoverage };
