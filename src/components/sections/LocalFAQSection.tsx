"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { AccordionItem } from "@/components/ui/Accordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { PageFAQ } from "@/data/pageContent";

interface LocalFAQSectionProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  faqs: PageFAQ[];
}

export function LocalFAQSection({
  eyebrow = "East Kilbride FAQs",
  heading = "Local boiler questions, answered",
  intro,
  faqs,
}: LocalFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section className="bg-carbon-950 py-14 sm:py-20">
      <Container className="max-w-3xl">
        <ScrollReveal>
          <header>
            <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
              {eyebrow}
            </p>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
              {heading}
            </h2>
            {intro && (
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-carbon-300">
                {intro}
              </p>
            )}
          </header>
        </ScrollReveal>

        <div className="mt-8 sm:mt-12 space-y-2.5 sm:space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
