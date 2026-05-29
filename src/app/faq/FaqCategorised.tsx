"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AccordionItem } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  label: string;
  intro: string;
  faqs: FaqEntry[];
}

interface FaqCategorisedProps {
  categories: FaqCategory[];
}

export function FaqCategorised({ categories }: FaqCategorisedProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.id ?? ""
  );
  const [openKey, setOpenKey] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        faqs: cat.faqs.filter(
          (f) =>
            f.question.toLowerCase().includes(q) ||
            f.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.faqs.length > 0);
  }, [categories, query]);

  const totalShown = filtered.reduce((acc, c) => acc + c.faqs.length, 0);

  return (
    <section className="bg-carbon-950 py-14 sm:py-20">
      <Container>
        <ScrollReveal>
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-mint-400">
                Browse by topic
              </p>
              <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
                {totalShown} questions covered
              </h2>
            </div>
            <label className="relative block max-w-md">
              <span className="sr-only">Search FAQs</span>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-carbon-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full rounded-full border border-carbon-700 bg-carbon-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:outline-none"
                aria-label="Search FAQs"
              />
            </label>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <nav
            aria-label="FAQ categories"
            className="mt-6 flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors",
                  activeCategory === cat.id
                    ? "border-mint-500/50 bg-mint-500/10 text-mint-400"
                    : "border-carbon-700 bg-carbon-900 text-white hover:border-mint-500/40 hover:text-mint-400"
                )}
              >
                {cat.label}
              </a>
            ))}
          </nav>
        </ScrollReveal>

        <div className="mt-10 space-y-12">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-carbon-700 bg-carbon-900 p-6 text-center">
              <p className="text-sm text-carbon-300">
                No matches for &ldquo;{query}&rdquo;. Try a different keyword, or call{" "}
                <Link
                  href="/contact/"
                  className="font-semibold text-mint-400 hover:text-mint-300"
                >
                  01355 204045
                </Link>{" "}
                and we will answer it directly.
              </p>
            </div>
          ) : (
            filtered.map((cat) => (
              <section
                key={cat.id}
                id={cat.id}
                aria-labelledby={`${cat.id}-heading`}
                className="scroll-mt-32"
              >
                <header className="max-w-3xl">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-mint-400">
                    {cat.faqs.length} question{cat.faqs.length === 1 ? "" : "s"}
                  </p>
                  <h3
                    id={`${cat.id}-heading`}
                    className="mt-2 text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl"
                  >
                    {cat.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-carbon-300 sm:text-base">
                    {cat.intro}
                  </p>
                </header>

                <div className="mt-6 space-y-2.5">
                  {cat.faqs.map((faq, i) => {
                    const key = `${cat.id}::${i}`;
                    return (
                      <AccordionItem
                        key={key}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openKey === key}
                        onToggle={() =>
                          setOpenKey(openKey === key ? null : key)
                        }
                      />
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
