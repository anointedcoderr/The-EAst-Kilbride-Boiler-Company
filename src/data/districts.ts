import type { District } from "@/types";

// Each district is enriched with:
// - position: where it sits inside East Kilbride (used in intro lines)
// - housingMix: typical property stock we fit boilers into
// - preferredBrands: 2 brands that tend to suit homes here (out of our 4)
// - localAngle: one short paragraph used to make the page feel hyperlocal
// - notableNearby: optional landmark or street reference (kept neutral)
// - typicalJob: the most common boiler job we get called for in this area
// - needsReview: true if the postcodeHub above is still awaiting client
//   confirmation. Templates soft-pedal postcode wording on these pages.
//
// These fields feed the district page template and the section variation
// engine in src/lib/districtVariations.ts. Keeping the data in one place
// means a Stage 2 CMS edit only needs to touch this file.
//
// Postcode data safety policy:
//   Do not assign G74 or G75 manually without verification. District
//   postcode hub values must come from the verified district spreadsheet
//   supplied by the client, or from an authoritative source such as Royal
//   Mail's address finder. If a district's postcode is not confirmed, set
//   needsReview: true and avoid using the postcode in public SEO copy
//   until the client signs it off. The full 35-district postcode list was
//   verified by the client (revision dated 2026-06-08) and 7 entries were
//   flipped at that revision: The Murray, Birniehill, Mossside, Playsport
//   and Redwood moved from G75 to G74; Langlands and Philipshill moved
//   from G74 to G75. No entries currently carry needsReview - the flag
//   stays defined on the District type for future use if a new district
//   is added without a verified postcode.

