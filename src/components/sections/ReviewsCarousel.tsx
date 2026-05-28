"use client";

import { Star, Quote, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { reviews } from "@/data/reviews";

interface ReviewCardProps {
  name: string;
  initials: string;
  location: string;
  postcode: string;
  rating: number;
  text: string;
  verified: boolean;
}

function ReviewCard({
  name,
  initials,
  location,
  postcode,
  rating,
  text,
  verified,
}: ReviewCardProps) {
  return (
    <div className="hover-card min-w-[320px] w-[380px] shrink-0 rounded-xl border border-carbon-600 bg-carbon-800 p-6 relative">
      {verified && (
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-mint-500/50 px-2 py-0.5">
          <Check className="h-3 w-3 text-mint-500" />
          <span className="text-xs font-semibold text-mint-500">VERIFIED</span>
        </div>
      )}

      <Quote className="h-10 w-10 text-mint-500/20" />

      <div className="mt-3 flex gap-0.5">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold text-gold" />
        ))}
      </div>

      <p className="mt-4 text-carbon-200 italic">
        &ldquo;{text}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mint-500 text-sm font-bold text-carbon-900">
          {initials}
        </div>
        <div>
          <p className="font-bold text-white">{name}</p>
          <p className="text-sm text-carbon-400">
            {location}, {postcode}
          </p>
        </div>
      </div>
    </div>
  );
}

function ReviewsCarousel() {
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="bg-carbon-950 py-20">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="REAL CUSTOMERS"
            heading="TRUSTED ACROSS EAST KILBRIDE"
            highlightedWord="EAST KILBRIDE"
          />
        </ScrollReveal>

        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-gold text-gold" />
            ))}
          </div>
          <span className="text-lg font-bold text-white">Excellent</span>
          <span className="text-carbon-300">8,200+ happy EK customers</span>
        </div>
      </Container>

      <div
        className="group mt-12 overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
      >
        <div
          className="flex gap-6 group-hover:[animation-play-state:paused]"
          style={{
            animation: "scroll-marquee 40s linear infinite",
            width: "max-content",
          }}
        >
          {duplicatedReviews.map((review, i) => (
            <ReviewCard
              key={`${review.id}-${i}`}
              name={review.name}
              initials={review.initials}
              location={review.location}
              postcode={review.postcode}
              rating={review.rating}
              text={review.text}
              verified={review.verified}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { ReviewsCarousel };
