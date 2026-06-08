import type { District } from "@/types";
import { postcodeDisplay, postcodeIntroPhrase } from "./postcodeDisplay";

// District page variation engine.
//
// 35 district pages share the same 9 keyword-driven sections, but we vary:
//   1. The order the sections appear in (5 orderings)
//   2. Each section's H2 wording (3 heading patterns per section)
//   3. Each section's body copy (3 body templates per section)
//   4. The FAQ set (5 to 7 from a pool of 10 + 1 hyperlocal angle FAQ)
//
// Variation is deterministic - it is keyed on a hash of the district slug, so
// the same district always renders the same way. The result is that no two
// districts produce identical output even though they share the same template.

export type SectionId =
  | "replacement"
  | "new-installation"
  | "combi-upgrade"
  | "central-heating"
  | "full-system"
  | "fixed-price"
  | "gas-safe-installer"
  | "emergency-replacement"
  | "best-deals";

export interface RenderedSection {
  id: SectionId;
  heading: string;
  body: string;
}

// Stable-ish hash for deterministic variation.
export function districtHash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

const sectionOrderings: SectionId[][] = [
  [
    "replacement",
    "new-installation",
    "combi-upgrade",
    "fixed-price",
    "gas-safe-installer",
    "central-heating",
    "emergency-replacement",
    "full-system",
    "best-deals",
  ],
  [
    "replacement",
    "fixed-price",
    "new-installation",
    "combi-upgrade",
    "best-deals",
    "gas-safe-installer",
    "central-heating",
    "emergency-replacement",
    "full-system",
  ],
  [
    "new-installation",
    "replacement",
    "combi-upgrade",
    "gas-safe-installer",
    "fixed-price",
    "central-heating",
    "full-system",
    "emergency-replacement",
    "best-deals",
  ],
  [
    "replacement",
    "combi-upgrade",
    "new-installation",
    "central-heating",
    "fixed-price",
    "best-deals",
    "gas-safe-installer",
    "full-system",
    "emergency-replacement",
  ],
  [
    "replacement",
    "new-installation",
    "gas-safe-installer",
    "combi-upgrade",
    "fixed-price",
    "emergency-replacement",
    "central-heating",
    "full-system",
    "best-deals",
  ],
];

interface SectionDef {
  id: SectionId;
  headings: Array<(area: string, postcode: string) => string>;
  bodies: Array<(d: District) => string>;
}

