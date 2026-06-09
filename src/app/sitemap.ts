import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blogPosts";
import { brands } from "@/data/brands";
import { districts } from "@/data/districts";
import { getSupabaseServer } from "@/lib/supabase";
import { listPublishedCustomSlugs } from "@/lib/cmsPages";

const SITE_URL = "https://www.eastkilbrideboilercompany.co.uk";

// Pulled at sitemap-render time so newly published CMS blog posts
// show up the next time a crawler hits /sitemap.xml without needing
// a deploy.
async function getCmsBlogSlugs(): Promise<string[]> {
  try {
    const supabase = await getSupabaseServer();
    if (!supabase) return [];
    const { data } = await supabase
      .from("cms_blog_posts")
      .select("slug")
      .eq("status", "published")
      .limit(2000);
    if (!Array.isArray(data)) return [];
    return (data as Array<{ slug: string }>)
      .map((r) => r.slug)
      .filter((s): s is string => typeof s === "string" && s.length > 0);
  } catch {
    return [];
  }
}

// Pages that have been marked noindex in the CMS shouldn't appear in
// the sitemap. We fetch the set of slugs that are either in draft
// status or flagged is_indexable: false and exclude them below.
async function getExcludedCmsSlugs(): Promise<Set<string>> {
  try {
    const supabase = await getSupabaseServer();
    if (!supabase) return new Set();
    const { data } = await supabase
      .from("cms_pages")
      .select("slug, status, is_indexable")
      .limit(2000);
    if (!Array.isArray(data)) return new Set();
    const excluded = new Set<string>();
    for (const raw of data as Array<{
      slug: string;
      status: string;
      is_indexable: boolean;
    }>) {
      if (raw.status === "draft" || raw.is_indexable === false) {
        excluded.add(raw.slug);
      }
    }
    return excluded;
  } catch {
    return new Set();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [cmsBlogSlugs, excluded, customSlugs] = await Promise.all([
    getCmsBlogSlugs(),
    getExcludedCmsSlugs(),
    listPublishedCustomSlugs(),
  ]);

  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/boilers/", priority: 0.9, changeFrequency: "weekly" },
    { path: "/blogs/", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/areas-we-serve/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/areas-we-serve/g74/", priority: 0.85, changeFrequency: "monthly" },
    { path: "/areas-we-serve/g75/", priority: 0.85, changeFrequency: "monthly" },
    { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms/", priority: 0.3, changeFrequency: "yearly" },
  ];

  const serviceRoutes = services.map((service) => ({
    path: `/services/${service.slug}/`,
    priority: 0.95,
    changeFrequency: "weekly" as const,
  }));

  const brandRoutes = brands.map((brand) => ({
    path: `/boilers/${brand.slug}/`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  }));

  const districtRoutes = districts.map((district) => ({
    path: `/areas-we-serve/${district.slug}/`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blogs/${post.slug}/`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  // CMS blog posts that aren't already in the static list.
  const staticBlogSlugs = new Set(blogPosts.map((p) => p.slug));
  const cmsBlogRoutes = cmsBlogSlugs
    .filter((slug) => !staticBlogSlugs.has(slug))
    .map((slug) => ({
      path: `/blogs/${slug}/`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    }));

  const customRoutes = customSlugs.map((slug) => ({
    path: slug,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  const allRoutes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...brandRoutes,
    ...districtRoutes,
    ...blogRoutes,
    ...cmsBlogRoutes,
    ...customRoutes,
  ];

  return allRoutes
    .filter((route) => !excluded.has(route.path))
    .map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));
}
