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

export default function HomePage() {
  return (
    <>
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
      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
