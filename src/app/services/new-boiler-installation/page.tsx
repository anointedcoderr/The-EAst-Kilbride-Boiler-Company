import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { services } from "@/data/services";

const service = services.find((s) => s.slug === "new-boiler-installation")!;

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.seoDescription,
  alternates: { canonical: "/services/new-boiler-installation/" },
};

export default function NewBoilerInstallationPage() {
  return (
    <ServicePageTemplate
      service={service}
      pageTypeFilter="installation"
      eyebrow="New Boiler Installation"
      description="Fixed-price new boiler installation across all 35 areas of East Kilbride. Worcester Bosch, Ideal, Vokera and Navien fitted by our Gas Safe Experts. No middle man, no hidden extras, no surprises on the day."
      trustPoints={[
        "From £1,299 fitted",
        "Gas Safe Experts",
        "Up to 12-yr warranty",
        "Same-week installation",
      ]}
    />
  );
}
