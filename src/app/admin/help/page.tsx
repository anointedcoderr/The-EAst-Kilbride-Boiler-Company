import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Inbox,
  PenSquare,
  PlayCircle,
  Settings,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help | EKBC Admin",
  robots: { index: false, follow: false },
};

const sections = [
  {
    icon: PenSquare,
    title: "How do I edit a page?",
    steps: [
      "Open Manage pages from the dashboard or sidebar.",
      "Find the page in the list and click Edit.",
      "Change the fields you want updated.",
      "Click Save changes at the top right.",
      "Use Open live page to confirm the change is visible.",
    ],
  },
  {
    icon: ImageIcon,
    title: "How do I change an image?",
    steps: [
      "Open the page or blog post you want to update.",
      "Click the image area to open the media picker.",
      "Choose an existing image, or upload a new one.",
      "Add a short description of what is in the image (alt text).",
      "Click Save changes.",
    ],
  },
  {
    icon: PlayCircle,
    title: "How do I add a video?",
    steps: [
      "Copy the video link from YouTube or Vimeo.",
      "Open the page or blog post you want to add the video to.",
      "Add a new Video block and paste the link.",
      "Save the page.",
    ],
  },
  {
    icon: FileText,
    title: "How do I add a blog post?",
    steps: [
      "Open Manage blog posts.",
      "Click Add new blog post.",
      "Fill in the title, intro and body.",
      "Set a featured image.",
      "Set the status to Published when ready.",
      "Click Save.",
    ],
  },
  {
    icon: Inbox,
    title: "How do I see and manage quote leads?",
    steps: [
      "Open Leads from the dashboard.",
      "Each row is one quote request from a homeowner.",
      "Tap the phone or email to contact them directly.",
      "Change the status dropdown as you progress the lead.",
    ],
  },
  {
    icon: Settings,
    title: "How do I update phone, email or address?",
    steps: [
      "Open Site settings from the dashboard.",
      "Update the field you want changed.",
      "Click Save changes.",
      "Allow about a minute for the update to appear on every page.",
    ],
  },
];

export default function AdminHelpPage() {
  return (
    <div className="min-h-screen bg-carbon-950 text-white">
      <header className="sticky top-0 z-30 border-b border-carbon-800 bg-carbon-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 rounded-full border border-carbon-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 transition-colors hover:border-mint-500/50 hover:text-mint-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to admin
            </Link>
            <h1 className="text-base font-bold uppercase tracking-wider text-white">
              Help
            </h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <p className="mb-6 max-w-2xl text-sm text-carbon-300">
          Quick guides for the most common admin tasks. If something looks
          different to these instructions, ask your developer for a short
          screen share - the layout may have been updated.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <article
                key={section.title}
                className="rounded-2xl border border-carbon-800 bg-carbon-900/40 p-5"
              >
                <div className="mb-3 flex items-center gap-2 text-mint-400">
                  <Icon className="h-5 w-5" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                    {section.title}
                  </h2>
                </div>
                <ol className="space-y-1.5 text-sm leading-relaxed text-carbon-200">
                  {section.steps.map((step, i) => (
                    <li key={step} className="flex gap-2">
                      <span className="shrink-0 text-mint-400">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-mint-500/30 bg-mint-500/5 p-5 text-sm text-carbon-200">
          <p className="font-bold text-mint-300">
            Need a change you can't make from here?
          </p>
          <p className="mt-1 text-carbon-300">
            Some parts of the website still require a developer (custom
            features, design changes, new section types). Send your request to
            your developer with the page URL and a clear description of what
            should change.
          </p>
        </div>
      </div>
    </div>
  );
}
