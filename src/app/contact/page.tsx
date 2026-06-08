import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/templates/PageHero";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LocalFAQSection } from "@/components/sections/LocalFAQSection";
import { SiloLinks } from "@/components/sections/SiloLinks";
import { TrustBadgesBar } from "@/components/sections/TrustBadgesBar";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
} from "@/lib/schemas";
import { siteSettings } from "@/data/siteSettings";
import type { PageInternalLink } from "@/data/pageContent";

export const metadata: Metadata = {
  title:
    "Contact The East Kilbride Boiler Company | Call 01355 204045 - Gas Safe engineers",
  description:
    "Contact The East Kilbride Boiler Company. Call 01355 204045 or get a 60-second fixed-price quote online. Local Gas Safe engineers serving all 35 G74 and G75 districts.",
  alternates: { canonical: "/contact/" },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact/" },
];

const contactFaqs = [
  {
    question: "What is the quickest way to get a quote?",
    answer:
      "The online quote form takes about 60 seconds and shows you the next available installation slot. If you would prefer to speak to a Gas Safe registered engineer, call 01355 204045 and we can usually give you an indicative fixed price on the phone the same day.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "Our phone line is monitored 24 hours a day, 365 days a year for boiler emergencies. Standard installations and bookings are confirmed during business hours.",
  },
  {
    question: "Do you cover emergency boiler call-outs at the weekend?",
    answer:
      "Yes. We aim for same-day emergency call-outs across G74 and G75 wherever availability allows, including weekends. Call 01355 204045 for the earliest slot we have.",
  },
  {
    question: "Where are you based?",
    answer: `Our address is ${siteSettings.address.street}, ${siteSettings.address.city}, ${siteSettings.address.postcode}. Visits are by appointment only - the team is usually out on installations during the day.`,
  },
  {
    question: "Can I verify the engineer's Gas Safe registration before booking?",
    answer:
      "Yes. We always recommend verifying any Gas Safe registered engineer before they start work. Each engineer's Gas Safe registration can be checked directly at gassaferegister.co.uk.",
  },
];

