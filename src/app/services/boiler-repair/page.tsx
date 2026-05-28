import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { services } from "@/data/services";

const service = services.find((s) => s.slug === "boiler-repair")!;

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.seoDescription,
  alternates: { canonical: "/services/boiler-repair/" },
};

export default function BoilerRepairPage() {
  return (
    <ServicePageTemplate
      service={service}
      pageTypeFilter="repair"
      eyebrow="Boiler Repair"
      description="Same-day boiler repair across East Kilbride. Our Gas Safe Experts diagnose, quote and fix on the same visit wherever possible. Klarna 3-month interest-free is available exclusively on boiler repair call-outs."
      trustPoints={[
        "Same-day call-out",
        "Gas Safe Experts",
        "Fair, fixed quotes",
        "All G74 and G75 covered",
      ]}
      hidePricing
    />
  );
}