const sections: Record<SectionId, SectionDef> = {
  replacement: {
    id: "replacement",
    headings: [
      (area) => `Boiler Replacement in ${area}, East Kilbride`,
      (area) => `Replacing your boiler in ${area}`,
      (area) => `${area} boiler replacement, fully fitted`,
    ],
    bodies: [
      (d) =>
        `Our fixed-price boiler replacement service in ${d.name} starts from £1,299 fully fitted by the Gas Safe engineers we work with. Most jobs across ${d.position} are completed in a single day, with no separate call-out fee and no extra travel charge for the ${postcodeDisplay(d)} postcode. The figure on the quote is the figure you pay.`,
      (d) =>
        `Replacing a boiler in ${d.name} is the most common job we are called for in the ${postcodeDisplay(d)} area. ${d.localAngle} Every replacement is fully fitted by experienced self-employed Gas Safe engineers. As covered in our Terms, the customer is responsible for registering the manufacturer warranty directly with the manufacturer within 30 days of installation.`,
      (d) =>
        `When the boiler in your ${d.name} home is past its tenth birthday, costing too much in winter bills, or letting the family down on cold mornings, replacement is usually cheaper across the next few years than another patch repair. We give homeowners a fixed price up front, with the boiler, parts, labour, VAT, a wireless thermostat and a full system flush all included.`,
    ],
  },

  "new-installation": {
    id: "new-installation",
    headings: [
      (area) => `New Boiler Installation in ${area}`,
      (area) => `New boiler installations across ${area}`,
      (area) => `Fitted boiler installations for ${area} homes`,
    ],
    bodies: [
      (d) =>
        `New boiler installations in ${d.name} cover everything from straightforward like-for-like combi swaps to back-boiler conversions and full system to combi changes. The typical home in this part of ${postcodeDisplay(d)} is a ${d.housingMix}, and we recommend the ${d.preferredBrands[0]} or ${d.preferredBrands[1]} range for most fits here.`,
      (d) =>
        `If you are arranging a new boiler installation in ${d.name}, the install is fitted by the Gas Safe engineers we work with in a single day in most cases. We arrive between 8 and 9am, isolate the old unit, fit the new boiler, run the full system flush, then pair the wireless thermostat and demonstrate it before we leave. ${d.localAngle}`,
      (d) =>
        `Our most-fitted installation in ${d.name} is the ${d.typicalJob}, but every job is quoted around your specific property. The price you see on the quote is the price you pay - no extras added on the day, no separate call-out fee, and no hidden parts charges.`,
    ],
  },

  "combi-upgrade": {
    id: "combi-upgrade",
    headings: [
      (area) => `Combi Boiler Upgrade in ${area}`,
      (area, postcode) => `Combi upgrades in ${area}, ${postcode}`,
      (area) => `Upgrading to a combi boiler in ${area}`,
    ],
    bodies: [
      (d) =>
        `A combi boiler upgrade in ${d.name} removes the need for a separate hot water tank, frees up cupboard space, and heats water on demand. We convert from regular, system or back boilers to a modern A-rated combi as a fixed-price job, with the old tank in the loft removed and disposed of as part of the price.`,
      (d) =>
        `Combi upgrades are a popular job in ${d.name}, especially for homeowners replacing an ageing regular or system boiler with a hot water tank still in place. ${d.localAngle} A combi is the right call where one bathroom and a sensible peak hot water demand make tank-fed systems unnecessary.`,
      (d) =>
        `If your ${d.name} home is moving to a combi for the first time, we run extra pipework where required, fit the combi in the most practical position, flush the system, and notify Building Control through Gas Safe. The fixed price covers all of it - no separate extras for the conversion work.`,
    ],
  },

  "central-heating": {
    id: "central-heating",
    headings: [
      (area) => `Central Heating Installation in ${area}`,
      (area) => `Central heating systems fitted across ${area}`,
      (area) => `${area} central heating installation`,
    ],
    bodies: [
      (d) =>
        `Central heating installations in ${d.name} run from straightforward boiler swaps to full system upgrades with new radiators, pipework and controls. Most ${d.position} homes do not need a complete overhaul - the existing radiators are usually in good condition, helped along by the full system flush we include as standard with every install.`,
      (d) =>
        `When you arrange a central heating installation in ${d.name}, we review your photos of the existing pipework and radiators first, then quote a single fixed price for the full job. ${d.localAngle} The result is a balanced, efficient system you can rely on through a Scottish winter.`,
      (d) =>
        `Our central heating engineers cover ${d.name} as part of our standard ${postcodeDisplay(d)} service area. A full heating install is more involved than a like-for-like swap, but the photo review is free and the quote is fixed. There are no surprise costs once work begins.`,
    ],
  },

  "full-system": {
    id: "full-system",
    headings: [
      (area) => `Full Heating System Upgrade in ${area}`,
      (area) => `Heating system upgrades across ${area}`,
      (area) => `Whole-home heating upgrades in ${area}`,
    ],
    bodies: [
      (d) =>
        `A full heating system upgrade in ${d.name} is the right call when the boiler is end-of-life and the radiators or pipework also need replacing. We carry out the lot as one project, with a single fixed price, a single completion date and one set of Gas Safe sign-off paperwork.`,
      (d) =>
        `For larger ${d.name} homes with two or more bathrooms, a full system upgrade often pairs a new A-rated combi with replacement radiators in the rooms that need them. ${d.localAngle} The Navien 10-year warranty is a popular choice for this type of job where peak flow rate matters.`,
      (d) =>
        `Full heating system upgrades in ${d.name} are quoted online from the photos and details you send. ${d.preferredBrands[0]} or ${d.preferredBrands[1]} are the two ranges we most commonly fit here for a system-wide upgrade, with the choice driven by warranty length, peak demand and budget.`,
    ],
  },

  "fixed-price": {
    id: "fixed-price",
    headings: [
      (area) => `Fixed Price Boiler Installation in ${area}`,
      (area) => `Fixed price quotes for ${area} homes`,
      (area) => `${area} fixed-price boiler installation`,
    ],
    bodies: [
      (d) =>
        `Fixed price boiler installation in ${d.name} means the figure on the quote is the figure you pay. Every install in ${postcodeDisplay(d)} already includes the boiler, parts, labour, VAT, a free wireless thermostat, a full system flush, standard pipework, flue, the manufacturer warranty and old boiler removal.`,
      (d) =>
        `We do not work on hourly rates or day rates for installations in ${d.name}. Once we review the photos and details you send us, we issue a single fixed price covering the full job. There are no separate call-out fees, no surprise extras on the day, and no finance products clipped onto the install.`,
      (d) =>
        `Homeowners in ${d.name} ask for a fixed price because it is the only way to know what a new boiler will cost up front. ${d.localAngle} The quote covers everything - parts, labour, VAT, warranty, thermostat, flush and old unit removal - in one number.`,
    ],
  },

  "gas-safe-installer": {
    id: "gas-safe-installer",
    headings: [
      (area) => `Gas Safe Boiler Installer serving ${area}`,
      (area) => `Gas Safe engineers covering ${area}`,
      (area) => `${area} Gas Safe registered boiler installation`,
    ],
    bodies: [
      (d) =>
        `Every gas job we carry out in ${d.name} is handled by experienced self-employed Gas Safe engineers. Each engineer carries a Gas Safe ID card and each engineer's Gas Safe registration can be verified directly at gassaferegister.co.uk before any work begins. There is no sub-contracting and no national lead-buying middle man between you and the engineer.`,
      (d) =>
        `Gas Safe registration is the legal minimum for working on a gas boiler in the UK, and it is non-negotiable for us. ${d.localAngle} Choosing a Gas Safe registered engineer in ${d.name} protects your home, your warranty and your insurance position.`,
      (d) =>
        `The Gas Safe engineers we work with cover every ${postcodeDisplay(d)} postcode in East Kilbride, including ${d.name}. Every installation, repair and annual service is logged with Gas Safe so the paperwork is in order if you ever need to call on the manufacturer warranty.`,
    ],
  },

  "emergency-replacement": {
    id: "emergency-replacement",
    headings: [
      (area) => `Emergency Boiler Replacement in ${area}`,
      (area) => `Urgent boiler replacement across ${area}`,
      (area) => `${area} emergency boiler replacement`,
    ],
    bodies: [
      (d) =>
        `If the boiler in your ${d.name} home has failed and the repair is not economical, we can usually get a replacement quoted, fitted and commissioned inside a few working days. Same-week installation is the norm rather than the exception in ${postcodeDisplay(d)}, especially during the busy winter months.`,
      (d) =>
        `Emergency boiler replacement in ${d.name} starts with a same-day call to assess whether the existing boiler can be safely repaired or whether replacement is the more honest answer. ${d.localAngle} If replacement is the right call, we move quickly to get heating and hot water back on.`,
      (d) =>
        `Call 01355 204045 if you are in ${d.name} and your boiler has stopped working. We will give you the earliest fitting slot we have, and where the property allows it we can usually run a temporary heating workaround during the install day so the family is not caught out.`,
    ],
  },

  "best-deals": {
    id: "best-deals",
    headings: [
      (area) => `Best Boiler Installation Deals in ${area}`,
      (area) => `Best-value boiler installations across ${area}`,
      (area) => `${area} fitted boiler deals`,
    ],
    bodies: [
      (d) =>
        `The best fitted boiler deal in ${d.name} depends on the home, not just the price tag. For a one-bathroom home in ${postcodeDisplay(d)}, the Vokera at £1,299 fitted with a 5-year warranty is hard to beat. For a 3 to 4 bed family home, the Worcester Bosch from £1,695 or the Navien from £1,835 with a 10-year warranty often work out cheaper across the warranty period.`,
      (d) =>
        `We do not run loss-leader installation deals in ${d.name} because the fixed-price model already takes the games out of the quote. The four brands we fit cover every sensible budget bracket - Vokera at £1,299, Ideal at £1,495, Worcester Bosch at £1,695, Navien at £1,835 - all fitted by Gas Safe engineers.`,
      (d) =>
        `${d.localAngle} The most-fitted brand in ${d.name} is the ${d.preferredBrands[0]}, with the ${d.preferredBrands[1]} as the popular next choice. Either way, the price you see is fully fitted. The customer is responsible for registering the manufacturer warranty directly within 30 days of installation.`,
    ],
  },
};

