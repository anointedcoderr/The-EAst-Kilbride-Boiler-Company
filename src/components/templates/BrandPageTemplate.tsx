import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "./PageHero";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LocalFAQSection } from "@/components/sections/LocalFAQSection";
import { SiloLinks } from "@/components/sections/SiloLinks";
import { EeatBlock } from "@/components/sections/EeatBlock";
import { TrustBadgesBar } from "@/components/sections/TrustBadgesBar";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { BottomQuoteSection } from "@/components/sections/BottomQuoteSection";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schemas";
import { brands } from "@/data/brands";
import { formatPrice } from "@/lib/utils";
import type { Brand } from "@/types";
import type { PageInternalLink } from "@/data/pageContent";

const SITE_URL = "https://www.eastkilbrideboilercompany.co.uk";

interface BrandCopy {
  positioning: string;
  bestFor: string;
  localAngle: string;
  warrantyHook: string;
}

const brandCopy: Record<string, BrandCopy> = {
  "worcester-bosch": {
    positioning:
      "Worcester Bosch is the Which? Best Boiler Award winner and the most-requested brand on the street across East Kilbride. The premium build quality is the reason it has held the top of the awards table for years running.",
    bestFor:
      "Worcester Bosch is the right fit for 3 to 4 bed semi-detached and detached homes in Calderwood, Stewartfield, Whitemoss, Hairmyres and Lindsayfield, where a reliable, quiet, long-life combi matters more than the lowest possible up-front price.",
    localAngle:
      "Worcester Bosch is our most-fitted premium combi across G74 and the most-requested brand on the streets of central East Kilbride. Most installations are like-for-like swaps, with same-week fitting dates the norm.",
    warrantyHook:
      "Worcester Bosch comes with a 5-year warranty as standard. Service the boiler annually with the Gas Safe engineers we work with and the warranty stays valid for the full term.",
  },
  ideal: {
    positioning:
      "Ideal is our most popular fit across East Kilbride and a strong A-rated mid-range combi. It is a great match for terraced and semi-detached properties where a reliable build at a sensible fitted price is the priority.",
    bestFor:
      "Ideal is the right fit for terraced and semi-detached homes in Calderwood, Stewartfield, Lindsayfield, Jackton and Westwood, with single-bathroom and two-bathroom options across the range.",
    localAngle:
      "Ideal is our highest-volume installation across G74 and G75. It is the brand we recommend when a homeowner wants a reliable A-rated combi without paying for a premium badge.",
    warrantyHook:
      "Ideal comes with a 5-year warranty as standard. The manufacturer requires an annual service from a Gas Safe registered engineer to keep the warranty in force, and we handle that on the day.",
  },
  vokera: {
    positioning:
      "Vokera at £1,299 fitted is our best-value installation. It is a reliable build that suits one-bathroom flats and smaller terraced homes where keeping the up-front cost sensible matters most.",
    bestFor:
      "Vokera is the right fit for one-bathroom flats and 2 to 3 bed terraces in The Murray, Greenhills, Westwood, Mossneuk and Law Place. It is also a popular landlord choice for rented family homes across G75.",
    localAngle:
      "Vokera is our highest-volume fit in G75, especially in The Murray, Greenhills and Westwood. The price is lower because the badge is less premium, not because the boiler is short on quality.",
    warrantyHook:
      "Vokera comes with a 5-year warranty as standard. The manufacturer requires an annual service from a Gas Safe registered engineer to keep the warranty valid.",
  },
  navien: {
    positioning:
      "Navien at £1,835 fitted is our premium pick with the longest standard warranty on the market at 10 years. The smart connected controls are excellent and the flow rate suits larger detached homes with two or more bathrooms.",
    bestFor:
      "Navien is the right fit for larger detached properties in Stewartfield, Thorntonhall, Whitemoss, Crutherland and Jackton where high peak hot water demand and a long warranty matter.",
    localAngle:
      "Navien is our most-fitted boiler in Thorntonhall, Stewartfield and Crutherland, where the typical home has two or more bathrooms. The 10-year warranty is the longest on the market by a clear margin.",
    warrantyHook:
      "Navien comes with a 10-year manufacturer warranty as standard. Service the boiler annually with the Gas Safe engineers we work with and the warranty stays valid for the full 10 years.",
  },
};

function productSchema(brand: Brand) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${brand.name} ${brand.product} fitted in East Kilbride`,
    image: `${SITE_URL}${brand.image}`,
    description: brand.seoDescription,
    brand: { "@type": "Brand", name: brand.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: brand.standardPrice,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/boilers/${brand.slug}/`,
      warranty: brand.warranty,
      seller: { "@id": `${SITE_URL}/#localbusiness` },
    },
  };
}

