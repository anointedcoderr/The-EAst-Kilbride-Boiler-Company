import { brands } from "@/data/brands";
import { districts } from "@/data/districts";
import { blogPosts } from "@/data/blogPosts";
import { getSupabaseServer } from "./supabase";

// CMS-managed pages registry.
//
// EKBC has ~60 public URLs across the site. The CMS doesn't need to
// invent these - they're already enumerated in static data files. This
// module builds a "known pages" catalog from those static sources, so
// /admin/pages can list every page immediately, even before any
// cms_pages row exists. The first time a page is saved, its cms_pages
// row is created. Until then, the static defaults are shown.

export type CmsPageType =
  | "homepage"
  | "service"
  | "boilers"
  | "brand"
  | "blog-index"
  | "blog-post"
  | "areas-hub"
  | "postcode-hub"
  | "district"
  | "static";

export type CmsPageStatus = "draft" | "published";

export interface CmsPageRow {
  id: string;
  title: string;
  slug: string;
  page_type: string;
  postcode_area: string | null;
  h1: string | null;
  meta_title: string | null;
  meta_description: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  sections?: unknown;
  status: CmsPageStatus;
  is_indexable: boolean;
  created_at: string;
  updated_at: string;
}

export interface KnownPage {
  slug: string;        // URL path, also the cms_pages.slug
  title: string;       // Default title for the admin list
  pageType: CmsPageType;
  postcodeArea: string | null;
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
  defaultH1?: string;
  defaultHeroTitle?: string;
  defaultHeroSubtitle?: string;
}

export interface PageListing extends KnownPage {
  cmsRow: CmsPageRow | null;
  isPublished: boolean;
  inCms: boolean;
  lastUpdated: string | null;
}

const STANDALONE_PAGES: KnownPage[] = [
  {
    slug: "/",
    title: "Homepage",
    pageType: "homepage",
    postcodeArea: null,
    defaultMetaTitle:
      "East Kilbride Boiler Company | EKBC - Boiler Replacement G74 / G75",
    defaultMetaDescription:
      "East Kilbride's #1 boiler replacement company. Fixed-price installations across 35 EK areas. Gas Safe engineers, up to 12-year warranties. Call 01355 204045.",
    defaultH1: "The East Kilbride Boiler Company",
    defaultHeroTitle: "The East Kilbride Boiler Company",
    defaultHeroSubtitle: "Serving all areas of East Kilbride G74 / G75",
  },
  {
    slug: "/services/new-boiler-installation/",
    title: "New Boiler Installation",
    pageType: "service",
    postcodeArea: null,
    defaultMetaTitle:
      "New Boiler Installation in East Kilbride | EKBC - Fixed Price From £1,299",
    defaultMetaDescription:
      "Fixed-price new boiler installation across G74 and G75 East Kilbride. Worcester Bosch, Ideal, Vokera and Navien fitted by Gas Safe engineers.",
    defaultH1:
      "New Boiler Installation in East Kilbride - Fixed Price From £1,299",
  },
  {
    slug: "/services/boiler-repair/",
    title: "Boiler Repair",
    pageType: "service",
    postcodeArea: null,
    defaultMetaTitle: "Boiler Repair East Kilbride | EKBC",
    defaultMetaDescription:
      "Gas Safe checked boiler repairs across East Kilbride G74 and G75. Call 01355 204045.",
    defaultH1: "Boiler repairs across G74 and G75",
  },
  {
    slug: "/services/boiler-servicing/",
    title: "Annual Boiler Servicing",
    pageType: "service",
    postcodeArea: null,
    defaultMetaTitle: "Annual Boiler Service East Kilbride | EKBC",
    defaultMetaDescription:
      "Annual boiler servicing for East Kilbride homes. Gas Safe checked, warranty-friendly. Call 01355 204045.",
    defaultH1: "Annual boiler servicing across East Kilbride",
  },
  {
    slug: "/boilers/",
    title: "Boiler Prices",
    pageType: "boilers",
    postcodeArea: null,
    defaultMetaTitle: "Boiler Prices East Kilbride | EKBC",
    defaultMetaDescription:
      "Fixed boiler prices for East Kilbride homes. Worcester, Ideal, Vokera, Navien. Call 01355 204045.",
    defaultH1: "Fixed boiler prices for East Kilbride homes",
  },
  {
    slug: "/areas-we-serve/",
    title: "Areas We Serve",
    pageType: "areas-hub",
    postcodeArea: null,
    defaultMetaTitle: "Areas We Serve in East Kilbride | EKBC",
    defaultMetaDescription:
      "We cover every G74 and G75 postcode across all 35 East Kilbride districts.",
    defaultH1: "Areas we serve in East Kilbride",
  },
  {
    slug: "/areas-we-serve/g74/",
    title: "G74 Hub",
    pageType: "postcode-hub",
    postcodeArea: "G74",
    defaultMetaTitle: "Boiler Service G74 East Kilbride | EKBC",
    defaultMetaDescription:
      "Boiler installation, repair and servicing across every G74 East Kilbride district.",
    defaultH1: "Boilers across the G74 postcode",
  },
  {
    slug: "/areas-we-serve/g75/",
    title: "G75 Hub",
    pageType: "postcode-hub",
    postcodeArea: "G75",
    defaultMetaTitle: "Boiler Service G75 East Kilbride | EKBC",
    defaultMetaDescription:
      "Boiler installation, repair and servicing across every G75 East Kilbride district.",
    defaultH1: "Boilers across the G75 postcode",
  },
  {
    slug: "/blogs/",
    title: "Blog Index",
    pageType: "blog-index",
    postcodeArea: null,
    defaultMetaTitle: "Boiler Buying Guides East Kilbride | EKBC",
    defaultMetaDescription:
      "Boiler buying, repair and servicing guides for East Kilbride homeowners.",
    defaultH1: "Boiler guides and news",
  },
  {
    slug: "/about/",
    title: "About",
    pageType: "static",
    postcodeArea: null,
  },
  {
    slug: "/contact/",
    title: "Contact",
    pageType: "static",
    postcodeArea: null,
  },
  {
    slug: "/faq/",
    title: "FAQ",
    pageType: "static",
    postcodeArea: null,
  },
  {
    slug: "/terms/",
    title: "Terms",
    pageType: "static",
    postcodeArea: null,
  },
  {
    slug: "/privacy/",
    title: "Privacy",
    pageType: "static",
    postcodeArea: null,
  },
];

