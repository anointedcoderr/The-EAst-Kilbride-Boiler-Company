import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brands } from "@/data/brands";
import { BrandPageTemplate } from "@/components/templates/BrandPageTemplate";

export const dynamicParams = false;

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) return {};

  return {
    title: brand.seoTitle,
    description: brand.seoDescription,
    alternates: {
      canonical: `/boilers/${brand.slug}/`,
    },
  };
}

export default async function BrandRoute({ params }: RouteParams) {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) notFound();
  return <BrandPageTemplate brand={brand} />;
}
