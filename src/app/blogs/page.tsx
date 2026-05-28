import type { Metadata } from "next";
import { BlogTemplate } from "@/components/templates/BlogTemplate";
import { pageContent } from "@/data/pageContent";

const page = pageContent.blogs;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: page.canonical },
};

export default function BlogsPage() {
  return <BlogTemplate />;
}
