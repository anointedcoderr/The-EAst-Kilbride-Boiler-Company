import { getSupabaseServer } from "./supabase";
import type { Block } from "./cmsBlocks";

// CMS blog posts backing - separate from cms_pages because blogs have
// their own lifecycle (draft / published, scheduled publish via
// published_at, featured image, excerpt for the index listing).
//
// New blog posts created here appear on the public /blogs index and
// at /blogs/<slug>/ alongside the static blogPosts.ts entries. Phase 5
// adds the listing + post pages that read both sources and merge them.

export type BlogStatus = "draft" | "published";

export interface BlogRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  featured_image_id: string | null;
  featured_image_url: string | null;
  content_blocks: Block[];
  category: string | null;
  status: BlogStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// Supabase's PostgREST returns nested joins as arrays even for
// many-to-one foreign keys, so we always treat cms_media as an array.
type MediaJoin = Array<{ file_url: string }> | null | undefined;

function extractImageUrl(value: MediaJoin): string | null {
  if (Array.isArray(value) && value.length > 0) return value[0].file_url;
  return null;
}

export interface ListBlogsOptions {
  status?: BlogStatus | "all";
  search?: string;
  limit?: number;
}

export interface BlogListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  status: BlogStatus;
  published_at: string | null;
  updated_at: string;
  featured_image_url: string | null;
}

function normaliseBlocks(input: unknown): Block[] {
  if (!Array.isArray(input)) return [];
  // We trust the admin-side block validation here so we just cast.
  // The PublicBlocks renderer re-validates via parseBlocks for safety.
  return input as Block[];
}

