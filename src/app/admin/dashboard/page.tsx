import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  HelpCircle,
  Inbox,
  Image as ImageIcon,
  LogOut,
  Newspaper,
  Settings,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";
import { getDashboardCounts } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Dashboard | EKBC Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const quickLinks: Array<{
  href: string;
  label: string;
  description: string;
  icon: typeof FileText;
  comingSoon?: boolean;
}> = [
  {
    href: "/admin/leads",
    label: "Quote leads",
    description: "Every quote request, sortable and filterable.",
    icon: Inbox,
  },
  {
    href: "/admin/settings",
    label: "Site settings",
    description:
      "Phone, email, address, opening hours and global page copy.",
    icon: Settings,
  },
  {
    href: "/admin/help",
    label: "Help guide",
    description: "Quick instructions for the most common admin tasks.",
    icon: HelpCircle,
  },
  {
    href: "/admin",
    label: "Content preview",
    description:
      "Legacy admin sections (pages, brand pricing, promotions, SEO).",
    icon: FileText,
  },
  {
    href: "/admin/pages",
    label: "Manage pages",
    description:
      "Edit page titles, hero, meta and SEO settings across all 60+ pages.",
    icon: FileText,
  },
  {
    href: "/admin/blogs",
    label: "Manage blog",
    description: "Add and edit blog posts. Coming in Phase 3.",
    icon: Newspaper,
    comingSoon: true,
  },
  {
    href: "/admin/media",
    label: "Media library",
    description: "Upload site images, copy URLs, edit alt text and captions.",
    icon: ImageIcon,
  },
];

export default async function AdminDashboardPage() {
  const counts = await getDashboardCounts();

  return (
    <div className="min-h-screen bg-carbon-950 text-white">
      <header className="sticky top-0 z-30 border-b border-carbon-800 bg-carbon-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold uppercase tracking-wider text-white">
              EKBC Admin
            </h1>
            <span className="inline-flex items-center rounded-full border border-mint-500/40 bg-mint-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mint-400">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-carbon-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 transition-colors hover:border-mint-500/50 hover:text-mint-400"
            >
              View site
            </Link>
            <form method="POST" action="/api/admin/logout" className="inline-flex">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full border border-carbon-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-carbon-300 transition-colors hover:border-mint-500/50 hover:text-mint-400"
                aria-label="Sign out"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10 space-y-8">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-mint-400">
            Overview
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total leads"
              value={counts.leadsTotal}
              icon={Inbox}
            />
            <StatCard
              label="New leads"
              value={counts.leadsNew}
              icon={Mail}
              accent="mint"
            />
            <StatCard
              label="In progress"
              value={counts.leadsContacted}
              icon={Phone}
            />
            <StatCard
              label="Blog posts"
              value={counts.blogsTotal}
              icon={Newspaper}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-mint-400">
            What do you want to do?
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <QuickLink key={link.href + link.label} {...link} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: typeof FileText;
  accent?: "mint";
}) {
  return (
    <div
      className={`rounded-2xl border bg-carbon-900/40 p-5 ${
        accent === "mint"
          ? "border-mint-500/40"
          : "border-carbon-800"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-carbon-400">
          {label}
        </span>
        <Icon
          className={`h-4 w-4 ${accent === "mint" ? "text-mint-400" : "text-carbon-500"}`}
        />
      </div>
      <div className="mt-2 text-3xl font-extrabold text-white">{value}</div>
    </div>
  );
}

function QuickLink({
  href,
  label,
  description,
  icon: Icon,
  comingSoon,
}: {
  href: string;
  label: string;
  description: string;
  icon: typeof FileText;
  comingSoon?: boolean;
}) {
  const content = (
    <>
      <div className="flex items-center justify-between">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-mint-500/40 bg-mint-500/10 text-mint-400">
          <Icon className="h-4 w-4" />
        </span>
        {comingSoon ? (
          <span className="rounded-full border border-carbon-700 bg-carbon-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-carbon-400">
            Soon
          </span>
        ) : (
          <ArrowRight className="h-4 w-4 text-carbon-500" />
        )}
      </div>
      <div className="mt-3 text-sm font-bold uppercase tracking-wider text-white">
        {label}
      </div>
      <p className="mt-1 text-xs leading-relaxed text-carbon-300">
        {description}
      </p>
    </>
  );
  const className = `block rounded-2xl border bg-carbon-900/40 p-5 transition-colors ${
    comingSoon
      ? "border-carbon-800 opacity-60 cursor-not-allowed"
      : "border-carbon-800 hover:border-mint-500/40 hover:bg-carbon-900"
  }`;
  if (comingSoon) {
    return <div className={className}>{content}</div>;
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
