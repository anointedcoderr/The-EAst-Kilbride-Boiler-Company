import type { Metadata } from "next";
import { BlogTemplate } from "@/components/templates/BlogTemplate";

export const metadata: Metadata = {
  title: "Blog | East Kilbride Boiler Company - Heating advice for G74 & G75",
  description:
    "Practical boiler buying, repair and servicing advice from East Kilbride's Gas Safe Experts. Worcester Bosch, Ideal, Vokera, Navien and more.",
  alternates: { canonical: "/blogs/" },
};

export default function BlogsPage() {
  return <BlogTemplate />;
}
