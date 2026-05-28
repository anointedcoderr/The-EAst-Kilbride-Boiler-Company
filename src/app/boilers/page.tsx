import type { Metadata } from "next";
import { BoilerPricesTemplate } from "@/components/templates/BoilerPricesTemplate";

export const metadata: Metadata = {
  title: "Boiler Prices in East Kilbride | EKBC - Fixed Price From £1,299",
  description:
    "Fixed-price combi boiler installations across East Kilbride. Worcester Bosch, Ideal, Vokera and Navien. Up to 12-year warranty. Call 01355 204045 for a no-obligation quote.",
  alternates: { canonical: "/boilers/" },
};

export default function BoilerPricesPage() {
  return <BoilerPricesTemplate />;
}
