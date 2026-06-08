import { PageHero } from "./PageHero";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LocalFAQSection } from "@/components/sections/LocalFAQSection";
import { SiloLinks } from "@/components/sections/SiloLinks";
import { EeatBlock } from "@/components/sections/EeatBlock";
import { TrustBadgesBar } from "@/components/sections/TrustBadgesBar";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { ServiceAreaProof } from "@/components/sections/ServiceAreaProof";
import { BottomQuoteSection } from "@/components/sections/BottomQuoteSection";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schemas";
import {
  renderAllSections,
  renderDistrictFAQs,
  renderDistrictIntro,
} from "@/lib/districtVariations";
import { districts } from "@/data/districts";
import { brands } from "@/data/brands";
import { reviews } from "@/data/reviews";
import {
  areaLabel,
  postcodeCoverageLabel,
  postcodeDisplay,
  postcodeIntroPhrase,
} from "@/lib/postcodeDisplay";
import type { PageInternalLink } from "@/data/pageContent";
import type { District } from "@/types";

const SITE_URL = "https://www.eastkilbrideboilercompany.co.uk";

function districtServiceSchema(district: District) {
  const placeName = district.needsReview
    ? `${district.name}, East Kilbride`
    : `${district.name}, ${district.postcodeHub}, East Kilbride`;

  const description = district.needsReview
    ? `Fixed-price boiler installation, replacement, repair and annual servicing in ${district.name}, East Kilbride. Worcester Bosch, Ideal, Vokera and Navien fitted by Gas Safe engineers.`
    : `Fixed-price boiler installation, replacement, repair and annual servicing in ${district.name} (${district.postcodeHub}), East Kilbride. Worcester Bosch, Ideal, Vokera and Navien fitted by Gas Safe engineers.`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Boiler Replacement",
    name: `Boiler Replacement in ${district.name}, East Kilbride`,
    provider: {
      "@id": `${SITE_URL}/#localbusiness`,
    },
    areaServed: {
      "@type": "Place",
      name: placeName,
    },
    description,
    url: `${SITE_URL}/areas-we-serve/${district.slug}/`,
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: 1299,
      availability: "https://schema.org/InStock",
    },
  };
}

function buildInternalLinks(district: District): PageInternalLink[] {
  const hubLabel = district.postcodeHub === "G74" ? "G74 hub" : "G75 hub";
  const hubHref = `/areas-we-serve/${district.postcodeHub.toLowerCase()}/`;

  // Pick the 2 preferred brand pages.
  const brandLinks: PageInternalLink[] = brands
    .filter((b) => district.preferredBrands.includes(b.name))
    .map((b) => ({
      label: `${b.name} Combi`,
      href: `/boilers/${b.slug}/`,
      group: "Brand" as const,
    }));

  // Pick a relevant blog post by district's typical job hint.
  const guides: PageInternalLink[] = [
    {
      label: "Combi boiler cost guide",
      href: "/blogs/combi-boiler-cost-east-kilbride/",
      group: "Guides",
    },
    {
      label: "Signs you need a new boiler",
      href: "/blogs/signs-you-need-a-new-boiler-east-kilbride/",
      group: "Guides",
    },
    {
      label: "Best boiler brands for G74 and G75",
      href: "/blogs/best-boiler-brands-g74-g75-east-kilbride/",
      group: "Guides",
    },
  ];

  return [
    { label: "New Boiler Installation", href: "/services/new-boiler-installation/", group: "Services" },
    { label: "Boiler Repair", href: "/services/boiler-repair/", group: "Services" },
    { label: "Annual Boiler Service", href: "/services/boiler-servicing/", group: "Services" },
    { label: "Boiler Prices", href: "/boilers/", group: "Boilers" },
    { label: hubLabel, href: hubHref, group: "Areas" },
    { label: "All East Kilbride districts", href: "/areas-we-serve/", group: "Areas" },
    ...brandLinks,
    ...guides,
  ];
}

function siblingDistricts(district: District): string[] {
  const siblings = districts
    .filter(
      (d) => d.postcodeHub === district.postcodeHub && d.slug !== district.slug
    )
    .slice(0, 5)
    .map((d) => d.name);
  // Always show the district itself first in the chip list so the local
  // coverage block clearly belongs to this page.
  return [district.name, ...siblings];
}

interface DistrictPageTemplateProps {
  district: District;
}

