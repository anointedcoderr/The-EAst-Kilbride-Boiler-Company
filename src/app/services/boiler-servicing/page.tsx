import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { services } from "@/data/services";

const service = services.find((s) => s.slug === "boiler-servicing")!;

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.seoDescription,
  alternates: { canonical: "/services/boiler-servicing/" },
};

export default function BoilerServicingPage() {
  return (
    <ServicePageTemplate
      service={service}
      pageTypeFilter="servicing"
      eyebrow="Annual Boiler Service"
      description="Annual boiler servicing in East Kilbride to keep your warranty valid, your bills down and your family safe. Worcester Bosch, Ideal, Vokera, Navien and most other major brands serviced by Gas Safe Experts."
      trustPoints={[
        "Gas Safe checked",
        "Digital service report",
        "Klarna 3-mo interest-free",
        "Worcester, Ideal, Vokera, Navien",
      ]}
      hidePricing
    />
  );
}
