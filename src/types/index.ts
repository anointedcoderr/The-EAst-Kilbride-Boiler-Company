export interface SiteSettings {
  businessName: string;
  shortName: string;
  phone: string;
  phoneHref: string;
  email: string;
  formRecipient: string;
  address: {
    street: string;
    city: string;
    region: string;
    country: string;
    postcode: string;
  };
  establishedYear: number;
  reviewCount: string;
  averageRating: number;
  happyCustomers: string;
  areasServed: number;
  maxWarranty: string;
  installationSpeed: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    x: string;
  };
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  product: string;
  standardPrice: number;
  premiumPrice: number;
  warranty: string;
  warrantyYears: number;
  tag: string;
  image: string;
  includes: string[];
  seoTitle: string;
  seoDescription: string;
  h1: string;
}

export interface District {
  name: string;
  slug: string;
  postcodeHub: "G74" | "G75";
  description: string;
  position: string;
  housingMix: string;
  preferredBrands: string[];
  localAngle: string;
  notableNearby?: string;
  typicalJob: string;
}

export interface PostcodeHub {
  code: string;
  name: string;
  slug: string;
  description: string;
  subtitle: string;
  districts: string[];
  seoTitle: string;
  seoDescription: string;
  h1: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  icon: string;
  priceFrom?: number;
  priceNote: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  klarnaAvailable: boolean;
}

export interface Review {
  id: string;
  name: string;
  initials: string;
  location: string;
  postcode: string;
  rating: number;
  text: string;
  verified: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
  pageTypes: string[];
}

export interface BlogPostInternalLink {
  label: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  h1: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  readMinutes: number;
  category: string;
  tags: string[];
  body: string[];
  internalLinks: BlogPostInternalLink[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