function buildBrandFAQs(brand: Brand): Array<{ question: string; answer: string }> {
  const copy = brandCopy[brand.id];
  return [
    {
      question: `How much is a ${brand.name} combi boiler fitted in East Kilbride?`,
      answer: `${brand.name} ${brand.product} is fitted in East Kilbride from ${formatPrice(brand.standardPrice)}. The price includes the boiler, installation, parts, labour, VAT, a free wireless thermostat and a full system flush.`,
    },
    {
      question: `What is the ${brand.name} warranty?`,
      answer: copy.warrantyHook,
    },
    {
      question: `Is ${brand.name} better than the other brands you fit?`,
      answer: `${brand.name} is the right fit for some homes and not others. ${copy.bestFor} For other homes we may recommend Worcester Bosch, Ideal, Vokera or Navien depending on bathrooms, peak demand and budget.`,
    },
    {
      question: `Do you fit ${brand.name} across G74 and G75?`,
      answer: `Yes. ${brand.name} is fitted across every G74 and G75 district in East Kilbride by the Gas Safe engineers we work with. There is no extra travel charge for any East Kilbride postcode.`,
    },
    {
      question: `Can I get a fixed price for a ${brand.name} installation?`,
      answer: `Yes. Every ${brand.name} installation is quoted at a single fixed price covering the boiler, parts, labour, VAT, the wireless thermostat, the full system flush and the manufacturer warranty. There are no separate call-out fees and no extras on the day.`,
    },
    {
      question: `What if I am not sure ${brand.name} is the right choice?`,
      answer: `Call 01355 204045 and our team can talk through your property and your hot water demand before committing to a brand. We give honest guidance, with no pressure to pick the most expensive option.`,
    },
  ];
}

function brandInternalLinks(brand: Brand): PageInternalLink[] {
  const otherBrands = brands
    .filter((b) => b.id !== brand.id)
    .map((b) => ({
      label: `${b.name} Combi`,
      href: `/boilers/${b.slug}/`,
      group: "Brand" as const,
    }));
  return [
    { label: "Boiler Prices", href: "/boilers/", group: "Boilers" },
    { label: "New Boiler Installation", href: "/services/new-boiler-installation/", group: "Services" },
    { label: "Boiler Repair", href: "/services/boiler-repair/", group: "Services" },
    { label: "Annual Boiler Service", href: "/services/boiler-servicing/", group: "Services" },
    { label: "G74 hub", href: "/areas-we-serve/g74/", group: "Areas" },
    { label: "G75 hub", href: "/areas-we-serve/g75/", group: "Areas" },
    ...otherBrands,
    { label: "Combi boiler cost guide", href: "/blogs/combi-boiler-cost-east-kilbride/", group: "Guides" },
    { label: "Best boiler brands for G74 and G75", href: "/blogs/best-boiler-brands-g74-g75-east-kilbride/", group: "Guides" },
  ];
}

interface BrandPageTemplateProps {
  brand: Brand;
}

