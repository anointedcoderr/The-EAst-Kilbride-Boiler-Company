import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TrustBadgesBar } from "@/components/sections/TrustBadgesBar";
import { WhatsIncluded } from "@/components/sections/WhatsIncluded";
import { WhyTrustUs } from "@/components/sections/WhyTrustUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingCards } from "@/components/sections/PricingCards";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { AreasCoverage } from "@/components/sections/AreasCoverage";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { BottomQuoteSection } from "@/components/sections/BottomQuoteSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, faqSchema } from "@/lib/schemas";
import { faqs } from "@/data/faqs";
import { publicGetPageContent } from "@/lib/cmsPages";
import { CmsExtraSections } from "@/components/cms/CmsExtraSections";

// Defaults match the existing static metadata - the CMS only overrides
// these fields when the homepage row exists in cms_pages with a
// published status and non-empty values. If Supabase is unreachable,
// the static defaults are used and the page renders fine.
const DEFAULT_META_TITLE =
  "East Kilbride Boiler Company | EKBC - Boiler Replacement G74 / G75";
const DEFAULT_META_DESCRIPTION =
  "East Kilbride's #1 boiler replacement company. Fixed-price installations across 35 EK areas. Gas Safe engineers, up to 12-year warranties. Call 01355 204045.";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await publicGetPageContent("/");
  return {
    title: cms?.meta_title || DEFAULT_META_TITLE,
    description: cms?.meta_description || DEFAULT_META_DESCRIPTION,
    alternates: { canonical: "/" },
    robots:
      cms?.is_indexable === false
        ? { index: false, follow: false }
        : undefined,
  };
}

export default function HomePage() {
  const homepageFaqs = faqs.filter((faq) => faq.pageTypes.includes("homepage"));

  return (
    <>
      <JsonLd data={[localBusinessSchema(), faqSchema(homepageFaqs)]} />
      <HeroSection />
      <ServicesGrid />
      <TrustBadgesBar />
      <WhatsIncluded />
      <WhyTrustUs />
      <HowItWorks />
      <PricingCards />
      <ReviewsCarousel />
      <AreasCoverage />
      <FAQSection />
      <CmsExtraSections slug="/" />
      <BottomQuoteSection id="bottom-quote-form" />
      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
