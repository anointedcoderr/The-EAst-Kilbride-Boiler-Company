import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { PageContentBlock } from "@/data/pageContent";

interface ContentBlocksProps {
  blocks: PageContentBlock[];
  intro?: string;
  eyebrow?: string;
  heading?: string;
}

export function ContentBlocks({
  blocks,
  intro,
  eyebrow,
  heading,
}: ContentBlocksProps) {
  if (blocks.length === 0) return null;

  return (
    <section className="bg-carbon-900 py-14 sm:py-20">
      <Container className="max-w-4xl">
        {(eyebrow || heading) && (
          <ScrollReveal>
            <header className="mb-10">
              {eyebrow && (
                <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
                  {eyebrow}
                </p>
              )}
              {heading && (
                <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {heading}
                </h2>
              )}
            </header>
          </ScrollReveal>
        )}

        {intro && (
          <ScrollReveal delay={0.05}>
            <p className="mb-12 text-base sm:text-lg leading-relaxed text-carbon-200">
              {intro}
            </p>
          </ScrollReveal>
        )}

        <div className="space-y-10 sm:space-y-12">
          {blocks.map((block, index) => (
            <ScrollReveal key={block.id} delay={Math.min(index * 0.05, 0.3)}>
              <article
                id={block.id}
                className="rounded-2xl border border-carbon-700 bg-carbon-950/60 p-6 sm:p-8"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {block.heading}
                </h3>
                {block.body.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="mt-4 text-sm sm:text-base leading-relaxed text-carbon-200"
                  >
                    {paragraph}
                  </p>
                ))}
                {block.bullets && block.bullets.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {block.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-500" />
                        <span className="text-sm sm:text-base leading-relaxed text-carbon-200">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