export function getKnownPages(): KnownPage[] {
  const pages: KnownPage[] = [...STANDALONE_PAGES];

  for (const brand of brands) {
    pages.push({
      slug: `/boilers/${brand.slug}/`,
      title: `${brand.name} Page`,
      pageType: "brand",
      postcodeArea: null,
      defaultMetaTitle: brand.seoTitle ?? `${brand.name} Boiler | EKBC`,
      defaultMetaDescription:
        brand.seoDescription ??
        `${brand.name} boiler installation across East Kilbride.`,
      defaultH1: brand.h1 ?? `${brand.name} boiler installation`,
    });
  }

  for (const post of blogPosts) {
    pages.push({
      slug: `/blogs/${post.slug}/`,
      title: post.title,
      pageType: "blog-post",
      postcodeArea: null,
      defaultMetaTitle: post.metaTitle ?? post.title,
      defaultMetaDescription:
        post.metaDescription ?? post.excerpt ?? "",
      defaultH1: post.title,
    });
  }

  for (const district of districts) {
    pages.push({
      slug: `/areas-we-serve/${district.slug}/`,
      title: `${district.name}`,
      pageType: "district",
      postcodeArea: district.postcodeHub ?? null,
      defaultMetaTitle: `Boilers in ${district.name} | EKBC`,
      defaultMetaDescription: `Boiler installation, repair and servicing in ${district.name}, East Kilbride.`,
      defaultH1: `Boilers in ${district.name}`,
    });
  }

  return pages;
}

export interface ListPagesOptions {
  pageType?: CmsPageType | "all";
  status?: CmsPageStatus | "all";
  search?: string;
}

