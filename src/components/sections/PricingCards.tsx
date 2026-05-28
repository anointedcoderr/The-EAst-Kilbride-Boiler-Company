import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { brands } from "@/data/brands";
import { formatPrice } from "@/lib/utils";

const trustBadges = [
  "Warranty Included",
  "Free Wireless Thermostat",
  "Free System Flush",
];

function PricingCards() {
  return (
    <section className="bg-carbon-900 py-16 lg:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="UNBEATABLE PRICES"
            heading="OUR UNBEATABLE BOILER INSTALLATION DEALS"
            highlightedWord="INSTALLATION DEALS"
            subtitle="Carefully selected boiler brands installed by professional Gas Safe Experts. Fixed price, all materials included, helping you choose the right boiler for your home with reliable heating and long-term peace of mind."
          />
        </ScrollReveal>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 rounded-full border border-carbon-700 bg-carbon-800 px-3 py-1.5"
            >
              <Check className="h-4 w-4 text-mint-500" />
              <span className="text-xs sm:text-sm font-medium text-carbon-200">
                {badge}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand, index) => (
            <ScrollReveal key={brand.id} direction="up" delay={index * 0.1}>
              <div className="hover-card group flex h-full flex-col overflow-hidden rounded-2xl border border-carbon-600 bg-carbon-800 transition-colors hover:border-mint-500/50">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={brand.image}
                    alt={`${brand.name} combi boiler installed by EKBC`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold uppercase italic text-white">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-carbon-400">{brand.product}</p>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-mint-500">
                      {formatPrice(brand.standardPrice)}
                    </span>
                    <span className="text-sm text-carbon-400 line-through">
                      {formatPrice(brand.premiumPrice)}
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-carbon-400">
                    Fully installed, inc. all materials
                  </p>

                  <ul className="mt-4 flex flex-col gap-2">
                    {brand.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-mint-500" />
                        <span className="text-sm text-carbon-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5">
                    <Link
                      href={`/boilers/${brand.slug}/`}
                      className="flex w-full min-h-[44px] items-center justify-center rounded-lg border border-mint-500 px-6 py-3 text-sm font-semibold text-mint-500 transition-all hover:bg-mint-500 hover:text-carbon-900 hover:scale-[1.02] active:scale-95"
                    >
                      Get This Deal
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-carbon-400">
          All prices include installation, parts, labour and VAT. Prices may vary by property type.{" "}
          <Link href="/#quote" className="font-semibold text-mint-500 underline hover:text-mint-400">
            See your fixed price
          </Link>
        </p>
      </Container>
    </section>
  );
}

export { PricingCards };
