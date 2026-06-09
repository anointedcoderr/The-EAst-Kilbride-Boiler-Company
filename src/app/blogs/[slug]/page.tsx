import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostTemplate } from "@/components/templates/BlogPostTemplate";
import { CmsBlogPostView } from "@/components/cms/CmsBlogPostView";
import { blogPosts } from "@/data/blogPosts";
import { getBlogBySlug } from "@/lib/cmsBlogs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

// Allow on-demand rendering for CMS posts whose slugs aren't in the
// static generateStaticParams list above. Next.js's dynamicParams
// defaults to true in app router; set explicitly for clarity.
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const staticPost = blogPosts.find((p) => p.slug === slug);
  if (staticPost) {
    return {
      title: staticPost.metaTitle,
      description: staticPost.metaDescription,
      alternates: { canonical: `/blogs/${staticPost.slug}/` },
    };
  }
  const cmsPost = await getBlogBySlug(slug);
  if (cmsPost) {
    return {
      title: cmsPost.meta_title || cmsPost.title,
      description: cmsPost.meta_description ?? cmsPost.excerpt ?? undefined,
      alternates: { canonical: `/blogs/${cmsPost.slug}/` },
    };
  }
  return {};
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const staticPost = blogPosts.find((p) => p.slug === slug);
  if (staticPost) return <BlogPostTemplate post={staticPost} />;
  const cmsPost = await getBlogBySlug(slug);
  if (cmsPost) return <CmsBlogPostView post={cmsPost} />;
  notFound();
}
