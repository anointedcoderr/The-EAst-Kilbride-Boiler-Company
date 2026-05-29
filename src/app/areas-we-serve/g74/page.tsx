import type { Metadata } from "next";
import { StubPageTemplate } from "@/components/templates/StubPageTemplate";

export const metadata: Metadata = {
  title: "Boiler Installation in G74 - North & Central East Kilbride",
  description:
    "Fixed-price boiler installation, repair and servicing across all G74 districts of East Kilbride. Gas Safe Experts, no hidden extras.",
  alternates: { canonical: "/areas-we-serve/g74/" },
};

export default function G74Page() {
  return (
    <StubPageTemplate
      pageName="G74 - North & Central"
      description="The full G74 hub, with each of the 18 child districts in North and Central East Kilbride, lands in the next deployment. For now you can still get a fixed-price quote for any G74 postcode using the homepage form."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Areas We Serve", href: "/areas-we-serve/" },
        { label: "G74", href: "/areas-we-serve/g74/" },
      ]}
      liveLinks={[
        { label: "Get a G74 quote", href: "/#quote-form" },
        { label: "G75 - South & West", href: "/areas-we-serve/g75/" },
        { label: "Boiler Prices", href: "/boilers/" },
      ]}
    />
  );
}
