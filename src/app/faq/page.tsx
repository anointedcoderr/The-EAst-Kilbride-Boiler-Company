import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { TrustBadgesBar } from "@/components/sections/TrustBadgesBar";
import { SiloLinks } from "@/components/sections/SiloLinks";
import { BottomQuoteSection } from "@/components/sections/BottomQuoteSection";
import { CTABanner, NeedBoilerCTA } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schemas";
import { FaqCategorised, type FaqCategory } from "./FaqCategorised";
import type { PageInternalLink } from "@/data/pageContent";

export const metadata: Metadata = {
  title:
    "Boiler FAQs East Kilbride | EKBC - Installation, Repair, Servicing, Prices",
  description:
    "Boiler FAQs for East Kilbride homeowners. Installation, repair, servicing, prices, brands, areas covered, Gas Safe and payment questions answered by our local Gas Safe engineers.",
  alternates: { canonical: "/faq/" },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "FAQ", href: "/faq/" },
];

const faqCategories: FaqCategory[] = [
  {
    id: "installation",
    label: "Boiler installation",
    intro:
      "New boiler installations across all 35 East Kilbride districts. Fixed-price quotes, no separate call-out fee, Gas Safe engineers on every fit.",
    faqs: [
      {
        question:
          "How much does a new boiler installation cost in East Kilbride?",
        answer:
          "Fitted combi boiler installations in East Kilbride start from £1,299. Vokera is £1,299 fitted, Ideal from £1,495, Worcester Bosch from £1,695 and Navien from £1,835. Every price includes installation, parts, labour, VAT, a free wireless thermostat and a full system flush.",
      },
      {
        question: "How long does a boiler installation take?",
        answer:
          "Most straightforward combi swaps are completed in a single day. Back-boiler conversions, full system changeovers and boiler relocations usually run between one and a half and two and a half days. We confirm the exact timing on your fixed quote.",
      },
      {
        question: "Do you offer fixed-price quotes for installations?",
        answer:
          "Yes. Once we review the photos and details you send us, we issue a single fixed price covering the boiler, all parts, labour, VAT, the wireless thermostat and the full system flush. The figure on the quote is the figure you pay - no surprise costs once work begins.",
      },
      {
        question: "Do you dispose of the old boiler?",
        answer:
          "Old boiler and packaging disposal can be discussed with the nominated gas engineer and is at their discretion. Our Terms cover the disposal policy in full.",
      },
      {
        question: "Will you need to replace my radiators as well?",
        answer:
          "Usually not. When you send us photos and details we check the existing radiators and pipework for sludge, output and condition. Most East Kilbride homes can keep their existing radiators with a new A-rated combi, helped by the full system flush included as standard.",
      },
      {
        question: "Can you replace an old back boiler with a combi boiler?",
        answer:
          "Yes. Back boiler removal and combi conversion is a routine job across older East Kilbride properties. We remove the back boiler safely, fit a new wall-hung combi, run any new pipework needed, flush the system and remove the old tank in the loft as part of the fixed price.",
      },
      {
        question: "How quickly can you fit a new boiler?",
        answer:
          "Most installations are booked within the same week as the quote. For urgent failures we can usually fit a replacement inside a few working days.",
      },
    ],
  },
  {
    id: "repair",
    label: "Boiler repair",
    intro:
      "Same-day boiler repair call-outs across G74 and G75. Common spares carried on the van so many faults are fixed at the first visit.",
    faqs: [
      {
        question: "Do you offer boiler repair in East Kilbride?",
        answer:
          "Yes. We provide boiler repair across all 35 East Kilbride districts. Most call-outs are diagnosed, quoted and resolved on the same visit wherever parts and access allow.",
      },
      {
        question: "What common boiler faults do you fix?",
        answer:
          "Pressure that keeps dropping, no hot water, no heating, intermittent heating, kettling and banging noises, error codes on the display, frozen condensate pipes in cold spells, frequent boiler lockouts and leaks from the casing. If you are not sure, call us and describe the symptoms.",
      },
      {
        question: "How fast can I arrange a boiler repair call-out?",
        answer:
          "We aim for same-day call-out for urgent boiler repairs across East Kilbride wherever availability allows. Call 01355 204045 for the earliest slot we have.",
      },
      {
        question: "Should I repair or replace my boiler?",
        answer:
          "As a rough guide, if the boiler is over 12 years old, has needed three or four repairs in the last 18 months, or is no longer A-rated, a replacement usually works out cheaper across the next few years. The Gas Safe engineers we work with give you both options at the visit with no pressure either way.",
      },
      {
        question: "What should I do if my boiler stops working?",
        answer:
          "Check the basics: pressure between 1 and 1.5 bar when cold, gas supply on, thermostat calling for heat, condensate pipe not frozen. If everything looks normal, do not keep resetting it. Call us so we can diagnose the underlying fault safely.",
      },
      {
        question: "What should I do if I smell gas?",
        answer:
          "Do not switch any electrical items on or off, including light switches. Open windows, turn the gas off at the meter if it is safe to do so, leave the property and call the National Gas Emergency Service on 0800 111 999. After that, call us on 01355 204045 to arrange the follow-up repair.",
      },
    ],
  },
  {
    id: "servicing",
    label: "Annual servicing",
    intro:
      "Annual boiler servicing to keep the manufacturer warranty valid and the system running safely.",
    faqs: [
      {
        question: "How often should I service my boiler?",
        answer:
          "Once a year. Most boiler manufacturers require an annual service to keep the warranty valid, and the same schedule is recommended by Gas Safe for any household running a gas boiler. Landlords are required by law to arrange an annual gas safety check.",
      },
      {
        question: "What is included in an annual boiler service?",
        answer:
          "A full visual inspection, flue gas analysis, pressure check, inspection of seals, electrodes, heat exchanger and safety devices, plus a clean of any condensate build-up. We confirm gas tightness and the carbon monoxide reading. You receive a digital service report for your records and warranty.",
      },
      {
        question: "Can a boiler service help protect my warranty?",
        answer:
          "Yes. Worcester Bosch, Ideal, Vokera, Navien and most other manufacturers require an annual service from a Gas Safe registered engineer to keep the warranty valid. We log the service on the day so the manufacturer record is up to date.",
      },
      {
        question: "How long does a boiler service take?",
        answer:
          "A typical annual boiler service takes around 45 minutes. If we spot something that needs attention we will explain it on the day and give you a fixed price before any work goes ahead.",
      },
      {
        question: "Why should I service my boiler annually?",
        answer:
          "An annual service keeps the boiler running efficiently, supports the manufacturer warranty and protects your family by checking flue, combustion and carbon monoxide. It also catches small faults early, before they become a winter breakdown.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Prices & quotes",
    intro:
      "Fitted boiler prices, what is included, and how the quote process works.",
    faqs: [
      {
        question: "Are your prices fixed?",
        answer:
          "Yes. The price you see on the quote is the price you pay. There are no separate call-out fees, no hidden parts charges and no day-rate add-ons. If the property has unusual requirements we tell you up front before any work begins.",
      },
      {
        question: "What is included in the boiler installation price?",
        answer:
          "The boiler, fitting by Gas Safe engineers, all standard pipework, the manufacturer warranty, a free wireless thermostat, a full system flush, all materials, labour and VAT.",
      },
      {
        question: "Why do boiler prices vary?",
        answer:
          "Prices vary by brand, output size, warranty length, flue position and any extra work the property needs. A like-for-like combi swap is usually the cheapest option. Moving the boiler, removing a back boiler or converting from a system or regular boiler costs a bit more.",
      },
      {
        question: "How quickly can I get a quote?",
        answer:
          "The online quote form takes about 60 seconds. If you prefer to talk it through, call 01355 204045 and our team can usually give an indicative fixed price on the phone the same day.",
      },
      {
        question: "Can I request a custom quote?",
        answer:
          "Yes. Use the online quote form or call 01355 204045. We confirm the fixed price after an online photo review, so the figure you see is the figure you pay.",
      },
    ],
  },
  {
    id: "brands",
    label: "Boiler brands",
    intro:
      "We fit Worcester Bosch, Ideal, Vokera and Navien combi boilers across East Kilbride.",
    faqs: [
      {
        question:
          "Which boiler brands do you install in East Kilbride?",
        answer:
          "We install Worcester Bosch, Ideal, Vokera and Navien combi boilers. Each comes with a manufacturer warranty, a free wireless thermostat and a free system flush included as standard.",
      },
      {
        question:
          "Which boiler is best for a 1 or 2 bed home in East Kilbride?",
        answer:
          "Vokera at £1,299 with a 5-year warranty is our best-value fit for one-bathroom flats and smaller terraced homes. Ideal at £1,495 with a 5-year warranty is the popular next step up.",
      },
      {
        question:
          "Which boiler is best for a 3 or 4 bed home in East Kilbride?",
        answer:
          "Worcester Bosch at £1,695 with a 5-year warranty is the most-requested premium pick, and Navien at £1,835 with a 10-year warranty has the strongest flow rate for two-bathroom detached homes.",
      },
      {
        question: "What is the longest warranty you can get?",
        answer:
          "The Navien range comes with a 10-year manufacturer warranty as standard. Worcester Bosch, Ideal and Vokera come with a 5-year warranty. All warranties require the annual service to be carried out by a Gas Safe registered engineer.",
      },
      {
        question: "Do you fit Vaillant, Baxi or other brands?",
        answer:
          "Our installation range is Worcester Bosch, Ideal, Vokera and Navien. We repair and service most other major brands including Vaillant, Baxi, Glow-worm and Potterton, but new installations are limited to the four brands above so we can stand behind every fit with full parts support.",
      },
    ],
  },
  {
    id: "areas",
    label: "Areas covered",
    intro:
      "We cover all 35 East Kilbride districts across G74 and G75 as part of our standard service area.",
    faqs: [
      {
        question: "Do you cover all areas of East Kilbride?",
        answer:
          "Yes. We cover all 35 districts of East Kilbride - 18 in G74 and 17 in G75 - as part of our standard service area. There is no extra travel charge for any East Kilbride postcode.",
      },
      {
        question: "Do you serve nearby areas outside East Kilbride?",
        answer:
          "Our primary service area is the 35 districts of East Kilbride across G74 and G75. If you live in a neighbouring Lanarkshire area, call 01355 204045 and we will let you know honestly whether your postcode is in our standard travel range.",
      },
      {
        question: "How quickly can you fit a new boiler in my area?",
        answer:
          "Most East Kilbride installations are booked within the same week as the quote. For urgent failures we can usually fit a replacement inside a few working days.",
      },
      {
        question:
          "Do you charge extra for larger or more remote districts?",
        answer:
          "No. There is no extra charge for Thorntonhall, Kittochside, Philipshill or any other district. The fixed price is the same wherever you are in G74 or G75.",
      },
    ],
  },
  {
    id: "payment",
    label: "Payment & Klarna",
    intro:
      "Card payments accepted on all jobs. Klarna 3-month interest-free applies to boiler repair call-outs and annual servicing only - never to installations.",
    faqs: [
      {
        question: "What payment options do you offer?",
        answer:
          "We accept all major credit and debit card payments to help spread costs. New boiler installations are quoted at a single fixed price - the figure on the quote is the figure you pay.",
      },
      {
        question: "Is Klarna available?",
        answer:
          "Klarna 3-month interest-free is available exclusively on boiler repair call-out fees and annual boiler service fees. It is not available on new boiler installations, which are always quoted as a single fixed price.",
      },
      {
        question: "Do you offer finance on boiler installations?",
        answer:
          "No. New boiler installations are quoted as a single fixed price covering the boiler, parts, labour, VAT, wireless thermostat, full system flush and manufacturer warranty. There are no finance products clipped onto the install.",
      },
      {
        question: "When do I pay?",
        answer:
          "Payment for an installation is taken on completion of the job, after the engineer has commissioned the boiler and demonstrated the thermostat to you. Repair call-outs and annual services are settled on the day.",
      },
    ],
  },
  {
    id: "gas-safe",
    label: "Gas Safe engineers",
    intro:
      "Every gas job we carry out is handled by experienced self-employed Gas Safe engineers. Each engineer's Gas Safe registration can be verified directly at gassaferegister.co.uk.",
    faqs: [
      {
        question: "Are the engineers Gas Safe registered?",
        answer:
          "Yes. All gas work at EKBC is carried out by experienced self-employed Gas Safe engineers. Every engineer carries a Gas Safe ID card on the day, and each engineer's Gas Safe registration can be verified directly at gassaferegister.co.uk before any work begins.",
      },
      {
        question: "How do I verify a Gas Safe engineer's registration?",
        answer:
          "Visit gassaferegister.co.uk to verify any Gas Safe registered engineer before they start work. We always recommend checking before any gas job begins, with us or any other contractor.",
      },
      {
        question: "Are you insured?",
        answer:
          "Yes. The engineers we work with each carry their own public liability insurance and their own Gas Safe registration, which is the standard required for all gas work in the UK.",
      },
      {
        question: "Do you sub-contract gas work?",
        answer:
          "No. The nominated gas engineer is the one who carries out and signs off the work. The customer is responsible for registering the manufacturer warranty directly with the manufacturer within 30 days of installation - we cover this in our Terms.",
      },
    ],
  },
];

const faqLinks: PageInternalLink[] = [
  { label: "New Boiler Installation", href: "/services/new-boiler-installation/", group: "Services" },
  { label: "Boiler Repair", href: "/services/boiler-repair/", group: "Services" },
  { label: "Annual Boiler Service", href: "/services/boiler-servicing/", group: "Services" },
  { label: "Boiler Prices", href: "/boilers/", group: "Boilers" },
  { label: "Worcester Bosch Combi", href: "/boilers/worcester-bosch-combi/", group: "Brand" },
  { label: "Ideal Combi", href: "/boilers/ideal-combi/", group: "Brand" },
  { label: "Vokera Combi", href: "/boilers/vokera-combi/", group: "Brand" },
  { label: "Navien Combi", href: "/boilers/navien-combi/", group: "Brand" },
  { label: "G74 hub", href: "/areas-we-serve/g74/", group: "Areas" },
  { label: "G75 hub", href: "/areas-we-serve/g75/", group: "Areas" },
  { label: "All 35 East Kilbride districts", href: "/areas-we-serve/", group: "Areas" },
  { label: "Contact us", href: "/contact/", group: "Guides" },
];

export default function FAQPage() {
  const allFaqs = faqCategories.flatMap((c) => c.faqs);
  const totalCount = allFaqs.length;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(allFaqs.map((f) => ({ ...f, pageTypes: [] }))),
        ]}
      />

      <PageHero
        eyebrow="EKBC FAQs"
        h1={`${totalCount} answers from the Gas Safe engineers we work with`}
        highlightedWord="Gas Safe engineers"
        subtitle="Installation, repair, servicing, prices, brands, areas, payment and Gas Safe"
        description="The questions homeowners across East Kilbride ask most often, grouped by topic and written by the engineers who actually do the work. Use the search to jump straight to what you need."
        trustPoints={[
          `${faqCategories.length} topics`,
          `${totalCount} answers`,
          "Local to East Kilbride",
          "Written by Gas Safe engineers",
        ]}
        breadcrumbs={breadcrumbs}
        primaryCtaLabel="Ask us a question"
        primaryCtaHref="/contact/"
      />

      <TrustBadgesBar />

      <FaqCategorised categories={faqCategories} />

      <SiloLinks
        eyebrow="Continue from the FAQ"
        heading="Pick a service, a brand or a postcode hub"
        intro="Every page on this site is internally linked. Pick the route that matches what you are looking for."
        links={faqLinks}
      />

      <BottomQuoteSection />

      <CTABanner />
      <NeedBoilerCTA />
    </>
  );
}
