import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  MapPin,
  Wrench,
  Users,
  Award,
  Clock,
  Star,
} from "lucide-react";
import { PageHero } from "@/components/templates/PageHero";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LocalFAQSection } from "@/components/sections/LocalFAQSection";
import { SiloLinks } from "@/components/sections/SiloLinks";
import { TrustBadgesBar } from "@/components/sections/TrustBadgesBar";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { BottomQuoteSection } from "@/components/sections/BottomQuoteSection";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
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
    "About The East Kilbride Boiler Company | EKBC - Local Gas Safe Experts",
  description:
    "About The East Kilbride Boiler Company. Local Gas Safe Experts serving all 35 East Kilbride districts since 2017. No middle man, fixed prices, manufacturer warranties.",
  alternates: { canonical: "/about/" },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/" },
];

const aboutFaqs = [
  {
    question: "How long has The East Kilbride Boiler Company been trading?",
    answer: `We have been fitting, repairing and servicing boilers across East Kilbride since ${siteSettings.establishedYear}. Our Gas Safe Experts bring more than 20 years of combined trade experience to every job.`,
  },
  {
    question: "Are your engineers Gas Safe registered?",
    answer:
      "Yes. All gas work at EKBC is carried out by our own Gas Safe Experts. Every engineer carries a Gas Safe ID card and our registration can be verified directly at gassaferegister.co.uk before any work begins.",
  },
  {
    question: "Do you sub-contract installations or use national lead companies?",
    answer:
      "No. There is no middle man between you and the engineer. The person who quotes the job is the person standing on the doorstep on installation day, and the manufacturer warranty is registered in your name on the day.",
  },
  {
    question: "How many East Kilbride districts do you cover?",
    answer: `We cover all ${siteSettings.areasServed} districts of East Kilbride across G74 and G75 as part of our standard service area. There is no extra travel charge for any East Kilbride postcode.`,
  },
  {
    question: "Are you insured?",
    answer:
      "Yes. We carry full public liability insurance on every job, in addition to the standard Gas Safe registration that is legally required for all gas work in the UK.",
  },
];

const aboutLinks: PageInternalLink[] = [
  { label: "New Boiler Installation", href: "/services/new-boiler-installation/", group: "Services" },
  { label: "Boiler Repair", href: "/services/boiler-repair/", group: "Services" },
  { label: "Annual Boiler Service", href: "/services/boiler-servicing/", group: "Services" },
  { label: "Boiler Prices", href: "/boilers/", group: "Boilers" },
  { label: "G74 hub", href: "/areas-we-serve/g74/", group: "Areas" },
  { label: "G75 hub", href: "/areas-we-serve/g75/", group: "Areas" },
  { label: "All 35 East Kilbride districts", href: "/areas-we-serve/", group: "Areas" },
  { label: "Contact us", href: "/contact/", group: "Guides" },
  { label: "Frequently asked questions", href: "/faq/", group: "Guides" },
];

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${siteSettings.businessName}`,
  description:
    "About The East Kilbride Boiler Company. Local Gas Safe Experts serving all 35 East Kilbride districts.",
  url: `https://www.eastkilbrideboilercompany.co.uk/about/`,
  mainEntity: {
    "@type": "Organization",
    name: siteSettings.businessName,
    foundingDate: String(siteSettings.establishedYear),
    areaServed: ["G74", "G75", "East Kilbride"],
    telephone: siteSettings.phone,
    email: siteSettings.email,
  },
};

