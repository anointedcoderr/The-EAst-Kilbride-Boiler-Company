import { siteSettings as staticSettings } from "@/data/siteSettings";
import { getSupabaseServer } from "./supabase";

// Public site-content reader.
//
// Reads global site settings from cms_site_settings in Supabase and
// merges them onto the existing static defaults. Designed to be safe:
// if Supabase is unreachable, returns null fields, or the CMS row is
// missing for any key, the static value from src/data/siteSettings.ts
// is used. The public website always renders, even if the CMS is down.
//
// Used by:
//   - layouts and components that consume siteSettings
//   - admin Settings page (Phase 1) to load + save editable fields

export interface SiteSettingsView {
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
  openingHours: string;
  mainCtaText: string;
  emergencyMessage: string;
  footerText: string;
}

// Editable subset of the settings - the admin Settings page surfaces
// these to the client. The other fields stay static for now (Phase 5
// can expand).
export interface EditableSiteSettings {
  businessName: string;
  phone: string;
  phoneHref: string;
  publicEmail: string;
  addressStreet: string;
  addressCity: string;
  addressRegion: string;
  addressPostcode: string;
  openingHours: string;
  mainCtaText: string;
  emergencyMessage: string;
  footerText: string;
  facebookUrl: string;
  areasServedCount: number;
}

const SETTINGS_KEYS = [
  "business_name",
  "phone",
  "phone_href",
  "public_email",
  "address_street",
  "address_city",
  "address_region",
  "address_postcode",
  "opening_hours",
  "main_cta_text",
  "emergency_message",
  "footer_text",
  "areas_served_count",
  "facebook_url",
] as const;

type SettingKey = (typeof SETTINGS_KEYS)[number];

async function loadCmsSettings(): Promise<Partial<Record<SettingKey, unknown>>> {
  try {
    const supabase = await getSupabaseServer();
    if (!supabase) return {};
    const { data, error } = await supabase
      .from("cms_site_settings")
      .select("key, value")
      .in("key", [...SETTINGS_KEYS]);
    if (error || !data) return {};
    const out: Partial<Record<SettingKey, unknown>> = {};
    for (const row of data as Array<{ key: string; value: unknown }>) {
      if ((SETTINGS_KEYS as readonly string[]).includes(row.key)) {
        out[row.key as SettingKey] = row.value;
      }
    }
    return out;
  } catch {
    return {};
  }
}

function asString(value: unknown, fallback: string): string {
  if (typeof value === "string") return value;
  return fallback;
}

function asNumber(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  return fallback;
}

export async function getSiteSettings(): Promise<SiteSettingsView> {
  const cms = await loadCmsSettings();
  return {
    businessName: asString(cms.business_name, staticSettings.businessName),
    shortName: staticSettings.shortName,
    phone: asString(cms.phone, staticSettings.phone),
    phoneHref: asString(cms.phone_href, staticSettings.phoneHref),
    email: asString(cms.public_email, staticSettings.email),
    formRecipient: staticSettings.formRecipient,
    address: {
      street: asString(cms.address_street, staticSettings.address.street),
      city: asString(cms.address_city, staticSettings.address.city),
      region: asString(cms.address_region, staticSettings.address.region),
      country: staticSettings.address.country,
      postcode: asString(
        cms.address_postcode,
        staticSettings.address.postcode
      ),
    },
    establishedYear: staticSettings.establishedYear,
    reviewCount: staticSettings.reviewCount,
    averageRating: staticSettings.averageRating,
    happyCustomers: staticSettings.happyCustomers,
    areasServed: asNumber(cms.areas_served_count, staticSettings.areasServed),
    maxWarranty: staticSettings.maxWarranty,
    installationSpeed: staticSettings.installationSpeed,
    socialLinks: {
      facebook: asString(cms.facebook_url, staticSettings.socialLinks.facebook),
      instagram: staticSettings.socialLinks.instagram,
      youtube: staticSettings.socialLinks.youtube,
      tiktok: staticSettings.socialLinks.tiktok,
      x: staticSettings.socialLinks.x,
    },
    openingHours: asString(
      cms.opening_hours,
      "24/7 emergency line. Standard bookings confirmed during business hours."
    ),
    mainCtaText: asString(cms.main_cta_text, "Get my fixed price quote"),
    emergencyMessage: asString(
      cms.emergency_message,
      "Boiler emergency? Call 01355 204045 for the earliest slot we have, including weekends."
    ),
    footerText: asString(
      cms.footer_text,
      "The East Kilbride Boiler Company - serving every G74 and G75 postcode."
    ),
  };
}

