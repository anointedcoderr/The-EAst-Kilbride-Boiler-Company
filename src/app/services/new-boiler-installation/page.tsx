import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { pageContent } from "@/data/pageContent";

const page = pageContent["new-boiler-installation"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: page.canonical },
};

export default function NewBoilerInstallationPage() {
  return <ServicePageTemplate page={page} serviceId="new-boiler-installation" />;
}
