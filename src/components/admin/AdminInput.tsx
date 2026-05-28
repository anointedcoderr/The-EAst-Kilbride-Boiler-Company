"use client";

import { type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FieldLabelProps {
  label: string;
  hint?: string;
  required?: boolean;
}

function FieldLabel({ label, hint, required }: FieldLabelProps) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <label className="text-[11px] font-bold uppercase tracking-wider text-mint-400">
        {label}
        {required && <span className="ml-1 text-mint-500">*</span>}
      </label>
      {hint && <span className="text-[10px] text-carbon-400">{hint}</span>}
    </div>
  );
}

const fieldClasses =
  "w-full rounded-lg border border-carbon-700 bg-carbon-900 px-3.5 py-2.5 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20 focus:outline-none transition-colors";

interface AdminInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function AdminInput({ label, hint, className, ...rest }: AdminInputProps) {
  return (
    <div>
      <FieldLabel label={label} hint={hint} required={rest.required} />
      <input className={cn(fieldClasses, className)} {...rest} />
    </div>
  );
}

interface AdminTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export function AdminTextarea({
  label,
  hint,
  className,
  ...rest
}: AdminTextareaProps) {
  return (
    <div>
      <FieldLabel label={label} hint={hint} required={rest.required} />
      <textarea
        className={cn(fieldClasses, "min-h-[88px] resize-y", className)}
        {...rest}
      />
    </div>
  );
}