const stats = [
  {
    icon: Users,
    value: siteSettings.happyCustomers,
    label: "Happy East Kilbride homeowners",
  },
  {
    icon: MapPin,
    value: `${siteSettings.areasServed}`,
    label: "G74 and G75 districts covered",
  },
  {
    icon: Star,
    value: `${siteSettings.averageRating} / 5`,
    label: `Average review rating from ${siteSettings.reviewCount} customers`,
  },
  {
    icon: Clock,
    value: `${new Date().getFullYear() - siteSettings.establishedYear}+ years`,
    label: "Fitting boilers across East Kilbride",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Gas Safe Experts",
    body: "Every gas job is carried out by our own Gas Safe Experts. Our registration can be verified directly at gassaferegister.co.uk before any work begins.",
  },
  {
    icon: Wrench,
    title: "No middle man",
    body: "We are a local East Kilbride company, not a national lead-buying machine. The person who quotes the job is the person standing on the doorstep on installation day.",
  },
  {
    icon: Award,
    title: "Fixed price, no surprises",
    body: "The price you see on the quote is the price you pay. No separate call-out fees, no day-rate add-ons, and no finance products clipped onto an installation.",
  },
  {
    icon: MapPin,
    title: "Local to East Kilbride",
    body: `Based locally and serving every G74 and G75 postcode across all ${siteSettings.areasServed} districts. There is no extra travel charge for any East Kilbride address.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          aboutPageSchema,
          breadcrumbSchema(breadcrumbs),
          faqSchema(aboutFaqs.map((f) => ({ ...f, pageTypes: [] }))),
        ]}
      />

      <PageHero
        eyebrow="About EKBC"
        h1="The East Kilbride Boiler Company"
        highlightedWord="East Kilbride"
        subtitle="Local Gas Safe Experts since 2017"
        description={`We are a local East Kilbride boiler company with our own Gas Safe Experts, covering all ${siteSettings.areasServed} G74 and G75 districts. Fixed-price installations, same-day repair call-outs and annual servicing for ${siteSettings.happyCustomers} East Kilbride homeowners and counting.`}
        trustPoints={[
          "Gas Safe Experts",
          `${siteSettings.happyCustomers} customers`,
          `${siteSettings.areasServed} districts covered`,
          "Fully insured",
        ]}
        breadcrumbs={breadcrumbs}
        primaryCtaLabel="Get a fixed price quote"
      />

      <TrustBadgesBar />

      <section className="bg-carbon-950 py-14 sm:py-20">
        <Container className="max-w-3xl">
          <ScrollReveal>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
              Our story
            </p>
            <h2 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
              A local boiler company built for East Kilbride homes
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-carbon-200">
              We started The East Kilbride Boiler Company in {siteSettings.establishedYear} because the local boiler trade was full of national lead-buying outfits pretending to be local, hidden call-out fees on installations, and quote surprises on the day of fit. We thought East Kilbride homeowners deserved better, so we set up a local company with our own Gas Safe Experts, our own fixed-price model, and our own van on every job.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-carbon-200">
              Since then we have fitted, repaired and serviced thousands of boilers across every G74 and G75 district. From The Murray to Stewartfield, Calderwood to Greenhills, our engineers know the housing stock, the typical pipework runs and the brands that suit each street. That local knowledge is the difference between a quote that holds and one that creeps on the day.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-carbon-200">
              Today we serve more than {siteSettings.happyCustomers} East Kilbride homeowners with fixed-price installations from £1,299, same-day repair call-outs and warranty-friendly annual servicing. We are not chasing any other market - East Kilbride is home, and it is the only place we work.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-carbon-900 py-14 sm:py-20">
        <Container>
          <ScrollReveal>
            <header className="max-w-3xl">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
                EKBC in numbers
              </p>
              <h2 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
                Local, busy, and built on word of mouth
              </h2>
            </header>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <ScrollReveal key={stat.label}>
                  <div className="hover-card h-full rounded-2xl border border-carbon-700 bg-carbon-950 p-5">
                    <div className="hover-icon-glow inline-flex h-10 w-10 items-center justify-center rounded-lg border border-mint-500/40 bg-carbon-900">
                      <Icon className="h-4 w-4 text-mint-500" />
                    </div>
                    <p className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-carbon-300">
                      {stat.label}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-carbon-950 py-14 sm:py-20">
        <Container>
          <ScrollReveal>
            <header className="max-w-3xl">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
                What you can rely on
              </p>
              <h2 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
                Why East Kilbride homeowners pick EKBC
              </h2>
            </header>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((v, index) => {
              const Icon = v.icon;
              return (
                <ScrollReveal key={v.title} delay={Math.min(index * 0.05, 0.3)}>
                  <article className="hover-card h-full rounded-2xl border border-carbon-700 bg-carbon-900 p-6 sm:p-7">
                    <div className="hover-icon-glow inline-flex h-11 w-11 items-center justify-center rounded-xl border border-mint-500/40 bg-carbon-950">
                      <Icon className="h-5 w-5 text-mint-500" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-white sm:text-xl">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-carbon-300 sm:text-base">
                      {v.body}
                    </p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-carbon-900 py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <ScrollReveal>
              <article className="hover-card h-full rounded-2xl border border-carbon-700 bg-carbon-950 p-6">
                <h3 className="text-lg font-bold text-white">
                  New boiler installation
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon-300">
                  Fixed-price from £1,299. Worcester Bosch, Ideal, Vokera and Navien fitted by our Gas Safe Experts. Free wireless thermostat and full system flush included as standard.
                </p>
                <Link
                  href="/services/new-boiler-installation/"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mint-500 hover:text-mint-400"
                >
                  Installation page
                </Link>
              </article>
            </ScrollReveal>
            <ScrollReveal>
              <article className="hover-card h-full rounded-2xl border border-carbon-700 bg-carbon-950 p-6">
                <h3 className="text-lg font-bold text-white">Boiler repair</h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon-300">
                  Same-day call-out across G74 and G75. Common spares carried on the van. Klarna 3-month interest-free is available exclusively on repair call-outs.
                </p>
                <Link
                  href="/services/boiler-repair/"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mint-500 hover:text-mint-400"
                >
                  Repair page
                </Link>
              </article>
            </ScrollReveal>
            <ScrollReveal>
              <article className="hover-card h-full rounded-2xl border border-carbon-700 bg-carbon-950 p-6">
                <h3 className="text-lg font-bold text-white">Annual servicing</h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon-300">
                  Annual gas safety check, flue gas analysis, pressure check and warranty-friendly service logged on the day. Klarna 3-month interest-free available on servicing.
                </p>
                <Link
                  href="/services/boiler-servicing/"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mint-500 hover:text-mint-400"
                >
                  Servicing page
                </Link>
              </article>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <ReviewsCarousel />

      <LocalFAQSection
        eyebrow="About EKBC FAQs"
        heading="Common questions about the company"
        intro="The questions East Kilbride homeowners ask before booking a quote."
        faqs={aboutFaqs}
      />

      <SiloLinks
        eyebrow="Continue from About"
        heading="Pick a service, a brand or a postcode hub"
        intro="Every page on this site is internally linked. Pick the route that matches what you are looking for."
        links={aboutLinks}
      />

      <BottomQuoteSection />

      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
