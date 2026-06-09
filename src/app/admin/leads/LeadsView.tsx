"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Inbox,
  Search,
  StickyNote,
  Save,
  X,
} from "lucide-react";
import {
  QUOTE_LEAD_STATUSES,
  type QuoteLeadRow,
  type QuoteLeadStatus,
} from "@/lib/supabase";

interface LeadsViewProps {
  initialRows: QuoteLeadRow[];
}

type SortKey =
  | "submitted_at"
  | "name"
  | "service_type"
  | "district"
  | "postcode"
  | "status";

const SORT_LABELS: Record<SortKey, string> = {
  submitted_at: "Date",
  name: "Name",
  service_type: "Service",
  district: "Area",
  postcode: "Postcode",
  status: "Status",
};

const STATUS_TONE: Record<QuoteLeadStatus, string> = {
  new: "border-mint-500/50 bg-mint-500/10 text-mint-300",
  contacted: "border-sky-400/50 bg-sky-400/10 text-sky-200",
  quoted: "border-violet-400/50 bg-violet-400/10 text-violet-200",
  won: "border-emerald-400/60 bg-emerald-400/10 text-emerald-200",
  lost: "border-rose-400/50 bg-rose-400/10 text-rose-200",
};

function formatWhen(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      timeZone: "Europe/London",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function compare(a: QuoteLeadRow, b: QuoteLeadRow, key: SortKey): number {
  const av = (a[key] ?? "") as string;
  const bv = (b[key] ?? "") as string;
  if (key === "submitted_at") {
    return new Date(av).getTime() - new Date(bv).getTime();
  }
  return av.localeCompare(bv);
}

export function LeadsView({ initialRows }: LeadsViewProps) {
  const [rows, setRows] = useState<QuoteLeadRow[]>(initialRows);
  const [statusFilter, setStatusFilter] = useState<QuoteLeadStatus | "all">(
    "all"
  );
  const [sortKey, setSortKey] = useState<SortKey>("submitted_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [openNotesId, setOpenNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [notesSaving, setNotesSaving] = useState(false);

  const counts = useMemo(() => {
    const c: Record<QuoteLeadStatus | "all", number> = {
      all: rows.length,
      new: 0,
      contacted: 0,
      quoted: 0,
      won: 0,
      lost: 0,
    };
    for (const r of rows) c[r.status] += 1;
    return c;
  }, [rows]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = rows.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (!q) return true;
      const haystack = [
        r.name,
        r.phone,
        r.email,
        r.service_type ?? "",
        r.property_type ?? "",
        r.district ?? "",
        r.postcode ?? "",
        r.notes ?? "",
        r.reference,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    const sorted = [...filtered].sort((a, b) => {
      const diff = compare(a, b, sortKey);
      return sortDir === "asc" ? diff : -diff;
    });
    return sorted;
  }, [rows, statusFilter, sortKey, sortDir, search]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "submitted_at" ? "desc" : "asc");
    }
  }

  function openNotes(row: QuoteLeadRow) {
    setOpenNotesId(row.id);
    setNotesDraft(row.notes ?? "");
    setError(null);
  }

  function closeNotes() {
    setOpenNotesId(null);
    setNotesDraft("");
    setNotesSaving(false);
  }

  async function saveNotes(id: string) {
    setNotesSaving(true);
    setError(null);
    const previous = rows;
    setRows((r) =>
      r.map((row) => (row.id === id ? { ...row, notes: notesDraft } : row))
    );
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notesDraft }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `HTTP ${res.status}`);
      }
      closeNotes();
    } catch (err) {
      setRows(previous);
      setError((err as Error).message);
      setNotesSaving(false);
    }
  }

  async function changeStatus(id: string, status: QuoteLeadStatus) {
    setError(null);
    setPendingId(id);
    const previous = rows;
    setRows((r) => r.map((row) => (row.id === id ? { ...row, status } : row)));
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `HTTP ${res.status}`);
      }
    } catch (err) {
      setRows(previous);
      setError((err as Error).message);
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-carbon-500" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, phone, email, service, postcode or notes"
          className="w-full rounded-xl border border-carbon-700 bg-carbon-900/60 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500/60 focus:outline-none focus:ring-1 focus:ring-mint-500/40"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(["all", ...QUOTE_LEAD_STATUSES] as const).map((s) => {
          const active = statusFilter === s;
          const label = s === "all" ? "All" : s[0].toUpperCase() + s.slice(1);
          return (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                active
                  ? "border-mint-500/60 bg-mint-500/10 text-mint-300"
                  : "border-carbon-700 bg-carbon-900/40 text-carbon-300 hover:border-carbon-600 hover:text-white"
              }`}
            >
              <span>{label}</span>
              <span className="rounded-full border border-current/30 px-1.5 text-[10px]">
                {counts[s]}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-rose-400/40 bg-rose-500/10 p-3 text-xs text-rose-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Could not update lead: {error}</span>
        </div>
      )}

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-carbon-800 bg-carbon-900/40 p-10 text-center text-carbon-400">
          <Inbox className="h-8 w-8" />
          <p className="text-sm">No leads match this filter yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-carbon-800 bg-carbon-900/40">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-carbon-900 text-[11px] font-bold uppercase tracking-wider text-carbon-400">
                <tr>
                  {(
                    [
                      "submitted_at",
                      "name",
                      "service_type",
                      "district",
                      "postcode",
                      "status",
                    ] as SortKey[]
                  ).map((key) => {
                    const active = sortKey === key;
                    const Icon = active
                      ? sortDir === "asc"
                        ? ArrowUp
                        : ArrowDown
                      : ArrowUpDown;
                    return (
                      <th
                        key={key}
                        scope="col"
                        className="whitespace-nowrap px-3 py-2.5"
                      >
                        <button
                          type="button"
                          onClick={() => toggleSort(key)}
                          className={`inline-flex items-center gap-1 transition-colors ${active ? "text-mint-300" : "hover:text-white"}`}
                        >
                          {SORT_LABELS[key]}
                          <Icon className="h-3 w-3" />
                        </button>
                      </th>
                    );
                  })}
                  <th scope="col" className="px-3 py-2.5">Contact</th>
                  <th scope="col" className="px-3 py-2.5">Notes / delivery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-carbon-800">
                {visible.map((row) => {
                  const area = [row.district, row.postcode]
                    .filter(Boolean)
                    .join(" - ");
                  return (
                    <tr key={row.id} className="align-top">
                      <td className="whitespace-nowrap px-3 py-3 text-carbon-300">
                        {formatWhen(row.submitted_at)}
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-semibold text-white">
                          {row.name}
                        </div>
                        <div className="text-[11px] text-carbon-400">
                          ref {row.reference}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-carbon-200">
                        {row.service_type || "-"}
                        {row.property_type && (
                          <div className="text-[11px] text-carbon-400">
                            {row.property_type}
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3 text-carbon-200">
                        <div className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-mint-400" />
                          {row.district || "-"}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-carbon-200">
                        {row.postcode || "-"}
                      </td>
                      <td className="px-3 py-3">
                        <select
                          aria-label={`Status for ${row.name}`}
                          value={row.status}
                          disabled={pendingId === row.id}
                          onChange={(e) =>
                            changeStatus(
                              row.id,
                              e.target.value as QuoteLeadStatus
                            )
                          }
                          className={`rounded-md border px-2 py-1 text-[11px] font-bold uppercase tracking-wider disabled:opacity-50 ${STATUS_TONE[row.status]}`}
                        >
                          {QUOTE_LEAD_STATUSES.map((s) => (
                            <option
                              key={s}
                              value={s}
                              className="bg-carbon-900 text-white"
                            >
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-3 text-carbon-200">
                        <div className="flex flex-col gap-1">
                          <a
                            href={`tel:${row.phone.replace(/\s+/g, "")}`}
                            className="inline-flex items-center gap-1 text-mint-300 hover:text-mint-200"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            {row.phone}
                          </a>
                          <a
                            href={`mailto:${row.email}`}
                            className="inline-flex items-center gap-1 text-carbon-200 hover:text-white"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            <span className="truncate">{row.email}</span>
                          </a>
                          {area && (
                            <span className="text-[11px] text-carbon-400">
                              {area}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs text-carbon-300">
                        {row.message && (
                          <p className="line-clamp-3 max-w-[280px] whitespace-pre-wrap">
                            {row.message}
                          </p>
                        )}
                        {row.notes && (
                          <p className="mt-2 line-clamp-2 max-w-[280px] whitespace-pre-wrap rounded border border-mint-500/30 bg-mint-500/5 px-2 py-1 text-[11px] text-mint-200">
                            {row.notes}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => openNotes(row)}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] text-mint-300 hover:text-mint-200"
                        >
                          <StickyNote className="h-3 w-3" />
                          {row.notes ? "Edit note" : "Add note"}
                        </button>
                        <div className="mt-2 inline-flex items-center gap-1 text-[11px]">
                          {row.delivery_ok ? (
                            <CheckCircle2 className="h-3 w-3 text-mint-400" />
                          ) : (
                            <AlertTriangle className="h-3 w-3 text-amber-400" />
                          )}
                          <span className="text-carbon-400">
                            {row.delivery_mode ?? "?"}
                            {row.delivery_ok === false && " (email failed)"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {openNotesId && (
        <NotesDialog
          row={rows.find((r) => r.id === openNotesId) ?? null}
          draft={notesDraft}
          onDraft={setNotesDraft}
          saving={notesSaving}
          onSave={() => openNotesId && saveNotes(openNotesId)}
          onClose={closeNotes}
        />
      )}
    </div>
  );
}

function NotesDialog({
  row,
  draft,
  onDraft,
  saving,
  onSave,
  onClose,
}: {
  row: QuoteLeadRow | null;
  draft: string;
  onDraft: (value: string) => void;
  saving: boolean;
  onSave: () => void;
  onClose: () => void;
}) {
  if (!row) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-mint-500/30 bg-carbon-900 p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Internal note
            </h3>
            <p className="mt-1 text-xs text-carbon-400">
              For {row.name} - only visible inside the admin.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded p-1 text-carbon-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <textarea
          value={draft}
          onChange={(e) => onDraft(e.target.value)}
          rows={5}
          placeholder="What did the customer say? Next action? Quoted price?"
          className="w-full rounded-lg border border-carbon-700 bg-carbon-800 px-3 py-2 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500/60 focus:outline-none focus:ring-1 focus:ring-mint-500/40"
        />
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-carbon-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 hover:border-mint-500/50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-mint-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-carbon-900 hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-3.5 w-3.5" />
            {saving ? "Saving..." : "Save note"}
          </button>
        </div>
      </div>
    </div>
  );
}
