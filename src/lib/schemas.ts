import { siteSettings } from "@/data/siteSettings";
import type { Service, FAQ } from "@/types";

const SITE_URL = "https://www.eastkilbrideboilercompany.co.uk";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: siteSettings.businessName,
    alternateName: siteSettings.shortName,
    url: SITE_URL,
    telephone: siteSettings.phone,
    email: siteSettings.email,
    image: `${SITE_URL}/images/hero-engineer.jpg`,
    logo: `${SITE_URL}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSettings.address.street,
      addressLocality: siteSettings.address.city,
      addressRegion: siteSettings.address.region,
      postalCode: siteSettings.address.postcode,
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 55.7593,
      longitude: -4.1772,
    },
    areaServed: ["G74", "G75", "East Kilbride"],
    foundingDate: String(siteSettings.establishedYear),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteSettings.averageRating,
      reviewCount: 8200,
      bestRating: 5,
      worstRating: 1,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: {
      "@id": `${SITE_URL}/#localbusiness`,
    },
    areaServed: {
      "@type": "Place",
      name: "East Kilbride",
    },
    description: service.shortDescription,
    url: `${SITE_URL}/services/${service.slug}/`,
    ...(service.priceFrom && {
      offers: {
        "@type": "Offer",
        priceCurrency: "GBP",
        price: service.priceFrom,
        availability: "https://schema.org/InStock",
      },
    }),
  };
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}`,
    })),
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
