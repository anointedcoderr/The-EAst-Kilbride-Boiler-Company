// Stage 2 keyword strategy reference.
//
// Used by the Stage 2 geo page generator and the homepage in Stage 2 only.
// Do NOT keyword-stuff Stage 1 pages from this list. Stage 1 uses the
// natural local copy that already lives in pageContent.ts.
//
// Placeholders are replaced at build time per district / postcode:
//   {Area}      -> e.g. "The Murray", "Calderwood", "Stewartfield"
//   {Postcode}  -> e.g. "G74", "G75"

export interface Stage2Keyword {
  id: string;
  pattern: string;
  intent: "transactional" | "informational" | "navigational";
  primaryFor: Array<"homepage" | "service" | "boilers" | "district" | "postcode-hub">;
  notes: string;
}

export const stage2MoneyKeywords: Stage2Keyword[] = [
  {
    id: "boiler-replacement-area",
    pattern: "Boiler Replacement {Area}",
    intent: "transactional",
    primaryFor: ["district", "postcode-hub", "service"],
    notes:
      "Top money keyword. Primary H1 candidate for district pages and the postcode hubs.",
  },
  {
    id: "central-heating-installation-area",
    pattern: "Central Heating Installation {Area}",
    intent: "transactional",
    primaryFor: ["district", "postcode-hub"],
    notes:
      "Use as a section H2 on district pages. Pair with the radiator and system flush content.",
  },
  {
    id: "new-boiler-installation-area",
    pattern: "New Boiler Installation {Area}",
    intent: "transactional",
    primaryFor: ["service", "district", "postcode-hub"],
    notes:
      "Already in scope for the Stage 1 service page. In Stage 2, also feed district H1 variants.",
  },
  {
    id: "combi-boiler-upgrade-area-postcode",
    pattern: "Combi Boiler Upgrade {Area} / {Postcode}",
    intent: "transactional",
    primaryFor: ["district", "postcode-hub", "service"],
    notes:
      "Variant for back-boiler to combi conversion content. Strong long-tail for older estates around The Village and Calderwood.",
  },
  {
    id: "gas-safe-boiler-installer-area",
    pattern: "Gas Safe Boiler Installer {Area}",
    intent: "transactional",
    primaryFor: ["district", "postcode-hub", "service"],
    notes:
      "Use with the Gas Safe engineers trust block. Link out to gassaferegister.co.uk. Do not invent a registration number.",
  },
  {
    id: "emergency-boiler-replacement-area",
    pattern: "Emergency Boiler Replacement {Area}",
    intent: "transactional",
    primaryFor: ["district", "postcode-hub"],
    notes:
      "Pair with the same-day call-out and repair-or-replace messaging. Do not overpromise instant attendance.",
  },
  {
    id: "full-heating-system-upgrade-area",
    pattern: "Full Heating System Upgrade {Area}",
    intent: "transactional",
    primaryFor: ["district", "postcode-hub"],
    notes:
      "Premium intent. Feed into Navien content and the larger detached homes context (Stewartfield, Thorntonhall, Whitemoss).",
  },
  {
    id: "fixed-price-boiler-installation-area",
    pattern: "Fixed Price Boiler Installation {Area}",
    intent: "transactional",
    primaryFor: ["district", "postcode-hub", "service", "boilers"],
    notes:
      "Aligns with the existing fixed-price messaging across the site. Use in the offer and pricing sections.",
  },
  {
    id: "central-heating-engineers-area",
    pattern: "Central Heating Engineers {Area}",
    intent: "transactional",
    primaryFor: ["district", "postcode-hub"],
    notes:
      "Supports the Gas Safe engineers content. Use sparingly to avoid keyword stuffing.",
  },
  {
    id: "best-boiler-installation-deals-area",
    pattern: "Best Boiler Installation Deals {Area}",
    intent: "transactional",
    primaryFor: ["district", "postcode-hub", "boilers"],
    notes:
      "Use carefully. Always pair with the four real brand prices. Do not invent discount language. No finance wording on installations.",
  },
];

// Stage 2 geo page sections that the district template must support.
// Each section ID maps to one or more of the keyword IDs above.
export const stage2DistrictSections: Array<{
  id: string;
  heading: string;
  feeds: string[];
}> = [
  {
    id: "boiler-replacement",
    heading: "Boiler Replacement in {Area}",
    feeds: ["boiler-replacement-area"],
  },
  {
    id: "new-boiler-installation",
    heading: "New Boiler Installation in {Area}",
    feeds: ["new-boiler-installation-area"],
  },
  {
    id: "combi-upgrade",
    heading: "Combi Boiler Upgrade in {Area}",
    feeds: ["combi-boiler-upgrade-area-postcode"],
  },
  {
    id: "central-heating-installation",
    heading: "Central Heating Installation in {Area}",
    feeds: ["central-heating-installation-area"],
  },
  {
    id: "full-heating-system-upgrade",
    heading: "Full Heating System Upgrade in {Area}",
    feeds: ["full-heating-system-upgrade-area"],
  },
  {
    id: "fixed-price-installation",
    heading: "Fixed Price Boiler Installation in {Area}",
    feeds: ["fixed-price-boiler-installation-area"],
  },
  {
    id: "gas-safe-installer",
    heading: "Gas Safe Boiler Installer serving {Area}",
    feeds: ["gas-safe-boiler-installer-area"],
  },
  {
    id: "emergency-replacement",
    heading: "Emergency Boiler Replacement in {Area}",
    feeds: ["emergency-boiler-replacement-area"],
  },
  {
    id: "best-deals",
    heading: "Best Boiler Installation Deals in {Area}",
    feeds: ["best-boiler-installation-deals-area"],
  },
  {
    id: "local-faqs",
    heading: "Local FAQs for {Area} ({Postcode}) homeowners",
    feeds: [],
  },
];

// Ranking caveat to display in delivery notes only, not on customer-facing pages.
export const stage2RankingCaveat =
  "We are building the technical and content foundation to target these searches. We do not guarantee Google rankings, top 3 pack placement, or AI engine visibility.";
