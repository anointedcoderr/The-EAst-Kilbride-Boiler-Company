"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string | ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  className,
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-carbon-600 bg-carbon-800 transition-colors duration-300",
        isOpen && "border-mint-500/30",
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 text-left cursor-pointer min-h-[56px]"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base lg:text-lg font-semibold text-white leading-snug">
          {question}
        </span>
        <span
          className={cn(
            "flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
            isOpen ? "bg-mint-500 text-carbon-900 rotate-180" : "bg-carbon-700 text-mint-500"
          )}
          aria-hidden="true"
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 sm:px-6 sm:pb-5 text-sm sm:text-base text-carbon-300 leading-relaxed">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export { AccordionItem };
export type { AccordionItemProps };