export async function getEditableSiteSettings(): Promise<EditableSiteSettings> {
  const view = await getSiteSettings();
  return {
    businessName: view.businessName,
    phone: view.phone,
    phoneHref: view.phoneHref,
    publicEmail: view.email,
    addressStreet: view.address.street,
    addressCity: view.address.city,
    addressRegion: view.address.region,
    addressPostcode: view.address.postcode,
    openingHours: view.openingHours,
    mainCtaText: view.mainCtaText,
    emergencyMessage: view.emergencyMessage,
    footerText: view.footerText,
    facebookUrl: view.socialLinks.facebook,
    areasServedCount: view.areasServed,
  };
}

const KEY_BY_FIELD: Record<keyof EditableSiteSettings, SettingKey> = {
  businessName: "business_name",
  phone: "phone",
  phoneHref: "phone_href",
  publicEmail: "public_email",
  addressStreet: "address_street",
  addressCity: "address_city",
  addressRegion: "address_region",
  addressPostcode: "address_postcode",
  openingHours: "opening_hours",
  mainCtaText: "main_cta_text",
  emergencyMessage: "emergency_message",
  footerText: "footer_text",
  facebookUrl: "facebook_url",
  areasServedCount: "areas_served_count",
};

export async function saveSiteSettings(
  patch: Partial<EditableSiteSettings>
): Promise<{ ok: boolean; reason?: string }> {
  const supabase = await getSupabaseServer();
  if (!supabase) {
    return { ok: false, reason: "Supabase is not configured." };
  }
  const rows: Array<{ key: string; value: unknown }> = [];
  for (const [field, value] of Object.entries(patch)) {
    if (value === undefined) continue;
    const key = KEY_BY_FIELD[field as keyof EditableSiteSettings];
    if (!key) continue;
    rows.push({ key, value });
  }
  if (rows.length === 0) return { ok: true };
  const { error } = await supabase
    .from("cms_site_settings")
    .upsert(rows, { onConflict: "key" });
  if (error) {
    console.error("[ekbc.cms.settings]", "save failed", error.message);
    return { ok: false, reason: error.message };
  }
  return { ok: true };
}

// Counts used by the admin home dashboard.
export interface DashboardCounts {
  leadsTotal: number;
  leadsNew: number;
  leadsContacted: number;
  pagesTotal: number;
  blogsTotal: number;
}

export async function getDashboardCounts(): Promise<DashboardCounts> {
  const fallback: DashboardCounts = {
    leadsTotal: 0,
    leadsNew: 0,
    leadsContacted: 0,
    pagesTotal: 0,
    blogsTotal: 0,
  };
  try {
    const supabase = await getSupabaseServer();
    if (!supabase) return fallback;
    const [leadsAll, leadsNew, leadsContacted, pages, blogs] =
      await Promise.all([
        supabase
          .from("quote_leads")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("quote_leads")
          .select("*", { count: "exact", head: true })
          .eq("status", "new"),
        supabase
          .from("quote_leads")
          .select("*", { count: "exact", head: true })
          .eq("status", "contacted"),
        supabase
          .from("cms_pages")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("cms_blog_posts")
          .select("*", { count: "exact", head: true }),
      ]);
    return {
      leadsTotal: leadsAll.count ?? 0,
      leadsNew: leadsNew.count ?? 0,
      leadsContacted: leadsContacted.count ?? 0,
      pagesTotal: pages.count ?? 0,
      blogsTotal: blogs.count ?? 0,
    };
  } catch {
    return fallback;
  }
}
