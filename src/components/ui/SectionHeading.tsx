import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  highlightedWord?: string;
  subtitle?: string;
  className?: string;
  center?: boolean;
}

function SectionHeading({
  eyebrow,
  heading,
  highlightedWord,
  subtitle,
  className,
  center = true,
}: SectionHeadingProps) {
  const renderHeading = () => {
    if (!highlightedWord) {
      return heading;
    }

    const index = heading.toLowerCase().indexOf(highlightedWord.toLowerCase());
    if (index === -1) {
      return heading;
    }

    const before = heading.slice(0, index);
    const match = heading.slice(index, index + highlightedWord.length);
    const after = heading.slice(index + highlightedWord.length);

    return (
      <>
        {before}
        <span className="text-mint-500">{match}</span>
        {after}
      </>
    );
  };

  return (
    <div className={cn(center && "text-center", className)}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-mint-500">
        -- {eyebrow} --
      </p>
      <h2 className="text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
        {renderHeading()}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-carbon-300">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export { SectionHeading };
export type { SectionHeadingProps };
