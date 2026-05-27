"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccordionItem } from "@/components/ui/Accordion";
import { faqs } from "@/data/faqs";

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const homepageFaqs = faqs.filter((faq) => faq.pageTypes.includes("homepage"));

  return (
    <section className="bg-carbon-950 py-20">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="GOT QUESTIONS?" heading="FAQS" />

        <div className="mt-12 space-y-4">
          {homepageFaqs.map((faq, index) => (
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

export { FAQSection };