export function getSectionOrder(slug: string): SectionId[] {
  return sectionOrderings[districtHash(slug) % sectionOrderings.length];
}

export function renderSection(
  id: SectionId,
  district: District,
  positionIndex: number
): RenderedSection {
  const def = sections[id];
  const h = districtHash(district.slug);

  // Different rotation for headings vs bodies so the same district does not
  // always reuse the same indexing pattern across all 9 sections.
  const headingIndex = (h + positionIndex * 7) % def.headings.length;
  const bodyIndex = (h + positionIndex * 11) % def.bodies.length;

  return {
    id,
    heading: def.headings[headingIndex](district.name, postcodeDisplay(district)),
    body: def.bodies[bodyIndex](district),
  };
}

export function renderAllSections(district: District): RenderedSection[] {
  return getSectionOrder(district.slug).map((id, index) =>
    renderSection(id, district, index)
  );
}

// FAQ pool. Each district picks 5 from this list deterministically, plus one
// hyperlocal angle FAQ generated from the district's typicalJob field.
const faqPool: Array<{
  question: (area: string, postcode: string) => string;
  answer: (d: District) => string;
}> = [
  {
    question: (area) => `How much does boiler replacement cost in ${area}?`,
    answer: (d) =>
      `Fitted combi boiler prices in ${d.name} start from £1,299. Vokera is £1,299 fitted, Ideal from £1,495, Worcester Bosch from £1,695 and Navien from £1,835. Every price already includes installation, parts, labour, VAT, a free wireless thermostat and a full system flush.`,
  },
  {
    question: (area) => `Do you offer new boiler installation in ${area}?`,
    answer: (d) =>
      `Yes. We install new boilers across every street in ${d.name} as part of our standard ${postcodeDisplay(d)} service area. The install is carried out by the Gas Safe engineers we work with, with a single fixed price. The customer is responsible for registering the manufacturer warranty directly within 30 days of installation.`,
  },
  {
    question: (area) => `Can I get a combi boiler upgrade in ${area}?`,
    answer: (d) =>
      `Yes. Conversions from regular, system or back boilers to a modern A-rated combi are a routine job for us in ${d.name}. The fixed quote covers the new combi, any extra pipework and the system flush. Disposal of the old tank and packaging is at the nominated gas engineer's discretion.`,
  },
  {
    question: (area) => `Do you cover emergency boiler replacement in ${area}?`,
    answer: (d) =>
      `Yes. If your boiler has failed in ${d.name} and the repair is not economical, call 01355 204045. We will give you the earliest replacement slot we have, with same-week fits the norm in ${postcodeDisplay(d)}.`,
  },
  {
    question: (area) => `Which boiler brands are best for homes in ${area}?`,
    answer: (d) =>
      `For most ${d.name} homes, we recommend the ${d.preferredBrands[0]} or ${d.preferredBrands[1]} range, depending on bathrooms, peak demand and budget. ${d.localAngle}`,
  },
  {
    question: (area) => `Do you provide central heating installation in ${area}?`,
    answer: (d) =>
      `Yes. Central heating installation in ${d.name} covers boiler, radiators, pipework and controls. Most ${d.name} homes do not need a full overhaul - the existing radiators are usually in good condition, helped along by the full system flush we include as standard.`,
  },
  {
    question: (area) => `Are you Gas Safe engineers serving ${area}?`,
    answer: (d) =>
      `Yes. All gas work in ${d.name} is carried out by experienced self-employed Gas Safe engineers. Each engineer's Gas Safe registration can be verified directly at gassaferegister.co.uk before any work begins.`,
  },
  {
    question: (area) => `Is there a separate call-out charge in ${area}?`,
    answer: (d) =>
      `No. There is no separate call-out fee for fitting a new boiler in ${d.name}, and no travel charge for any ${postcodeDisplay(d)} postcode. The figure on the quote is the figure you pay.`,
  },
  {
    question: (area) => `How long does a boiler installation take in ${area}?`,
    answer: (d) =>
      `Most straightforward combi swaps in ${d.name} are completed in a single day. Back-boiler conversions, full system changeovers and boiler relocations usually run between one and a half and two and a half days. We confirm the exact timing on your fixed quote so there are no surprises.`,
  },
  {
    question: (area) => `How quickly can I get a quote for ${area}?`,
    answer: () =>
      `The online quote form takes about 60 seconds. If you would prefer to talk it through, call 01355 204045 and the team can usually give an indicative fixed price the same day, with installation dates often available the same or next week.`,
  },
];