export async function listBlogs(
  options: ListBlogsOptions = {}
): Promise<{ rows: BlogListItem[]; error: string | null }> {
  const supabase = await getSupabaseServer();
  if (!supabase) return { rows: [], error: "Supabase is not configured." };
  let query = supabase
    .from("cms_blog_posts")
    .select(
      "id, title, slug, excerpt, category, status, published_at, updated_at, cms_media:featured_image_id (file_url)"
    )
    .order("updated_at", { ascending: false })
    .limit(Math.min(options.limit ?? 500, 2000));
  if (options.status && options.status !== "all") {
    query = query.eq("status", options.status);
  }
  const { data, error } = await query;
  if (error) return { rows: [], error: error.message };
  let rows = (data ?? []).map((raw) => {
    const r = raw as unknown as {
      id: string;
      title: string;
      slug: string;
      excerpt: string | null;
      category: string | null;
      status: BlogStatus;
      published_at: string | null;
      updated_at: string;
      cms_media?: MediaJoin;
    };
    return {
      id: r.id,
      title: r.title,
      slug: r.slug,
      excerpt: r.excerpt,
      category: r.category,
      status: r.status,
      published_at: r.published_at,
      updated_at: r.updated_at,
      featured_image_url: extractImageUrl(r.cms_media),
    } satisfies BlogListItem;
  });
  if (options.search) {
    const q = options.search.trim().toLowerCase();
    if (q) {
      rows = rows.filter((r) =>
        [r.title, r.slug, r.excerpt ?? "", r.category ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
  }
  return { rows, error: null };
}

export async function getBlogById(id: string): Promise<BlogRow | null> {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("cms_blog_posts")
    .select(
      "*, cms_media:featured_image_id (file_url)"
    )
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return mapBlogRow(data);
}

export async function getBlogBySlug(slug: string): Promise<BlogRow | null> {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("cms_blog_posts")
    .select(
      "*, cms_media:featured_image_id (file_url)"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error || !data) return null;
  return mapBlogRow(data);
}

function mapBlogRow(raw: unknown): BlogRow {
  const r = raw as unknown as {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    meta_title: string | null;
    meta_description: string | null;
    featured_image_id: string | null;
    content_blocks: unknown;
    category: string | null;
    status: BlogStatus;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    cms_media?: MediaJoin;
  };
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt,
    meta_title: r.meta_title,
    meta_description: r.meta_description,
    featured_image_id: r.featured_image_id,
    featured_image_url: extractImageUrl(r.cms_media),
    content_blocks: normaliseBlocks(r.content_blocks),
    category: r.category,
    status: r.status,
    published_at: r.published_at,
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}

export interface BlogInsert {
  title: string;
  slug: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  featured_image_id?: string | null;
  content_blocks?: unknown;
  category?: string;
  status?: BlogStatus;
  published_at?: string | null;
}

export async function createBlog(
  input: BlogInsert
): Promise<{ ok: true; id: string } | { ok: false; reason: string }> {
  const supabase = await getSupabaseServer();
  if (!supabase) return { ok: false, reason: "Supabase is not configured." };
  if (!input.title.trim()) return { ok: false, reason: "Title is required." };
  if (!input.slug.trim()) return { ok: false, reason: "Slug is required." };
  const status: BlogStatus = input.status === "published" ? "published" : "draft";
  const row = {
    title: input.title.trim(),
    slug: input.slug.trim(),
    excerpt: input.excerpt ?? null,
    meta_title: input.meta_title ?? null,
    meta_description: input.meta_description ?? null,
    featured_image_id: input.featured_image_id ?? null,
    content_blocks: input.content_blocks ?? [],
    category: input.category ?? null,
    status,
    published_at:
      status === "published"
        ? input.published_at ?? new Date().toISOString()
        : input.published_at ?? null,
  };
  const { data, error } = await supabase
    .from("cms_blog_posts")
    .insert(row)
    .select("id")
    .single();
  if (error || !data) {
    return { ok: false, reason: error?.message ?? "Insert failed." };
  }
  return { ok: true, id: (data as { id: string }).id };
}

export interface BlogPatch {
  title?: string;
  slug?: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  featured_image_id?: string | null;
  content_blocks?: unknown;
  category?: string;
  status?: BlogStatus;
  published_at?: string | null;
}

export async function updateBlog(
  id: string,
  patch: BlogPatch
): Promise<{ ok: boolean; reason?: string }> {
  const supabase = await getSupabaseServer();
  if (!supabase) return { ok: false, reason: "Supabase is not configured." };
  const update: Record<string, unknown> = {};
  if (typeof patch.title === "string") update.title = patch.title;
  if (typeof patch.slug === "string") update.slug = patch.slug;
  if (typeof patch.excerpt === "string") update.excerpt = patch.excerpt;
  if (typeof patch.meta_title === "string") update.meta_title = patch.meta_title;
  if (typeof patch.meta_description === "string") {
    update.meta_description = patch.meta_description;
  }
  if (patch.featured_image_id === null || typeof patch.featured_image_id === "string") {
    update.featured_image_id = patch.featured_image_id;
  }
  if (patch.content_blocks !== undefined) {
    update.content_blocks = patch.content_blocks;
  }
  if (typeof patch.category === "string") update.category = patch.category;
  if (patch.status === "draft" || patch.status === "published") {
    update.status = patch.status;
    if (patch.status === "published" && patch.published_at === undefined) {
      // Auto-set published_at when transitioning to published.
      update.published_at = new Date().toISOString();
    }
  }
  if (patch.published_at !== undefined) {
    update.published_at = patch.published_at;
  }
  if (Object.keys(update).length === 0) return { ok: true };
  const { error } = await supabase
    .from("cms_blog_posts")
    .update(update)
    .eq("id", id);
  if (error) return { ok: false, reason: error.message };
  return { ok: true };
}

export async function deleteBlog(
  id: string
): Promise<{ ok: boolean; reason?: string }> {
  const supabase = await getSupabaseServer();
  if (!supabase) return { ok: false, reason: "Supabase is not configured." };
  const { error } = await supabase.from("cms_blog_posts").delete().eq("id", id);
  if (error) return { ok: false, reason: error.message };
  return { ok: true };
}

export async function listPublishedBlogs(): Promise<BlogListItem[]> {
  const { rows } = await listBlogs({ status: "published", limit: 200 });
  return rows;
}