export async function listAllPages(
  options: ListPagesOptions = {}
): Promise<PageListing[]> {
  const known = getKnownPages();
  let cmsRows: CmsPageRow[] = [];
  try {
    const supabase = await getSupabaseServer();
    if (supabase) {
      const { data } = await supabase
        .from("cms_pages")
        .select("*")
        .limit(2000);
      if (data) cmsRows = data as CmsPageRow[];
    }
  } catch {
    cmsRows = [];
  }

  const cmsBySlug = new Map<string, CmsPageRow>();
  for (const row of cmsRows) cmsBySlug.set(row.slug, row);
  const knownSlugs = new Set(known.map((p) => p.slug));

  const merged: PageListing[] = known.map((page) => {
    const cmsRow = cmsBySlug.get(page.slug) ?? null;
    return {
      ...page,
      cmsRow,
      isPublished: cmsRow ? cmsRow.status === "published" : true,
      inCms: cmsRow !== null,
      lastUpdated: cmsRow ? cmsRow.updated_at : null,
    };
  });

  // Custom pages created via createCustomPage have slugs that aren't
  // in the known registry. Surface them in the list too.
  for (const row of cmsRows) {
    if (knownSlugs.has(row.slug)) continue;
    merged.push({
      slug: row.slug,
      title: row.title,
      pageType: "static",
      postcodeArea: row.postcode_area ?? null,
      cmsRow: row,
      isPublished: row.status === "published",
      inCms: true,
      lastUpdated: row.updated_at,
    });
  }

  let filtered = merged;
  if (options.pageType && options.pageType !== "all") {
    filtered = filtered.filter((p) => p.pageType === options.pageType);
  }
  if (options.status && options.status !== "all") {
    filtered = filtered.filter(
      (p) => (p.cmsRow?.status ?? "published") === options.status
    );
  }
  if (options.search) {
    const q = options.search.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter((p) =>
        [p.slug, p.title, p.pageType, p.postcodeArea ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
  }

  return filtered;
}

export interface CmsPageWithDefaults {
  slug: string;
  known: KnownPage;
  cmsRow: CmsPageRow | null;
}

export async function getCmsPageBySlug(
  slug: string
): Promise<CmsPageWithDefaults | null> {
  const known = getKnownPages().find((p) => p.slug === slug);
  let cmsRow: CmsPageRow | null = null;
  try {
    const supabase = await getSupabaseServer();
    if (supabase) {
      const { data } = await supabase
        .from("cms_pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (data) cmsRow = data as CmsPageRow;
    }
  } catch {
    cmsRow = null;
  }
  if (!known && !cmsRow) return null;
  // Synthesise a "known" entry for a custom CMS-only page so the
  // editor can drive off the same shape.
  const synth: KnownPage = known ?? {
    slug,
    title: cmsRow?.title ?? slug,
    pageType: "static",
    postcodeArea: cmsRow?.postcode_area ?? null,
    defaultMetaTitle: cmsRow?.meta_title ?? undefined,
    defaultMetaDescription: cmsRow?.meta_description ?? undefined,
    defaultH1: cmsRow?.h1 ?? undefined,
    defaultHeroTitle: cmsRow?.hero_title ?? undefined,
    defaultHeroSubtitle: cmsRow?.hero_subtitle ?? undefined,
  };
  return { slug, known: synth, cmsRow };
}

export interface PageEditPatch {
  title?: string;
  meta_title?: string;
  meta_description?: string;
  h1?: string;
  hero_title?: string;
  hero_subtitle?: string;
  status?: CmsPageStatus;
  is_indexable?: boolean;
  sections?: unknown; // Block[] - validated by parseBlocks before render
}

export interface CreateCustomPageInput {
  title: string;
  slug: string;          // normalised to /foo/ form before insert
  metaTitle?: string;
  metaDescription?: string;
  h1?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  status?: CmsPageStatus;
  isIndexable?: boolean;
}

function normaliseCustomSlug(input: string): string {
  let s = input.trim().toLowerCase();
  // Allow slugs like "promotions" or "/promotions" or "/promotions/".
  s = s.replace(/^\/+/, "").replace(/\/+$/, "");
  // Strip anything that isn't a-z 0-9 - / so slugs stay URL-safe.
  s = s.replace(/[^a-z0-9/-]+/g, "-").replace(/-+/g, "-");
  s = s.replace(/\/+/g, "/");
  return s ? `/${s}/` : "";
}

const RESERVED_SLUG_PREFIXES = [
  "/admin/",
  "/api/",
  "/_next/",
  "/services/",
  "/areas-we-serve/",
  "/boilers/",
  "/blogs/",
];

export async function createCustomPage(
  input: CreateCustomPageInput
): Promise<{ ok: true; slug: string } | { ok: false; reason: string }> {
  const supabase = await getSupabaseServer();
  if (!supabase) return { ok: false, reason: "Supabase is not configured." };

  if (!input.title.trim()) {
    return { ok: false, reason: "Title is required." };
  }
  const slug = normaliseCustomSlug(input.slug || input.title);
  if (!slug || slug === "/") {
    return {
      ok: false,
      reason: "Please choose a slug that isn't empty or just '/'.",
    };
  }
  for (const prefix of RESERVED_SLUG_PREFIXES) {
    if (slug.startsWith(prefix)) {
      return {
        ok: false,
        reason: `Slug "${slug}" overlaps with a built-in section (${prefix}). Pick a different URL.`,
      };
    }
  }
  // Make sure it doesn't collide with a known page (e.g. /about/, /contact/).
  const knownClash = getKnownPages().find((p) => p.slug === slug);
  if (knownClash) {
    return {
      ok: false,
      reason: `That URL is already used by the built-in "${knownClash.title}" page. Edit that page instead.`,
    };
  }

  const status: CmsPageStatus =
    input.status === "published" ? "published" : "draft";
  const row = {
    slug,
    page_type: "static",
    postcode_area: null,
    title: input.title.trim(),
    meta_title: input.metaTitle ?? input.title.trim(),
    meta_description: input.metaDescription ?? null,
    h1: input.h1 ?? input.title.trim(),
    hero_title: input.heroTitle ?? input.title.trim(),
    hero_subtitle: input.heroSubtitle ?? null,
    sections: [],
    faqs: [],
    status,
    is_indexable: input.isIndexable ?? true,
  };
  const { error } = await supabase
    .from("cms_pages")
    .insert(row);
  if (error) {
    if (
      error.message.includes("duplicate key") ||
      error.message.includes("already exists")
    ) {
      return {
        ok: false,
        reason: `Slug "${slug}" already exists. Pick a different URL.`,
      };
    }
    return { ok: false, reason: error.message };
  }
  return { ok: true, slug };
}

// True if this slug refers to a CMS-only "custom" page (not a known
// built-in page). Used by the public catch-all route to decide
// whether to render via the custom-page template.
export async function getCustomPageBySlug(
  slug: string
): Promise<CmsPageRow | null> {
  // Don't shadow built-in pages.
  const known = getKnownPages().find((p) => p.slug === slug);
  if (known) return null;
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("cms_pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error || !data) return null;
  return data as CmsPageRow;
}

// All published custom pages - used by the sitemap.
export async function listPublishedCustomSlugs(): Promise<string[]> {
  const supabase = await getSupabaseServer();
  if (!supabase) return [];
  const knownSlugs = new Set(getKnownPages().map((p) => p.slug));
  const { data, error } = await supabase
    .from("cms_pages")
    .select("slug, status, is_indexable")
    .eq("status", "published");
  if (error || !Array.isArray(data)) return [];
  return (data as Array<{ slug: string; is_indexable: boolean }>)
    .filter((r) => !knownSlugs.has(r.slug) && r.is_indexable !== false)
    .map((r) => r.slug);
}

export async function savePageBySlug(
  slug: string,
  patch: PageEditPatch
): Promise<{ ok: boolean; reason?: string }> {
  const known = getKnownPages().find((p) => p.slug === slug);
  const supabase = await getSupabaseServer();
  if (!supabase) return { ok: false, reason: "Supabase is not configured." };

  // For known built-in pages we upsert with the static defaults so the
  // first save promotes the page into the CMS without losing data. For
  // custom CMS-only pages we update an existing row by slug (no fresh
  // insert here - those are created via createCustomPage).
  let upsertRow: Record<string, unknown>;
  if (known) {
    upsertRow = {
      slug,
      page_type: known.pageType,
      postcode_area: known.postcodeArea,
      title: patch.title ?? known.title,
      meta_title: patch.meta_title ?? known.defaultMetaTitle ?? null,
      meta_description:
        patch.meta_description ?? known.defaultMetaDescription ?? null,
      h1: patch.h1 ?? known.defaultH1 ?? null,
      hero_title: patch.hero_title ?? known.defaultHeroTitle ?? null,
      hero_subtitle: patch.hero_subtitle ?? known.defaultHeroSubtitle ?? null,
      status: patch.status ?? "published",
      is_indexable: patch.is_indexable ?? true,
    };
  } else {
    // Custom page - just patch the existing row.
    upsertRow = { slug };
    if (patch.title !== undefined) upsertRow.title = patch.title;
    if (patch.meta_title !== undefined) upsertRow.meta_title = patch.meta_title;
    if (patch.meta_description !== undefined) {
      upsertRow.meta_description = patch.meta_description;
    }
    if (patch.h1 !== undefined) upsertRow.h1 = patch.h1;
    if (patch.hero_title !== undefined) upsertRow.hero_title = patch.hero_title;
    if (patch.hero_subtitle !== undefined) {
      upsertRow.hero_subtitle = patch.hero_subtitle;
    }
    if (patch.status !== undefined) upsertRow.status = patch.status;
    if (patch.is_indexable !== undefined) {
      upsertRow.is_indexable = patch.is_indexable;
    }
  }
  if (patch.sections !== undefined) {
    upsertRow.sections = patch.sections;
  }

  const { error } = await supabase
    .from("cms_pages")
    .upsert(upsertRow, { onConflict: "slug" });
  if (error) {
    console.error("[ekbc.cms.pages]", "save failed", error.message);
    return { ok: false, reason: error.message };
  }
  return { ok: true };
}

// Public-side reader used by the website to pull current CMS values for
// a known page. Returns null if not in CMS - the caller falls back to
// the existing static defaults from pageContent.ts.
export async function publicGetPageContent(
  slug: string
): Promise<Partial<CmsPageRow> | null> {
  try {
    const supabase = await getSupabaseServer();
    if (!supabase) return null;
    const { data } = await supabase
      .from("cms_pages")
      .select(
        "title, meta_title, meta_description, h1, hero_title, hero_subtitle, status, is_indexable"
      )
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    return (data as Partial<CmsPageRow>) ?? null;
  } catch {
    return null;
  }
}
