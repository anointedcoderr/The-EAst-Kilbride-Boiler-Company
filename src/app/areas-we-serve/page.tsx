import type { Metadata } from "next";
import { StubPageTemplate } from "@/components/templates/StubPageTemplate";

export const metadata: Metadata = {
  title: "Areas We Serve | East Kilbride Boiler Company",
  description:
    "We cover every G74 and G75 postcode across East Kilbride. 35 districts from The Murray to Stewartfield, Calderwood to Greenhills.",
  alternates: { canonical: "/areas-we-serve/" },
};

export default function AreasWeServePage() {
  return (
    <StubPageTemplate
      pageName="Areas We Serve"
      description="The full Areas We Serve index, including all 35 East Kilbride districts and live engineer availability, lands in the next deployment. The coverage map and full district A to Z are already live on the homepage."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Areas We Serve", href: "/areas-we-serve/" },
      ]}
      liveLinks={[
        { label: "G74 - North & Central", href: "/areas-we-serve/g74/" },
        { label: "G75 - South & West", href: "/areas-we-serve/g75/" },
        { label: "Coverage map", href: "/#areas" },
      ]}
    />
  );
}
