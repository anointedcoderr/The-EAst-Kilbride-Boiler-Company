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
  if (!known) return null;
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
  return { slug, known, cmsRow };
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

export async function savePageBySlug(
  slug: string,
  patch: PageEditPatch
): Promise<{ ok: boolean; reason?: string }> {
  const known = getKnownPages().find((p) => p.slug === slug);
  if (!known) return { ok: false, reason: "Unknown page slug." };

  const supabase = await getSupabaseServer();
  if (!supabase) return { ok: false, reason: "Supabase is not configured." };

  // Upsert by slug. Slug is unique; if a row exists we patch, if not
  // we insert a row using the known defaults plus the patch.
  const upsertRow: Record<string, unknown> = {
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