export function DistrictPageTemplate({ district }: DistrictPageTemplateProps) {
  const sectionsRendered = renderAllSections(district);
  const districtFaqs = renderDistrictFAQs(district);
  const internalLinks = buildInternalLinks(district);

  const breadcrumbs = district.needsReview
    ? [
        { label: "Home", href: "/" },
        { label: "Areas We Serve", href: "/areas-we-serve/" },
        {
          label: district.name,
          href: `/areas-we-serve/${district.slug}/`,
        },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Areas We Serve", href: "/areas-we-serve/" },
        {
          label: district.postcodeHub,
          href: `/areas-we-serve/${district.postcodeHub.toLowerCase()}/`,
        },
        {
          label: district.name,
          href: `/areas-we-serve/${district.slug}/`,
        },
      ];

  const intro = renderDistrictIntro(district);

  const review =
    reviews.find((r) => r.postcode === district.postcodeHub) ?? reviews[0];

  const coverageNote = district.needsReview
    ? `We cover ${district.name} as part of our standard East Kilbride service area.`
    : `We cover ${district.name} as part of our standard ${district.postcodeHub} service area. There is no extra travel charge for ${district.postcodeHub} postcodes,`;

  const proof = {
    title: `Boiler installation, repair and servicing in ${district.name}`,
    intro: `${coverageNote} The Gas Safe engineers we work with handle the photo review, the quote, the fit and the follow-up paperwork themselves. ${district.localAngle}`,
    districts: siblingDistricts(district),
    reviewId: review.id,
    ctaLabel: `Get my ${district.name} fixed price`,
  };

  const schemas: Record<string, unknown>[] = [
    districtServiceSchema(district),
    breadcrumbSchema(breadcrumbs),
    faqSchema(
      districtFaqs.map((f) => ({
        question: f.question,
        answer: f.answer,
        pageTypes: [],
      }))
    ),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      <PageHero
        eyebrow={`${areaLabel(district)} - East Kilbride`}
        h1={`Boiler Replacement in ${district.name}, East Kilbride`}
        highlightedWord={district.name}
        subtitle={`Worcester Bosch, Ideal, Vokera and Navien fitted by Gas Safe engineers`}
        description={`Fixed-price boiler installations, same-day repairs and annual servicing across ${district.name} and ${postcodeIntroPhrase(district)}. No middle man, no hidden extras, no surprises on the day.`}
        trustPoints={[
          "From £1,299 fitted",
          "Gas Safe engineers",
          "Same-week fit",
          district.needsReview
            ? "East Kilbride covered"
            : `Covers all of ${district.postcodeHub}`,
        ]}
        breadcrumbs={breadcrumbs}
        primaryCtaLabel={`Get my ${district.name} quote`}
      />

      <TrustBadgesBar />

      <section className="bg-carbon-950 py-12 sm:py-16">
        <Container className="max-w-3xl">
          <ScrollReveal>
            <p className="text-base sm:text-lg leading-relaxed text-carbon-200">
              {intro}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-carbon-900 py-14 sm:py-20">
        <Container className="max-w-4xl">
          <ScrollReveal>
            <header className="mb-10">
              <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
                {areaLabel(district)}
              </p>
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
                Boiler services in {district.name}, East Kilbride
              </h2>
            </header>
          </ScrollReveal>

          <div className="space-y-8 sm:space-y-10">
            {sectionsRendered.map((section, index) => (
              <ScrollReveal
                key={section.id}
                delay={Math.min(index * 0.04, 0.32)}
              >
                <article
                  id={section.id}
                  className="rounded-2xl border border-carbon-700 bg-carbon-950/60 p-6 sm:p-8"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {section.heading}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-carbon-200">
                    {section.body}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <EeatBlock />

      <ServiceAreaProof proof={proof} />

      <ReviewsCarousel />

      <LocalFAQSection
        eyebrow={`${district.name} FAQs - East Kilbride`}
        heading={`${district.name} boiler questions, answered`}
        intro={`The questions homeowners across ${district.name} ask us most often. Tap any question for a clear, jargon-free answer.`}
        faqs={districtFaqs}
      />

      <SiloLinks
        eyebrow={`Continue from ${district.name}`}
        heading={
          district.needsReview
            ? "Explore the rest of the East Kilbride silo"
            : `Explore the rest of the ${district.postcodeHub} silo`
        }
        intro={`Every page on this site is internally linked. Jump from ${district.name} to a service, a brand, a related guide, or back to the East Kilbride area pages.`}
        links={internalLinks}
      />

      <BottomQuoteSection
        heading={`Get Your ${district.name} Fixed Price Quote`}
        intro={`No obligation. No hidden extras. Fitted by the Gas Safe engineers we work with across ${district.name} and ${postcodeIntroPhrase(district)}.`}
      />

      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
