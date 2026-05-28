import type { Metadata } from "next";
import { StubPageTemplate } from "@/components/templates/StubPageTemplate";

export const metadata: Metadata = {
  title: "Contact East Kilbride Boiler Company | 01355 204045",
  description:
    "Get in touch with East Kilbride's Gas Safe Experts. Fixed-price quotes in 60 seconds. Call 01355 204045 or use the quote form on the homepage.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <StubPageTemplate
      pageName="Contact"
      description="The full contact page is on the way. In the meantime, you can call us on the number below or get a fixed-price quote from the homepage in under a minute."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact", href: "/contact/" },
      ]}
      liveLinks={[
        { label: "Get a quote", href: "/#quote" },
        { label: "Boiler Prices", href: "/boilers/" },
        { label: "FAQs", href: "/faq/" },
      ]}
    />
  );
}
