import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "new-boiler-installation",
    name: "New Boiler Installation",
    slug: "new-boiler-installation",
    shortDescription:
      "Fixed-price boiler installations from £1,299. All materials included, fitted by Gas Safe Experts.",
    icon: "Zap",
    priceFrom: 1299,
    priceNote: "From £1,299",
    seoTitle: "New Boiler Installation in East Kilbride | EKBC - Fixed Price From £1,299",
    seoDescription:
      "Professional new boiler installation across all 35 East Kilbride districts. Gas Safe Experts, fixed-price quotes, no hidden extras. Call 01355 459096 today.",
    h1: "New Boiler Installation in East Kilbride - Fixed Price From £1,299",
    klarnaAvailable: false,
  },
  {
    id: "boiler-repair",
    name: "Boiler Repair",
    slug: "boiler-repair",
    shortDescription:
      "Same-day boiler repair across East Kilbride. Fast response, fair prices, Gas Safe Experts.",
    icon: "Wrench",
    priceNote: "Fast Response",
    seoTitle: "Boiler Repair East Kilbride | EKBC - Gas Safe Experts, Same-Day Call-Out",
    seoDescription:
      "Professional boiler repair across all 35 East Kilbride districts. Gas Safe Experts, fixed-price quotes, no hidden extras. Call 01355 459096 today.",
    h1: "Boiler Repair East Kilbride - Gas Safe Experts, Same-Day Call-Out",
    klarnaAvailable: true,
  },
  {
    id: "boiler-servicing",
    name: "Annual Boiler Service",
    slug: "boiler-servicing",
    shortDescription:
      "Keep your boiler running safely and efficiently with a Gas Safe checked annual service.",
    icon: "Settings",
    priceNote: "Gas Safe Checked",
    seoTitle: "Annual Boiler Service East Kilbride | EKBC - Worcester, Ideal, Vokera, Navien",
    seoDescription:
      "Professional annual boiler servicing across all 35 East Kilbride districts. Gas Safe Experts, fixed-price quotes, no hidden extras. Call 01355 459096 today.",
    h1: "Annual Boiler Service East Kilbride - Worcester, Ideal, Vokera, Navien",
    klarnaAvailable: true,
  },
];