const contactLinks: PageInternalLink[] = [
  { label: "New Boiler Installation", href: "/services/new-boiler-installation/", group: "Services" },
  { label: "Boiler Repair", href: "/services/boiler-repair/", group: "Services" },
  { label: "Annual Boiler Service", href: "/services/boiler-servicing/", group: "Services" },
  { label: "Boiler Prices", href: "/boilers/", group: "Boilers" },
  { label: "G74 hub", href: "/areas-we-serve/g74/", group: "Areas" },
  { label: "G75 hub", href: "/areas-we-serve/g75/", group: "Areas" },
  { label: "All 35 East Kilbride districts", href: "/areas-we-serve/", group: "Areas" },
  { label: "About EKBC", href: "/about/", group: "Guides" },
  { label: "Frequently asked questions", href: "/faq/", group: "Guides" },
];

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact The East Kilbride Boiler Company",
  description:
    "Contact The East Kilbride Boiler Company. Call 01355 204045 or get a fixed-price quote online.",
  url: "https://www.eastkilbrideboilercompany.co.uk/contact/",
  mainEntity: {
    "@type": "Organization",
    name: siteSettings.businessName,
    telephone: siteSettings.phone,
    email: siteSettings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSettings.address.street,
      addressLocality: siteSettings.address.city,
      addressRegion: siteSettings.address.region,
      postalCode: siteSettings.address.postcode,
      addressCountry: "GB",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          contactPageSchema,
          breadcrumbSchema(breadcrumbs),
          faqSchema(contactFaqs.map((f) => ({ ...f, pageTypes: [] }))),
        ]}
      />

      <PageHero
        eyebrow="Contact EKBC"
        h1="Contact The East Kilbride Boiler Company"
        highlightedWord="Contact"
        subtitle="01355 204045 - Gas Safe engineers, no middle man"
        description="Call us, email us, or use the 60-second quote form below. The same Gas Safe engineers cover every G74 and G75 postcode across East Kilbride, with no extra travel charge for any district."
        trustPoints={[
          "01355 204045",
          "Gas Safe engineers",
          "Local to East Kilbride",
          "60-second quote form",
        ]}
        breadcrumbs={breadcrumbs}
        primaryCtaLabel="Use the quote form"
        primaryCtaHref="#quote-form"
      />

      <TrustBadgesBar />

      <section className="bg-carbon-950 py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4">
              <ScrollReveal direction="left">
                <a
                  href={siteSettings.phoneHref}
                  className="hover-card flex items-center gap-4 rounded-2xl border border-mint-500/30 bg-carbon-900 p-5 sm:p-6 transition-colors hover:border-mint-500/60 glow-mint"
                  aria-label={`Call ${siteSettings.phone}`}
                >
                  <span className="hover-icon-glow flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-mint-500/40 bg-carbon-950">
                    <Phone className="h-6 w-6 text-mint-500" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-mint-400">
                      Free phone
                    </span>
                    <span className="block text-xl font-extrabold text-white sm:text-2xl">
                      {siteSettings.phone}
                    </span>
                    <span className="block text-xs text-carbon-400">
                      Open 24/7 365 days a year for boiler emergencies
                    </span>
                  </span>
                </a>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.05}>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="hover-card flex items-center gap-4 rounded-2xl border border-carbon-700 bg-carbon-900 p-5 sm:p-6 transition-colors hover:border-mint-500/40"
                >
                  <span className="hover-icon-glow flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-mint-500/40 bg-carbon-950">
                    <Mail className="h-6 w-6 text-mint-500" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-mint-400">
                      Email
                    </span>
                    <span className="block break-all text-base font-bold text-white sm:text-lg">
                      {siteSettings.email}
                    </span>
                    <span className="block text-xs text-carbon-400">
                      Replies usually within the same business day
                    </span>
                  </span>
                </a>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.1}>
                <div className="rounded-2xl border border-carbon-700 bg-carbon-900 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="hover-icon-glow flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-mint-500/40 bg-carbon-950">
                      <MapPin className="h-6 w-6 text-mint-500" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-mint-400">
                        Address
                      </p>
                      <address className="mt-1 not-italic text-base font-bold text-white">
                        {siteSettings.address.street}
                        <br />
                        {siteSettings.address.city}, {siteSettings.address.region}
                        <br />
                        {siteSettings.address.postcode}
                      </address>
                      <p className="mt-1 text-xs text-carbon-400">
                        By appointment only. Engineers are usually out on installations during the day.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.15}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-carbon-700 bg-carbon-900 p-5">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 shrink-0 text-mint-500" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-mint-400">
                          Hours
                        </p>
                        <p className="mt-1 text-sm font-bold text-white">
                          24/7 emergency line
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-carbon-300">
                          Standard bookings confirmed during business hours.
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://www.gassaferegister.co.uk"
                    rel="nofollow noopener"
                    target="_blank"
                    className="rounded-2xl border border-carbon-700 bg-carbon-900 p-5 transition-colors hover:border-mint-500/40"
                  >
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 shrink-0 text-mint-500" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-mint-400">
                          Verify us
                        </p>
                        <p className="mt-1 text-sm font-bold text-white">
                          Gas Safe Register
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-carbon-300">
                          Check each engineer's Gas Safe registration before any gas work.
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.2}>
                <div className="rounded-2xl border border-carbon-700 bg-carbon-900 p-5 sm:p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-mint-400">
                    Service area
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-carbon-200">
                    We cover every G74 and G75 postcode across all{" "}
                    {siteSettings.areasServed} East Kilbride districts. There is no extra travel charge for any address inside our service area.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href="/areas-we-serve/g74/"
                      className="inline-flex items-center gap-1 rounded-full border border-mint-500/40 bg-carbon-950 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-mint-400 hover:bg-mint-500/10"
                    >
                      G74 hub
                    </Link>
                    <Link
                      href="/areas-we-serve/g75/"
                      className="inline-flex items-center gap-1 rounded-full border border-mint-500/40 bg-carbon-950 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-mint-400 hover:bg-mint-500/10"
                    >
                      G75 hub
                    </Link>
                    <Link
                      href="/areas-we-serve/"
                      className="inline-flex items-center gap-1 rounded-full border border-carbon-700 bg-carbon-950 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white hover:border-mint-500/40 hover:text-mint-400"
                    >
                      All 35 districts
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right">
              <div id="quote-form" className="scroll-mt-32">
                <QuoteForm />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <LocalFAQSection
        eyebrow="Contact FAQs"
        heading="Quick questions before you get in touch"
        intro="The most common questions homeowners ask when reaching out for the first time."
        faqs={contactFaqs}
      />

      <SiloLinks
        eyebrow="Continue from Contact"
        heading="Pick a service, a brand or a postcode hub"
        intro="Every page on this site is internally linked. Pick the route that matches what you are looking for."
        links={contactLinks}
      />

      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
