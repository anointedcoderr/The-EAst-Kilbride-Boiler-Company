import type { Metadata } from "next";
import Image from "next/image";
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
    "About The East Kilbride Boiler Company. East Kilbride's NO:1 boiler company and your local Gas Safe Experts, covering all G74 and G75 postcodes since 2017.",
  alternates: { canonical: "/about/" },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/" },
];

const aboutFaqs = [
  {
    question: "How long has The East Kilbride Boiler Company been trading?",
    answer: `We have been fitting, repairing and servicing boilers across East Kilbride since ${siteSettings.establishedYear}. Our pool of self-employed Gas Safe Experts bring more than 20 years of combined trade experience to every job.`,
  },
  {
    question: "Are the engineers Gas Safe registered?",
    answer:
      "Yes. All gas work at EKBC is carried out by our pool of self-employed Gas Safe Experts. Every engineer carries a Gas Safe ID card that can be verified directly at gassaferegister.co.uk.",
  },
  {
    question: "How many East Kilbride districts do you cover?",
    answer: `We cover all ${siteSettings.areasServed} districts of East Kilbride across G74 and G75 as part of our standard service area. There is no extra travel charge for any East Kilbride postcode.`,
  },
  {
    question: "Are the gas engineers insured?",
    answer:
      "Yes. Our pool of self-employed gas engineers all carry their own full public liability insurance, in addition to the Gas Safe registration that is legally required for all gas work in the UK.",
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
    "About The East Kilbride Boiler Company. East Kilbride's NO:1 boiler company and your local Gas Safe Experts.",
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
    body: "Every gas job is carried out by our pool of self-employed Gas Safe Experts. Their registration can be verified directly at gassaferegister.co.uk before any work begins.",
  },
  {
    icon: Wrench,
    title: "No middle man",
    body: "We are a local East Kilbride company, not a national lead-buying machine or a company from somewhere outside of East Kilbride pretending to be knowledgeable about the local area.",
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
        subtitle="Your local Gas Safe Experts since 2017"
        description="We are East Kilbride's NO:1 boiler company and your local Gas Safe Experts, covering all G74 and G75 postcodes. Fixed-price boiler installations, emergency repair call-outs and annual servicing for all East Kilbride homeowners and landlords."
        trustPoints={[
          "Gas Safe Experts",
          `${siteSettings.happyCustomers} customers`,
          `${siteSettings.areasServed} districts covered`,
          "Self-employed engineers insured",
        ]}
        breadcrumbs={breadcrumbs}
        primaryCtaLabel="Get a fixed price quote"
      />

      <TrustBadgesBar />

      <section className="bg-carbon-900 py-10 sm:py-14">
        <Container>
          <ScrollReveal>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-carbon-700">
              <Image
                src="/images/hero-engineer.jpg"
                alt="Gas Safe engineer in front of The East Kilbride Boiler Company branded van"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-carbon-950/60 via-transparent to-transparent"
              />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-carbon-950 py-14 sm:py-20">
        <Container className="max-w-3xl">
          <ScrollReveal>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
              Our story
            </p>
            <h2 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
              How we became East Kilbride&apos;s favourite boiler replacement company
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-carbon-200">
              We started The East Kilbride Boiler Company in {siteSettings.establishedYear} because the local boiler trade was full of either national lead-buying outfits pretending to be local, hidden call-out fees on installations, and quote surprises on the day of fit, or one-man bands that let customers down and left warranties that were not worth the paper they were written on. We thought East Kilbride homeowners deserved better, so we set up a local company with our own pool of Gas Safe Experts, our own fixed-price online model, and our own award-winning customer service.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-carbon-200">
              Since then, we have installed, repaired and serviced thousands of boilers across every G74 and G75 postcode. From The Murray to Stewartfield, Calderwood to Greenhills, our pool of Gas Safe Experts know the local properties well, with experience across East Kilbride streets and home types. That local knowledge is the difference between a fixed price quote that is clear from the start and one that creeps up on the day because another company has less experience working in East Kilbride homes.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-carbon-200">
              Today, we serve more than 80,000 East Kilbride homeowners with fixed-price installations from £1,299, emergency repair call-outs and warranty-friendly annual servicing. We are not chasing any other market. East Kilbride is our home, and it is the only place we work. We are here to serve the hard-working people of East Kilbride and offer the very best unbeatable new boiler prices.
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
                  Fixed-price from £1,299. Worcester Bosch, Ideal, Vokera and Navien fitted by our pool of self-employed Gas Safe Experts. Free wireless thermostat and full system flush included as standard.
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
