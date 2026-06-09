import { getSupabaseServer } from "@/lib/supabase";
import { PublicBlocks } from "./PublicBlocks";

// Renders the CMS sections (cms_pages.sections) for a given slug as
// extra content below an existing public page. Designed to be
// non-destructive: if there are no CMS sections, no Supabase, or the
// page isn't published, nothing renders and the host page is
// unchanged.
//
// Drop this at the bottom (or anywhere) of a public page that should
// be augmentable from the CMS:
//
//   <CmsExtraSections slug="/" />

interface CmsExtraSectionsProps {
  slug: string;
}

export async function CmsExtraSections({ slug }: CmsExtraSectionsProps) {
  let sections: unknown = null;
  try {
    const supabase = await getSupabaseServer();
    if (supabase) {
      const { data } = await supabase
        .from("cms_pages")
        .select("sections, status")
        .eq("slug", slug)
        .maybeSingle();
      if (data && (data as { status?: string }).status === "published") {
        sections = (data as { sections?: unknown }).sections ?? null;
      }
    }
  } catch {
    sections = null;
  }
  if (!sections) return null;
  return <PublicBlocks raw={sections} />;
}
