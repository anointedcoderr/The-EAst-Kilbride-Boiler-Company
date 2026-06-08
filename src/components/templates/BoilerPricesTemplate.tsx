import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "./PageHero";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContentBlocks } from "@/components/sections/ContentBlocks";
import { LocalFAQSection } from "@/components/sections/LocalFAQSection";
import { SiloLinks } from "@/components/sections/SiloLinks";
import { EeatBlock } from "@/components/sections/EeatBlock";
import { TrustBadgesBar } from "@/components/sections/TrustBadgesBar";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { ServiceAreaProof } from "@/components/sections/ServiceAreaProof";
import { BottomQuoteSection } from "@/components/sections/BottomQuoteSection";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schemas";
import { brands } from "@/data/brands";
import { pageContent } from "@/data/pageContent";
import { formatPrice } from "@/lib/utils";

const SITE_URL = "https://www.eastkilbrideboilercompany.co.uk";

function priceTableSchema() {
  return brands.map((brand) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${brand.name} ${brand.product} fitted in East Kilbride`,
    image: `${SITE_URL}${brand.image}`,
    description: `${brand.name} ${brand.product} fully installed in East Kilbride from ${formatPrice(brand.standardPrice)} by Gas Safe engineers.`,
    brand: { "@type": "Brand", name: brand.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: brand.standardPrice,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/boilers/${brand.slug}/`,
      warranty: brand.warranty,
    },
  }));
}

export function BoilerPricesTemplate() {
  const page = pageContent.boilers;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Boiler Prices", href: "/boilers/" },
  ];

  const schemas: Record<string, unknown>[] = [
    ...priceTableSchema(),
    faqSchema(
      page.faqs.map((f) => ({
        question: f.question,
        answer: f.answer,
        pageTypes: [],
      }))
    ),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      <PageHero
        eyebrow={page.heroEyebrow}
        h1={page.h1}
        highlightedWord={page.highlightedWord}
        subtitle={page.heroSubtitle}
        description={page.heroDescription}
        trustPoints={page.heroTrustPoints}
        breadcrumbs={breadcrumbs}
        primaryCtaLabel={page.ctaPrimaryLabel}
      />

      <TrustBadgesBar />

      <section className="bg-carbon-900 py-10 sm:py-14">
        <Container>
          <ScrollReveal>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-carbon-700">
              <Image
                src="/images/hero-engineer.jpg"
                alt="Gas Safe engineer in front of EKBC van - fixed-price boiler prices in East Kilbride"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-carbon-950/60 via-transparent to-transparent"
              />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-carbon-950 py-12 sm:py-16">
        <Container className="max-w-4xl">
          <ScrollReveal>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
              Worcester, Ideal, Vokera, Navien
            </p>
            <h2 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
              Choose your brand and price
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-carbon-200">
              Choose from Worcester Bosch, Ideal, Vokera and Navien. All prices include installation, parts, labour and VAT. No hidden extras, no surprises. We install ALL boiler brands, get your FREE quote now!
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-carbon-900 py-14 sm:py-20">
        <Container>
          <ScrollReveal>
            <header className="max-w-3xl">
              <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
                Unbeatable boiler prices
              </p>
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
                Compare Worcester Bosch, Ideal, Vokera and Navien
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-carbon-300">
                {page.introCopy}
              </p>
            </header>
          </ScrollReveal>

          <div className="mt-10 overflow-hidden rounded-2xl border border-carbon-700">
            <div className="hidden md:grid md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] bg-carbon-950 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-mint-400">
              <span>Brand</span>
              <span>Fitted from</span>
              <span>Warranty</span>
              <span>Best for</span>
              <span className="text-right">Get a price</span>
            </div>
            <div className="divide-y divide-carbon-800">
              {brands.map((brand, index) => {
                const bestFor =
                  brand.id === "vokera"
                    ? "1 bath flats / terraced"
                    : brand.id === "ideal"
                      ? "Semi-detached / terraced"
                      : brand.id === "worcester-bosch"
                        ? "Semi / detached homes"
                        : "Larger detached / 2 bath";

                return (
                  <div
                    key={brand.id}
                    className="grid grid-cols-1 gap-5 bg-carbon-900 px-5 py-6 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] md:items-center"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-carbon-700 bg-carbon-950 sm:h-36 sm:w-36 md:h-32 md:w-32 lg:h-40 lg:w-40">
                        <Image
                          src={brand.image}
                          alt={`${brand.name} combi boiler`}
                          fill
                          sizes="(max-width: 768px) 128px, (max-width: 1024px) 128px, 160px"
                          className="object-contain p-3"
                        />
                      </div>
                      <div>
                        <p className="text-base font-bold text-white sm:text-lg">
                          {brand.name}
                        </p>
                        <p className="text-[11px] uppercase tracking-wider text-mint-400">
                          {brand.tag}
                        </p>
                      </div>
                    </div>
                    <p className="text-base font-bold text-mint-500 md:text-lg">
                      {formatPrice(brand.standardPrice)}
                      <span className="ml-1 text-[10px] font-semibold uppercase tracking-wider text-carbon-400">
                        fitted
                      </span>
                    </p>
                    <p className="text-sm text-carbon-200">{brand.warranty}</p>
                    <p className="text-sm text-carbon-300">{bestFor}</p>
                    <div className="flex md:justify-end">
                      <Link
                        href={`/boilers/${brand.slug}/`}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-mint-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-mint-400 transition-all hover:bg-mint-500 hover:text-carbon-900"
                        aria-label={`Get a fixed price for ${brand.name}`}
                      >
                        See price
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                    {index === 0 && <span className="sr-only">Best value</span>}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-xs text-carbon-400">
            All prices include the boiler, installation, parts, labour, VAT, a free wireless thermostat and a full system flush. Brand pages open in Stage 2.
          </p>
        </Container>
      </section>

      <ContentBlocks
        intro="A new combi is a long-term decision. This section pulls together the practical detail we get asked about most often by East Kilbride homeowners before they commit."
        blocks={page.contentBlocks ?? []}
        eyebrow="NEW BOILER BUYING GUIDE"
        heading="What to look at before you choose a boiler"
      />

      <section className="bg-carbon-900 py-14 sm:py-20">
        <Container>
          <ScrollReveal>
            <header className="max-w-3xl">
              <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
                What is in the price
              </p>
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
                Every fitted boiler price includes the lot
              </h2>
            </header>
          </ScrollReveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "The boiler itself, parts, labour and VAT",
              "Manufacturer warranty",
              "Free wireless thermostat",
              "Full system flush",
              "Standard pipework, fittings and flue",
              "Fixed price, no separate call-out fees",
              "Installed by experienced self-employed Gas Safe engineers",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-carbon-700 bg-carbon-950 p-4"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-mint-500" />
                <span className="text-sm leading-relaxed text-carbon-200">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <EeatBlock />

      {page.serviceAreaProof && (
        <ServiceAreaProof proof={page.serviceAreaProof} />
      )}

      <ReviewsCarousel />

      <LocalFAQSection
        eyebrow="Boiler price FAQs - East Kilbride"
        heading="Fitted boiler price questions, answered"
        intro="What homeowners across G74 and G75 want to know before they pay a penny."
        faqs={page.faqs}
      />

      <SiloLinks links={page.internalLinks} />

      <BottomQuoteSection />

      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
