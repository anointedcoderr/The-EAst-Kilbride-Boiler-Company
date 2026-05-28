import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blogPosts";

const SITE_URL = "https://www.eastkilbrideboilercompany.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/boilers/", priority: 0.9, changeFrequency: "weekly" },
    { path: "/blogs/", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/areas-we-serve/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/areas-we-serve/g74/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/areas-we-serve/g75/", priority: 0.8, changeFrequency: "monthly" },
  ];

  const serviceRoutes = services.map((service) => ({
    path: `/services/${service.slug}/`,
    priority: 0.95,
    changeFrequency: "weekly" as const,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blogs/${post.slug}/`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
