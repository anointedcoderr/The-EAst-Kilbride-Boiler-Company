import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "./PageHero";
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
import { districts } from "@/data/districts";
import { reviews } from "@/data/reviews";
import type { District } from "@/types";
import type { PageInternalLink } from "@/data/pageContent";

const SITE_URL = "https://www.eastkilbrideboilercompany.co.uk";

interface PostcodeHubConfig {
  code: "G74" | "G75";
  label: string;
  intro: string;
  position: string;
  description: string;
  bestForBrands: string;
}

const hubConfigs: Record<"G74" | "G75", PostcodeHubConfig> = {
  G74: {
    code: "G74",
    label: "G74 - North and Central East Kilbride",
    intro:
      "G74 covers the north and central parts of East Kilbride, from the original town centre at The Village out to Stewartfield in the north and the semi-rural edges of Thorntonhall, Philipshill and Kittochside. The housing stock mixes 1960s ex-council semis, modern family detached homes and a healthy share of newer-build estates, which is why we recommend a slightly different boiler for different streets.",
    position: "north and central",
    description:
      "Fixed-price boiler installations, repairs and annual servicing across all 18 G74 districts of East Kilbride. Worcester Bosch, Ideal, Vokera and Navien fitted by Gas Safe Experts.",
    bestForBrands:
      "Across G74 our most-fitted ranges are the Worcester Bosch from £1,695 with a 5-year warranty for premium reliability and the Ideal from £1,495 with a 5-year warranty as the popular mid-range pick. For larger detached homes in Stewartfield, Thorntonhall and Philipshill the Navien from £1,835 with a 10-year warranty is a strong choice.",
  },
  G75: {
    code: "G75",
    label: "G75 - South and West East Kilbride",
    intro:
      "G75 covers the south and west of East Kilbride, from the busy residential heart of The Murray and Westwood through to Hairmyres in the south-west and the newer family estates in Lindsayfield and Jackton. We cover every G75 postcode as part of our standard service area, with no extra travel charge.",
    position: "south and west",
    description:
      "Fixed-price boiler installations, repairs and annual servicing across all 17 G75 districts of East Kilbride. Worcester Bosch, Ideal, Vokera and Navien fitted by Gas Safe Experts.",
    bestForBrands:
      "Across G75 the Vokera at £1,299 with a 5-year warranty is our highest-volume fit, especially in The Murray, Greenhills and Westwood. Ideal at £1,495 is the popular step up, and the Worcester Bosch from £1,695 and Navien from £1,835 work best in the newer 3 and 4 bed family homes in Lindsayfield, Jackton and Crutherland.",
  },
};

function hubFAQs(code: "G74" | "G75") {
  const districtCount = districts.filter((d) => d.postcodeHub === code).length;
  return [
    {
      question: `Do you cover every ${code} postcode in East Kilbride?`,
      answer: `Yes. Our Gas Safe Experts cover all ${districtCount} ${code} districts as part of our standard service area. There is no extra travel charge for any ${code} postcode.`,
    },
    {
      question: `How much does a new boiler cost in ${code}?`,
      answer: `Fitted combi boiler prices in ${code} start from £1,299. Vokera is £1,299 fitted, Ideal from £1,495, Worcester Bosch from £1,695 and Navien from £1,835. Every price includes installation, parts, labour, VAT, a free wireless thermostat and a full system flush.`,
    },
    {
      question: `Which boiler suits a ${code} home best?`,
      answer:
        code === "G74"
          ? `For most G74 homes, Worcester Bosch or Ideal is the right fit for a 2 to 3 bed semi. For larger detached properties in Stewartfield, Thorntonhall or Kittochside, Navien with the 10-year warranty is the more comfortable choice.`
          : `For most G75 homes, Vokera or Ideal is the right fit for a 1 to 2 bed property in The Murray, Greenhills or Westwood. For larger 3 and 4 bed family homes in Lindsayfield, Jackton or Crutherland, Worcester Bosch or Navien is the stronger fit.`,
    },
    {
      question: `Do you offer same-day boiler repair in ${code}?`,
      answer: `Yes. We aim for same-day boiler repair call-outs across the whole ${code} area, with spares carried on the van so most faults are fixed at the first visit. Call 01355 204045 for the earliest slot we have.`,
    },
    {
      question: `Are your engineers Gas Safe Experts serving ${code}?`,
      answer: `Yes. All gas work in ${code} is carried out by our own Gas Safe Experts. Our registration can be verified directly at gassaferegister.co.uk before any work begins.`,
    },
    {
      question: `Is there a fixed-price boiler installation option for ${code}?`,
      answer: `Yes. Every ${code} installation is quoted at a single fixed price covering the boiler, parts, labour, VAT, the wireless thermostat, the full system flush and the manufacturer warranty. There are no separate call-out fees and no surprises on the day.`,
    },
  ];
}

