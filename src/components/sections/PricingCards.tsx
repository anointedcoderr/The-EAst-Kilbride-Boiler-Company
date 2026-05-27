import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
        <SectionHeading
          eyebrow="UNBEATABLE PRICES"
          heading="OUR UNBEATABLE BOILER INSTALLATION DEALS"
          highlightedWord="INSTALLATION DEALS"
          subtitle="Carefully selected boiler brands installed by professional Gas Safe Experts. Fixed price, all materials included, helping you choose the right boiler for your home with reliable heating and long-term peace of mind."
        />

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {trustBadges.map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-mint-500" />
              <span className="text-sm font-medium text-carbon-300">
                {badge}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex flex-col overflow-hidden rounded-xl border border-carbon-600 bg-carbon-800 transition-colors hover:border-mint-500/50"
            >
              <div className="relative flex h-48 items-center justify-center bg-carbon-700 p-4">
                <span className="absolute left-3 top-3 rounded-md bg-mint-500 px-2.5 py-1 text-xs font-bold uppercase text-carbon-900">
                  {brand.tag}
                </span>
                <p className="text-lg font-semibold text-carbon-400">
                  {brand.name}
                </p>
                <span className="absolute bottom-3 right-3 rounded-md bg-carbon-800 px-2.5 py-1 text-xs font-bold text-white">
                  {brand.warranty}
                </span>
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

                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-carbon-400">
                  FULLY INSTALLED - INC. ALL MATERIALS
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
                    className="flex w-full items-center justify-center rounded-lg border border-mint-500 px-6 py-3 text-sm font-semibold text-mint-500 transition-colors hover:bg-mint-500/10"
                  >
                    Get This Deal
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { PricingCards };
