import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { pageContent } from "@/data/pageContent";

const page = pageContent["boiler-servicing"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: page.canonical },
};

export default function BoilerServicingPage() {
  return <ServicePageTemplate page={page} serviceId="boiler-servicing" />;
}