function hubInternalLinks(code: "G74" | "G75"): PageInternalLink[] {
  const otherHub = code === "G74" ? "G75" : "G74";
  return [
    { label: "New Boiler Installation", href: "/services/new-boiler-installation/", group: "Services" },
    { label: "Boiler Repair", href: "/services/boiler-repair/", group: "Services" },
    { label: "Annual Boiler Service", href: "/services/boiler-servicing/", group: "Services" },
    { label: "Boiler Prices", href: "/boilers/", group: "Boilers" },
    { label: "Worcester Bosch Combi", href: "/boilers/worcester-bosch-combi/", group: "Brand" },
    { label: "Ideal Combi", href: "/boilers/ideal-combi/", group: "Brand" },
    { label: "Vokera Combi", href: "/boilers/vokera-combi/", group: "Brand" },
    { label: "Navien Combi", href: "/boilers/navien-combi/", group: "Brand" },
    { label: `${otherHub} hub`, href: `/areas-we-serve/${otherHub.toLowerCase()}/`, group: "Areas" },
    { label: "All East Kilbride districts", href: "/areas-we-serve/", group: "Areas" },
    { label: "Best boiler brands for G74 and G75", href: "/blogs/best-boiler-brands-g74-g75-east-kilbride/", group: "Guides" },
    { label: "Combi boiler cost guide", href: "/blogs/combi-boiler-cost-east-kilbride/", group: "Guides" },
  ];
}

interface PostcodeHubTemplateProps {
  code: "G74" | "G75";
}

