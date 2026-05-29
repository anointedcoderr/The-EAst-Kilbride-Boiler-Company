import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/templates/PageHero";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LocalFAQSection } from "@/components/sections/LocalFAQSection";
import { SiloLinks } from "@/components/sections/SiloLinks";
import { EeatBlock } from "@/components/sections/EeatBlock";
import { TrustBadgesBar } from "@/components/sections/TrustBadgesBar";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { BottomQuoteSection } from "@/components/sections/BottomQuoteSection";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schemas";
import { g74Districts, g75Districts, districts } from "@/data/districts";
import type { PageInternalLink } from "@/data/pageContent";

const SITE_URL = "https://www.eastkilbrideboilercompany.co.uk";

export const metadata: Metadata = {
  title:
    "Areas We Serve - All 35 East Kilbride Districts | EKBC G74 and G75",
  description:
    "We cover every G74 and G75 postcode across East Kilbride. 35 districts from The Murray to Stewartfield, Calderwood to Greenhills. Fixed-price installations by Gas Safe Experts.",
  alternates: { canonical: "/areas-we-serve/" },
};

const internalLinks: PageInternalLink[] = [
  { label: "New Boiler Installation", href: "/services/new-boiler-installation/", group: "Services" },
  { label: "Boiler Repair", href: "/services/boiler-repair/", group: "Services" },
  { label: "Annual Boiler Service", href: "/services/boiler-servicing/", group: "Services" },
  { label: "Boiler Prices", href: "/boilers/", group: "Boilers" },
  { label: "G74 - North & Central hub", href: "/areas-we-serve/g74/", group: "Areas" },
  { label: "G75 - South & West hub", href: "/areas-we-serve/g75/", group: "Areas" },
  { label: "Worcester Bosch Combi", href: "/boilers/worcester-bosch-combi/", group: "Brand" },
  { label: "Ideal Combi", href: "/boilers/ideal-combi/", group: "Brand" },
  { label: "Vokera Combi", href: "/boilers/vokera-combi/", group: "Brand" },
  { label: "Navien Combi", href: "/boilers/navien-combi/", group: "Brand" },
  { label: "Best boiler brands for G74 and G75", href: "/blogs/best-boiler-brands-g74-g75-east-kilbride/", group: "Guides" },
];

const areasFaqs = [
  {
    question: "How many East Kilbride districts do you cover?",
    answer: `We cover all 35 districts of East Kilbride - 18 in G74 and 17 in G75 - as part of our standard service area. There is no extra travel charge for any East Kilbride postcode.`,
  },
  {
    question: "Is your service the same in G74 as it is in G75?",
    answer: `Yes. The same Gas Safe Experts, the same four boiler brands and the same fixed-price model apply across both postcode hubs. The only difference is which brands we recommend - the housing stock in G74 leans more towards 3 and 4 bed semis and detached, where G75 has more compact terraces and family flats.`,
  },
  {
    question: "Do you serve nearby areas outside East Kilbride?",
    answer: `Our primary service area is the 35 districts of East Kilbride across G74 and G75. If you live in a neighbouring Lanarkshire area and would like a quote, call 01355 204045 and we will let you know honestly whether your postcode is in our standard travel range.`,
  },
  {
    question: "How quickly can you fit a new boiler in my area?",
    answer: `Most East Kilbride installations are booked within the same week as the quote. For urgent failures we can usually fit a replacement inside a few working days. The exact date is confirmed on your fixed-price quote.`,
  },
  {
    question: "Do you charge extra for the larger or more remote districts?",
    answer: `No. There is no extra charge for Thorntonhall, Kittochside, Philipshill or any other district. The fixed price is the same wherever you are in G74 or G75.`,
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Areas We Serve", href: "/areas-we-serve/" },
];

const areasServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Boiler Replacement, Repair and Annual Service",
  name: "Boiler service area - East Kilbride",
  provider: { "@id": `${SITE_URL}/#localbusiness` },
  areaServed: districts.map((d) => ({
    "@type": "Place",
    name: `${d.name}, ${d.postcodeHub}, East Kilbride`,
  })),
  description:
    "Fixed-price boiler installation, repair and annual servicing across all 35 districts of East Kilbride.",
  url: `${SITE_URL}/areas-we-serve/`,
};

export default function AreasWeServePage() {
  return (
    <>
      <JsonLd
        data={[
          areasServiceSchema,
          breadcrumbSchema(breadcrumbs),
          faqSchema(areasFaqs.map((f) => ({ ...f, pageTypes: [] }))),
        ]}
      />

      <PageHero
        eyebrow="Areas We Serve"
        h1="Boiler installation across all 35 East Kilbride districts"
        highlightedWord="35 East Kilbride"
        subtitle="G74 and G75 covered"
        description="From The Murray to Stewartfield, Calderwood to Greenhills - every G74 and G75 postcode is part of our standard service area. No extra travel charge, no postcode exclusions, no middle man between you and the engineer."
        trustPoints={[
          "35 districts covered",
          "G74 + G75",
          "Fixed-price installs",
          "Gas Safe Experts",
        ]}
        breadcrumbs={breadcrumbs}
      />

      <TrustBadgesBar />

      <section className="bg-carbon-900 py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <ScrollReveal direction="left">
              <div className="rounded-2xl border border-carbon-700 bg-carbon-950/60 p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-mint-400">
                  G74 hub
                </p>
                <h2 className="mt-3 text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
                  G74 - North and Central East Kilbride
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-carbon-300">
                  18 G74 districts covering the north and central parts of East
                  Kilbride, from The Village out to Stewartfield, Thorntonhall and the
                  semi-rural edges around Kittochside and Philipshill.
                </p>

                <ul className="mt-6 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {g74Districts.map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/areas-we-serve/${d.slug}/`}
                        className="group inline-flex w-full items-center justify-between gap-2 rounded-lg border border-carbon-800 bg-carbon-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-mint-500/40 hover:text-mint-400"
                      >
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-mint-500" />
                          {d.name}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-mint-500 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/areas-we-serve/g74/"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-mint-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-carbon-900 transition-colors hover:bg-mint-400"
                >
                  Open the G74 hub
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="rounded-2xl border border-carbon-700 bg-carbon-950/60 p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-mint-400">
                  G75 hub
                </p>
                <h2 className="mt-3 text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
                  G75 - South and West East Kilbride
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-carbon-300">
                  17 G75 districts covering the south and west, from The Murray
                  and Westwood through to Hairmyres, Lindsayfield and the
                  newer family estates in Jackton.
                </p>

                <ul className="mt-6 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {g75Districts.map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/areas-we-serve/${d.slug}/`}
                        className="group inline-flex w-full items-center justify-between gap-2 rounded-lg border border-carbon-800 bg-carbon-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-mint-500/40 hover:text-mint-400"
                      >
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-mint-500" />
                          {d.name}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-mint-500 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/areas-we-serve/g75/"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-mint-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-carbon-900 transition-colors hover:bg-mint-400"
                >
                  Open the G75 hub
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <EeatBlock />
      <ReviewsCarousel />

      <LocalFAQSection
        eyebrow="Areas We Serve FAQs"
        heading="Coverage questions, answered"
        intro="The most common questions homeowners ask before booking a fixed-price quote with us."
        faqs={areasFaqs}
      />

      <SiloLinks
        eyebrow="Continue from Areas We Serve"
        heading="Pick a service, a brand, or a postcode hub"
        links={internalLinks}
      />

      <BottomQuoteSection />

      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
