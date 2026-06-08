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
  title:
    "Terms and Conditions | The East Kilbride Boiler Company",
  description:
    "Terms and conditions for boiler installation, repair and servicing quotes booked with The East Kilbride Boiler Company. Fixed-price model, warranty, Gas Safe and Klarna terms.",
  alternates: { canonical: "/terms/" },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Terms & Conditions", href: "/terms/" },
];

const sections = [
  {
    id: "who-we-are",
    heading: "About us",
    body: [
      `${siteSettings.businessName} is a local boiler installation, repair and servicing company based at ${siteSettings.address.street}, ${siteSettings.address.city}, ${siteSettings.address.postcode}. The Gas Safe engineers we work with each hold their own Gas Safe registration and public liability insurance. Each engineer's registration can be verified directly at gassaferegister.co.uk before any work begins.`,
    ],
  },
  {
    id: "quotes",
    heading: "Quotes",
    body: [
      "Quotes shown on the website and given on the phone are indicative until we have reviewed the photos and details you send us. After we review your photos and details we issue a single fixed-price quote which is the figure you pay for the work described.",
      "The figure on the quote includes the boiler, parts, labour, VAT, a free wireless thermostat, a full system flush, standard pipework and flue, and removal of the old boiler. Anything outside that scope is itemised separately before any work goes ahead.",
    ],
  },
  {
    id: "fixed-price-installation",
    heading: "Fixed-price installation",
    body: [
      "New boiler installations are quoted at a single fixed price. There are no separate call-out fees, no hourly or day-rate add-ons, and no finance products clipped onto the install. The quote is the total cost of the agreed work.",
      "If unforeseen issues are discovered once work has started (for example, hidden pipework problems behind walls) we will stop, explain the issue, and quote any additional work before proceeding. You are free to accept or decline any additional work.",
    ],
  },
  {
    id: "warranty",
    heading: "Warranty",
    body: [
      "Every installation comes with the manufacturer warranty for the boiler model fitted. Worcester Bosch, Ideal and Vokera carry a 5-year warranty as standard. Navien carries a 10-year warranty as standard.",
      "All manufacturer warranties require the boiler to be serviced annually by a Gas Safe registered engineer. We can carry out the annual service, or you can use another Gas Safe registered engineer. Failure to service the boiler annually will invalidate the warranty.",
    ],
  },
  {
    id: "payment",
    heading: "Payment",
    body: [
      "Payment for new boiler installations is taken on completion of the job, after the engineer has commissioned the boiler and demonstrated the wireless thermostat to you. We accept all major credit and debit cards.",
      "Klarna 3-month interest-free is available exclusively on boiler repair call-out fees and annual boiler service fees. Klarna is not available on new boiler installations.",
    ],
  },
  {
    id: "service-area",
    heading: "Service area",
    body: [
      "Our standard service area covers all 35 East Kilbride districts across the G74 and G75 postcodes. There is no extra travel charge for any East Kilbride postcode. Quotes for properties outside East Kilbride may be subject to travel.",
    ],
  },
  {
    id: "cancellations",
    heading: "Cancellations and rescheduling",
    body: [
      "You may cancel or reschedule a booked installation at any time up to 48 hours before the agreed start date at no charge. Cancellations made inside 48 hours of the start date may incur a fee to cover engineer time already committed.",
      "If we need to reschedule due to weather, parts delays, or engineer availability, we will give you the earliest alternative slot at no extra cost.",
    ],
  },
  {
    id: "gas-safety",
    heading: "Gas safety",
    body: [
      "All gas work is carried out by Gas Safe registered engineers in accordance with the Gas Safety (Installation and Use) Regulations. If you have any concerns about gas safety at your property, leave the property, turn off the gas at the meter if it is safe to do so, and call the National Gas Emergency Service on 0800 111 999. After that, call us on 01355 204045.",
    ],
  },
  {
    id: "liability",
    heading: "Liability and insurance",
    body: [
      "We carry full public liability insurance on every job. Our liability for any single installation is limited to the value of the work carried out except where wider liability applies by law (for example, in cases of personal injury caused by negligence).",
    ],
  },
  {
    id: "governing-law",
    heading: "Governing law",
    body: [
      "These terms are governed by the law of Scotland and the courts of Scotland have exclusive jurisdiction over any disputes.",
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    body: [
      `For any questions about these terms, contact us at ${siteSettings.email} or on ${siteSettings.phone}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs)]} />

      <PageHero
        eyebrow="Terms & Conditions"
        h1="Terms and Conditions"
        highlightedWord="Terms"
        subtitle="The terms that apply to every quote, install, repair and service"
        description="A plain-English summary of the terms that apply when you ask us for a quote or book a job. Read them alongside the quote you receive."
        breadcrumbs={breadcrumbs}
        primaryCtaLabel="Contact us"
        primaryCtaHref="/contact/"
      />

      <section className="bg-carbon-950 py-14 sm:py-20">
        <Container className="max-w-3xl">
          <div className="space-y-10">
            {sections.map((section, index) => (
              <ScrollReveal
                key={section.id}
                delay={Math.min(index * 0.04, 0.28)}
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
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <p className="mt-10 text-sm text-carbon-400">
              Last updated {new Date().getFullYear()}. You can also read our{" "}
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
