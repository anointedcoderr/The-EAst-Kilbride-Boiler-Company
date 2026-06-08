import type { Metadata } from "next";
import { PostcodeHubTemplate } from "@/components/templates/PostcodeHubTemplate";

export const metadata: Metadata = {
  title:
    "Boiler Installation across G75, East Kilbride | EKBC - 15 Districts Covered",
  description:
    "Fixed-price boiler installation, repair and servicing across all 15 G75 districts of East Kilbride. Worcester Bosch, Ideal, Vokera and Navien fitted by Gas Safe engineers. Call 01355 204045.",
  alternates: { canonical: "/areas-we-serve/g75/" },
};

export default function G75Page() {
  return <PostcodeHubTemplate code="G75" />;
}
