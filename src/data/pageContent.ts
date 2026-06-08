// Page-level editable content for every Stage 1 sample page.
// The live pages and the /admin/ CMS preview both read from this file,
// so Fraser can see exactly which fields will be editable in Stage 2.

export type PageStatus =
  | "live-sample"
  | "stage-2-pending"
  | "stub"
  | "ready-from-data";

export type PageType =
  | "homepage"
  | "service"
  | "boilers"
  | "brand"
  | "blog-index"
  | "blog-post"
  | "areas-hub"
  | "postcode-hub"
  | "district"
  | "static"
  | "admin";

export interface PageFAQ {
  question: string;
  answer: string;
}

export interface PageInternalLink {
  label: string;
  href: string;
  group: "Services" | "Boilers" | "Areas" | "Guides" | "Brand";
}

export interface PageContentBlock {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface PageServiceAreaProof {
  title: string;
  intro: string;
  districts: string[];
  reviewId: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface PageContent {
  id: string;
  label: string;
  url: string;
  pageType: PageType;
  status: PageStatus;
  parentSilo: string;
  childCount: number;
  schemaTypes: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  highlightedWord?: string;
  heroEyebrow: string;
  heroSubtitle: string;
  heroDescription: string;
  heroTrustPoints?: string[];
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  ctaBannerTitle?: string;
  introCopy?: string;
  contentBlocks?: PageContentBlock[];
  serviceAreaProof?: PageServiceAreaProof;
  faqs: PageFAQ[];
  internalLinks: PageInternalLink[];
  canonical: string;
}

const installationFAQs: PageFAQ[] = [
  {
    question: "How long does a boiler installation take in East Kilbride?",
    answer:
      "Most straightforward combi swaps in East Kilbride can usually be completed in one day, depending on pipework, flue position, access and system condition. Back boiler conversions, full system changeovers and boiler relocations typically run between one and a half and two and a half days. We confirm the exact timing on your fixed quote so there are no surprises on the day.",
  },
  {
    question: "What are the best boiler brands for homes in G74?",
    answer:
      "Across G74 streets such as Stewartfield, Calderwood and The Village we most often fit Worcester Bosch, Ideal and Vokera combis. Larger detached homes in Thorntonhall and Stewartfield are a great fit for the Navien range thanks to the 10-year warranty and stronger flow rate for two-bathroom properties.",
  },
  {
    question: "Do you cover G75 for boiler replacement?",
    answer:
      "Yes. We replace boilers in every G75 district including The Murray, Hairmyres, Greenhills, Westwood, Mossneuk, Lindsayfield and Whitehills. There is no extra travel cost for any G74 or G75 postcode.",
  },
  {
    question: "Can you replace an old back boiler with a combi boiler?",
    answer:
      "Yes. Back boiler removal and combi conversion is one of the most common upgrades we carry out in older East Kilbride properties. We remove the back boiler safely, fit a new wall-hung combi in the most practical position, run any new pipework needed, flush the system, and remove the old tank in the loft. The fixed price covers all of it.",
  },
  {
    question: "What is included in a fixed-price boiler installation?",
    answer:
      "Our fixed price includes the boiler, fitting by Gas Safe engineers, all standard pipework and fittings, a wireless thermostat, a full system flush, the manufacturer warranty, parts, labour and VAT. There are no separate call-out fees and no surprise extras on the day.",
  },
  {
    question: "How quickly can I get a quote?",
    answer:
      "Our online quote takes about 60 seconds. If you prefer to talk it through, call 01355 204045 and our team can usually give an indicative fixed price on the phone the same day. Installation dates are often available the same or next week.",
  },
  {
    question:
      "Do you install Worcester Bosch, Ideal, Vokera and Navien boilers?",
    answer:
      "Yes. We install Worcester Bosch from £1,695 with a 5-year warranty, Ideal from £1,495 with a 5-year warranty, Vokera from £1,299 with a 5-year warranty, and Navien from £1,835 with a 10-year warranty. Every fit is carried out by the Gas Safe engineers we work with.",
  },
  {
    question: "Do you offer fixed-price quotes for installations?",
    answer:
      "Yes. Once we review the photos and details you send us, we issue a single fixed price covering the boiler, all parts, labour, VAT, the wireless thermostat and the full system flush. The figure on the quote is the figure you pay. There are no surprise costs once work begins.",
  },
  {
    question: "Do you dispose of the old boiler?",
    answer:
      "Yes. Removal of the old boiler, any old hot water tank in the loft and the associated scrap metal is included in the fixed installation price. We leave the property tidy and recycle the metal responsibly.",
  },
  {
    question: "Will you need to replace my radiators as well?",
    answer:
      "Usually not. When you send us photos and details, we check the existing radiators and pipework for sludge, output and condition. Most East Kilbride homes can keep their existing radiators with a new A-rated combi, helped by the full system flush we include as standard. If a particular radiator is on its last legs we tell you on the day rather than spring it on you later.",
  },
];

const repairFAQs: PageFAQ[] = [
  {
    question: "Do you offer boiler repair in East Kilbride?",
    answer:
      "Yes. We provide boiler repair across all 35 districts of East Kilbride, covering G74 and G75. Most call-outs are diagnosed, quoted and resolved on the same visit wherever parts and access allow.",
  },
  {
    question: "What boiler faults can you help with?",
    answer:
      "Common faults we deal with include pressure that keeps dropping, no hot water, no heating, intermittent heating, kettling and banging noises, error codes on the display, frozen condensate pipes during cold spells, frequent boiler lockouts and leaks from the casing. If you are not sure what is wrong, call our team and describe it. We can usually narrow it down before we arrive.",
  },
  {
    question: "Should I repair or replace my boiler?",
    answer:
      "As a rough guide, if your boiler is over 12 years old, has needed three or four repairs in the last 18 months, or is no longer A-rated for efficiency, a replacement usually works out cheaper across the next few years. The Gas Safe engineers we work with give you an honest answer at the visit. We never push a replacement when a repair is the right call.",
  },
  {
    question: "Do you repair boilers in G74 and G75?",
    answer:
      "Yes. We cover every G74 and G75 postcode. From Stewartfield, Calderwood and The Village in G74 through to The Murray, Hairmyres, Westwood and Lindsayfield in G75. There is no extra travel cost.",
  },
  {
    question: "How fast can I arrange a boiler repair call-out?",
    answer:
      "We aim for same-day call-out for urgent boiler repairs across East Kilbride wherever schedules allow. If you are without hot water or heating, call 01355 204045 and we will give you the earliest slot we have.",
  },
  {
    question:
      "Do you repair Worcester Bosch, Ideal, Vokera and Navien boilers?",
    answer:
      "Yes. We repair all four brands plus most other major makes including Baxi, Glow-worm, Vaillant and Potterton. The Gas Safe engineers we work with carry common spares on the van so many faults can be fixed at the first visit.",
  },
  {
    question: "What should I do if my boiler stops working?",
    answer:
      "Check the basics first: the boiler pressure should normally sit between 1 and 1.5 bar when cold, the gas supply should be on, the thermostat should be calling for heat, and the condensate pipe should not be frozen if it runs outside. If everything looks normal, do not keep resetting it. Call us so we can diagnose the underlying fault safely.",
  },
  {
    question: "Are the engineers Gas Safe registered?",
    answer:
      "Yes. All gas work at EKBC is carried out by experienced self-employed Gas Safe engineers. Every engineer carries a Gas Safe ID card on the day, and each engineer's Gas Safe registration can be verified directly at gassaferegister.co.uk before any work begins.",
  },
];

const servicingFAQs: PageFAQ[] = [
  {
    question: "How often should I service my boiler in East Kilbride?",
    answer:
      "Once a year is the standard. Most boiler manufacturers require an annual service to keep the warranty valid, and the same schedule is recommended by Gas Safe for any household running a gas boiler. Landlords across G74 and G75 are required by law to arrange an annual gas safety check too.",
  },
  {
    question: "What is included in an annual boiler service?",
    answer:
      "Our annual service covers a full visual inspection of the boiler and system, a flue gas analysis, a pressure check, checks on seals, electrodes, heat exchanger and safety devices, plus a clean of any condensate build-up. We confirm the gas tightness and the carbon monoxide reading. You receive a digital service report for your records and warranty.",
  },
  {
    question: "Can a boiler service help protect my warranty?",
    answer:
      "Yes. Worcester Bosch, Ideal, Vokera, Navien and most other manufacturers require an annual service from a Gas Safe registered engineer to keep the warranty valid. We log the service so the manufacturer record is up to date.",
  },
  {
    question: "Do you service boilers in G74 and G75?",
    answer:
      "Yes. We service boilers throughout every G74 and G75 district in East Kilbride, from Stewartfield and Calderwood to The Murray, Greenhills and Hairmyres. There is no separate travel charge.",
  },
  {
    question:
      "Do you service Worcester Bosch, Ideal, Vokera and Navien boilers?",
    answer:
      "Yes. The Gas Safe engineers we work with service all four brands and most other major makes. The service is the same fixed price regardless of brand.",
  },
  {
    question: "How long does a boiler service take?",
    answer:
      "A typical annual boiler service takes around 45 minutes. If we spot something that needs attention we will explain it on the day and give you a fixed price before any work goes ahead.",
  },
  {
    question: "Can I book a boiler service online?",
    answer:
      "Yes. Use the online quote form to request a service and choose a date that suits you, or call 01355 204045 if you would prefer to book over the phone. Klarna 3-month interest-free is available on annual servicing.",
  },
  {
    question: "Why should I service my boiler annually?",
    answer:
      "An annual service keeps the boiler running efficiently, supports the manufacturer warranty, and protects your family by checking the flue, combustion and carbon monoxide reading. It also catches small faults early, before they become a winter breakdown when you need heating most.",
  },
];

const boilerPricesFAQs: PageFAQ[] = [
  {
    question: "How much does a new boiler cost in East Kilbride?",
    answer:
      "Fitted combi boiler prices in East Kilbride start from £1,299. Worcester Bosch starts from £1,695, Ideal from £1,495, Vokera from £1,299 and Navien from £1,835. Every price includes installation, parts, labour, VAT, a wireless thermostat and a full system flush.",
  },
  {
    question: "Which boiler is best for a G74 home?",
    answer:
      "For a typical 2 to 3 bedroom property in G74 such as Calderwood, Stewartfield or The Village, Worcester Bosch and Ideal are the most popular fit. Larger detached homes in Thorntonhall and parts of Stewartfield work well with Navien thanks to the stronger flow rate.",
  },
  {
    question:
      "Which boiler is best value for a small East Kilbride property?",
    answer:
      "Vokera at £1,299 is our best value combi installation. It is a strong fit for one-bathroom flats and smaller terraced houses in The Murray, Greenhills, Westwood and Mossneuk. Vokera comes with a 5-year warranty as standard.",
  },
  {
    question: "Are boiler prices fixed?",
    answer:
      "Yes. The price you see on the quote is the price you pay. There are no separate call-out fees, no hidden parts charges and no day-rate add-ons. If the property has unusual requirements that affect the cost we tell you up front before any work begins.",
  },
  {
    question: "What is included in the boiler installation price?",
    answer:
      "The price includes the boiler, fitting by Gas Safe engineers, all standard pipework, the manufacturer warranty, a free wireless thermostat, a full system flush, all materials, labour and VAT. Removal of the old boiler and tidy-up are included as standard.",
  },
  {
    question: "Why do boiler prices vary?",
    answer:
      "Prices vary by brand, output size, warranty length, flue position and any extra work the property needs. A like-for-like combi swap is usually the cheapest option. Moving the boiler to a new location, removing a back boiler, or converting from a system or regular boiler typically costs a bit more.",
  },
  {
    question: "Can I request a custom quote?",
    answer:
      "Yes. The online quote form takes 60 seconds. If you prefer to talk through your property we can give an indicative fixed price on the phone. Call 01355 204045 or use the form on the homepage.",
  },
];

const blogIndexFAQs: PageFAQ[] = [
  {
    question:
      "How often do you publish new boiler guides for East Kilbride?",
    answer:
      "We publish new boiler buying, repair and servicing guides every few weeks. Each guide is written by the Gas Safe engineers we work with and is focused on real questions we hear from homeowners across G74 and G75.",
  },
  {
    question: "Are the guides specific to East Kilbride?",
    answer:
      "Yes. We focus on real-world advice for East Kilbride properties, including older homes around The Village and Calderwood and newer estates in Stewartfield, Lindsayfield and Jackton. Every guide is written for a local reader.",
  },
  {
    question: "Can I get a quote after reading a guide?",
    answer:
      "Yes. Every guide includes a clear link to the online quote form. You can also call 01355 204045 if you would prefer to talk it through with a Gas Safe registered engineer.",
  },
];

const homepageInternalLinks: PageInternalLink[] = [
  { label: "New Boiler Installation", href: "/services/new-boiler-installation/", group: "Services" },
  { label: "Boiler Repair", href: "/services/boiler-repair/", group: "Services" },
  { label: "Annual Boiler Service", href: "/services/boiler-servicing/", group: "Services" },
  { label: "Boiler Prices", href: "/boilers/", group: "Boilers" },
  { label: "G74 hub", href: "/areas-we-serve/g74/", group: "Areas" },
  { label: "G75 hub", href: "/areas-we-serve/g75/", group: "Areas" },
  { label: "Blog", href: "/blogs/", group: "Guides" },
];

const installationInternalLinks: PageInternalLink[] = [
  { label: "Boiler Prices", href: "/boilers/", group: "Boilers" },
  { label: "Boiler Repair", href: "/services/boiler-repair/", group: "Services" },
  { label: "Annual Boiler Service", href: "/services/boiler-servicing/", group: "Services" },
  { label: "G74 hub", href: "/areas-we-serve/g74/", group: "Areas" },
  { label: "G75 hub", href: "/areas-we-serve/g75/", group: "Areas" },
  { label: "Worcester Bosch Combi", href: "/boilers/worcester-bosch-combi/", group: "Brand" },
  { label: "Ideal Combi", href: "/boilers/ideal-combi/", group: "Brand" },
  { label: "Vokera Combi", href: "/boilers/vokera-combi/", group: "Brand" },
  { label: "Navien Combi", href: "/boilers/navien-combi/", group: "Brand" },
  { label: "Signs you need a new boiler", href: "/blogs/signs-you-need-a-new-boiler-east-kilbride/", group: "Guides" },
  { label: "Combi boiler cost guide", href: "/blogs/combi-boiler-cost-east-kilbride/", group: "Guides" },
  { label: "Best boiler brands for G74 and G75", href: "/blogs/best-boiler-brands-g74-g75-east-kilbride/", group: "Guides" },
];

const repairInternalLinks: PageInternalLink[] = [
  { label: "New Boiler Installation", href: "/services/new-boiler-installation/", group: "Services" },
  { label: "Annual Boiler Service", href: "/services/boiler-servicing/", group: "Services" },
  { label: "Boiler Prices", href: "/boilers/", group: "Boilers" },
  { label: "G74 hub", href: "/areas-we-serve/g74/", group: "Areas" },
  { label: "G75 hub", href: "/areas-we-serve/g75/", group: "Areas" },
  { label: "Signs you need a new boiler", href: "/blogs/signs-you-need-a-new-boiler-east-kilbride/", group: "Guides" },
  { label: "Annual boiler service guide", href: "/blogs/annual-boiler-service-east-kilbride/", group: "Guides" },
  { label: "Repair or replacement guide", href: "/blogs/boiler-repair-or-replacement-east-kilbride/", group: "Guides" },
];

const servicingInternalLinks: PageInternalLink[] = [
  { label: "Boiler Repair", href: "/services/boiler-repair/", group: "Services" },
  { label: "New Boiler Installation", href: "/services/new-boiler-installation/", group: "Services" },
  { label: "Boiler Prices", href: "/boilers/", group: "Boilers" },
  { label: "G74 hub", href: "/areas-we-serve/g74/", group: "Areas" },
  { label: "G75 hub", href: "/areas-we-serve/g75/", group: "Areas" },
  { label: "Annual boiler service guide", href: "/blogs/annual-boiler-service-east-kilbride/", group: "Guides" },
];

const boilersInternalLinks: PageInternalLink[] = [
  { label: "New Boiler Installation", href: "/services/new-boiler-installation/", group: "Services" },
  { label: "Boiler Repair", href: "/services/boiler-repair/", group: "Services" },
  { label: "Annual Boiler Service", href: "/services/boiler-servicing/", group: "Services" },
  { label: "Worcester Bosch Combi", href: "/boilers/worcester-bosch-combi/", group: "Brand" },
  { label: "Ideal Combi", href: "/boilers/ideal-combi/", group: "Brand" },
  { label: "Vokera Combi", href: "/boilers/vokera-combi/", group: "Brand" },
  { label: "Navien Combi", href: "/boilers/navien-combi/", group: "Brand" },
  { label: "G74 hub", href: "/areas-we-serve/g74/", group: "Areas" },
  { label: "G75 hub", href: "/areas-we-serve/g75/", group: "Areas" },
  { label: "Combi boiler cost guide", href: "/blogs/combi-boiler-cost-east-kilbride/", group: "Guides" },
];

const blogInternalLinks: PageInternalLink[] = [
  { label: "New Boiler Installation", href: "/services/new-boiler-installation/", group: "Services" },
  { label: "Boiler Repair", href: "/services/boiler-repair/", group: "Services" },
  { label: "Annual Boiler Service", href: "/services/boiler-servicing/", group: "Services" },
  { label: "Boiler Prices", href: "/boilers/", group: "Boilers" },
  { label: "G74 hub", href: "/areas-we-serve/g74/", group: "Areas" },
  { label: "G75 hub", href: "/areas-we-serve/g75/", group: "Areas" },
];

export const pageContent: Record<string, PageContent> = {
  home: {
    id: "home",
    label: "Homepage",
    url: "/",
    pageType: "homepage",
    status: "live-sample",
    parentSilo: "Root",
    childCount: 0,
    schemaTypes: ["HVACBusiness (LocalBusiness)", "FAQPage", "BreadcrumbList"],
    metaTitle:
      "East Kilbride Boiler Company | EKBC - Boiler Replacement G74 / G75",
    metaDescription:
      "East Kilbride's #1 boiler replacement company. Fixed-price installations across 35 EK areas. Gas Safe engineers, up to 12-year warranties. Call 01355 204045.",
    h1: "The East Kilbride Boiler Company",
    highlightedWord: "Company",
    heroEyebrow: "Boilers fixed, fitted and serviced",
    heroSubtitle: "Serving all areas of East Kilbride G74 / G75",
    heroDescription:
      "Fixed-price boiler installations, fast repairs and annual servicing across every district of East Kilbride. Gas Safe engineers, no middle man, no hidden extras.",
    ctaPrimaryLabel: "Get my fixed price",
    ctaSecondaryLabel: "Call 01355 204045",
    ctaBannerTitle: "Get your fixed price quote",
    faqs: [],
    internalLinks: homepageInternalLinks,
    canonical: "/",
  },

  "new-boiler-installation": {
    id: "new-boiler-installation",
    label: "New Boiler Installation",
    url: "/services/new-boiler-installation/",
    pageType: "service",
    status: "live-sample",
    parentSilo: "Services",
    childCount: 0,
    schemaTypes: ["Service", "Offer", "FAQPage", "BreadcrumbList"],
    metaTitle:
      "New Boiler Installation in East Kilbride | EKBC - Fixed Price From £1,299",
    metaDescription:
      "Fixed-price new boiler installation across G74 and G75 East Kilbride. Worcester Bosch, Ideal, Vokera and Navien fitted by Gas Safe engineers. Call 01355 204045.",
    h1: "New Boiler Installation in East Kilbride - Fixed Price From £1,299",
    highlightedWord: "£1,299",
    heroEyebrow: "New Boiler Installation",
    heroSubtitle: "Worcester Bosch, Ideal, Vokera, Navien",
    heroDescription:
      "Fixed-price new boiler installation across all 35 areas of East Kilbride. Worcester Bosch, Ideal, Vokera and Navien fitted by the Gas Safe engineers we work with. No middle man, no hidden extras, no surprises on the day.",
    heroTrustPoints: [
      "From £1,299 fitted",
      "Gas Safe engineers",
      "Up to 12-yr warranty",
      "Same-week installation",
    ],
    ctaPrimaryLabel: "Get my fixed price",
    ctaSecondaryLabel: "Call 01355 204045",
    ctaBannerTitle: "Get your fixed price installation quote",
    introCopy:
      "If your East Kilbride boiler is past its tenth birthday, costing you in winter bills, or letting the family down with cold mornings, a new A-rated combi is the upgrade that pays you back. Every install is carried out by experienced self-employed Gas Safe engineers, with a fixed price, a manufacturer warranty and a full system flush as standard.",
    contentBlocks: [
      {
        id: "what-happens",
        heading: "What happens during a boiler installation in East Kilbride",
        body: [
          "Your installation day is planned around your property. Most straightforward combi swaps in East Kilbride are completed inside a single day. Larger jobs such as back boiler removals or relocations typically run between one and a half and two and a half days.",
        ],
        bullets: [
          "Arrive between 8 and 9am, dust sheets down, hot water turned off",
          "Old boiler isolated and removed safely, including any old hot water tank",
          "New boiler hung, gas, condensate, flue and pipework connected",
          "Full system flush to clean out sludge and protect the new heat exchanger",
          "Pressure test, flue gas analysis and final commissioning by the Gas Safe registered engineer on the day",
          "Wireless thermostat paired and demonstrated to you before we leave",
        ],
      },
      {
        id: "whats-included",
        heading: "What is included in your fixed-price installation",
        body: [
          "Every fitted boiler price already includes everything you need. There are no separate call-out fees and no extras added on the day.",
        ],
        bullets: [
          "The boiler, parts, labour and VAT",
          "Manufacturer warranty up to 12 years on selected models",
          "Free wireless thermostat",
          "Full system flush",
          "Standard pipework, fittings and flue",
          "Old boiler removal and tidy-up",
          "Building control notification through Gas Safe",
        ],
      },
      {
        id: "how-long",
        heading: "How long installation usually takes",
        body: [
          "Most straightforward combi swaps in East Kilbride can usually be completed in one day, depending on pipework, flue position, access and system condition. Back boiler conversions and changes from system or regular boilers to combi typically take one and a half to two and a half days. We confirm the exact timing on your fixed quote so you can plan around it.",
        ],
      },
      {
        id: "best-brands",
        heading: "Best boiler brands for G74 and G75 homes",
        body: [
          "We install Worcester Bosch, Ideal, Vokera and Navien combi boilers across East Kilbride. The right choice depends on the size of your property, the number of bathrooms, and how long you intend to stay in the home.",
        ],
        bullets: [
          "Vokera from £1,299, 5-year warranty - best value for one-bathroom homes in The Murray, Greenhills and Westwood",
          "Ideal from £1,495, 5-year warranty - our most popular fit for terraced and semi-detached homes across G74 and G75",
          "Worcester Bosch from £1,695, 5-year warranty - the Which? Best Boiler Award winner and our most-requested premium pick",
          "Navien from £1,835, 10-year warranty - strongest flow rate for 2-bathroom detached homes in Stewartfield and Thorntonhall",
        ],
      },
      {
        id: "cost-factors",
        heading: "What affects the cost of a boiler replacement",
        body: [
          "Fixed pricing means no surprises, but the up-front price depends on a few things specific to your home.",
        ],
        bullets: [
          "Brand and output size of the new boiler",
          "Like-for-like swap versus moving the boiler to a new position",
          "Conversion from a back boiler, system or regular boiler to a combi",
          "Condition of the existing pipework and radiators",
          "Flue position and access through external walls",
          "Whether a magnetic system filter is being added",
        ],
      },
      {
        id: "areas-covered",
        heading: "Areas we cover for installations",
        body: [
          "We install boilers across every G74 and G75 district in East Kilbride, including Stewartfield, Calderwood, The Village, Thorntonhall, Whitemoss, The Murray, Greenhills, Hairmyres, Westwood, Lindsayfield, Jackton and Mossneuk. There is no extra travel charge for any East Kilbride postcode.",
        ],
      },
      {
        id: "local-trust",
        heading: "Why East Kilbride homeowners choose EKBC",
        body: [
          "We are a local East Kilbride boiler company with experienced self-employed Gas Safe engineers. We are not a national lead-buying machine pretending to be local. Every install is signed off by the engineer who carried it out and backed by a manufacturer warranty registered in your name.",
        ],
      },
    ],
    serviceAreaProof: {
      title: "Boiler installation across East Kilbride",
      intro:
        "We install new boilers across every G74 and G75 district in East Kilbride. From quick combi swaps in The Murray and Greenhills, to back-boiler conversions in The Village and Calderwood, to full-system upgrades in Stewartfield and Thorntonhall, the same Gas Safe engineers fit every job.",
      districts: [
        "The Murray",
        "Greenhills",
        "Hairmyres",
        "Calderwood",
        "Stewartfield",
        "Westwood",
      ],
      reviewId: "5",
      ctaLabel: "Get my fixed installation price",
    },
    faqs: installationFAQs,
    internalLinks: installationInternalLinks,
    canonical: "/services/new-boiler-installation/",
  },

  "boiler-repair": {
    id: "boiler-repair",
    label: "Boiler Repair",
    url: "/services/boiler-repair/",
    pageType: "service",
    status: "live-sample",
    parentSilo: "Services",
    childCount: 0,
    schemaTypes: ["Service", "FAQPage", "BreadcrumbList"],
    metaTitle:
      "Boiler Repair East Kilbride | EKBC - Gas Safe engineers, Same-Day Call-Out",
    metaDescription:
      "Same-day boiler repair across East Kilbride. Worcester Bosch, Ideal, Vokera, Navien and more, fixed by Gas Safe engineers. Call 01355 204045 for an urgent call-out.",
    h1: "Boiler Repair East Kilbride - Gas Safe engineers, Same-Day Call-Out",
    highlightedWord: "East Kilbride",
    heroEyebrow: "Boiler Repair",
    heroSubtitle: "Worcester, Ideal, Vokera, Navien and more",
    heroDescription:
      "Same-day boiler repair across East Kilbride. The Gas Safe engineers we work with diagnose, quote and fix on the same visit wherever possible. Klarna 3-month interest-free is available exclusively on boiler repair call-outs.",
    heroTrustPoints: [
      "Same-day call-out",
      "Gas Safe engineers",
      "Fair, fixed quotes",
      "All G74 and G75 covered",
    ],
    ctaPrimaryLabel: "Get my repair booked",
    ctaSecondaryLabel: "Call 01355 204045",
    ctaBannerTitle: "Get a same-day boiler repair call-out",
    introCopy:
      "When a boiler stops working in winter, you do not want a call centre. You want a Gas Safe registered engineer at the door with the right spares on the van. We cover every G74 and G75 postcode in East Kilbride and aim to diagnose, quote and resolve the fault on the same visit.",
    contentBlocks: [
      {
        id: "common-faults",
        heading: "Common boiler faults in East Kilbride homes",
        body: [
          "Most call-outs across G74 and G75 come down to a handful of repeat problems. The good news is the fix is usually straightforward once a Gas Safe registered engineer can look at it.",
        ],
        bullets: [
          "Pressure that keeps dropping below 1 bar",
          "No hot water but heating works (or the other way around)",
          "Boiler locking out and showing an error code",
          "Frozen condensate pipe during a cold snap",
          "Kettling, banging or whistling from the heat exchanger",
          "Leaks from the casing or pressure relief outside the property",
          "Pilot or ignition not staying lit on older boilers",
        ],
      },
      {
        id: "signs",
        heading: "Signs your boiler needs repaired",
        body: [
          "A boiler does not usually fail without warning. Spotting the early signs can save the cost of a call-out and prevent damage to your central heating system.",
        ],
        bullets: [
          "You have topped up the pressure more than twice in a month",
          "Radiators are warm at the top and cold at the bottom",
          "The boiler is making a new noise you have not heard before",
          "Hot water runs lukewarm or cuts in and out",
          "You can see a small leak or staining under the boiler",
          "The flame in the viewing window is yellow instead of blue",
        ],
      },
      {
        id: "call-out",
        heading: "What the repair call-out includes",
        body: [
          "We bring common spares on the van, so a high percentage of East Kilbride call-outs are resolved the same day.",
        ],
        bullets: [
          "Visit booked at a time that suits you",
          "Full diagnostic check by a Gas Safe registered engineer",
          "Clear fixed quote before any repair work begins",
          "Parts fitted, system tested and pressure rechecked",
          "Klarna 3-month interest-free available on repair call-outs",
        ],
      },
      {
        id: "repair-vs-replace",
        heading: "Repair or replace - honest guidance",
        body: [
          "Sometimes the right answer is a quick repair. Sometimes the right answer is a replacement. We give you both options on the day with no pressure either way.",
        ],
        bullets: [
          "Under 8 years old, first major fault - repair is almost always the right call",
          "8 to 12 years old, second or third fault - we walk through the maths",
          "Over 12 years old, repeated faults, no warranty - a new A-rated combi usually saves money inside two winters",
        ],
      },
      {
        id: "gas-safety",
        heading: "Safety first - what to do for gas-related faults",
        body: [
          "If you smell gas, do not switch anything electrical on or off, including light switches. Open windows, turn the gas off at the meter if it is safe to do so, leave the property and call the National Gas Emergency Service on 0800 111 999. After that, call us on 01355 204045 to arrange the follow-up repair.",
        ],
      },
      {
        id: "brands-repaired",
        heading: "Brands we repair",
        body: [
          "The Gas Safe engineers we work with repair Worcester Bosch, Ideal, Vokera, Navien, Baxi, Glow-worm, Vaillant and Potterton along with most other major makes. We do not charge more to work on premium brands.",
        ],
      },
      {
        id: "local-coverage",
        heading: "Local G74 and G75 repair coverage",
        body: [
          "We repair boilers across every East Kilbride postcode. There is no extra travel charge whether you are in Calderwood, The Village, Stewartfield, Thorntonhall, The Murray, Greenhills, Hairmyres, Westwood or anywhere else in G74 or G75.",
        ],
      },
    ],
    serviceAreaProof: {
      title: "Boiler repairs across G74 and G75",
      intro:
        "Same-day boiler repair coverage right across East Kilbride. Whether it is a no-heat call-out in Hairmyres, a pressure issue in The Murray, or a frozen condensate in Stewartfield during a cold snap, the Gas Safe engineers we work with carry common spares on the van to fix the fault on the first visit wherever possible.",
      districts: [
        "Hairmyres",
        "Calderwood",
        "Stewartfield",
        "The Murray",
        "Lindsayfield",
        "Thorntonhall",
      ],
      reviewId: "8",
      ctaLabel: "Book my repair call-out",
    },
    faqs: repairFAQs,
    internalLinks: repairInternalLinks,
    canonical: "/services/boiler-repair/",
  },

  "boiler-servicing": {
    id: "boiler-servicing",
    label: "Annual Boiler Service",
    url: "/services/boiler-servicing/",
    pageType: "service",
    status: "live-sample",
    parentSilo: "Services",
    childCount: 0,
    schemaTypes: ["Service", "FAQPage", "BreadcrumbList"],
    metaTitle:
      "Annual Boiler Service East Kilbride | EKBC - Worcester, Ideal, Vokera, Navien",
    metaDescription:
      "Annual boiler servicing in East Kilbride by Gas Safe engineers. Worcester Bosch, Ideal, Vokera, Navien and more. Protect your warranty. Call 01355 204045.",
    h1: "Annual Boiler Service East Kilbride - Worcester, Ideal, Vokera, Navien",
    highlightedWord: "East Kilbride",
    heroEyebrow: "Annual Boiler Service",
    heroSubtitle: "Gas Safe checked, warranty-friendly",
    heroDescription:
      "Annual boiler servicing in East Kilbride to keep your warranty valid, your bills down and your family safe. Worcester Bosch, Ideal, Vokera, Navien and most other major brands serviced by Gas Safe engineers.",
    heroTrustPoints: [
      "Gas Safe checked",
      "Digital service report",
      "Klarna 3-mo interest-free",
      "Worcester, Ideal, Vokera, Navien",
    ],
    ctaPrimaryLabel: "Book my service",
    ctaSecondaryLabel: "Call 01355 204045",
    ctaBannerTitle: "Book your annual boiler service",
    introCopy:
      "An annual boiler service is the cheapest way to protect a big purchase. Skip it and the manufacturer warranty almost always becomes invalid. The Gas Safe engineers we work with run a full check, leave you with a digital report, and make sure your boiler is running safely and efficiently for the next year.",
    contentBlocks: [
      {
        id: "checklist",
        heading: "Annual boiler service checklist",
        body: [
          "Every annual service we carry out across G74 and G75 follows the same Gas Safe checklist. It usually takes around 45 minutes from start to finish.",
        ],
        bullets: [
          "Visual inspection of the boiler casing, flue and pipework",
          "Flue gas analysis to confirm safe combustion",
          "Pressure check and system top-up if needed",
          "Inspection of seals, electrodes and the heat exchanger",
          "Test of all safety devices and lock-out behaviour",
          "Carbon monoxide check at the flue",
          "Clean of condensate trap and any build-up",
          "Digital service report emailed to you for your warranty",
        ],
      },
      {
        id: "why-it-matters",
        heading: "Why servicing matters",
        body: [
          "A serviced boiler runs cleaner, lasts longer, breaks down less often and keeps the manufacturer warranty valid. It also catches small faults before they become winter breakdowns.",
        ],
        bullets: [
          "Up to 30% better efficiency on older units after a service and clean",
          "Manufacturer warranty stays valid for Worcester Bosch, Ideal, Vokera and Navien",
          "Safety check on the gas tightness and CO output",
          "Fewer winter breakdowns when you need heating most",
        ],
      },
      {
        id: "homeowner-landlord",
        heading: "Homeowners and landlords - what you need",
        body: [
          "Homeowners are not legally required to service their boiler, but the manufacturer warranty almost always requires it. Landlords in East Kilbride are required by law to arrange an annual Gas Safety Record from a Gas Safe registered engineer, and our service covers both.",
        ],
      },
      {
        id: "warranty",
        heading: "Warranty and manufacturer servicing notes",
        body: [
          "Worcester Bosch, Ideal, Vokera and Navien all expect an annual service from a Gas Safe registered engineer to keep their warranty in force. We log the service on the day so the manufacturer record is up to date if you ever need to call on the warranty.",
        ],
      },
      {
        id: "what-checked",
        heading: "What is checked during a service",
        body: [
          "We work to the manufacturer's service schedule for your specific boiler model. The checklist above covers the standard items, and we add brand-specific items where required.",
        ],
      },
      {
        id: "brands-serviced",
        heading: "Brands we service",
        body: [
          "The Gas Safe engineers we work with service Worcester Bosch, Ideal, Vokera, Navien, Baxi, Glow-worm, Vaillant, Potterton and most other major brands. The service is the same fixed price regardless of brand.",
        ],
      },
      {
        id: "local-coverage",
        heading: "Local G74 and G75 servicing coverage",
        body: [
          "We service boilers throughout every East Kilbride district, from Stewartfield, Calderwood, The Village and Thorntonhall in G74 to The Murray, Hairmyres, Greenhills, Westwood and Lindsayfield in G75. No extra travel charge.",
        ],
      },
    ],
    serviceAreaProof: {
      title: "Annual boiler servicing across East Kilbride",
      intro:
        "We service boilers throughout every East Kilbride district. From homeowners in Nerston and Calderwood to landlords with portfolios across The Village, Stewartfield, Greenhills and Mossneuk, every service follows the same Gas Safe checklist and is fixed price regardless of brand.",
      districts: [
        "Nerston",
        "Calderwood",
        "The Village",
        "Stewartfield",
        "Greenhills",
        "Mossneuk",
      ],
      reviewId: "7",
      ctaLabel: "Book my annual service",
    },
    faqs: servicingFAQs,
    internalLinks: servicingInternalLinks,
    canonical: "/services/boiler-servicing/",
  },

  boilers: {
    id: "boilers",
    label: "Boiler Prices",
    url: "/boilers/",
    pageType: "boilers",
    status: "live-sample",
    parentSilo: "Boilers",
    childCount: 4,
    schemaTypes: ["Product", "Offer", "FAQPage", "BreadcrumbList"],
    metaTitle:
      "Boiler Prices in East Kilbride | EKBC - Worcester, Ideal, Vokera, Navien",
    metaDescription:
      "Compare fitted boiler prices in East Kilbride. Worcester Bosch from £1,695, Ideal from £1,495, Vokera from £1,299, Navien from £1,835. Call 01355 204045.",
    h1: "Fitted boiler prices in East Kilbride - Compare Worcester, Ideal, Vokera and Navien",
    highlightedWord: "Fitted boiler prices",
    heroEyebrow: "Boiler Prices",
    heroSubtitle: "Worcester, Ideal, Vokera, Navien",
    heroDescription:
      "Choose from Worcester Bosch, Ideal, Vokera and Navien. All prices include installation, parts, labour and VAT. No hidden extras, no surprises.",
    heroTrustPoints: [
      "From £1,299 fitted",
      "Gas Safe engineers",
      "Up to 10-yr warranty",
      "Free system flush",
    ],
    ctaPrimaryLabel: "Get my fixed price",
    ctaSecondaryLabel: "Call 01355 204045",
    ctaBannerTitle: "Get your fixed boiler price",
    introCopy:
      "This page is built to help you compare combi boiler installation prices across East Kilbride, decide which boiler is right for your home, and see exactly what is included before you commit to anything. Every price is fully fitted, with no separate call-out fee.",
    contentBlocks: [
      {
        id: "what-affects-cost",
        heading: "What affects boiler replacement cost in East Kilbride",
        body: [
          "Fitted boiler prices in East Kilbride start from £1,299. Several factors shift the final price up or down for your property.",
        ],
        bullets: [
          "Brand and output size of the new boiler",
          "Like-for-like swap versus moving the boiler to a new position",
          "Conversion from a back boiler, system boiler or regular boiler to a combi",
          "Condition of the existing pipework and radiators",
          "Flue position and access through external walls",
          "Optional extras such as a magnetic system filter or smart thermostat upgrade",
        ],
      },
      {
        id: "which-boiler",
        heading: "Which boiler is best for your home?",
        body: [
          "A combi boiler heats hot water on demand and removes the need for a separate tank, which saves space and simplifies the system. Picking the right brand depends on the property.",
        ],
        bullets: [
          "1 bathroom flat or terraced house - Vokera or Ideal",
          "2 bathroom semi-detached - Ideal or Worcester Bosch",
          "2 bathroom detached - Worcester Bosch or Navien",
          "Larger detached with high demand - Navien for the strongest flow rate and 10-year warranty",
        ],
      },
      {
        id: "whats-included-price",
        heading: "What is included in our fitted boiler prices",
        body: [
          "Every fitted boiler price already includes everything you need. There are no separate call-out fees and no extras added on the day.",
        ],
        bullets: [
          "The boiler itself, parts, labour and VAT",
          "Manufacturer warranty up to 10 years",
          "Free wireless thermostat",
          "Full system flush",
          "Standard pipework, fittings and flue",
          "Old boiler removal and tidy-up",
          "Building control notification through Gas Safe",
        ],
      },
      {
        id: "best-value",
        heading: "Best value choice",
        body: [
          "Vokera at £1,299 fitted is our best value pick. It is a reliable build, comes with a 5-year warranty, and is a strong fit for one-bathroom flats and smaller terraced houses across The Murray, Greenhills, Westwood and Mossneuk.",
        ],
      },
      {
        id: "premium",
        heading: "Premium choice",
        body: [
          "Navien at £1,835 fitted is our premium pick. The 10-year warranty is the longest on the market, the smart connected controls are excellent, and the flow rate suits larger detached homes in Stewartfield, Thorntonhall and Whitemoss with two or more bathrooms.",
        ],
      },
      {
        id: "installation-areas",
        heading: "Installation areas",
        body: [
          "We install boilers across all 35 districts of East Kilbride covering G74 and G75. There is no extra travel charge for any East Kilbride postcode.",
        ],
      },
    ],
    serviceAreaProof: {
      title: "Fixed boiler prices for East Kilbride homes",
      intro:
        "Every fitted boiler price on this page covers all of East Kilbride. From Vokera at £1,299 for one-bathroom flats in The Murray and Westwood, to Navien at £1,835 for larger detached homes in Stewartfield and Thorntonhall, the figure on the quote is the figure you pay. No extra travel charge for any G74 or G75 postcode.",
      districts: [
        "Westwood",
        "Stewartfield",
        "The Murray",
        "Calderwood",
        "Hairmyres",
        "Thorntonhall",
      ],
      reviewId: "3",
      ctaLabel: "Get my fixed price",
    },
    faqs: boilerPricesFAQs,
    internalLinks: boilersInternalLinks,
    canonical: "/boilers/",
  },

  blogs: {
    id: "blogs",
    label: "Blog Index",
    url: "/blogs/",
    pageType: "blog-index",
    status: "live-sample",
    parentSilo: "Blogs",
    childCount: 5,
    schemaTypes: ["CollectionPage", "FAQPage", "BreadcrumbList"],
    metaTitle:
      "East Kilbride Boiler Blog | EKBC - Heating Guides for G74 & G75",
    metaDescription:
      "Practical boiler buying, repair and servicing guides for East Kilbride homeowners. Worcester Bosch, Ideal, Vokera, Navien and more. Local Gas Safe engineers.",
    h1: "East Kilbride boiler guides and heating advice",
    highlightedWord: "East Kilbride",
    heroEyebrow: "Boiler advice for East Kilbride",
    heroSubtitle: "Buying, repair and servicing guides",
    heroDescription:
      "Honest, practical guides from the Gas Safe engineers we work with for homeowners across G74 and G75. Boiler buying, signs of a failing system, what an annual service really covers, and what fitted prices look like in East Kilbride.",
    heroTrustPoints: [
      "Written by Gas Safe engineers",
      "Local to East Kilbride",
      "Updated regularly",
      "Honest pricing",
    ],
    ctaPrimaryLabel: "Get a fixed price quote",
    ctaSecondaryLabel: "Call 01355 204045",
    ctaBannerTitle: "Get your fixed price quote",
    introCopy:
      "Our guides are written by the engineers who actually fit and service boilers across East Kilbride. No filler, no fluff, no AI-stuffed waffle. If a question keeps coming up with homeowners in G74 and G75, we cover it here in plain English so you can make a confident decision before you ever speak to us.",
    faqs: blogIndexFAQs,
    internalLinks: blogInternalLinks,
    canonical: "/blogs/",
  },

  admin: {
    id: "admin",
    label: "Admin Preview",
    url: "/admin/",
    pageType: "admin",
    status: "live-sample",
    parentSilo: "Hidden (noindex)",
    childCount: 0,
    schemaTypes: [],
    metaTitle: "Admin Preview | EKBC",
    metaDescription:
      "Stage 1 CMS preview for The East Kilbride Boiler Company website.",
    h1: "EKBC Admin Preview",
    heroEyebrow: "Admin",
    heroSubtitle: "Stage 1 preview",
    heroDescription: "Internal preview, noindex, blocked in robots.txt.",
    ctaPrimaryLabel: "View site",
    ctaSecondaryLabel: "Sign out",
    faqs: [],
    internalLinks: [],
    canonical: "/admin/",
  },
};

export const editablePageList: PageContent[] = [
  pageContent.home,
  pageContent["new-boiler-installation"],
  pageContent["boiler-repair"],
  pageContent["boiler-servicing"],
  pageContent.boilers,
  pageContent.blogs,
];

export function getPageContent(id: string): PageContent | undefined {
  return pageContent[id];
}
