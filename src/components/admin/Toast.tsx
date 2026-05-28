"use client";

import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-[80] flex max-w-sm items-start gap-3 rounded-xl border border-mint-500/40 bg-carbon-900 px-4 py-3 shadow-[0_0_24px_rgba(91,254,177,0.2)] animate-fade-in-up"
    >
      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-mint-500" />
      <p className="flex-1 text-sm text-white">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="text-carbon-400 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