export const districts: District[] = [
  // G75 Districts
  {
    // Corrected from G74 to G75 after client supplied postcode confirmation
    // (Sweet Thorn Drive: G75 9FR, Tannin Crescent: G75).
    name: "Ballerup Village",
    slug: "ballerup-village",
    postcodeHub: "G75",
    description:
      "Ballerup Village is a quiet residential pocket within the G75 postcode of East Kilbride. The Gas Safe engineers we work with provide fixed-price boiler installations, repairs and servicing across Ballerup Village.",
    position: "south East Kilbride",
    housingMix: "newer 2010s and 2020s mid-terrace and semi-detached family homes",
    preferredBrands: ["Worcester Bosch", "Ideal"],
    localAngle:
      "Ballerup Village is one of East Kilbride's newer developments, so most boilers here are still in their first warranty cycle, which makes annual servicing the most common job at this stage.",
    typicalJob: "first-warranty-cycle annual service",
  },
  // G74 Districts
  {
    name: "Calderwood",
    slug: "calderwood",
    postcodeHub: "G74",
    description:
      "Calderwood is one of East Kilbride's most established neighbourhoods. We provide fixed-price boiler installations, repairs and annual servicing to homes across Calderwood, G74.",
    position: "east East Kilbride",
    housingMix: "1960s and 70s ex-local-authority semis with later extensions",
    preferredBrands: ["Worcester Bosch", "Ideal"],
    localAngle:
      "Calderwood has a lot of properties on their second or third boiler, so we see plenty of back-boiler conversions here, along with straightforward replacements where the previous combi has just timed out.",
    typicalJob: "back boiler to combi conversion",
  },
  {
    name: "College Milton",
    slug: "college-milton",
    postcodeHub: "G74",
    description:
      "College Milton sits in the G74 postcode area of East Kilbride. The engineers we work with deliver fixed-price boiler installations, same-day repairs and annual servicing throughout College Milton.",
    position: "north East Kilbride",
    housingMix: "mixed commercial and residential streets with 1990s housing",
    preferredBrands: ["Ideal", "Worcester Bosch"],
    localAngle:
      "College Milton homes are a mix of family houses and converted properties from the nearby business area, so flue routing and access often need a little extra planning when you send us photos and details.",
    typicalJob: "straight combi replacement",
  },
  {
    name: "East Mains",
    slug: "east-mains",
    postcodeHub: "G74",
    description:
      "East Mains is a well-connected neighbourhood in G74 East Kilbride. We offer fixed-price boiler installations, emergency repairs and professional servicing across East Mains.",
    position: "central East Kilbride",
    housingMix: "mid-century semis and a sprinkling of newer infill builds",
    preferredBrands: ["Worcester Bosch", "Ideal"],
    localAngle:
      "East Mains has good road access, which means we can usually slot in a same-week installation date, and many of the older properties here benefit from a full system flush as part of the fixed quote.",
    typicalJob: "full system flush and combi swap",
  },
  {
    name: "High Common",
    slug: "high-common",
    postcodeHub: "G74",
    description:
      "High Common is a residential area in East Kilbride. We provide fixed-price boiler installations, repairs and annual servicing to High Common homeowners.",
    position: "north-east East Kilbride",
    housingMix: "modern semi-detached homes built from the late 1990s onward",
    preferredBrands: ["Ideal", "Worcester Bosch"],
    localAngle:
      "High Common homes are newer-build family houses, so most fits are straightforward A-rated combi replacements rather than full system overhauls.",
    typicalJob: "A-rated combi replacement",
  },
  {
    name: "Kingsgate",
    slug: "kingsgate",
    postcodeHub: "G74",
    description:
      "Kingsgate is a popular residential area in East Kilbride. We offer fixed-price boiler installations, same-day repair call-outs and annual servicing across Kingsgate.",
    position: "north-central East Kilbride",
    housingMix: "1990s detached and semi-detached family houses",
    preferredBrands: ["Worcester Bosch", "Navien"],
    localAngle:
      "Kingsgate properties tend to be 3 to 4 bedroom family homes with two bathrooms, which is where the Worcester Bosch and Navien ranges really earn their place.",
    notableNearby: "near Kingsgate Park retail area",
    typicalJob: "two-bathroom family home upgrade",
  },
  {
    name: "Kittochside",
    slug: "kittochside",
    postcodeHub: "G74",
    description:
      "Kittochside sits on the eastern edge of East Kilbride in the G74 postcode. We provide fixed-price boiler installations, repairs and servicing to Kittochside residents.",
    position: "south-east edge of East Kilbride",
    housingMix: "semi-rural cottages and large detached homes",
    preferredBrands: ["Navien", "Worcester Bosch"],
    localAngle:
      "Kittochside sits on the rural fringe, so we see larger detached homes here with higher hot water demand, which is where the Navien 10-year warranty and stronger flow rate earn their position.",
    typicalJob: "larger home full heating system upgrade",
  },
  {
    name: "Langlands",
    slug: "langlands",
    postcodeHub: "G75",
    description:
      "Langlands is a residential area in East Kilbride. We offer fixed-price boiler installations, repairs and annual servicing across Langlands.",
    position: "west East Kilbride",
    housingMix: "1970s family semis with later kitchen and rear extensions",
    preferredBrands: ["Ideal", "Worcester Bosch"],
    localAngle:
      "Langlands is a popular area for first-time movers, so plenty of fits here are first proper boiler upgrades from an old G-rated or D-rated unit to a modern A-rated combi.",
    typicalJob: "G-rated to A-rated combi upgrade",
  },
  {
    name: "Law Place",
    slug: "law-place",
    postcodeHub: "G74",
    description:
      "Law Place is a neighbourhood in East Kilbride. We deliver fixed-price boiler installations, repairs and servicing to homeowners throughout Law Place.",
    position: "central East Kilbride",
    housingMix: "compact terraces and mid-century semis",
    preferredBrands: ["Vokera", "Ideal"],
    localAngle:
      "Law Place homes are typically compact 2 bed properties, so the Vokera range at £1,299 fitted is the most popular pick here for homeowners keeping costs sensible.",
    typicalJob: "compact home like-for-like swap",
  },
  {
    name: "Nerston",
    slug: "nerston",
    postcodeHub: "G74",
    description:
      "Nerston is a well-known neighbourhood in G74 East Kilbride. We provide fixed-price boiler installations, same-day repairs and professional annual servicing across Nerston.",
    position: "north East Kilbride",
    housingMix: "mixed estate of semis, terraces and modern flats",
    preferredBrands: ["Ideal", "Worcester Bosch"],
    localAngle:
      "Nerston has a healthy mix of family homes and rented flats, so we see plenty of both private homeowner replacements and annual landlord gas safety checks here.",
    typicalJob: "annual landlord gas safety service",
  },
  {
    name: "Peel Park",
    slug: "peel-park",
    postcodeHub: "G74",
    description:
      "Peel Park is a residential area in East Kilbride. We offer fixed-price boiler installations, repairs and annual servicing to Peel Park homeowners.",
    position: "north East Kilbride",
    housingMix: "1990s and 2000s semi-detached and detached houses",
    preferredBrands: ["Worcester Bosch", "Ideal"],
    localAngle:
      "Peel Park homes are predominantly newer family builds with combis already in place from the original fit, so the upgrade conversation here is usually about brand and warranty length, not pipework.",
    typicalJob: "warranty-led brand upgrade",
  },
  {
    name: "Philipshill",
    slug: "philipshill",
    postcodeHub: "G75",
    description:
      "Philipshill is part of East Kilbride. We provide fixed-price boiler installations, emergency repairs and annual servicing across Philipshill.",
    position: "south-east edge of East Kilbride",
    housingMix: "semi-rural detached homes and converted cottages",
    preferredBrands: ["Navien", "Worcester Bosch"],
    localAngle:
      "Philipshill sits on the rural side of East Kilbride, so we deal with longer hot-water runs and bigger radiator counts more often than in the centre of town, which is exactly where Navien's flow rate matters.",
    typicalJob: "large detached full heating upgrade",
  },
  {
    name: "St Leonards",
    slug: "st-leonards",
    postcodeHub: "G74",
    description:
      "St Leonards is a neighbourhood in G74 East Kilbride. Our team delivers fixed-price boiler installations, same-day repairs and annual servicing to St Leonards residents.",
    position: "south-east East Kilbride",
    housingMix: "1970s and 80s family semis and mid-terrace homes",
    preferredBrands: ["Ideal", "Worcester Bosch"],
    localAngle:
      "St Leonards is one of the busiest areas we serve, with a steady stream of like-for-like combi swaps where the boiler has hit 12 or 13 years and is starting to lock out on cold mornings.",
    typicalJob: "12-year old combi replacement",
  },
  {
    name: "Stewartfield",
    slug: "stewartfield",
    postcodeHub: "G74",
    description:
      "Stewartfield is one of East Kilbride's newest and most popular residential areas in G74. We provide fixed-price boiler installations, repairs and servicing across Stewartfield.",
    position: "north East Kilbride",
    housingMix: "modern 4-bed detached and semi-detached family houses",
    preferredBrands: ["Worcester Bosch", "Navien"],
    localAngle:
      "Stewartfield is full of newer 3 and 4 bed family homes with two bathrooms, so we recommend the Worcester Bosch range for premium reliability or the Navien for the longest 10-year warranty and strongest flow rate.",
    typicalJob: "two-bathroom family upgrade with extended warranty",
  },
  {
    name: "The Village",
    slug: "the-village",
    postcodeHub: "G74",
    description:
      "The Village is the original heart of East Kilbride in the G74 postcode, also known locally as the East Kilbride Town Centre. The Gas Safe engineers we work with deliver fixed-price boiler installations, repairs and annual servicing to The Village.",
    position: "central historic East Kilbride",
    housingMix: "older stone properties, converted cottages and traditional terraces",
    preferredBrands: ["Worcester Bosch", "Ideal"],
    localAngle:
      "The Village has the oldest housing stock in East Kilbride, which means we see more back-boiler conversions and chimney flue re-routes here than anywhere else in G74.",
    notableNearby: "near East Kilbride Old Parish Church",
    typicalJob: "back boiler conversion and flue re-route",
  },
  {
    name: "Thorntonhall",
    slug: "thorntonhall",
    postcodeHub: "G74",
    description:
      "Thorntonhall is a semi-rural area on the edge of G74 East Kilbride. We offer fixed-price boiler installations, repairs and professional servicing to Thorntonhall homeowners.",
    position: "north-west edge of East Kilbride",
    housingMix: "large detached executive homes and traditional villas",
    preferredBrands: ["Navien", "Worcester Bosch"],
    localAngle:
      "Thorntonhall has some of the largest properties we cover, with multiple bathrooms and high peak demand, so we typically recommend the Navien with the 10-year warranty for these homes.",
    typicalJob: "large detached system upgrade with high flow rate",
  },
  {
    name: "West Mains",
    slug: "west-mains",
    postcodeHub: "G74",
    description:
      "West Mains is a residential area in G74 East Kilbride. We provide fixed-price boiler installations, same-day repair call-outs and annual servicing across West Mains.",
    position: "central-west East Kilbride",
    housingMix: "1960s ex-local-authority terraces and semis",
    preferredBrands: ["Ideal", "Worcester Bosch"],
    localAngle:
      "West Mains is one of the original East Kilbride New Town districts, so we see plenty of homes still on a regular or system boiler upgrading to a modern combi for the first time.",
    typicalJob: "regular to combi conversion",
  },
  {
    name: "Whitemoss",
    slug: "whitemoss",
    postcodeHub: "G74",
    description:
      "Whitemoss is a neighbourhood in the G74 postcode of East Kilbride. The engineers we work with deliver fixed-price boiler installations, repairs and annual servicing throughout Whitemoss.",
    position: "central East Kilbride",
    housingMix: "mid-century semis and modern flats",
    preferredBrands: ["Ideal", "Worcester Bosch"],
    localAngle:
      "Whitemoss is well-positioned for these engineers to reach quickly on emergency calls, which is one reason it accounts for a healthy share of our same-day repair work each winter.",
    typicalJob: "same-day boiler repair call-out",
  },
  // G75 Districts
  {
    name: "Birniehill",
    slug: "birniehill",
    postcodeHub: "G74",
    description:
      "Birniehill is a residential area in the G74 postcode of East Kilbride. We provide fixed-price boiler installations, same-day repairs and annual servicing across Birniehill.",
    position: "south-east East Kilbride",
    housingMix: "1970s and 80s semis with modern infill builds",
    preferredBrands: ["Ideal", "Worcester Bosch"],
    localAngle:
      "Birniehill homes are typically 3 bed semis with a single bathroom, which is the sweet spot for the Ideal and Worcester Bosch ranges fitted as a like-for-like combi swap.",
    typicalJob: "3-bed semi combi swap",
  },
  {
    name: "Crutherland",
    slug: "crutherland",
    postcodeHub: "G75",
    description:
      "Crutherland is part of the G75 postcode in East Kilbride. The Gas Safe engineers we work with offer fixed-price boiler installations, repairs and professional servicing to Crutherland residents.",
    position: "south East Kilbride",
    housingMix: "modern detached family homes and semi-rural properties",
    preferredBrands: ["Worcester Bosch", "Navien"],
    localAngle:
      "Crutherland sits on the southern edge of G75, with larger detached family homes that benefit from the Worcester Bosch premium build or the Navien 10-year warranty.",
    typicalJob: "detached family home upgrade",
  },
  {
    name: "Gardenhall",
    slug: "gardenhall",
    postcodeHub: "G75",
    description:
      "Gardenhall is a well-established neighbourhood in G75 East Kilbride. We deliver fixed-price boiler installations, emergency repairs and annual servicing across Gardenhall.",
    position: "central G75 East Kilbride",
    housingMix: "1970s family semis and mid-terrace homes",
    preferredBrands: ["Ideal", "Vokera"],
    localAngle:
      "Gardenhall is one of the longest-established G75 neighbourhoods, so we see a steady stream of replacement work where the original boiler has reached the end of its life.",
    typicalJob: "end-of-life replacement",
  },
  {
    name: "Greenhills",
    slug: "greenhills",
    postcodeHub: "G75",
    description:
      "Greenhills is a popular residential area in the G75 postcode of East Kilbride. We provide fixed-price boiler installations, same-day repairs and annual servicing to Greenhills homeowners.",
    position: "central-south East Kilbride",
    housingMix: "mid-century terraces, semis and a strong mix of rented properties",
    preferredBrands: ["Vokera", "Ideal"],
    localAngle:
      "Greenhills has a large share of single-bathroom homes, so the Vokera at £1,299 fitted is our most popular recommendation here, with Ideal as the next step up.",
    notableNearby: "near Greenhills Square",
    typicalJob: "one-bathroom value combi fit",
  },
  {
    name: "Hairmyres",
    slug: "hairmyres",
    postcodeHub: "G75",
    description:
      "Hairmyres is a key neighbourhood in G75 East Kilbride. Our team offers fixed-price boiler installations, same-day repair call-outs and annual servicing across Hairmyres.",
    position: "south-west East Kilbride",
    housingMix: "1990s and newer family homes and modern flats",
    preferredBrands: ["Worcester Bosch", "Ideal"],
    localAngle:
      "Hairmyres is a key residential area close to the hospital, and we regularly serve healthcare workers on shift patterns, so we prioritise booking flexible same-day or evening appointments here where we can.",
    notableNearby: "near Hairmyres Hospital",
    typicalJob: "shift-friendly servicing and replacement",
  },
  {
    name: "Jackton",
    slug: "jackton",
    postcodeHub: "G75",
    description:
      "Jackton is a growing residential area in the G75 postcode of East Kilbride. We provide fixed-price boiler installations, repairs and annual servicing to Jackton homeowners.",
    position: "south-west East Kilbride",
    housingMix: "modern detached and semi-detached family homes from 2010 onward",
    preferredBrands: ["Worcester Bosch", "Navien"],
    localAngle:
      "Jackton has grown rapidly with new family housing, so most boilers here are still in their first warranty period, which makes annual servicing the most common job at this stage.",
    typicalJob: "first-warranty-period servicing",
  },
  {
    name: "Kelvin",
    slug: "kelvin",
    postcodeHub: "G75",
    description:
      "Kelvin is a neighbourhood in East Kilbride. We deliver fixed-price boiler installations, repairs and professional servicing across Kelvin.",
    position: "south-east East Kilbride",
    housingMix: "1980s and 90s family semis and detached homes",
    preferredBrands: ["Ideal", "Worcester Bosch"],
    localAngle:
      "Kelvin is a settled area with plenty of long-standing homeowners, and many of the boilers we replace here are second or third units in the same property, which means we know the pipework patterns well.",
    typicalJob: "second-generation replacement",
  },
  {
    name: "Lindsayfield",
    slug: "lindsayfield",
    postcodeHub: "G75",
    description:
      "Lindsayfield is a modern residential area in G75 East Kilbride. We offer fixed-price boiler installations, same-day repairs and annual servicing throughout Lindsayfield.",
    position: "south East Kilbride",
    housingMix: "modern 3 and 4 bed family homes from the 2000s onward",
    preferredBrands: ["Worcester Bosch", "Navien"],
    localAngle:
      "Lindsayfield homes were originally fitted with builder-spec boilers from the developer, and a lot are now ageing out and being replaced with a brand-name A-rated combi for the longer warranty.",
    typicalJob: "builder-spec to brand-name replacement",
  },
  {
    name: "Mossneuk",
    slug: "mossneuk",
    postcodeHub: "G75",
    description:
      "Mossneuk is part of the G75 postcode area in East Kilbride. The engineers we work with provide fixed-price boiler installations, emergency repairs and annual servicing across Mossneuk.",
    position: "central-south East Kilbride",
    housingMix: "compact terraces and 2 bed semis with combis already in place",
    preferredBrands: ["Vokera", "Ideal"],
    localAngle:
      "Mossneuk is one of the most cost-conscious areas in G75, so the £1,299 Vokera with a 5-year warranty is the most-fitted combi here, year after year.",
    typicalJob: "compact home best-value fit",
  },
  {
    name: "Mossside",
    slug: "mossside",
    postcodeHub: "G74",
    description:
      "Mossside is a residential area in East Kilbride. We deliver fixed-price boiler installations, same-day repairs and annual servicing to Mossside residents.",
    position: "south East Kilbride",
    housingMix: "1970s and 80s family semis and modern terraces",
    preferredBrands: ["Ideal", "Worcester Bosch"],
    localAngle:
      "Mossside is a tight-knit residential area where we have done multiple installations on the same streets, so neighbours often recommend us by name when their own boiler needs attention.",
    typicalJob: "neighbour-referral replacement",
  },
  {
    name: "Newlandsmuir",
    slug: "newlandsmuir",
    postcodeHub: "G75",
    description:
      "Newlandsmuir is a well-known neighbourhood in the G75 postcode of East Kilbride. We provide fixed-price boiler installations, repairs and professional servicing across Newlandsmuir.",
    position: "south-central East Kilbride",
    housingMix: "modern 2000s and 2010s family housing",
    preferredBrands: ["Worcester Bosch", "Ideal"],
    localAngle:
      "Newlandsmuir is one of the more recent developments in G75, so we see plenty of first replacements where the original developer-fit boiler is just reaching the end of its standard warranty.",
    typicalJob: "first replacement after warranty expiry",
  },
  {
    name: "Playsport",
    slug: "playsport",
    postcodeHub: "G74",
    description:
      "Playsport is an area in East Kilbride. We offer fixed-price boiler installations, same-day repair call-outs and annual servicing to Playsport residents.",
    position: "south East Kilbride",
    housingMix: "mixed residential and leisure-adjacent properties",
    preferredBrands: ["Ideal", "Worcester Bosch"],
    localAngle:
      "Playsport sits alongside one of East Kilbride's leisure complexes, and homeowners here often ask for the quietest combi we can fit, which makes the Worcester and Ideal ranges with low noise ratings the natural choice.",
    notableNearby: "near East Kilbride Playsport",
    typicalJob: "low-noise combi fit",
  },
  {
    name: "Redwood",
    slug: "redwood",
    postcodeHub: "G74",
    description:
      "Redwood is a residential neighbourhood in East Kilbride. We provide fixed-price boiler installations, repairs and annual servicing across Redwood.",
    position: "south-central East Kilbride",
    housingMix: "1980s and 90s detached and semi-detached homes",
    preferredBrands: ["Worcester Bosch", "Ideal"],
    localAngle:
      "Redwood homes are settled family properties, and many of the boilers here are second-generation replacements where homeowners already know the brand they want to stay with.",
    typicalJob: "brand-loyal replacement",
  },
  {
    name: "Strathaven Rd",
    slug: "strathaven-rd",
    postcodeHub: "G75",
    description:
      "Strathaven Rd is part of East Kilbride. We deliver fixed-price boiler installations, repairs and annual servicing along Strathaven Rd.",
    position: "south edge of East Kilbride",
    housingMix: "mixed properties along the arterial route, including older cottages and modern semis",
    preferredBrands: ["Worcester Bosch", "Ideal"],
    localAngle:
      "Strathaven Rd is a busy through-route, so we often plan installations here for weekdays when access is easier and noise is less of an issue for neighbours.",
    typicalJob: "access-aware installation planning",
  },
  {
    name: "The Murray",
    slug: "the-murray",
    postcodeHub: "G74",
    description:
      "The Murray is one of East Kilbride's largest neighbourhoods in the G74 postcode. We offer fixed-price boiler installations, same-day repairs and professional servicing across The Murray.",
    position: "central G74 East Kilbride",
    housingMix: "1960s and 70s ex-local-authority terraces, semis and modern flats",
    preferredBrands: ["Vokera", "Ideal"],
    localAngle:
      "The Murray is one of the highest-volume areas we serve, with mostly compact 2 to 3 bed homes, so the Vokera at £1,299 fitted is the most common combi we install here.",
    notableNearby: "near The Murray shopping area",
    typicalJob: "high-volume compact home swap",
  },
  {
    name: "Westwood",
    slug: "westwood",
    postcodeHub: "G75",
    description:
      "Westwood is a popular residential area in G75 East Kilbride. We provide fixed-price boiler installations, emergency repairs and annual servicing to Westwood homeowners.",
    position: "west East Kilbride",
    housingMix: "mid-century terraces and semis with modern infill family housing",
    preferredBrands: ["Ideal", "Worcester Bosch"],
    localAngle:
      "Westwood is a long-established area where many of the original heating systems have already been replaced once, so most fits here are straightforward like-for-like combi upgrades with no major pipework changes.",
    typicalJob: "straightforward like-for-like swap",
  },
  {
    name: "Whitehills",
    slug: "whitehills",
    postcodeHub: "G75",
    description:
      "Whitehills is a neighbourhood in the G75 postcode of East Kilbride. The engineers we work with deliver fixed-price boiler installations, repairs and annual servicing throughout Whitehills.",
    position: "south-west East Kilbride",
    housingMix: "1980s and 90s family semis and modern detached homes",
    preferredBrands: ["Worcester Bosch", "Ideal"],
    localAngle:
      "Whitehills homes are mainly 3 and 4 bed family properties, so the Worcester Bosch and Ideal ranges are usually the right fit for a comfortable two-bathroom upgrade.",
    typicalJob: "family two-bathroom upgrade",
  },
];

export const g74Districts = districts.filter((d) => d.postcodeHub === "G74");
export const g75Districts = districts.filter((d) => d.postcodeHub === "G75");

export function getDistrictBySlug(slug: string) {
  return districts.find((d) => d.slug === slug);
}
