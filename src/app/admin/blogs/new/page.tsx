import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogEditor } from "../[id]/BlogEditor";

export const metadata: Metadata = {
  title: "New blog post | EKBC Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function NewBlogPage() {
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
            <h1 className="text-base font-bold uppercase tracking-wider text-white">
              New blog post
            </h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <BlogEditor
          mode="create"
          initial={{
            id: "",
            title: "",
            slug: "",
            excerpt: "",
            metaTitle: "",
            metaDescription: "",
            category: "",
            status: "draft",
            featuredImageId: null,
            featuredImageUrl: null,
            contentBlocks: [],
          }}
        />
      </div>
    </div>
  );
}