export function renderDistrictFAQs(district: District) {
  const h = districtHash(district.slug);
  const start = h % faqPool.length;
  const picks: number[] = [];

  // Pick 5 deterministic FAQs without duplicates.
  for (let offset = 0; picks.length < 5 && offset < faqPool.length; offset++) {
    const index = (start + offset * 3) % faqPool.length;
    if (!picks.includes(index)) picks.push(index);
  }

  const generic = picks.map((index) => {
    const entry = faqPool[index];
    return {
      question: entry.question(district.name, postcodeDisplay(district)),
      answer: entry.answer(district),
    };
  });

  // Add one hyperlocal angle FAQ pulled from the district's typicalJob field.
  const localFaq = {
    question: `What is the most common boiler job you do in ${district.name}?`,
    answer: `The most common job we are booked for in ${district.name} is a ${district.typicalJob}. ${district.localAngle} The fixed price covers the boiler, parts, labour, VAT, the system flush, the wireless thermostat and the manufacturer warranty.`,
  };

  return [...generic, localFaq];
}

export function renderDistrictIntro(district: District): string {
  const nearby = district.notableNearby
    ? ` ${district.notableNearby.charAt(0).toUpperCase() + district.notableNearby.slice(1)}.`
    : "";
  return `${district.name} sits in ${district.position}, inside ${postcodeIntroPhrase(district)}.${nearby} The Gas Safe engineers we work with cover ${district.name} as part of our standard East Kilbride service area, with fixed-price installations, same-day repairs and annual servicing. ${district.localAngle}`;
}
