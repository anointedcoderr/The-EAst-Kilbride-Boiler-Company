"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccordionItem } from "@/components/ui/Accordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ServiceFAQsClientProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function ServiceFAQsClient({ faqs }: ServiceFAQsClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ScrollReveal>
      <section className="bg-carbon-950 py-14 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Got questions?" heading="FAQS" />

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
    </ScrollReveal>
  );
}
