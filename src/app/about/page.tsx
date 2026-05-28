import type { Metadata } from "next";
import { StubPageTemplate } from "@/components/templates/StubPageTemplate";

export const metadata: Metadata = {
  title: "About Us | East Kilbride Boiler Company",
  description:
    "East Kilbride's #1 boiler replacement company since 2017. Gas Safe Experts serving all 35 areas of G74 and G75.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <StubPageTemplate
      pageName="About Us"
      description="The story behind East Kilbride's #1 boiler company is on the way. While we finish writing it, you can already see our credentials and meet the Gas Safe Experts on the homepage."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about/" },
      ]}
      liveLinks={[
        { label: "Boiler Prices", href: "/boilers/" },
        { label: "Areas We Serve", href: "/areas-we-serve/" },
        { label: "Blogs", href: "/blogs/" },
      ]}
    />
  );
}
