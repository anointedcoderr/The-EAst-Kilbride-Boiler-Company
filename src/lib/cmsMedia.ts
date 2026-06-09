import { getSupabaseServer } from "./supabase";

// CMS media library backed by Supabase Storage (bucket "ekbc-media")
// + cms_media metadata table. Two-step write: upload binary to the
// bucket then insert metadata row pointing at the public URL.

export const MEDIA_BUCKET = "ekbc-media";

export interface MediaRow {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number | null;
  alt_text: string;
  caption: string;
  created_at: string;
  updated_at: string;
}

export interface MediaListOptions {
  search?: string;
  type?: "image" | "video" | "document" | "all";
  limit?: number;
}

export async function listMedia(
  options: MediaListOptions = {}
): Promise<{ rows: MediaRow[]; error: string | null }> {
  const supabase = await getSupabaseServer();
  if (!supabase) {
    return { rows: [], error: "Supabase is not configured." };
  }
  let query = supabase
    .from("cms_media")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(Math.min(options.limit ?? 500, 2000));
  if (options.type === "image") query = query.like("file_type", "image/%");
  if (options.type === "video") query = query.like("file_type", "video/%");
  if (options.type === "document") {
    query = query.like("file_type", "application/%");
  }
  const { data, error } = await query;
  if (error) {
    console.error("[ekbc.cms.media]", "list failed", error.message);
    return { rows: [], error: error.message };
  }
  let rows = (data ?? []) as MediaRow[];
  if (options.search) {
    const q = options.search.trim().toLowerCase();
    if (q) {
      rows = rows.filter((r) =>
        [r.file_name, r.alt_text, r.caption].join(" ").toLowerCase().includes(q)
      );
    }
  }
  return { rows, error: null };
}

export interface UploadInput {
  bytes: ArrayBuffer | Uint8Array;
  fileName: string;
  contentType: string;
  altText?: string;
  caption?: string;
}

function sanitiseFileName(name: string): string {
  // Drop directory parts, strip non-URL-safe chars, prepend timestamp
  // so two uploads with the same name don't overwrite each other.
  const base = name
    .split(/[\\/]/)
    .pop()!
    .replace(/[^A-Za-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  const stamp = Date.now().toString(36);
  return `${stamp}-${base || "file"}`;
}

export async function uploadMedia(
  input: UploadInput
): Promise<{ ok: true; row: MediaRow } | { ok: false; reason: string }> {
  const supabase = await getSupabaseServer();
  if (!supabase) return { ok: false, reason: "Supabase is not configured." };

  const key = sanitiseFileName(input.fileName);
  const bytes =
    input.bytes instanceof Uint8Array
      ? input.bytes
      : new Uint8Array(input.bytes);

  const upload = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(key, bytes, {
      contentType: input.contentType,
      upsert: false,
    });
  if (upload.error) {
    console.error("[ekbc.cms.media]", "upload failed", upload.error.message);
    return { ok: false, reason: upload.error.message };
  }

  const pub = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(key);
  const publicUrl = pub.data.publicUrl;

  const { data, error } = await supabase
    .from("cms_media")
    .insert({
      file_name: input.fileName,
      file_url: publicUrl,
      file_type: input.contentType,
      file_size: bytes.byteLength,
      alt_text: input.altText ?? "",
      caption: input.caption ?? "",
    })
    .select("*")
    .single();
  if (error || !data) {
    console.error(
      "[ekbc.cms.media]",
      "metadata insert failed",
      error?.message
    );
    // Try to roll back the orphan binary
    await supabase.storage.from(MEDIA_BUCKET).remove([key]);
    return {
      ok: false,
      reason: error?.message ?? "Metadata insert failed.",
    };
  }
  return { ok: true, row: data as MediaRow };
}

export async function updateMediaMeta(
  id: string,
  patch: { alt_text?: string; caption?: string }
): Promise<{ ok: boolean; reason?: string }> {
  const supabase = await getSupabaseServer();
  if (!supabase) return { ok: false, reason: "Supabase is not configured." };
  const update: Record<string, unknown> = {};
  if (typeof patch.alt_text === "string") update.alt_text = patch.alt_text;
  if (typeof patch.caption === "string") update.caption = patch.caption;
  if (Object.keys(update).length === 0) return { ok: true };
  const { error } = await supabase
    .from("cms_media")
    .update(update)
    .eq("id", id);
  if (error) {
    console.error("[ekbc.cms.media]", "update failed", error.message);
    return { ok: false, reason: error.message };
  }
  return { ok: true };
}

export async function deleteMedia(
  id: string
): Promise<{ ok: boolean; reason?: string }> {
  const supabase = await getSupabaseServer();
  if (!supabase) return { ok: false, reason: "Supabase is not configured." };
  // Look up the file URL so we can also delete the underlying object.
  const { data, error: getErr } = await supabase
    .from("cms_media")
    .select("file_url")
    .eq("id", id)
    .maybeSingle();
  if (getErr) {
    return { ok: false, reason: getErr.message };
  }
  if (data) {
    const url = (data as { file_url: string }).file_url;
    // Extract key (path within bucket) from the public URL.
    // Public URLs look like https://<project>.supabase.co/storage/v1/object/public/ekbc-media/<key>
    const marker = `/${MEDIA_BUCKET}/`;
    const idx = url.indexOf(marker);
    if (idx >= 0) {
      const key = decodeURIComponent(url.slice(idx + marker.length));
      await supabase.storage.from(MEDIA_BUCKET).remove([key]);
    }
  }
  const { error } = await supabase.from("cms_media").delete().eq("id", id);
  if (error) return { ok: false, reason: error.message };
  return { ok: true };
}
