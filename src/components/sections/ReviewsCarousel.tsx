"use client";

import { Star, Quote, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews } from "@/data/reviews";

function ReviewsCarousel() {
  return (
    <section className="bg-carbon-950 py-20">
      <Container>
        <SectionHeading
          eyebrow="REAL CUSTOMERS"
          heading="TRUSTED ACROSS EAST KILBRIDE"
          highlightedWord="EAST KILBRIDE"
        />

        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-6 w-6 fill-gold text-gold"
              />
            ))}
          </div>
          <span className="text-lg font-bold text-white">Excellent</span>
          <span className="text-carbon-300">8,200+ happy EK customers</span>
        </div>

        <div className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="relative min-w-[300px] w-[350px] shrink-0 snap-start rounded-xl border border-carbon-600 bg-carbon-800 p-6"
            >
              <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-mint-500/50 px-2 py-0.5">
                <Check className="h-3 w-3 text-mint-500" />
                <span className="text-xs font-semibold text-mint-500">VERIFIED</span>
              </div>

              <Quote className="h-10 w-10 text-mint-500/20" />

              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold text-gold"
                  />
                ))}
              </div>

              <p className="mt-4 text-carbon-200 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mint-500 text-sm font-bold text-carbon-900">
                  {review.initials}
                </div>
                <div>
                  <p className="font-bold text-white">{review.name}</p>
                  <p className="text-sm text-carbon-400">
                    {review.location}, {review.postcode}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { ReviewsCarousel };