export function BrandPageTemplate({ brand }: BrandPageTemplateProps) {
  const copy = brandCopy[brand.id];
  const faqs = buildBrandFAQs(brand);
  const links = brandInternalLinks(brand);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Boiler Prices", href: "/boilers/" },
    { label: `${brand.name} Combi`, href: `/boilers/${brand.slug}/` },
  ];

  const otherBrands = brands.filter((b) => b.id !== brand.id);

  return (
    <>
      <JsonLd
        data={[
          productSchema(brand),
          breadcrumbSchema(breadcrumbs),
          faqSchema(faqs.map((f) => ({ ...f, pageTypes: [] }))),
        ]}
      />

      <PageHero
        eyebrow={`${brand.name} Combi - ${brand.tag}`}
        h1={brand.h1}
        highlightedWord={formatPrice(brand.standardPrice)}
        subtitle={`Fitted by Gas Safe engineers across all 35 East Kilbride districts`}
        description={copy.positioning}
        trustPoints={[
          `From ${formatPrice(brand.standardPrice)} fitted`,
          brand.warranty,
          "Free thermostat",
          "Free system flush",
        ]}
        breadcrumbs={breadcrumbs}
        primaryCtaLabel={`Get my ${brand.name} fixed price`}
      />

      <TrustBadgesBar />

      <section className="bg-carbon-900 py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <ScrollReveal direction="left">
              <div className="rounded-2xl border border-carbon-700 bg-carbon-950/60 p-6 sm:p-8">
                <div className="relative mx-auto aspect-square max-w-xs overflow-hidden rounded-xl bg-carbon-900">
                  <Image
                    src={brand.image}
                    alt={`${brand.name} ${brand.product} fitted in East Kilbride`}
                    fill
                    sizes="(max-width: 768px) 70vw, 320px"
                    className="object-contain p-4"
                    priority
                  />
                </div>
                <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-mint-400">
                  {brand.tag}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-mint-400">
                  Fitted price
                </p>
                <p className="mt-3 text-4xl font-extrabold text-mint-500 sm:text-5xl">
                  {formatPrice(brand.standardPrice)}
                  <span className="ml-2 text-sm font-semibold uppercase tracking-wider text-carbon-300">
                    fitted
                  </span>
                </p>
                <p className="mt-2 text-sm uppercase tracking-wide text-carbon-300">
                  Premium spec from {formatPrice(brand.premiumPrice)} fitted
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {brand.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-xl border border-carbon-700 bg-carbon-950 p-3"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-500" />
                      <span className="text-sm text-carbon-200">{item}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2.5 rounded-xl border border-carbon-700 bg-carbon-950 p-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-500" />
                    <span className="text-sm text-carbon-200">
                      Fitted by Gas Safe engineers
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 rounded-xl border border-carbon-700 bg-carbon-950 p-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-500" />
                    <span className="text-sm text-carbon-200">
                      No call-out fee, no surprises
                    </span>
                  </li>
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/#quote"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-mint-500 px-6 py-3 text-base font-bold text-carbon-900 transition-all hover:bg-mint-400"
                  >
                    Get my {brand.name} fixed price
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <a
                    href="tel:01355204045"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-mint-500 px-6 py-3 text-base font-semibold text-mint-500 transition-colors hover:bg-mint-500/10"
                  >
                    Call 01355 204045
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="bg-carbon-950 py-14 sm:py-20">
        <Container className="max-w-4xl">
          <div className="space-y-8 sm:space-y-10">
            <ScrollReveal>
              <article className="rounded-2xl border border-carbon-700 bg-carbon-900/60 p-6 sm:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  Best for
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-carbon-200">
                  {copy.bestFor}
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal>
              <article className="rounded-2xl border border-carbon-700 bg-carbon-900/60 p-6 sm:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  Warranty cover
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-carbon-200">
                  {copy.warrantyHook}
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal>
              <article className="rounded-2xl border border-carbon-700 bg-carbon-900/60 p-6 sm:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  Local East Kilbride angle
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-carbon-200">
                  {copy.localAngle}
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal>
              <article className="rounded-2xl border border-carbon-700 bg-carbon-900/60 p-6 sm:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  Compared with the other three brands we fit
                </h2>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[480px] border-collapse text-sm">
                    <thead>
                      <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-mint-400">
                        <th className="border-b border-carbon-800 py-2 pr-3">Brand</th>
                        <th className="border-b border-carbon-800 py-2 pr-3">From</th>
                        <th className="border-b border-carbon-800 py-2 pr-3">Warranty</th>
                        <th className="border-b border-carbon-800 py-2">Tag</th>
                      </tr>
                    </thead>
                    <tbody className="text-carbon-200">
                      <tr className="bg-mint-500/5">
                        <td className="border-b border-carbon-800 py-3 pr-3 font-bold text-mint-400">
                          {brand.name} (this page)
                        </td>
                        <td className="border-b border-carbon-800 py-3 pr-3 font-bold text-mint-400">
                          {formatPrice(brand.standardPrice)}
                        </td>
                        <td className="border-b border-carbon-800 py-3 pr-3">
                          {brand.warranty}
                        </td>
                        <td className="border-b border-carbon-800 py-3">{brand.tag}</td>
                      </tr>
                      {otherBrands.map((b) => (
                        <tr key={b.id}>
                          <td className="border-b border-carbon-800 py-3 pr-3 font-semibold">
                            <Link
                              href={`/boilers/${b.slug}/`}
                              className="text-white hover:text-mint-400"
                            >
                              {b.name}
                            </Link>
                          </td>
                          <td className="border-b border-carbon-800 py-3 pr-3">
                            {formatPrice(b.standardPrice)}
                          </td>
                          <td className="border-b border-carbon-800 py-3 pr-3">
                            {b.warranty}
                          </td>
                          <td className="border-b border-carbon-800 py-3">{b.tag}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <EeatBlock />
      <ReviewsCarousel />

      <LocalFAQSection
        eyebrow={`${brand.name} FAQs - East Kilbride`}
        heading={`${brand.name} questions, answered`}
        intro={`The most common questions East Kilbride homeowners ask before booking a ${brand.name} installation.`}
        faqs={faqs}
      />

      <SiloLinks
        eyebrow={`Continue from ${brand.name}`}
        heading="Compare prices, services and areas"
        intro="Every brand page on this site is linked into the wider silo. Compare against the other three brands, jump to a service, or check your postcode."
        links={links}
      />

      <BottomQuoteSection
        heading={`Get Your ${brand.name} Fixed Price`}
        intro={`No obligation. No hidden extras. ${brand.name} fitted by the Gas Safe engineers we work with across all 35 East Kilbride districts.`}
      />

      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
