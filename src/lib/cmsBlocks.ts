// CMS content block types.
//
// Each public page's body sections are stored as an array of these
// blocks in cms_pages.sections (jsonb). Block types are kept as a
// TypeScript discriminated union so the admin editor and the public
// renderer can stay in sync about which fields belong on each block.
//
// Forward-compat: when adding a new block type, give it a new "type"
// string and add cases to both:
//   - src/app/admin/pages/[...slug]/AdminBlocks.tsx (editor UI)
//   - src/components/cms/PublicBlocks.tsx (public render)
// Unknown block types in stored content render as nothing (safe).
//
// All text fields are plain strings - we never render arbitrary HTML
// or markdown from the admin so that hostile content can't inject XSS
// into the public site. A future phase can add a hardened rich text
// editor with sanitisation; for now plain text + paragraph breaks is
// sufficient for the client's needs.

export type Block =
  | HeadingBlock
  | RichTextBlock
  | ImageBlock
  | VideoBlock
  | CtaBlock
  | FaqBlock;

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3;
  text: string;
}

export interface RichTextBlock {
  type: "richText";
  body: string; // plain text; paragraphs split on blank lines
}

export interface ImageBlock {
  type: "image";
  url: string;
  alt: string;
  caption?: string;
}

export interface VideoBlock {
  type: "video";
  url: string; // YouTube or Vimeo URL
  caption?: string;
}

export interface CtaBlock {
  type: "cta";
  heading: string;
  subtext?: string;
  buttonText: string;
  buttonHref: string;
}

export interface FaqBlock {
  type: "faq";
  items: Array<{ question: string; answer: string }>;
}

export const BLOCK_TYPES: Block["type"][] = [
  "heading",
  "richText",
  "image",
  "video",
  "cta",
  "faq",
];

export const BLOCK_LABELS: Record<Block["type"], string> = {
  heading: "Heading",
  richText: "Text",
  image: "Image",
  video: "Video",
  cta: "Call to action",
  faq: "FAQ",
};

export function defaultBlock(type: Block["type"]): Block {
  switch (type) {
    case "heading":
      return { type: "heading", level: 2, text: "Section heading" };
    case "richText":
      return {
        type: "richText",
        body: "Write your paragraph here. Press Enter twice to start a new paragraph.",
      };
    case "image":
      return { type: "image", url: "", alt: "" };
    case "video":
      return { type: "video", url: "" };
    case "cta":
      return {
        type: "cta",
        heading: "Ready to get a fixed price?",
        subtext: "Takes 60 seconds, no obligation.",
        buttonText: "Get my fixed price quote",
        buttonHref: "/contact/",
      };
    case "faq":
      return {
        type: "faq",
        items: [{ question: "Add a question", answer: "Add the answer here." }],
      };
  }
}

// Validate unknown JSON from the database before treating it as Block[].
// Anything that doesn't match a known shape is dropped silently so old
// rows can't crash the renderer.
export function parseBlocks(input: unknown): Block[] {
  if (!Array.isArray(input)) return [];
  const out: Block[] = [];
  for (const raw of input) {
    const block = coerceBlock(raw);
    if (block) out.push(block);
  }
  return out;
}

function coerceBlock(raw: unknown): Block | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  switch (obj.type) {
    case "heading": {
      const level = obj.level === 3 ? 3 : 2;
      const text = typeof obj.text === "string" ? obj.text : "";
      return { type: "heading", level, text };
    }
    case "richText": {
      const body = typeof obj.body === "string" ? obj.body : "";
      return { type: "richText", body };
    }
    case "image": {
      const url = typeof obj.url === "string" ? obj.url : "";
      const alt = typeof obj.alt === "string" ? obj.alt : "";
      const caption =
        typeof obj.caption === "string" ? obj.caption : undefined;
      return { type: "image", url, alt, caption };
    }
    case "video": {
      const url = typeof obj.url === "string" ? obj.url : "";
      const caption =
        typeof obj.caption === "string" ? obj.caption : undefined;
      return { type: "video", url, caption };
    }
    case "cta": {
      const heading = typeof obj.heading === "string" ? obj.heading : "";
      const subtext =
        typeof obj.subtext === "string" ? obj.subtext : undefined;
      const buttonText =
        typeof obj.buttonText === "string" ? obj.buttonText : "Get a quote";
      const buttonHref =
        typeof obj.buttonHref === "string" ? obj.buttonHref : "/contact/";
      return { type: "cta", heading, subtext, buttonText, buttonHref };
    }
    case "faq": {
      const items = Array.isArray(obj.items)
        ? obj.items
            .map((item) => {
              if (!item || typeof item !== "object") return null;
              const i = item as Record<string, unknown>;
              const question =
                typeof i.question === "string" ? i.question : "";
              const answer = typeof i.answer === "string" ? i.answer : "";
              if (!question && !answer) return null;
              return { question, answer };
            })
            .filter(
              (item): item is { question: string; answer: string } =>
                item !== null
            )
        : [];
      return { type: "faq", items };
    }
    default:
      return null;
  }
}

// Return true if the URL points at a directly-playable video file
// (mp4, webm, ogg, mov). These render in a native <video> element
// rather than an iframe embed.
export function isDirectVideoFile(url: string): boolean {
  if (!url) return false;
  // Match the extension before any query string / fragment.
  return /\.(mp4|webm|ogg|ogv|mov|m4v)(\?|#|$)/i.test(url);
}

// Parse a YouTube or Vimeo URL into an embed URL we can safely drop
// into an iframe src. Returns null for any other URL so the renderer
// can show a fallback link instead.
export function videoEmbedSrc(url: string): string | null {
  if (!url) return null;
  const cleaned = url.trim();

  // youtu.be/<id>
  const ytShort = cleaned.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;

  // youtube.com/watch?v=<id>
  const ytWatch = cleaned.match(
    /youtube\.com\/watch\?(?:.*&)?v=([A-Za-z0-9_-]{6,})/
  );
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;

  // youtube.com/shorts/<id>
  const ytShorts = cleaned.match(
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/
  );
  if (ytShorts) return `https://www.youtube.com/embed/${ytShorts[1]}`;

  // youtube.com/embed/<id> (already an embed URL)
  const ytEmbed = cleaned.match(
    /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/
  );
  if (ytEmbed) return `https://www.youtube.com/embed/${ytEmbed[1]}`;

  // vimeo.com/<id>
  const vimeo = cleaned.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}
