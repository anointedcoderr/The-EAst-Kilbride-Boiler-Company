import type { District } from "@/types";

// For districts where the postcode hub has not been verified against the
// client's source-of-truth spreadsheet, we soften the customer-facing copy
// so we never assert an unverified postcode in public content. Templates
// call these helpers anywhere they would otherwise hard-code postcodeHub
// in visible text.
//
// Machine-readable schema (areaServed) keeps the best-guess postcode -
// search engines treat structured data as a hint, not a certified claim,
// and the JSON-LD will be re-verified when the audit is complete.

export function postcodeDisplay(district: District): string {
  return district.needsReview ? "East Kilbride" : district.postcodeHub;
}

export function areaLabel(district: District): string {
  return district.needsReview
    ? `${district.name}, East Kilbride`
    : `${district.name}, ${district.postcodeHub}`;
}

export function postcodeCoverageLabel(district: District): string {
  return district.needsReview
    ? "covers the wider East Kilbride area"
    : `covers all of ${district.postcodeHub}`;
}

export function postcodeIntroPhrase(district: District): string {
  return district.needsReview
    ? "the wider East Kilbride area"
    : `the ${district.postcodeHub} postcode`;
}
