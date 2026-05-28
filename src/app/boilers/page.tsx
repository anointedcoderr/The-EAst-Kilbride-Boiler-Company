import type { Metadata } from "next";
import { BoilerPricesTemplate } from "@/components/templates/BoilerPricesTemplate";
import { pageContent } from "@/data/pageContent";

const page = pageContent.boilers;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: page.canonical },
};

export default function BoilerPricesPage() {
  return <BoilerPricesTemplate />;
}
