import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { districts, getDistrictBySlug } from "@/data/districts";
import { DistrictPageTemplate } from "@/components/templates/DistrictPageTemplate";

export const dynamicParams = false;

export function generateStaticParams() {
  return districts.map((d) => ({ slug: d.slug }));
}

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const district = getDistrictBySlug(slug);
  if (!district) return {};

  const metaTitle = `Boiler Replacement in ${district.name}, East Kilbride (${district.postcodeHub}) | EKBC`;
  const metaDescription = `Fixed-price boiler installations, repairs and annual servicing in ${district.name} (${district.postcodeHub}), East Kilbride. Worcester Bosch, Ideal, Vokera and Navien fitted by Gas Safe Experts. Call 01355 204045.`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `/areas-we-serve/${district.slug}/`,
    },
  };
}

export default async function DistrictRoute({ params }: RouteParams) {
  const { slug } = await params;
  const district = getDistrictBySlug(slug);
  if (!district) notFound();
  return <DistrictPageTemplate district={district} />;
}
