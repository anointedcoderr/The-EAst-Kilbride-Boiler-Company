import type { Metadata } from "next";
import { PostcodeHubTemplate } from "@/components/templates/PostcodeHubTemplate";

export const metadata: Metadata = {
  title:
    "Boiler Installation across G74, East Kilbride | EKBC - 18 Districts Covered",
  description:
    "Fixed-price boiler installation, repair and servicing across all 17 G74 districts of East Kilbride. Worcester Bosch, Ideal, Vokera and Navien fitted by Gas Safe engineers. Call 01355 204045.",
  alternates: { canonical: "/areas-we-serve/g74/" },
};

export default function G74Page() {
  return <PostcodeHubTemplate code="G74" />;
}
