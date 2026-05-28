import { PageHero } from "./PageHero";
import { ServiceFAQsClient } from "./ServiceFAQsClient";
import { TrustBadgesBar } from "@/components/sections/TrustBadgesBar";
import { PricingCards } from "@/components/sections/PricingCards";
import { WhatsIncluded } from "@/components/sections/WhatsIncluded";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { faqs } from "@/data/faqs";

export function BoilerPricesTemplate() {
  const pricingFaqs = faqs.filter(
    (faq) =>
      faq.pageTypes.includes("pricing") || faq.pageTypes.includes("homepage")
  );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Boiler Prices", href: "/boilers/" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Boiler Prices"
        h1="Fixed-price boiler installations across East Kilbride"
        highlightedWord="Fixed-price"
        description="Choose from Worcester Bosch, Ideal, Vokera and Navien. All prices include installation, parts, labour and VAT. No hidden extras, no surprises."
        trustPoints={[
          "From £1,299 fitted",
          "Gas Safe Experts",
          "Up to 12-yr warranty",
          "Free system flush",
        ]}
        breadcrumbs={breadcrumbs}
      />

      <TrustBadgesBar />
      <PricingCards />
      <WhatsIncluded />
      <ReviewsCarousel />
      {pricingFaqs.length > 0 && <ServiceFAQsClient faqs={pricingFaqs} />}
      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
