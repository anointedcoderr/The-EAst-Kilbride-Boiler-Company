"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, Loader2, Save } from "lucide-react";
import type { EditableSiteSettings } from "@/lib/siteContent";

interface SettingsFormProps {
  initial: EditableSiteSettings;
}

type Status =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved" }
  | { kind: "error"; message: string };

export function SettingsForm({ initial }: SettingsFormProps) {
  const [values, setValues] = useState<EditableSiteSettings>(initial);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function update<K extends keyof EditableSiteSettings>(
    field: K,
    value: EditableSiteSettings[K]
  ) {
    setValues((v) => ({ ...v, [field]: value }));
    if (status.kind !== "idle") setStatus({ kind: "idle" });
  }

  async function save() {
    setStatus({ kind: "saving" });
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patch: values }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };
      if (!res.ok || body.ok === false) {
        setStatus({
          kind: "error",
          message: body.message || `HTTP ${res.status}`,
        });
        return;
      }
      setStatus({ kind: "saved" });
    } catch (err) {
      setStatus({ kind: "error", message: (err as Error).message });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <SaveButton status={status} onClick={save} />
      </div>

      <StatusBanner status={status} />

      <Section title="Business identity">
        <Field
          label="Business name"
          value={values.businessName}
          onChange={(v) => update("businessName", v)}
          helper="Shown in header, footer, schema and metadata."
        />
      </Section>

      <Section title="Contact details">
        <Field
          label="Phone number"
          value={values.phone}
          onChange={(v) => update("phone", v)}
          helper="Format the way customers should see it - e.g. 01355 204045."
        />
        <Field
          label="Phone link (tel:)"
          value={values.phoneHref}
          onChange={(v) => update("phoneHref", v)}
          helper="The tap-to-call link. Must start with 'tel:' and contain only digits."
        />
        <Field
          label="Public email address"
          value={values.publicEmail}
          onChange={(v) => update("publicEmail", v)}
          helper="The inbox customers reach. Used in mailto links and footer."
        />
      </Section>

      <Section title="Address">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Street"
            value={values.addressStreet}
            onChange={(v) => update("addressStreet", v)}
          />
          <Field
            label="City / town"
            value={values.addressCity}
            onChange={(v) => update("addressCity", v)}
          />
          <Field
            label="Region"
            value={values.addressRegion}
            onChange={(v) => update("addressRegion", v)}
          />
          <Field
            label="Postcode"
            value={values.addressPostcode}
            onChange={(v) => update("addressPostcode", v)}
          />
        </div>
      </Section>

      <Section title="Hours and messaging">
        <Field
          label="Opening hours"
          value={values.openingHours}
          onChange={(v) => update("openingHours", v)}
          helper="Shown on the contact page and the footer."
        />
        <Field
          label="Emergency message"
          value={values.emergencyMessage}
          onChange={(v) => update("emergencyMessage", v)}
          helper="Highlight banner for out-of-hours boiler emergencies."
          multiline
        />
        <Field
          label="Main CTA text"
          value={values.mainCtaText}
          onChange={(v) => update("mainCtaText", v)}
          helper="The wording on the big call-to-action buttons across the site."
        />
        <Field
          label="Footer text"
          value={values.footerText}
          onChange={(v) => update("footerText", v)}
          multiline
        />
      </Section>

      <Section title="Coverage">
        <Field
          label="Number of areas served"
          value={String(values.areasServedCount)}
          onChange={(v) => {
            const n = Number.parseInt(v, 10);
            update(
              "areasServedCount",
              Number.isFinite(n) && n >= 0 ? n : values.areasServedCount
            );
          }}
          helper="Appears in copy like 'serving 35 East Kilbride districts'."
        />
      </Section>

      <Section title="Social">
        <Field
          label="Facebook page URL"
          value={values.facebookUrl}
          onChange={(v) => update("facebookUrl", v)}
          helper="Leave blank to hide the Facebook icon in the footer."
        />
      </Section>

      <div className="flex items-center justify-end">
        <SaveButton status={status} onClick={save} />
      </div>
    </div>
  );
}

function StatusBanner({ status }: { status: Status }) {
  if (status.kind === "saved") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-mint-500/40 bg-mint-500/10 p-3 text-sm text-mint-200">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        Saved. Changes will show on the live site within a minute.
      </div>
    );
  }
  if (status.kind === "error") {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-rose-400/40 bg-rose-500/10 p-3 text-sm text-rose-200">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <span>Could not save: {status.message}</span>
      </div>
    );
  }
  return null;
}

function SaveButton({
  status,
  onClick,
}: {
  status: Status;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={status.kind === "saving"}
      className="inline-flex items-center gap-2 rounded-lg bg-mint-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-carbon-900 transition-colors hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {status.kind === "saving" ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Save changes
        </>
      )}
    </button>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-carbon-800 bg-carbon-900/40 p-5 sm:p-6">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-mint-400">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
  multiline?: boolean;
}

function Field({ label, value, onChange, helper, multiline }: FieldProps) {
  const id = `f-${label.replace(/\W+/g, "-").toLowerCase()}`;
  const baseClasses =
    "mt-1 w-full rounded-lg border border-carbon-600 bg-carbon-800 px-3 py-2.5 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:ring-1 focus:ring-mint-500 focus:outline-none";
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-bold uppercase tracking-wider text-carbon-300"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={baseClasses}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClasses}
        />
      )}
      {helper && (
        <p className="mt-1 text-[11px] text-carbon-400">{helper}</p>
      )}
    </div>
  );
}
