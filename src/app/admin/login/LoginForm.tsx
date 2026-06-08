"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, ShieldCheck, AlertTriangle, Loader2 } from "lucide-react";

interface LoginFormProps {
  next?: string;
  hasError: boolean;
}

export function LoginForm({ next, hasError }: LoginFormProps) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-mint-500/30 bg-carbon-900 p-6 shadow-[0_0_40px_rgba(91,254,177,0.12)]">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-mint-500/40 bg-mint-500/10">
          <ShieldCheck className="h-6 w-6 text-mint-400" />
        </div>
        <h1 className="text-lg font-bold uppercase tracking-wider text-white">
          EKBC Admin
        </h1>
        <p className="mt-1 text-xs text-carbon-400">
          Sign in to access the admin dashboard.
        </p>
      </div>

      {hasError && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-rose-400/40 bg-rose-500/10 p-3 text-xs text-rose-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Incorrect email or password. Try again.</span>
        </div>
      )}

      <form
        method="POST"
        action="/api/admin/login"
        onSubmit={() => setSubmitting(true)}
        className="space-y-3"
      >
        {next && <input type="hidden" name="next" value={next} />}
        <div>
          <label
            htmlFor="email"
            className="block text-[11px] font-bold uppercase tracking-wider text-carbon-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            className="mt-1 w-full rounded-lg border border-carbon-600 bg-carbon-800 px-3 py-2.5 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:ring-1 focus:ring-mint-500 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-[11px] font-bold uppercase tracking-wider text-carbon-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 w-full rounded-lg border border-carbon-600 bg-carbon-800 px-3 py-2.5 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:ring-1 focus:ring-mint-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-mint-500 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-carbon-900 transition-colors hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Sign in
            </>
          )}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-carbon-500">
        <Link href="/" className="hover:text-mint-400">
          Back to website
        </Link>
      </div>
    </div>
  );
}
