import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/templates/PageHero";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";
import { siteSettings } from "@/data/siteSettings";

export const metadata: Metadata = {
  title: "Terms and Conditions | The East Kilbride Boiler Company",
  description:
    "Terms and conditions for boiler installation, repair and servicing arranged through The East Kilbride Boiler Company. Self-employed Gas Safe registered engineers, customer responsibilities, warranty registration and payment terms.",
  alternates: { canonical: "/terms/" },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Terms & Conditions", href: "/terms/" },
];

interface TermSection {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
}

const definitions: TermSection = {
  id: "definitions",
  heading: "Definitions",
  body: [
    "These terms and conditions apply when you book products or services through The East Kilbride Boiler Company. The following definitions apply throughout this document:",
  ],
  bullets: [
    "The customer (you)",
    "The Company (us)",
    "Gas engineer (your nominated self-employed Gas Safe registered engineer)",
  ],
};

const terms: TermSection[] = [
  {
    id: "term-1",
    heading: "1. Annual servicing to maintain manufacturer warranty",
    body: [
      "It is the customer's responsibility to have their products serviced on an annual basis to maintain their manufacturer's warranty.",
    ],
  },
  {
    id: "term-2",
    heading: "2. Property ownership",
    body: [
      "The customer warrants they are the owner of the property in which the items are to be delivered or installed.",
    ],
  },
  {
    id: "term-3",
    heading: "3. Additional work agreement",
    body: [
      "Any additional work required and agreed to must be detailed in writing and signed by both the customer and their nominated gas engineer.",
    ],
  },
  {
    id: "term-4",
    heading: "4. Warranty registration",
    body: [
      "It is the customer's responsibility to register their product warranty directly with the product manufacturer. We recommend you do this as soon as possible, as most manufacturers give around 30 days from the installation date to register.",
    ],
  },
  {
    id: "term-5",
    heading: "5. Manufacturer warranty claims",
    body: [
      "If still under warranty and your product develops a fault, it is the customer's responsibility to contact the product manufacturer directly and arrange for them to inspect and rectify any faults found with their products.",
    ],
  },
  {
    id: "term-6",
    heading: "6. Dangerous materials and planning warrants",
    body: [
      "It is the customer's responsibility to inform the gas engineers of any knowledge you may have regarding dangerous materials such as asbestos. Planning and building warrants are the sole responsibility of the customer.",
    ],
  },
  {
    id: "term-7",
    heading: "7. Customer-arranged installation",
    body: [
      "The customer may buy the products from the company and arrange their own installation. In this case, the gas engineer's installation fee shall be deducted from the overall price.",
    ],
  },
  {
    id: "term-8",
    heading: "8. Payment prior to delivery",
    body: [
      "The products must be paid for in full prior to delivery. Accepted payment methods are electronic bank transfer or credit or debit card.",
    ],
  },
  {
    id: "term-9",
    heading: "9. Self-employed gas engineers",
    body: [
      "The gas engineers are self-employed third parties. They are fully qualified Gas Safe registered engineers with their own insurance policies.",
    ],
  },
  {
    id: "term-10",
    heading: "10. Workmanship guarantee and liability scope",
    body: [
      "The gas engineers are solely responsible for their workmanship for a period of 12 months after the date of installation. Any complaints relating to their workmanship must be made directly to them. They will only guarantee the part of the system they installed. Any other parts of your system they never installed, they cannot take responsibility for, and neither can the company.",
      "The company and gas engineers shall not be liable for any existing damage or defects such as plasterwork, brickwork, rendering, painting, decoration, woodwork, finishing, fittings or furniture. The company and gas engineers shall not be bound to carry out or reinstate any decoration works inside or outside.",
    ],
  },
  {
    id: "term-11",
    heading: "11. Floor coverings",
    body: [
      "If the gas engineers are lifting any floor coverings to gain access for installation, they cannot guarantee relaying of the existing appearance or fit.",
    ],
  },
  {
    id: "term-12",
    heading: "12. Alternative issues",
    body: [
      "The company will not be responsible for any alternative issues that may arise due to the installation of your new products, such as electrical, plumbing or roofing.",
    ],
  },
  {
    id: "term-13",
    heading: "13. Payment to gas engineers",
    body: [
      "The customer is responsible for paying the gas engineers their fee directly upon completion of works agreed.",
    ],
  },
  {
    id: "term-14",
    heading: "14. Customer consent to commence",
    body: [
      "The customer hereby gives their consent that the company and gas engineers may commence organising the installation of your new products in this agreement as soon as the customer's emailed acceptance is received.",
    ],
  },
  {
    id: "term-15",
    heading: "15. Statutory rights",
    body: [
      "These terms and conditions of sale do not affect the customer's statutory rights under the Consumer Rights Act 2015.",
    ],
  },
];

const finalNotes: TermSection[] = [
  {
    id: "payment-cancellation-policy",
    heading: "Payment and cancellation policy",
    body: [
      "All payments are non-refundable if cancelled within 24 working hours of delivery or installation.",
    ],
  },
  {
    id: "disposal-policy",
    heading: "Disposal of old boilers and packaging",
    body: [
      "We do NOT dispose of old boilers, water tanks, boxes or rubbish. This is at the self-employed gas engineer's discretion.",
    ],
  },
];

const allSections: TermSection[] = [definitions, ...terms, ...finalNotes];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs)]} />

      <PageHero
        eyebrow="Terms & Conditions"
        h1="Terms and Conditions"
        highlightedWord="Terms"
        subtitle="The terms that apply to every product purchase and installation"
        description="A plain-English summary of the terms that apply when you book products or services through The East Kilbride Boiler Company. Read them alongside the quote you receive."
        breadcrumbs={breadcrumbs}
        primaryCtaLabel="Contact us"
        primaryCtaHref="/contact/"
      />

      <section className="bg-carbon-950 py-14 sm:py-20">
        <Container className="max-w-3xl">
          <div className="space-y-10">
            {allSections.map((section, index) => (
              <ScrollReveal
                key={section.id}
                delay={Math.min(index * 0.03, 0.28)}
              >
                <article
                  id={section.id}
                  className="rounded-2xl border border-carbon-700 bg-carbon-900/60 p-6 sm:p-8"
                >
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="mt-4 text-sm leading-relaxed text-carbon-200 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-carbon-200 sm:text-base">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint-500"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <p className="mt-10 text-sm text-carbon-400">
              Last updated {new Date().getFullYear()}. For any questions about
              these terms, contact us at{" "}
              <a
                href={`mailto:${siteSettings.email}`}
                className="font-semibold text-mint-400 hover:text-mint-300"
              >
                {siteSettings.email}
              </a>{" "}
              or on{" "}
              <a
                href={siteSettings.phoneHref}
                className="font-semibold text-mint-400 hover:text-mint-300"
              >
                {siteSettings.phone}
              </a>
              . You can also read our{" "}
              <Link
                href="/privacy/"
                className="font-semibold text-mint-400 hover:text-mint-300"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
