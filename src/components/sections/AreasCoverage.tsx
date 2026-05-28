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
              <div className="mb-4 flex items-center justify-between rounded-lg bg-carbon-800 px-4 py-3">
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  East Kilbride - G74 - G75
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-mint-500/50 bg-mint-500/10 px-3 py-1 text-xs font-semibold text-mint-500">
                  <Users className="h-3 w-3" />
                  3 ENGINEERS LIVE
                </span>
              </div>

              <div className="relative flex aspect-[4/3] items-center justify-center rounded-xl bg-carbon-800">
                <div className="text-center text-carbon-400">
                  <MapPin className="mx-auto mb-2 h-8 w-8 text-mint-500/40" />
                  <p>Map placeholder</p>
                </div>

                <div className="absolute bottom-8 left-8 rounded-lg border border-carbon-600 bg-carbon-900 p-3 shadow-lg">
                  <p className="mb-1 text-sm font-bold text-mint-500">EKBC HQ</p>
                  <p className="text-xs text-carbon-300">
                    {siteSettings.address.street}, {siteSettings.address.city}
                  </p>
                  <p className="text-xs text-carbon-300">
                    {siteSettings.address.region} - {siteSettings.address.postcode}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white">
                    {siteSettings.phone}
                  </p>
                </div>
              </div>

              <p className="mt-2 text-xs text-carbon-500">
                Leaflet | OpenStreetMap - CARTO
              </p>
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
