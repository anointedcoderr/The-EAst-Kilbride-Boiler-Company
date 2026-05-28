import { PageHero } from "./PageHero";
import { ServiceFAQsClient } from "./ServiceFAQsClient";
import { TrustBadgesBar } from "@/components/sections/TrustBadgesBar";
import { WhatsIncluded } from "@/components/sections/WhatsIncluded";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingCards } from "@/components/sections/PricingCards";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { AreasCoverage } from "@/components/sections/AreasCoverage";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schemas";
import { faqs } from "@/data/faqs";
import type { Service } from "@/types";

interface ServicePageTemplateProps {
  service: Service;
  pageTypeFilter: string;
  eyebrow: string;
  trustPoints: string[];
  description: string;
  hideHowItWorks?: boolean;
  hidePricing?: boolean;
}

export function ServicePageTemplate({
  service,
  pageTypeFilter,
  eyebrow,
  trustPoints,
  description,
  hideHowItWorks,
  hidePricing,
}: ServicePageTemplateProps) {
  const serviceFaqs = faqs.filter((faq) =>
    faq.pageTypes.includes(pageTypeFilter)
  );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services/new-boiler-installation/" },
    { label: service.name, href: `/services/${service.slug}/` },
  ];

  const highlightedWord = service.priceFrom
    ? `£${service.priceFrom.toLocaleString()}`
    : "East Kilbride";

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <PageHero
        eyebrow={eyebrow}
        h1={service.h1}
        highlightedWord={highlightedWord}
        description={description}
        trustPoints={trustPoints}
        breadcrumbs={breadcrumbs}
      />

      <TrustBadgesBar />
      <WhatsIncluded />
      {!hideHowItWorks && <HowItWorks />}
      {!hidePricing && <PricingCards />}
      <ReviewsCarousel />

      {serviceFaqs.length > 0 && <ServiceFAQsClient faqs={serviceFaqs} />}

      <AreasCoverage />
      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
