import { PageHero } from "./PageHero";
import { ContentBlocks } from "@/components/sections/ContentBlocks";
import { LocalFAQSection } from "@/components/sections/LocalFAQSection";
import { SiloLinks } from "@/components/sections/SiloLinks";
import { EeatBlock } from "@/components/sections/EeatBlock";
import { TrustBadgesBar } from "@/components/sections/TrustBadgesBar";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema, faqSchema } from "@/lib/schemas";
import { services } from "@/data/services";
import type { PageContent } from "@/data/pageContent";

interface ServicePageTemplateProps {
  page: PageContent;
  serviceId: string;
}

export function ServicePageTemplate({
  page,
  serviceId,
}: ServicePageTemplateProps) {
  const service = services.find((s) => s.id === serviceId);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services/new-boiler-installation/" },
    { label: page.label, href: page.url },
  ];

  const schemas: Record<string, unknown>[] = [];
  if (service) schemas.push(serviceSchema(service));
  if (page.faqs.length > 0) {
    schemas.push(
      faqSchema(
        page.faqs.map((f) => ({
          question: f.question,
          answer: f.answer,
          pageTypes: [],
        }))
      )
    );
  }

  return (
    <>
      {schemas.length > 0 && <JsonLd data={schemas} />}

      <PageHero
        eyebrow={page.heroEyebrow}
        h1={page.h1}
        highlightedWord={page.highlightedWord}
        subtitle={page.heroSubtitle}
        description={page.heroDescription}
        trustPoints={page.heroTrustPoints}
        breadcrumbs={breadcrumbs}
        primaryCtaLabel={page.ctaPrimaryLabel}
      />

      <TrustBadgesBar />

      {page.contentBlocks && page.contentBlocks.length > 0 && (
        <ContentBlocks
          intro={page.introCopy}
          blocks={page.contentBlocks}
          eyebrow={`${page.label} in East Kilbride`}
          heading={`Everything you need to know about ${page.label.toLowerCase()} in East Kilbride`}
        />
      )}

      <EeatBlock />

      <ReviewsCarousel />

      <LocalFAQSection
        eyebrow={`${page.label} FAQs - East Kilbride`}
        heading="Local boiler questions, answered"
        intro="The questions our Gas Safe Experts hear most often from G74 and G75 homeowners. Tap any question for a clear, jargon-free answer."
        faqs={page.faqs}
      />

      <SiloLinks links={page.internalLinks} />

      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
