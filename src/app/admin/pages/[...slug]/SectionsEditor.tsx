"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
  GripVertical,
  Heading2,
  Type,
  Image as ImageIcon,
  PlayCircle,
  Megaphone,
  HelpCircle,
} from "lucide-react";
import {
  BLOCK_LABELS,
  BLOCK_TYPES,
  defaultBlock,
  type Block,
} from "@/lib/cmsBlocks";
import { MediaPicker } from "./MediaPicker";

interface SectionsEditorProps {
  value: Block[];
  onChange: (next: Block[]) => void;
}

const BLOCK_ICON: Record<Block["type"], typeof Heading2> = {
  heading: Heading2,
  richText: Type,
  image: ImageIcon,
  video: PlayCircle,
  cta: Megaphone,
  faq: HelpCircle,
};

export function SectionsEditor({ value, onChange }: SectionsEditorProps) {
  const [adderOpen, setAdderOpen] = useState(false);

  function update(index: number, next: Block) {
    const copy = value.slice();
    copy[index] = next;
    onChange(copy);
  }

  function remove(index: number) {
    if (!confirm("Remove this block?")) return;
    const copy = value.slice();
    copy.splice(index, 1);
    onChange(copy);
  }

  function move(index: number, delta: -1 | 1) {
    const target = index + delta;
    if (target < 0 || target >= value.length) return;
    const copy = value.slice();
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    onChange(copy);
  }

  function addBlock(type: Block["type"]) {
    onChange([...value, defaultBlock(type)]);
    setAdderOpen(false);
  }

  return (
    <div className="space-y-3">
      {value.length === 0 && (
        <div className="rounded-xl border border-dashed border-carbon-700 bg-carbon-900/40 p-6 text-center text-sm text-carbon-400">
          No content blocks yet. Click <strong>Add block</strong> below to start.
        </div>
      )}

      {value.map((block, i) => (
        <BlockShell
          key={i}
          index={i}
          total={value.length}
          block={block}
          onMove={move}
          onRemove={remove}
        >
          <BlockEditor
            block={block}
            onChange={(next) => update(i, next)}
          />
        </BlockShell>
      ))}

      <div className="relative">
        <button
          type="button"
          onClick={() => setAdderOpen((o) => !o)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-mint-500/40 bg-mint-500/5 px-4 py-3 text-sm font-bold uppercase tracking-wider text-mint-300 hover:bg-mint-500/10"
        >
          <Plus className="h-4 w-4" />
          Add block
        </button>
        {adderOpen && (
          <div
            className="absolute bottom-full left-1/2 z-20 mb-2 grid w-full max-w-md -translate-x-1/2 grid-cols-2 gap-2 rounded-2xl border border-carbon-700 bg-carbon-900 p-3 shadow-xl sm:grid-cols-3"
          >
            {BLOCK_TYPES.map((t) => {
              const Icon = BLOCK_ICON[t];
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => addBlock(t)}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-carbon-700 bg-carbon-800 px-3 py-3 text-xs font-bold uppercase tracking-wider text-carbon-200 hover:border-mint-500/40 hover:text-mint-300"
                >
                  <Icon className="h-4 w-4" />
                  {BLOCK_LABELS[t]}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function BlockShell({
  index,
  total,
  block,
  onMove,
  onRemove,
  children,
}: {
  index: number;
  total: number;
  block: Block;
  onMove: (index: number, delta: -1 | 1) => void;
  onRemove: (index: number) => void;
  children: React.ReactNode;
}) {
  const Icon = BLOCK_ICON[block.type];
  return (
    <div className="rounded-xl border border-carbon-700 bg-carbon-900/60 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mint-300">
          <GripVertical className="h-4 w-4 text-carbon-500" />
          <Icon className="h-4 w-4" />
          {BLOCK_LABELS[block.type]}
          <span className="text-carbon-500">·</span>
          <span className="text-carbon-400">#{index + 1}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Move up"
            disabled={index === 0}
            onClick={() => onMove(index, -1)}
            className="rounded p-1 text-carbon-300 hover:text-white disabled:opacity-30"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Move down"
            disabled={index === total - 1}
            onClick={() => onMove(index, 1)}
            className="rounded p-1 text-carbon-300 hover:text-white disabled:opacity-30"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Remove"
            onClick={() => onRemove(index)}
            className="rounded p-1 text-rose-300 hover:text-rose-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function BlockEditor({
  block,
  onChange,
}: {
  block: Block;
  onChange: (next: Block) => void;
}) {
  const inputClass =
    "w-full rounded-lg border border-carbon-600 bg-carbon-800 px-3 py-2 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500";

  switch (block.type) {
    case "heading":
      return (
        <>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...block, level: 2 })}
              className={`rounded-md border px-2 py-1 text-[11px] font-bold uppercase ${
                block.level === 2
                  ? "border-mint-500/60 bg-mint-500/10 text-mint-200"
                  : "border-carbon-700 text-carbon-400"
              }`}
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...block, level: 3 })}
              className={`rounded-md border px-2 py-1 text-[11px] font-bold uppercase ${
                block.level === 3
                  ? "border-mint-500/60 bg-mint-500/10 text-mint-200"
                  : "border-carbon-700 text-carbon-400"
              }`}
            >
              H3
            </button>
          </div>
          <input
            type="text"
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            placeholder="Heading text"
            className={inputClass}
          />
        </>
      );

    case "richText":
      return (
        <textarea
          value={block.body}
          onChange={(e) => onChange({ ...block, body: e.target.value })}
          rows={5}
          placeholder="Paragraph text. Press Enter twice to start a new paragraph."
          className={inputClass}
        />
      );

    case "image":
      return <ImageBlockEditor block={block} onChange={onChange} />;

    case "video":
      return (
        <>
          <input
            type="url"
            value={block.url}
            onChange={(e) => onChange({ ...block, url: e.target.value })}
            placeholder="YouTube or Vimeo URL"
            className={inputClass}
          />
          <input
            type="text"
            value={block.caption ?? ""}
            onChange={(e) =>
              onChange({ ...block, caption: e.target.value })
            }
            placeholder="Caption (optional)"
            className={inputClass}
          />
        </>
      );

    case "cta":
      return (
        <>
          <input
            type="text"
            value={block.heading}
            onChange={(e) => onChange({ ...block, heading: e.target.value })}
            placeholder="Headline"
            className={inputClass}
          />
          <input
            type="text"
            value={block.subtext ?? ""}
            onChange={(e) =>
              onChange({ ...block, subtext: e.target.value })
            }
            placeholder="Supporting text (optional)"
            className={inputClass}
          />
          <input
            type="text"
            value={block.buttonText}
            onChange={(e) =>
              onChange({ ...block, buttonText: e.target.value })
            }
            placeholder="Button text"
            className={inputClass}
          />
          <input
            type="text"
            value={block.buttonHref}
            onChange={(e) =>
              onChange({ ...block, buttonHref: e.target.value })
            }
            placeholder="Where the button goes (e.g. /contact/ or tel:01355204045)"
            className={inputClass}
          />
        </>
      );

    case "faq":
      return (
        <FaqEditor
          items={block.items}
          onChange={(items) => onChange({ ...block, items })}
        />
      );
  }
}

function ImageBlockEditor({
  block,
  onChange,
}: {
  block: { type: "image"; url: string; alt: string; caption?: string };
  onChange: (next: Block) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const inputClass =
    "w-full rounded-lg border border-carbon-600 bg-carbon-800 px-3 py-2 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500";

  return (
    <>
      {block.url && (
        <div className="overflow-hidden rounded-lg border border-carbon-800 bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.url}
            alt={block.alt}
            className="block max-h-48 w-full object-contain"
          />
        </div>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-mint-500 px-3 py-2 text-xs font-bold uppercase tracking-wider text-carbon-900 hover:bg-mint-400"
        >
          <ImageIcon className="h-3.5 w-3.5" />
          {block.url ? "Replace image" : "Choose image"}
        </button>
        {block.url && (
          <button
            type="button"
            onClick={() => onChange({ ...block, url: "", alt: "" })}
            className="inline-flex items-center gap-1.5 rounded-lg border border-carbon-700 px-3 py-2 text-xs font-bold uppercase tracking-wider text-carbon-300 hover:border-rose-400/40 hover:text-rose-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        )}
      </div>
      <input
        type="url"
        value={block.url}
        onChange={(e) => onChange({ ...block, url: e.target.value })}
        placeholder="Or paste an image URL"
        className={inputClass}
      />
      <input
        type="text"
        value={block.alt}
        onChange={(e) => onChange({ ...block, alt: e.target.value })}
        placeholder="Alt text - describe what is in the image"
        className={inputClass}
      />
      <input
        type="text"
        value={block.caption ?? ""}
        onChange={(e) => onChange({ ...block, caption: e.target.value })}
        placeholder="Caption (optional)"
        className={inputClass}
      />
      {pickerOpen && (
        <MediaPicker
          onClose={() => setPickerOpen(false)}
          onSelect={(row) => {
            onChange({
              ...block,
              url: row.file_url,
              alt: block.alt || row.alt_text || "",
              caption: block.caption ?? row.caption,
            });
            setPickerOpen(false);
          }}
        />
      )}
    </>
  );
}

function FaqEditor({
  items,
  onChange,
}: {
  items: Array<{ question: string; answer: string }>;
  onChange: (next: Array<{ question: string; answer: string }>) => void;
}) {
  const inputClass =
    "w-full rounded-lg border border-carbon-600 bg-carbon-800 px-3 py-2 text-sm text-white placeholder:text-carbon-500 focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500";

  function updateItem(i: number, patch: Partial<(typeof items)[number]>) {
    const copy = items.slice();
    copy[i] = { ...copy[i], ...patch };
    onChange(copy);
  }

  function removeItem(i: number) {
    const copy = items.slice();
    copy.splice(i, 1);
    onChange(copy);
  }

  function addItem() {
    onChange([...items, { question: "", answer: "" }]);
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-lg border border-carbon-700 bg-carbon-800/60 p-3"
        >
          <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-carbon-400">
            <span>Question {i + 1}</span>
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="text-rose-300 hover:text-rose-200"
              aria-label="Remove question"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <input
            type="text"
            value={item.question}
            onChange={(e) => updateItem(i, { question: e.target.value })}
            placeholder="Question"
            className={inputClass}
          />
          <textarea
            value={item.answer}
            onChange={(e) => updateItem(i, { answer: e.target.value })}
            placeholder="Answer"
            rows={3}
            className={`${inputClass} mt-2`}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-1.5 rounded-lg border border-carbon-700 bg-carbon-800 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-carbon-200 hover:border-mint-500/40 hover:text-mint-300"
      >
        <Plus className="h-3.5 w-3.5" />
        Add question
      </button>
    </div>
  );
}
