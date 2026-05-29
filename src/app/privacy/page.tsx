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
    "Privacy Policy | The East Kilbride Boiler Company",
  description:
    "Privacy policy for The East Kilbride Boiler Company. What data we collect from quote forms and calls, why we hold it, how long we keep it and your UK GDPR rights.",
  alternates: { canonical: "/privacy/" },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Privacy", href: "/privacy/" },
];

const sections = [
  {
    id: "who-we-are",
    heading: "Who we are",
    body: [
      `${siteSettings.businessName} ("we", "us", "our") is a local boiler installation, repair and servicing company based at ${siteSettings.address.street}, ${siteSettings.address.city}, ${siteSettings.address.postcode}. We are the data controller for the personal information described in this policy.`,
      `For any questions about your data or this policy, contact us at ${siteSettings.email} or on ${siteSettings.phone}.`,
    ],
  },
  {
    id: "what-we-collect",
    heading: "What data we collect",
    body: [
      "We collect only the information you provide when you ask us for a quote, request a call-out, or contact us about a service. Specifically:",
    ],
    bullets: [
      "Your name",
      "Your phone number",
      "Your email address",
      "Your postcode and district within East Kilbride",
      "The type of boiler job you are asking about (installation, repair, servicing, advice)",
      "Any optional message you choose to include",
    ],
  },
  {
    id: "why-we-hold-it",
    heading: "Why we hold it",
    body: [
      "We hold this information for one reason: to respond to your enquiry and, if you become a customer, to deliver the service you have asked for. Under UK GDPR our lawful bases are legitimate interest (responding to a quote you have asked for) and contract (delivering the booked service).",
      "We do not sell your data, share it with third-party marketers, or use it for advertising.",
    ],
  },
  {
    id: "how-long",
    heading: "How long we keep it",
    body: [
      "Quote requests that do not become bookings are deleted within 12 months. Records relating to completed installations, repairs and services are kept for 7 years after the job is complete, in line with UK accounting and trading standards requirements. Manufacturer warranty paperwork may be held for the duration of the warranty.",
    ],
  },
  {
    id: "third-parties",
    heading: "Third parties we work with",
    body: [
      "We use a small number of third parties to run the business. Each has their own privacy and data handling responsibilities:",
    ],
    bullets: [
      "Klarna, our third-party payment provider for boiler repair call-out fees and annual servicing fees only. Klarna receives only the data needed to process that specific payment. Klarna is not used for new boiler installations.",
      "Our hosting provider, which stores the website and the data submitted through forms in an encrypted database.",
      "Our email provider, which receives quote requests at info@eastkilbrideboilercompany.co.uk so we can reply to you.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies",
    body: [
      "This website uses only the minimum cookies needed to make the site work, such as a session cookie when you use the quote form. We do not use third-party advertising or behavioural tracking cookies.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights under UK GDPR",
    body: [
      "You have the right to:",
    ],
    bullets: [
      "Ask for a copy of the personal data we hold about you",
      "Ask us to correct anything that is wrong",
      "Ask us to delete your data, where we are not required to keep it for a legal reason",
      "Withdraw any consent you have given",
      "Object to our use of your data",
      "Make a complaint to the Information Commissioner's Office (ICO) at ico.org.uk",
    ],
  },
  {
    id: "contact",
    heading: "Contact us about your data",
    body: [
      `If you want to make a request about your personal data, contact us at ${siteSettings.email} or on ${siteSettings.phone}. We will respond within 30 days, and usually much sooner.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs)]} />

      <PageHero
        eyebrow="Privacy"
        h1="Privacy Policy"
        highlightedWord="Privacy"
        subtitle="How we handle the data you share with us"
        description="A plain-English summary of what we collect, why we hold it, how long we keep it and what your rights are under UK GDPR."
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
                  {section.bullets && (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-carbon-200 sm:text-base">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint-500"
                          />
                          <span>{b}</span>
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
              Last updated {new Date().getFullYear()}. You can also read our{" "}
              <Link
                href="/terms/"
                className="font-semibold text-mint-400 hover:text-mint-300"
              >
                Terms and Conditions
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
