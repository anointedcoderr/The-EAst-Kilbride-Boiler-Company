import Link from "next/link";
import {
  parseBlocks,
  videoEmbedSrc,
  isDirectVideoFile,
  type Block,
  type HeadingBlock,
  type RichTextBlock,
  type ImageBlock,
  type VideoBlock,
  type CtaBlock,
  type FaqBlock,
} from "@/lib/cmsBlocks";

// Server-side renderer for the CMS block array stored on
// cms_pages.sections. Accepts raw jsonb (any shape) - any block that
// doesn't match a known schema is silently dropped, so the public site
// can never crash because of bad data in the CMS.

interface PublicBlocksProps {
  raw: unknown;
}

export function PublicBlocks({ raw }: PublicBlocksProps) {
  const blocks = parseBlocks(raw);
  if (blocks.length === 0) return null;
  return (
    <section className="bg-carbon-950 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {blocks.map((block, i) => (
            <BlockSwitch key={i} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlockSwitch({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return <HeadingRender block={block} />;
    case "richText":
      return <RichTextRender block={block} />;
    case "image":
      return <ImageRender block={block} />;
    case "video":
      return <VideoRender block={block} />;
    case "cta":
      return <CtaRender block={block} />;
    case "faq":
      return <FaqRender block={block} />;
  }
}

function HeadingRender({ block }: { block: HeadingBlock }) {
  if (!block.text) return null;
  if (block.level === 3) {
    return (
      <h3 className="text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
        {block.text}
      </h3>
    );
  }
  return (
    <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
      {block.text}
    </h2>
  );
}

function RichTextRender({ block }: { block: RichTextBlock }) {
  if (!block.body) return null;
  const paragraphs = block.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return null;
  return (
    <div className="space-y-3 text-base leading-relaxed text-carbon-200">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function ImageRender({ block }: { block: ImageBlock }) {
  if (!block.url) return null;
  return (
    <figure className="overflow-hidden rounded-2xl border border-carbon-800 bg-carbon-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={block.url}
        alt={block.alt}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
      {block.caption && (
        <figcaption className="border-t border-carbon-800 px-4 py-2 text-center text-xs text-carbon-400">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

function VideoRender({ block }: { block: VideoBlock }) {
  if (!block.url) return null;

  // Direct video file (uploaded mp4 / webm) renders in a native
  // <video> player. YouTube and Vimeo URLs render as an iframe embed.
  // Anything else falls back to an external link.
  if (isDirectVideoFile(block.url)) {
    return (
      <figure>
        <div className="overflow-hidden rounded-2xl border border-carbon-800 bg-black">
          <video
            src={block.url}
            controls
            preload="metadata"
            playsInline
            className="block h-auto w-full"
          />
        </div>
        {block.caption && (
          <figcaption className="mt-2 text-center text-xs text-carbon-400">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  const src = videoEmbedSrc(block.url);
  if (!src) {
    return (
      <a
        href={block.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl border border-carbon-800 bg-carbon-900 p-4 text-center text-mint-400 hover:bg-carbon-800"
      >
        Watch video
      </a>
    );
  }
  return (
    <figure>
      <div className="aspect-video overflow-hidden rounded-2xl border border-carbon-800 bg-black">
        <iframe
          src={src}
          title={block.caption || "Video"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      {block.caption && (
        <figcaption className="mt-2 text-center text-xs text-carbon-400">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

function CtaRender({ block }: { block: CtaBlock }) {
  if (!block.heading && !block.buttonText) return null;
  const isInternal = block.buttonHref.startsWith("/");
  const button = (
    <span className="inline-flex items-center justify-center gap-2 rounded-lg bg-mint-500 px-5 py-3 text-sm font-bold uppercase tracking-wider text-carbon-900 transition-colors hover:bg-mint-400">
      {block.buttonText}
    </span>
  );
  return (
    <div className="rounded-2xl border border-mint-500/30 bg-mint-500/5 p-6 text-center sm:p-8">
      {block.heading && (
        <h3 className="text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
          {block.heading}
        </h3>
      )}
      {block.subtext && (
        <p className="mt-2 text-sm text-carbon-200">{block.subtext}</p>
      )}
      <div className="mt-5">
        {isInternal ? (
          <Link href={block.buttonHref}>{button}</Link>
        ) : (
          <a href={block.buttonHref} target="_blank" rel="noopener noreferrer">
            {button}
          </a>
        )}
      </div>
    </div>
  );
}

function FaqRender({ block }: { block: FaqBlock }) {
  const items = block.items.filter((i) => i.question || i.answer);
  if (items.length === 0) return null;
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-xl border border-carbon-800 bg-carbon-900/40 px-4 py-3"
        >
          <summary className="cursor-pointer list-none text-sm font-bold text-white">
            {item.question}
          </summary>
          {item.answer && (
            <p className="mt-2 text-sm leading-relaxed text-carbon-200">
              {item.answer}
            </p>
          )}
        </details>
      ))}
    </div>
  );
}