export function PostcodeHubTemplate({ code }: PostcodeHubTemplateProps) {
  const config = hubConfigs[code];
  const hubDistricts: District[] = districts.filter(
    (d) => d.postcodeHub === code
  );
  const faqs = hubFAQs(code);
  const links = hubInternalLinks(code);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Areas We Serve", href: "/areas-we-serve/" },
    { label: code, href: `/areas-we-serve/${code.toLowerCase()}/` },
  ];

  const hubReview =
    reviews.find((r) => r.postcode === code) ?? reviews[0];

  const hubSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Boiler Replacement",
    name: `Boiler Replacement across ${code}, East Kilbride`,
    provider: { "@id": `${SITE_URL}/#localbusiness` },
    areaServed: {
      "@type": "Place",
      name: `${code}, East Kilbride`,
    },
    description: config.description,
    url: `${SITE_URL}/areas-we-serve/${code.toLowerCase()}/`,
  };

  return (
    <>
      <JsonLd
        data={[
          hubSchema,
          breadcrumbSchema(breadcrumbs),
          faqSchema(faqs.map((f) => ({ ...f, pageTypes: [] }))),
        ]}
      />

      <PageHero
        eyebrow={`${code} postcode hub`}
        h1={`Boiler Installation across ${code}, East Kilbride`}
        highlightedWord={code}
        subtitle={config.label}
        description={config.description}
        trustPoints={[
          `${hubDistricts.length} ${code} districts covered`,
          "Fixed-price installations",
          "Gas Safe Experts",
          "Same-week fits",
        ]}
        breadcrumbs={breadcrumbs}
        primaryCtaLabel={`Get my ${code} quote`}
      />

      <TrustBadgesBar />

      <section className="bg-carbon-950 py-12 sm:py-16">
        <Container className="max-w-3xl">
          <ScrollReveal>
            <p className="text-base sm:text-lg leading-relaxed text-carbon-200">
              {config.intro}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-carbon-300">
              {config.bestForBrands}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-carbon-900 py-14 sm:py-20">
        <Container>
          <ScrollReveal>
            <header className="max-w-3xl">
              <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
                {code} districts we cover
              </p>
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
                {hubDistricts.length} {code} neighbourhoods, one local boiler company
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-carbon-300">
                Tap any district to read the local boiler installation,
                repair, servicing and brand recommendation for that part of {code}.
              </p>
            </header>
          </ScrollReveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hubDistricts.map((d, index) => (
              <ScrollReveal
                key={d.slug}
                direction="up"
                delay={Math.min(index * 0.03, 0.3)}
              >
                <Link
                  href={`/areas-we-serve/${d.slug}/`}
                  className="hover-card group flex h-full items-start gap-3 rounded-2xl border border-carbon-700 bg-carbon-950/60 p-5 transition-colors hover:border-mint-500/50"
                >
                  <span className="hover-icon-glow mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-mint-500/40 bg-carbon-900">
                    <MapPin className="h-4 w-4 text-mint-500" />
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="text-sm font-bold uppercase tracking-wide text-white group-hover:text-mint-400">
                      {d.name}
                    </span>
                    <span className="mt-1 text-[11px] uppercase tracking-wide text-carbon-400">
                      {d.position}
                    </span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-mint-500 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-carbon-950 py-14 sm:py-20">
        <Container className="max-w-4xl">
          <ScrollReveal>
            <header className="mb-10">
              <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
                {code} service overview
              </p>
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
                What we cover across {code}
              </h2>
            </header>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                heading: `Boiler Replacement across ${code}`,
                body: `Fixed-price replacement covering the boiler, parts, labour, VAT, manufacturer warranty, wireless thermostat and full system flush. From £1,299 fitted.`,
              },
              {
                heading: `New Boiler Installation in ${code}`,
                body: `Worcester Bosch, Ideal, Vokera and Navien fitted by our Gas Safe Experts. Same-week installation dates the norm rather than the exception.`,
              },
              {
                heading: `Combi Boiler Upgrade for ${code} homes`,
                body: `Conversion from regular, system or back boilers to a modern A-rated combi. Old tank in the loft removed and disposed of as part of the fixed price.`,
              },
              {
                heading: `Central Heating Installation across ${code}`,
                body: `Full system installs and partial radiator and pipework upgrades. We balance the system and run a flush as standard on every job.`,
              },
              {
                heading: `Fixed Price Boiler Installation for ${code}`,
                body: `Single fixed price quoted from the survey. No call-out fee, no day-rate add-ons, no finance products clipped onto the job.`,
              },
              {
                heading: `Gas Safe Experts serving ${code}`,
                body: `Every engineer carries a Gas Safe ID card. Our registration can be verified at gassaferegister.co.uk before any work begins.`,
              },
              {
                heading: `Emergency Boiler Replacement in ${code}`,
                body: `If the existing boiler has failed and a repair is not economical, we can usually get a replacement quoted, fitted and commissioned inside a few working days.`,
              },
              {
                heading: `Best Boiler Installation Deals in ${code}`,
                body: `No loss-leader gimmicks - the fixed-price model already takes the games out of the quote. Four brands cover every sensible budget bracket.`,
              },
            ].map((item) => (
              <article
                key={item.heading}
                className="rounded-2xl border border-carbon-700 bg-carbon-900/60 p-5 sm:p-6"
              >
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {item.heading}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <EeatBlock />

      <section className="bg-carbon-900 py-14 sm:py-20">
        <Container>
          <div className="rounded-2xl border border-mint-500/30 bg-carbon-800/40 p-6 sm:p-8 glow-mint">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mint-400">
              Local review
            </p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-carbon-300">
              {hubReview.location}, {hubReview.postcode}
            </p>
            <blockquote className="mt-4 text-lg leading-relaxed text-white">
              &ldquo;{hubReview.text}&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-carbon-200">
              {hubReview.name}
            </p>
          </div>
        </Container>
      </section>

      <ReviewsCarousel />

      <LocalFAQSection
        eyebrow={`${code} FAQs - East Kilbride`}
        heading={`${code} boiler questions, answered`}
        intro={`The questions homeowners across ${code} ask us most often.`}
        faqs={faqs}
      />

      <SiloLinks
        eyebrow={`Continue from the ${code} hub`}
        heading={`Explore the wider East Kilbride silo from ${code}`}
        intro={`Jump from the ${code} hub to a specific service, a brand page, or the other postcode hub.`}
        links={links}
      />

      <BottomQuoteSection
        heading={`Get Your ${code} Fixed Price Quote`}
        intro={`No obligation. No hidden extras. Fitted by our Gas Safe Experts across every ${code} postcode in East Kilbride.`}
      />

      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
