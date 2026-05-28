import type { Metadata } from "next";
import { StubPageTemplate } from "@/components/templates/StubPageTemplate";

export const metadata: Metadata = {
  title: "Boiler Installation in G75 - South & West East Kilbride",
  description:
    "Fixed-price boiler installation, repair and servicing across all G75 districts of East Kilbride. Gas Safe Experts, no hidden extras.",
  alternates: { canonical: "/areas-we-serve/g75/" },
};

export default function G75Page() {
  return (
    <StubPageTemplate
      pageName="G75 - South & West"
      description="The full G75 hub, with each of the 17 child districts in South and West East Kilbride, lands in the next deployment. For now you can still get a fixed-price quote for any G75 postcode using the homepage form."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Areas We Serve", href: "/areas-we-serve/" },
        { label: "G75", href: "/areas-we-serve/g75/" },
      ]}
      liveLinks={[
        { label: "Get a G75 quote", href: "/#quote" },
        { label: "G74 - North & Central", href: "/areas-we-serve/g74/" },
        { label: "Boiler Prices", href: "/boilers/" },
      ]}
    />
  );
}
