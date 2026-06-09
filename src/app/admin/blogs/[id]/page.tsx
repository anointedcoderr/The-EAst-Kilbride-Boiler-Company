import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getBlogById } from "@/lib/cmsBlogs";
import { BlogEditor } from "./BlogEditor";

export const metadata: Metadata = {
  title: "Edit blog post | EKBC Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: PageProps) {
  const { id } = await params;
  if (id === "new") {
    // The "new" path is handled by ../new/page.tsx; this guard avoids
    // colliding with it.
    return notFound();
  }
  const row = await getBlogById(id);
  if (!row) return notFound();

  return (
    <div className="min-h-screen bg-carbon-950 text-white">
      <header className="sticky top-0 z-30 border-b border-carbon-800 bg-carbon-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/blogs"
              className="inline-flex items-center gap-1.5 rounded-full border border-carbon-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 transition-colors hover:border-mint-500/50 hover:text-mint-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to posts
            </Link>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold uppercase tracking-wider text-white">
                {row.title}
              </h1>
              <code className="block truncate text-[11px] text-carbon-400">
                /blogs/{row.slug}/
              </code>
            </div>
          </div>
          {row.status === "published" && (
            <a
              href={`/blogs/${row.slug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-carbon-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 transition-colors hover:border-mint-500/50 hover:text-mint-400"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open live post
            </a>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <BlogEditor
          mode="edit"
          initial={{
            id: row.id,
            title: row.title,
            slug: row.slug,
            excerpt: row.excerpt ?? "",
            metaTitle: row.meta_title ?? "",
            metaDescription: row.meta_description ?? "",
            category: row.category ?? "",
            status: row.status,
            featuredImageId: row.featured_image_id,
            featuredImageUrl: row.featured_image_url,
            contentBlocks: row.content_blocks,
          }}
        />
      </div>
    </div>
  );
}
