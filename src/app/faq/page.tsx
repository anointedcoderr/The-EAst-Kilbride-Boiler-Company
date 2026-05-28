import type { Metadata } from "next";
import { StubPageTemplate } from "@/components/templates/StubPageTemplate";

export const metadata: Metadata = {
  title: "FAQs | East Kilbride Boiler Company",
  description:
    "Common questions about boiler installation, repair, servicing and prices in East Kilbride answered by our Gas Safe Experts.",
  alternates: { canonical: "/faq/" },
};

export default function FaqPage() {
  return (
    <StubPageTemplate
      pageName="FAQ"
      description="A full FAQ index is coming next. For now you can read our most-asked questions in the FAQ block on the homepage and on each service page."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "FAQ", href: "/faq/" },
      ]}
      liveLinks={[
        { label: "Homepage FAQs", href: "/#faq" },
        { label: "New Boiler Installation", href: "/services/new-boiler-installation/" },
        { label: "Boiler Prices", href: "/boilers/" },
      ]}
    />
  );
}
