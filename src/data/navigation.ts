import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/" },
  {
    label: "Services",
    href: "/services/new-boiler-installation/",
    children: [
      { label: "New Boiler Installation", href: "/services/new-boiler-installation/" },
      { label: "Boiler Repair", href: "/services/boiler-repair/" },
      { label: "Annual Boiler Service", href: "/services/boiler-servicing/" },
    ],
  },
  { label: "Areas We Serve", href: "/areas-we-serve/" },
  { label: "Boiler Prices", href: "/boiler-prices/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Blogs", href: "/blogs/" },
  { label: "Contact", href: "/contact/" },
];
