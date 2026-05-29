"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Users,
  Star,
  Layers,
  Newspaper,
  ArrowUpRight,
  Check,
  FileText,
  Network,
  Globe,
  ShieldCheck,
  Plus,
  Trash2,
} from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminInput, AdminTextarea } from "@/components/admin/AdminInput";
import { Toast } from "@/components/admin/Toast";
import { siteSettings } from "@/data/siteSettings";
import { brands } from "@/data/brands";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blogPosts";
import { districts, g74Districts, g75Districts } from "@/data/districts";
import { reviews } from "@/data/reviews";
import {
  editablePageList,
  pageContent,
  type PageContent,
  type PageStatus,
} from "@/data/pageContent";
import { cn } from "@/lib/utils";

interface BrandRow {
  id: string;
  name: string;
  standardPrice: number;
  premiumPrice: number;
  warrantyYears: number;
  tag: string;
  includes: string;
}

interface PromotionState {
  needBoilerBanner: string;
  heroSubtitle: string;
}

interface QuoteFormState {
  formRecipient: string;
  thankYouMessage: string;
  serviceOptions: string;
  propertyTypes: string;
}

interface EditablePageState {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  heroDescription: string;
  ctaPrimaryLabel: string;
  ctaBannerTitle: string;
  introCopy: string;
  faqs: { question: string; answer: string }[];
  internalLinks: { label: string; href: string }[];
}

function pageToState(page: PageContent): EditablePageState {
  return {
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    h1: page.h1,
    heroSubtitle: page.heroSubtitle,
    heroDescription: page.heroDescription,
    ctaPrimaryLabel: page.ctaPrimaryLabel,
    ctaBannerTitle: page.ctaBannerTitle ?? "",
    introCopy: page.introCopy ?? "",
    faqs: page.faqs.map((f) => ({ question: f.question, answer: f.answer })),
    internalLinks: page.internalLinks.map((l) => ({
      label: l.label,
      href: l.href,
    })),
  };
}

const statusLabel: Record<PageStatus, string> = {
  "live-sample": "Live sample",
  "stage-2-pending": "Stage 2 pending",
  stub: "Stub",
  "ready-from-data": "Ready from data",
};

const statusClasses: Record<PageStatus, string> = {
  "live-sample":
    "border-mint-500/40 bg-mint-500/10 text-mint-400",
  "stage-2-pending":
    "border-yellow-500/40 bg-yellow-500/10 text-yellow-300",
  stub: "border-carbon-500 bg-carbon-800 text-carbon-300",
  "ready-from-data":
    "border-brand-blue/40 bg-brand-blue/10 text-brand-blue-bright",
};

interface SiloNode {
  label: string;
  url?: string;
  status: PageStatus;
  pageType: string;
  childCount?: number;
  children?: SiloNode[];
}

const siloTree: SiloNode[] = [
  {
    label: "Homepage",
    url: "/",
    status: "live-sample",
    pageType: "homepage",
    children: [
      {
        label: "Services",
        url: "/services/new-boiler-installation/",
        status: "live-sample",
        pageType: "service hub",
        childCount: 3,
        children: [
          {
            label: "New Boiler Installation",
            url: "/services/new-boiler-installation/",
            status: "live-sample",
            pageType: "service",
          },
          {
            label: "Boiler Repair",
            url: "/services/boiler-repair/",
            status: "live-sample",
            pageType: "service",
          },
          {
            label: "Annual Boiler Service",
            url: "/services/boiler-servicing/",
            status: "live-sample",
            pageType: "service",
          },
        ],
      },
      {
        label: "Boilers",
        url: "/boilers/",
        status: "live-sample",
        pageType: "price hub",
        childCount: 4,
        children: brands.map((brand) => ({
          label: `${brand.name} Combi`,
          url: `/boilers/${brand.slug}/`,
          status: "live-sample" as PageStatus,
          pageType: "brand detail",
        })),
      },
      {
        label: "Areas We Serve",
        url: "/areas-we-serve/",
        status: "live-sample",
        pageType: "areas hub",
        childCount: 2,
        children: [
          {
            label: "G74 - North & Central",
            url: "/areas-we-serve/g74/",
            status: "live-sample",
            pageType: "postcode hub",
            childCount: g74Districts.length,
            children: g74Districts.map((d) => ({
              label: d.name,
              url: `/areas-we-serve/${d.slug}/`,
              status: "live-sample" as PageStatus,
              pageType: "district",
            })),
          },
          {
            label: "G75 - South & West",
            url: "/areas-we-serve/g75/",
            status: "live-sample",
            pageType: "postcode hub",
            childCount: g75Districts.length,
            children: g75Districts.map((d) => ({
              label: d.name,
              url: `/areas-we-serve/${d.slug}/`,
              status: "live-sample" as PageStatus,
              pageType: "district",
            })),
          },
        ],
      },
      {
        label: "Blogs",
        url: "/blogs/",
        status: "live-sample",
        pageType: "blog index",
        childCount: blogPosts.length,
        children: blogPosts.map((post) => ({
          label: post.title,
          url: `/blogs/${post.slug}/`,
          status: "live-sample" as PageStatus,
          pageType: "blog post",
        })),
      },
      {
        label: "About",
        url: "/about/",
        status: "live-sample",
        pageType: "static",
      },
      {
        label: "Contact",
        url: "/contact/",
        status: "live-sample",
        pageType: "static",
      },
      {
        label: "FAQ",
        url: "/faq/",
        status: "live-sample",
        pageType: "static",
      },
      {
        label: "Privacy",
        url: "/privacy/",
        status: "live-sample",
        pageType: "static",
      },
      {
        label: "Terms",
        url: "/terms/",
        status: "live-sample",
        pageType: "static",
      },
    ],
  },
];

const seoPages = [
  {
    id: "home",
    label: "Home",
    title: pageContent.home.metaTitle,
    description: pageContent.home.metaDescription,
  },
  ...services.map((s) => ({
    id: s.slug,
    label: s.name,
    title: s.seoTitle,
    description: s.seoDescription,
  })),
  {
    id: "boilers",
    label: "Boiler Prices",
    title: pageContent.boilers.metaTitle,
    description: pageContent.boilers.metaDescription,
  },
  {
    id: "blogs",
    label: "Blogs",
    title: pageContent.blogs.metaTitle,
    description: pageContent.blogs.metaDescription,
  },
];

function SiloTreeNode({
  node,
  depth = 0,
}: {
  node: SiloNode;
  depth?: number;
}) {
  const indent = depth * 16;
  return (
    <div>
      <div
        className="flex items-center justify-between gap-3 rounded-lg border border-carbon-800 bg-carbon-900 px-3 py-2.5"
        style={{ marginLeft: indent }}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span
            className={cn(
              "inline-flex h-1.5 w-1.5 shrink-0 rounded-full",
              node.status === "live-sample"
                ? "bg-mint-500"
                : node.status === "stage-2-pending"
                  ? "bg-yellow-400"
                  : node.status === "ready-from-data"
                    ? "bg-brand-blue-bright"
                    : "bg-carbon-500"
            )}
            aria-hidden="true"
          />
          <span className="truncate text-sm font-semibold text-white">
            {node.label}
          </span>
          {node.url && (
            <span className="hidden truncate text-[11px] text-carbon-400 sm:inline">
              {node.url}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-[10px] uppercase tracking-wider text-carbon-400 lg:inline">
            {node.pageType}
          </span>
          {typeof node.childCount === "number" && (
            <span className="rounded-full border border-carbon-700 bg-carbon-950 px-2 py-0.5 text-[10px] font-semibold text-carbon-300">
              {node.childCount} child
            </span>
          )}
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              statusClasses[node.status]
            )}
          >
            {statusLabel[node.status]}
          </span>
        </div>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="mt-1.5 space-y-1.5">
          {node.children.map((child) => (
            <SiloTreeNode
              key={`${child.label}-${child.url ?? ""}`}
              node={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    businessName: siteSettings.businessName,
    shortName: siteSettings.shortName,
    phone: siteSettings.phone,
    email: siteSettings.email,
    street: siteSettings.address.street,
    city: siteSettings.address.city,
    region: siteSettings.address.region,
    postcode: siteSettings.address.postcode,
    establishedYear: siteSettings.establishedYear,
    averageRating: siteSettings.averageRating,
    happyCustomers: siteSettings.happyCustomers,
    areasServed: siteSettings.areasServed,
  });

  const [brandRows, setBrandRows] = useState<BrandRow[]>(
    brands.map((b) => ({
      id: b.id,
      name: b.name,
      standardPrice: b.standardPrice,
      premiumPrice: b.premiumPrice,
      warrantyYears: b.warrantyYears,
      tag: b.tag,
      includes: b.includes.join(", "),
    }))
  );

  const [promotion, setPromotion] = useState<PromotionState>({
    needBoilerBanner: "Need a new boiler? Fixed price, quick installation.",
    heroSubtitle: "Serving all areas of East Kilbride G74/G75",
  });

  const [quoteForm, setQuoteForm] = useState<QuoteFormState>({
    formRecipient: siteSettings.formRecipient,
    thankYouMessage:
      "Thank you. We will send your custom quote over as soon as possible.",
    serviceOptions: "New Boiler, Repair, Annual Service, Pricing Advice",
    propertyTypes: "Flat, Terraced, Semi-detached, Detached, Other",
  });

  const [seoPageId, setSeoPageId] = useState(seoPages[0].id);
  const seoCurrent = useMemo(
    () => seoPages.find((p) => p.id === seoPageId) ?? seoPages[0],
    [seoPageId]
  );

  const [brandPageSelected, setBrandPageSelected] = useState(brands[0].id);
  const [brandPageState, setBrandPageState] = useState<
    Record<
      string,
      {
        h1: string;
        metaTitle: string;
        metaDescription: string;
        heroSubtitle: string;
      }
    >
  >(() =>
    Object.fromEntries(
      brands.map((b) => [
        b.id,
        {
          h1: b.h1,
          metaTitle: b.seoTitle,
          metaDescription: b.seoDescription,
          heroSubtitle:
            "Fitted by Gas Safe Experts across all 35 East Kilbride districts",
        },
      ])
    )
  );

  const [districtSelected, setDistrictSelected] = useState(districts[0].slug);
  const [districtPageState, setDistrictPageState] = useState<
    Record<
      string,
      {
        name: string;
        position: string;
        housingMix: string;
        preferredBrands: string;
        localAngle: string;
        typicalJob: string;
      }
    >
  >(() =>
    Object.fromEntries(
      districts.map((d) => [
        d.slug,
        {
          name: d.name,
          position: d.position,
          housingMix: d.housingMix,
          preferredBrands: d.preferredBrands.join(", "),
          localAngle: d.localAngle,
          typicalJob: d.typicalJob,
        },
      ])
    )
  );

  const [selectedPageId, setSelectedPageId] = useState(
    editablePageList[0].id
  );
  const selectedPage = useMemo(
    () =>
      editablePageList.find((p) => p.id === selectedPageId) ??
      editablePageList[0],
    [selectedPageId]
  );
  const [pageState, setPageState] = useState<
    Record<string, EditablePageState>
  >(() =>
    Object.fromEntries(editablePageList.map((p) => [p.id, pageToState(p)]))
  );

  function updatePage(updater: (state: EditablePageState) => EditablePageState) {
    setPageState((prev) => ({
      ...prev,
      [selectedPageId]: updater(prev[selectedPageId]),
    }));
  }

  function resetPage() {
    setPageState((prev) => ({
      ...prev,
      [selectedPageId]: pageToState(selectedPage),
    }));
    setToastMessage(`${selectedPage.label} reset to live content.`);
  }

  const current = pageState[selectedPageId];

  const stats = useMemo(
    () => [
      {
        label: "Sample pages live",
        value: editablePageList.length + blogPosts.length,
        icon: Layers,
        hint: "Homepage, services, boilers, blog index, posts",
      },
      {
        label: "Brands",
        value: brands.length,
        icon: Star,
        hint: "Worcester Bosch, Ideal, Vokera, Navien",
      },
      {
        label: "Districts ready",
        value: districts.length,
        icon: MapPin,
        hint: "Full G74 and G75 silo prepared",
      },
      {
        label: "Reviews",
        value: reviews.length,
        icon: Users,
        hint: "Verified 5-star featured reviews",
      },
    ],
    []
  );

  const sitemapRoutes = useMemo(() => {
    const live: string[] = [
      "/",
      "/boilers/",
      "/blogs/",
      "/about/",
      "/contact/",
      "/faq/",
      "/privacy/",
      "/terms/",
      "/areas-we-serve/",
      "/areas-we-serve/g74/",
      "/areas-we-serve/g75/",
    ];
    services.forEach((s) => live.push(`/services/${s.slug}/`));
    brands.forEach((b) => live.push(`/boilers/${b.slug}/`));
    districts.forEach((d) => live.push(`/areas-we-serve/${d.slug}/`));
    blogPosts.forEach((p) => live.push(`/blogs/${p.slug}/`));
    return live;
  }, []);

  function notifySave(scope: string) {
    setToastMessage(
      `${scope} saved. Changes persist when the live CMS is connected in Stage 2.`
    );
  }

  return (
    <AdminShell
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {activeSection === "overview" && (
        <>
          <AdminCard
            title="Welcome back"
            description="A read-only snapshot of the website and the editable fields available in the live CMS."
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-carbon-700 bg-carbon-900 p-4"
                  >
                    <div className="flex items-center gap-2 text-mint-400">
                      <Icon className="h-4 w-4" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                    <p className="mt-2 text-2xl font-extrabold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] leading-tight text-carbon-400">
                      {stat.hint}
                    </p>
                  </div>
                );
              })}
            </div>
          </AdminCard>

          <AdminCard
            title="Quick links"
            description="Jump straight to the new Stage 1 admin tools."
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  id: "pages",
                  label: "Pages (Content Manager)",
                  desc: "Edit any page like the homepage",
                  Icon: FileText,
                },
                {
                  id: "silo",
                  label: "Silo Preview",
                  desc: "See the URL tree for the full site",
                  Icon: Network,
                },
                {
                  id: "sitemap",
                  label: "Sitemap & Crawling",
                  desc: "sitemap.xml and robots.txt",
                  Icon: Globe,
                },
                {
                  id: "schema",
                  label: "SEO & Schema Foundation",
                  desc: "Schema, meta, canonical at a glance",
                  Icon: ShieldCheck,
                },
              ].map(({ id, label, desc, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSection(id)}
                  className="hover-card flex h-full flex-col items-start gap-3 rounded-xl border border-carbon-700 bg-carbon-900 p-4 text-left transition-colors hover:border-mint-500/40"
                >
                  <div className="hover-icon-glow flex h-10 w-10 items-center justify-center rounded-full border border-mint-500/40 bg-carbon-950">
                    <Icon className="h-4 w-4 text-mint-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{label}</p>
                    <p className="mt-1 text-[11px] text-carbon-400">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </AdminCard>

          <AdminCard
            title="Recent activity"
            description="Most recent content changes and content waiting to be published."
          >
            <ul className="divide-y divide-carbon-800">
              {blogPosts.map((post) => (
                <li
                  key={post.slug}
                  className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <Newspaper className="mt-0.5 h-4 w-4 text-mint-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {post.title}
                    </p>
                    <p className="text-[11px] text-carbon-400">
                      Published {new Date(post.date).toLocaleDateString("en-GB")} ·{" "}
                      {post.readMinutes} min read
                    </p>
                  </div>
                  <span className="rounded-full border border-mint-500/40 bg-mint-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mint-400">
                    Live
                  </span>
                </li>
              ))}
            </ul>
          </AdminCard>
        </>
      )}

      {activeSection === "pages" && (
        <>
          <AdminCard
            title="Pages (Content Manager)"
            description="Pick a page from the list and edit its title, meta, H1, hero subtitle, intro, CTA, FAQs and internal links. Stage 1 preview only - persistence connects in Stage 2."
          >
            <div className="rounded-lg border border-mint-500/30 bg-mint-500/5 px-4 py-3 text-[12px] leading-relaxed text-mint-300">
              Stage 1 CMS preview. In Stage 2, these fields will connect to the live CMS storage so approved updates can feed the website.
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
              <aside>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-mint-400">
                  All pages
                </p>
                <ul className="space-y-1.5">
                  {editablePageList.map((page) => (
                    <li key={page.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedPageId(page.id)}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left transition-colors",
                          selectedPageId === page.id
                            ? "border-mint-500/50 bg-mint-500/10 text-mint-400"
                            : "border-carbon-800 bg-carbon-900 text-white hover:border-carbon-700"
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">
                            {page.label}
                          </span>
                          <span className="block truncate text-[11px] text-carbon-400">
                            {page.url}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                            statusClasses[page.status]
                          )}
                        >
                          {statusLabel[page.status]}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 mb-2 text-[10px] font-bold uppercase tracking-wider text-mint-400">
                  Blog posts
                </p>
                <ul className="space-y-1.5">
                  {blogPosts.map((post) => (
                    <li
                      key={post.slug}
                      className="flex items-center justify-between rounded-lg border border-carbon-800 bg-carbon-900 px-3 py-2"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-white">
                          {post.title}
                        </span>
                        <span className="block truncate text-[11px] text-carbon-400">
                          /blogs/{post.slug}/
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full border border-mint-500/40 bg-mint-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-mint-400">
                        Live
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 mb-2 text-[10px] font-bold uppercase tracking-wider text-mint-400">
                  Brand pages
                </p>
                <ul className="space-y-1.5">
                  {brands.map((b) => (
                    <li
                      key={b.id}
                      className="flex items-center justify-between rounded-lg border border-carbon-800 bg-carbon-900 px-3 py-2"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-white">
                          {b.name} Combi
                        </span>
                        <span className="block truncate text-[11px] text-carbon-400">
                          /boilers/{b.slug}/
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full border border-mint-500/40 bg-mint-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-mint-400">
                        Live
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 mb-2 text-[10px] font-bold uppercase tracking-wider text-mint-400">
                  Postcode hubs
                </p>
                <ul className="space-y-1.5">
                  {(["G74", "G75"] as const).map((code) => (
                    <li
                      key={code}
                      className="flex items-center justify-between rounded-lg border border-carbon-800 bg-carbon-900 px-3 py-2"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-white">
                          {code} hub
                        </span>
                        <span className="block truncate text-[11px] text-carbon-400">
                          /areas-we-serve/{code.toLowerCase()}/
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full border border-mint-500/40 bg-mint-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-mint-400">
                        Live
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 mb-2 text-[10px] font-bold uppercase tracking-wider text-mint-400">
                  District pages ({districts.length})
                </p>
                <p className="mb-2 text-[11px] text-carbon-400">
                  35 generated from districts.ts. Full per-district editor opens in the District Pages section.
                </p>
                <ul className="space-y-1 text-[12px]">
                  {districts.slice(0, 6).map((d) => (
                    <li
                      key={d.slug}
                      className="flex items-center justify-between rounded-lg border border-carbon-800 bg-carbon-900 px-3 py-1.5"
                    >
                      <span className="truncate text-white">{d.name}</span>
                      <span className="shrink-0 text-[10px] uppercase tracking-wide text-carbon-400">
                        {d.postcodeHub}
                      </span>
                    </li>
                  ))}
                  <li className="px-3 py-1 text-carbon-400">
                    + {districts.length - 6} more in the District Pages tab
                  </li>
                </ul>
              </aside>

              <div className="space-y-5">
                <div className="rounded-xl border border-carbon-700 bg-carbon-900 p-4">
                  <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-mint-400">
                        Editing
                      </p>
                      <h3 className="mt-1 text-base font-bold text-white">
                        {selectedPage.label}
                      </h3>
                      <p className="text-[11px] text-carbon-400">
                        URL: {selectedPage.url} · Schema:{" "}
                        {selectedPage.schemaTypes.join(", ") || "n/a"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={selectedPage.url}
                        target="_blank"
                        className="inline-flex items-center gap-1 rounded-lg border border-carbon-700 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-carbon-200 hover:border-mint-500/40 hover:text-mint-400"
                      >
                        View live
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={resetPage}
                        className="inline-flex items-center rounded-lg border border-carbon-700 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-carbon-200 hover:border-mint-500/40 hover:text-mint-400"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => notifySave(`${selectedPage.label} content`)}
                        className="inline-flex items-center justify-center rounded-lg bg-mint-500 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-carbon-900 shadow-lg shadow-mint-500/20 transition-all hover:bg-mint-400 active:scale-95"
                      >
                        Save changes
                      </button>
                    </div>
                  </header>

                  <div className="grid gap-4">
                    <AdminInput
                      label="Page title (browser tab)"
                      value={current.metaTitle}
                      onChange={(e) =>
                        updatePage((s) => ({ ...s, metaTitle: e.target.value }))
                      }
                      hint={`${current.metaTitle.length} characters`}
                    />
                    <AdminTextarea
                      label="Meta description"
                      value={current.metaDescription}
                      onChange={(e) =>
                        updatePage((s) => ({
                          ...s,
                          metaDescription: e.target.value,
                        }))
                      }
                      hint={`${current.metaDescription.length} characters`}
                    />
                    <AdminInput
                      label="H1 - main page heading"
                      value={current.h1}
                      onChange={(e) =>
                        updatePage((s) => ({ ...s, h1: e.target.value }))
                      }
                    />
                    <AdminInput
                      label="Hero subtitle"
                      value={current.heroSubtitle}
                      onChange={(e) =>
                        updatePage((s) => ({
                          ...s,
                          heroSubtitle: e.target.value,
                        }))
                      }
                    />
                    <AdminTextarea
                      label="Hero description / main intro"
                      value={current.heroDescription}
                      onChange={(e) =>
                        updatePage((s) => ({
                          ...s,
                          heroDescription: e.target.value,
                        }))
                      }
                    />
                    <AdminTextarea
                      label="Intro copy (below hero, above content blocks)"
                      value={current.introCopy}
                      onChange={(e) =>
                        updatePage((s) => ({
                          ...s,
                          introCopy: e.target.value,
                        }))
                      }
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <AdminInput
                        label="Primary CTA label"
                        value={current.ctaPrimaryLabel}
                        onChange={(e) =>
                          updatePage((s) => ({
                            ...s,
                            ctaPrimaryLabel: e.target.value,
                          }))
                        }
                      />
                      <AdminInput
                        label="CTA banner title"
                        value={current.ctaBannerTitle}
                        onChange={(e) =>
                          updatePage((s) => ({
                            ...s,
                            ctaBannerTitle: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-carbon-700 bg-carbon-900 p-4">
                  <header className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-mint-400">
                        FAQs ({current.faqs.length})
                      </p>
                      <h4 className="mt-1 text-sm font-bold text-white">
                        Page-specific FAQ section
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updatePage((s) => ({
                          ...s,
                          faqs: [
                            ...s.faqs,
                            { question: "New question", answer: "" },
                          ],
                        }))
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-mint-500/40 bg-mint-500/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-mint-400"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add FAQ
                    </button>
                  </header>

                  <div className="space-y-3">
                    {current.faqs.length === 0 && (
                      <p className="text-[11px] text-carbon-400">
                        No page-specific FAQs yet.
                      </p>
                    )}
                    {current.faqs.map((faq, faqIndex) => (
                      <div
                        key={faqIndex}
                        className="rounded-lg border border-carbon-800 bg-carbon-950 p-3"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-carbon-400">
                            Question {faqIndex + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updatePage((s) => ({
                                ...s,
                                faqs: s.faqs.filter((_, i) => i !== faqIndex),
                              }))
                            }
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-carbon-400 hover:text-mint-400"
                            aria-label="Remove FAQ"
                          >
                            <Trash2 className="h-3 w-3" />
                            Remove
                          </button>
                        </div>
                        <AdminInput
                          label="Question"
                          value={faq.question}
                          onChange={(e) =>
                            updatePage((s) => ({
                              ...s,
                              faqs: s.faqs.map((f, i) =>
                                i === faqIndex
                                  ? { ...f, question: e.target.value }
                                  : f
                              ),
                            }))
                          }
                        />
                        <div className="mt-3">
                          <AdminTextarea
                            label="Answer"
                            value={faq.answer}
                            onChange={(e) =>
                              updatePage((s) => ({
                                ...s,
                                faqs: s.faqs.map((f, i) =>
                                  i === faqIndex
                                    ? { ...f, answer: e.target.value }
                                    : f
                                ),
                              }))
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-carbon-700 bg-carbon-900 p-4">
                  <header className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-mint-400">
                        Internal links ({current.internalLinks.length})
                      </p>
                      <h4 className="mt-1 text-sm font-bold text-white">
                        Silo links shown on this page
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updatePage((s) => ({
                          ...s,
                          internalLinks: [
                            ...s.internalLinks,
                            { label: "New link", href: "/" },
                          ],
                        }))
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-mint-500/40 bg-mint-500/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-mint-400"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add link
                    </button>
                  </header>

                  <ul className="space-y-2">
                    {current.internalLinks.map((link, linkIndex) => (
                      <li
                        key={linkIndex}
                        className="grid grid-cols-[1fr_1fr_auto] gap-2"
                      >
                        <input
                          aria-label="Link label"
                          value={link.label}
                          onChange={(e) =>
                            updatePage((s) => ({
                              ...s,
                              internalLinks: s.internalLinks.map((l, i) =>
                                i === linkIndex
                                  ? { ...l, label: e.target.value }
                                  : l
                              ),
                            }))
                          }
                          className="rounded-lg border border-carbon-700 bg-carbon-950 px-3 py-2 text-sm text-white focus:border-mint-500 focus:outline-none"
                        />
                        <input
                          aria-label="Link URL"
                          value={link.href}
                          onChange={(e) =>
                            updatePage((s) => ({
                              ...s,
                              internalLinks: s.internalLinks.map((l, i) =>
                                i === linkIndex
                                  ? { ...l, href: e.target.value }
                                  : l
                              ),
                            }))
                          }
                          className="rounded-lg border border-carbon-700 bg-carbon-950 px-3 py-2 font-mono text-xs text-carbon-200 focus:border-mint-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updatePage((s) => ({
                              ...s,
                              internalLinks: s.internalLinks.filter(
                                (_, i) => i !== linkIndex
                              ),
                            }))
                          }
                          className="rounded-lg border border-carbon-700 px-2 text-carbon-400 hover:border-mint-500/40 hover:text-mint-400"
                          aria-label="Remove link"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-carbon-700 bg-carbon-900 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-mint-400">
                    Page-level preview
                  </p>
                  <div className="mt-2 rounded-lg border border-carbon-800 bg-carbon-950 p-4">
                    <p className="text-[13px] text-carbon-300">
                      www.eastkilbrideboilercompany.co.uk{selectedPage.url}
                    </p>
                    <p className="mt-1 text-base font-semibold text-mint-300 underline decoration-mint-500/30 underline-offset-2">
                      {current.metaTitle}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-carbon-200">
                      {current.metaDescription}
                    </p>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    <Stat label="Title length" value={`${current.metaTitle.length} chars`} />
                    <Stat label="Description length" value={`${current.metaDescription.length} chars`} />
                    <Stat
                      label="FAQs / Internal links"
                      value={`${current.faqs.length} / ${current.internalLinks.length}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </AdminCard>
        </>
      )}

      {activeSection === "silo" && (
        <>
          <AdminCard
            title="Silo Preview"
            description="A clean view of the URL silo and where each page sits inside it. Use the status markers to see what is live, what is still a stub, and what is generated from data ready for Stage 2."
          >
            <div className="grid gap-3 sm:grid-cols-4">
              <Legend
                color="bg-mint-500"
                label="Live sample"
                hint="Working sample page on the live site"
              />
              <Legend
                color="bg-yellow-400"
                label="Stage 2 pending"
                hint="Will be built in Stage 2"
              />
              <Legend
                color="bg-brand-blue-bright"
                label="Ready from data"
                hint="Content data prepared, layout in Stage 2"
              />
              <Legend
                color="bg-carbon-500"
                label="Stub"
                hint="Branded placeholder page only"
              />
            </div>

            <div className="mt-5 space-y-2">
              {siloTree.map((node) => (
                <SiloTreeNode key={node.label} node={node} />
              ))}
            </div>
          </AdminCard>

          <AdminCard
            title="Silo at a glance"
            description="The four big silos and what they contain."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <SiloSummary
                title="Services silo"
                items={[
                  "/services/new-boiler-installation/",
                  "/services/boiler-repair/",
                  "/services/boiler-servicing/",
                ]}
                description="3 live samples linked from header and silo links blocks across the whole site."
              />
              <SiloSummary
                title="Boilers silo"
                items={[
                  "/boilers/",
                  ...brands.map((b) => `/boilers/${b.slug}/`),
                ]}
                description="Price hub live in Stage 1. Four brand pages built in Stage 2."
              />
              <SiloSummary
                title="Areas silo"
                items={[
                  "/areas-we-serve/",
                  "/areas-we-serve/g74/",
                  "/areas-we-serve/g75/",
                  `${districts.length} district pages (Stage 2)`,
                ]}
                description={`Hub and postcode hub stubs live. ${districts.length} districts data-ready for Stage 2.`}
              />
              <SiloSummary
                title="Blogs silo"
                items={[
                  "/blogs/",
                  ...blogPosts.map((p) => `/blogs/${p.slug}/`),
                ]}
                description="Index plus three sample posts already live. Stage 2 adds more local guides."
              />
            </div>
          </AdminCard>
        </>
      )}

      {activeSection === "sitemap" && (
        <AdminCard
          title="Sitemap & Crawling"
          description="Sitemap, robots.txt and crawling status. Stage 2 will expand the sitemap to all 45 pages."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ResourceCard
              title="sitemap.xml"
              href="/sitemap.xml"
              hint={`Live, auto-generated from the page list (${sitemapRoutes.length} URLs in Stage 1).`}
            />
            <ResourceCard
              title="robots.txt"
              href="/robots.txt"
              hint="Live. /admin/ is disallowed in robots. Sitemap is linked."
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Stat
              label="Total live routes"
              value={`${sitemapRoutes.length}`}
            />
            <Stat label="Admin route" value="noindex + disallow" />
            <Stat label="Stage 2 target" value="45 pages total" />
          </div>

          <div className="mt-5 rounded-xl border border-carbon-700 bg-carbon-950 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-mint-400">
              Sample routes in sitemap
            </p>
            <ul className="mt-3 grid gap-1.5 text-[12px] text-carbon-200 sm:grid-cols-2 font-mono">
              {sitemapRoutes.map((route) => (
                <li
                  key={route}
                  className="flex items-center gap-2 rounded-md border border-carbon-800 bg-carbon-900 px-2.5 py-1.5"
                >
                  <Check className="h-3 w-3 text-mint-500" />
                  <span className="truncate">{route}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-[12px] leading-relaxed text-yellow-200">
            Stage 2 will expand the sitemap to include all 45 pages once the G74, G75 hubs, the 35 district pages and the 4 brand detail pages are built and approved.
          </p>
        </AdminCard>
      )}

      {activeSection === "schema" && (
        <AdminCard
          title="SEO & Schema Foundation"
          description="What is wired up across the live sample pages, and what each page exposes to Google."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <SchemaCheck
              label="HVACBusiness / LocalBusiness JSON-LD"
              where="Homepage"
              status="live"
            />
            <SchemaCheck
              label="Service schema"
              where="Each /services/ page"
              status="live"
            />
            <SchemaCheck
              label="Product + Offer schema"
              where="/boilers/ page (per brand)"
              status="live"
            />
            <SchemaCheck
              label="FAQPage schema"
              where="Homepage and each sample page"
              status="live"
            />
            <SchemaCheck
              label="BreadcrumbList schema"
              where="All breadcrumbs"
              status="live"
            />
            <SchemaCheck
              label="Article schema"
              where="Each blog post"
              status="live"
            />
            <SchemaCheck
              label="CollectionPage schema"
              where="/blogs/"
              status="live"
            />
            <SchemaCheck
              label="Canonical URL"
              where="Every Stage 1 page"
              status="live"
            />
            <SchemaCheck
              label="District / Brand schema"
              where="35 district + 4 brand pages"
              status="stage-2"
            />
          </div>

          <div className="mt-6 rounded-xl border border-carbon-700 bg-carbon-900 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-mint-400">
              Page-level SEO snapshot
            </p>
            <div className="mt-3">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-carbon-300">
                Select page
              </label>
              <select
                value={selectedPageId}
                onChange={(e) => setSelectedPageId(e.target.value)}
                className="w-full rounded-lg border border-carbon-700 bg-carbon-950 px-3.5 py-2.5 text-sm text-white focus:border-mint-500 focus:outline-none"
              >
                {editablePageList.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Stat label="Meta title" value={current.metaTitle} small />
              <Stat
                label="Meta description"
                value={current.metaDescription}
                small
              />
              <Stat label="H1" value={current.h1} small />
              <Stat label="Canonical URL" value={selectedPage.canonical} small />
              <Stat
                label="Schema types"
                value={selectedPage.schemaTypes.join(", ") || "n/a"}
                small
              />
              <Stat
                label="Internal links count"
                value={String(selectedPage.internalLinks.length)}
                small
              />
            </div>
          </div>
        </AdminCard>
      )}

      {activeSection === "settings" && (
        <AdminCard
          title="Global Settings"
          description="Business identity, contact details and trust statistics shown across every page."
          action={
            <button
              type="button"
              onClick={() => notifySave("Global settings")}
              className="inline-flex items-center justify-center rounded-lg bg-mint-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-carbon-900 shadow-lg shadow-mint-500/20 transition-all hover:bg-mint-400 active:scale-95"
            >
              Save changes
            </button>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput
              label="Business name"
              value={settings.businessName}
              onChange={(e) =>
                setSettings({ ...settings, businessName: e.target.value })
              }
            />
            <AdminInput
              label="Short name"
              value={settings.shortName}
              onChange={(e) =>
                setSettings({ ...settings, shortName: e.target.value })
              }
            />
            <AdminInput
              label="Public phone number"
              value={settings.phone}
              onChange={(e) =>
                setSettings({ ...settings, phone: e.target.value })
              }
              hint="Used in header, sticky CTA, forms, schema"
            />
            <AdminInput
              label="Business email"
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings({ ...settings, email: e.target.value })
              }
              hint="Live delivery connected in Stage 2 via Hostinger / DNS"
            />
            <AdminInput
              label="Street"
              value={settings.street}
              onChange={(e) =>
                setSettings({ ...settings, street: e.target.value })
              }
            />
            <AdminInput
              label="City"
              value={settings.city}
              onChange={(e) =>
                setSettings({ ...settings, city: e.target.value })
              }
            />
            <AdminInput
              label="Region"
              value={settings.region}
              onChange={(e) =>
                setSettings({ ...settings, region: e.target.value })
              }
            />
            <AdminInput
              label="Postcode"
              value={settings.postcode}
              onChange={(e) =>
                setSettings({ ...settings, postcode: e.target.value })
              }
            />
            <AdminInput
              label="Established year"
              type="number"
              value={settings.establishedYear}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  establishedYear: Number(e.target.value),
                })
              }
            />
            <AdminInput
              label="Average rating"
              type="number"
              step="0.1"
              value={settings.averageRating}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  averageRating: Number(e.target.value),
                })
              }
            />
            <AdminInput
              label="Happy customers"
              value={settings.happyCustomers}
              onChange={(e) =>
                setSettings({ ...settings, happyCustomers: e.target.value })
              }
            />
            <AdminInput
              label="Areas served"
              type="number"
              value={settings.areasServed}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  areasServed: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 rounded-lg border border-carbon-700 bg-carbon-900 px-3 py-2.5 text-[11px] text-carbon-400">
            <Phone className="h-3.5 w-3.5 text-mint-500" />
            <span>Click-to-call uses tel:{settings.phone.replace(/\s+/g, "")}</span>
            <span className="text-carbon-700">|</span>
            <Mail className="h-3.5 w-3.5 text-mint-500" />
            <span>Visible email: {settings.email}</span>
          </div>
        </AdminCard>
      )}

      {activeSection === "brands" && (
        <AdminCard
          title="Brand Pricing"
          description="Boiler brands shown on the homepage and Boiler Prices page."
          action={
            <button
              type="button"
              onClick={() => notifySave("Brand pricing")}
              className="inline-flex items-center justify-center rounded-lg bg-mint-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-carbon-900 shadow-lg shadow-mint-500/20 transition-all hover:bg-mint-400 active:scale-95"
            >
              Save changes
            </button>
          }
        >
          <div className="space-y-5">
            {brandRows.map((row, index) => (
              <div
                key={row.id}
                className="rounded-xl border border-carbon-800 bg-carbon-900 p-4"
              >
                <header className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    {row.name}
                  </h3>
                  <span className="rounded-full border border-mint-500/40 bg-mint-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mint-400">
                    {row.tag}
                  </span>
                </header>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <AdminInput
                    label="Standard price (£)"
                    type="number"
                    value={row.standardPrice}
                    onChange={(e) => {
                      const next = [...brandRows];
                      next[index] = {
                        ...row,
                        standardPrice: Number(e.target.value),
                      };
                      setBrandRows(next);
                    }}
                  />
                  <AdminInput
                    label="Premium price (£)"
                    type="number"
                    value={row.premiumPrice}
                    onChange={(e) => {
                      const next = [...brandRows];
                      next[index] = {
                        ...row,
                        premiumPrice: Number(e.target.value),
                      };
                      setBrandRows(next);
                    }}
                  />
                  <AdminInput
                    label="Warranty years"
                    type="number"
                    value={row.warrantyYears}
                    onChange={(e) => {
                      const next = [...brandRows];
                      next[index] = {
                        ...row,
                        warrantyYears: Number(e.target.value),
                      };
                      setBrandRows(next);
                    }}
                  />
                  <AdminInput
                    label="Tag"
                    value={row.tag}
                    onChange={(e) => {
                      const next = [...brandRows];
                      next[index] = { ...row, tag: e.target.value };
                      setBrandRows(next);
                    }}
                  />
                </div>
                <div className="mt-3">
                  <AdminTextarea
                    label="Includes (comma separated)"
                    value={row.includes}
                    onChange={(e) => {
                      const next = [...brandRows];
                      next[index] = { ...row, includes: e.target.value };
                      setBrandRows(next);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      )}

      {activeSection === "promotions" && (
        <AdminCard
          title="Promotions and CTAs"
          description="Copy for the homepage mint banner and the hero subtitle."
          action={
            <button
              type="button"
              onClick={() => notifySave("Promotions")}
              className="inline-flex items-center justify-center rounded-lg bg-mint-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-carbon-900 shadow-lg shadow-mint-500/20 transition-all hover:bg-mint-400 active:scale-95"
            >
              Save changes
            </button>
          }
        >
          <div className="grid gap-4">
            <AdminTextarea
              label="Need a new boiler banner"
              value={promotion.needBoilerBanner}
              onChange={(e) =>
                setPromotion({
                  ...promotion,
                  needBoilerBanner: e.target.value,
                })
              }
            />
            <AdminInput
              label="Hero subtitle"
              value={promotion.heroSubtitle}
              onChange={(e) =>
                setPromotion({ ...promotion, heroSubtitle: e.target.value })
              }
            />
          </div>
        </AdminCard>
      )}

      {activeSection === "seo" && (
        <AdminCard
          title="SEO Preview"
          description="See how each page renders in search results. Title and description are read-only here. Field editing is in the Pages (Content Manager) section."
        >
          <div className="grid gap-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-mint-400">
                Select page
              </label>
              <select
                value={seoPageId}
                onChange={(e) => setSeoPageId(e.target.value)}
                className="w-full rounded-lg border border-carbon-700 bg-carbon-900 px-3.5 py-2.5 text-sm text-white focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20 focus:outline-none transition-colors"
              >
                {seoPages.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl border border-carbon-800 bg-carbon-900 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-mint-400">
                Search result preview
              </p>
              <p className="mt-2 text-base font-semibold text-mint-300 underline decoration-mint-500/30 underline-offset-2">
                {seoCurrent.title}
              </p>
              <p className="mt-1 text-[13px] text-carbon-300">
                www.eastkilbrideboilercompany.co.uk
              </p>
              <p className="mt-2 text-sm leading-relaxed text-carbon-200">
                {seoCurrent.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-carbon-800 bg-carbon-900 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-carbon-400">
                  Title length
                </p>
                <p className="mt-1 text-sm text-white">
                  {seoCurrent.title.length} characters
                </p>
              </div>
              <div className="rounded-lg border border-carbon-800 bg-carbon-900 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-carbon-400">
                  Description length
                </p>
                <p className="mt-1 text-sm text-white">
                  {seoCurrent.description.length} characters
                </p>
              </div>
            </div>
          </div>
        </AdminCard>
      )}

      {activeSection === "quote" && (
        <AdminCard
          title="Quote Form Options"
          description="Service options, property types, recipient and final thank-you message."
          action={
            <button
              type="button"
              onClick={() => notifySave("Quote form")}
              className="inline-flex items-center justify-center rounded-lg bg-mint-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-carbon-900 shadow-lg shadow-mint-500/20 transition-all hover:bg-mint-400 active:scale-95"
            >
              Save changes
            </button>
          }
        >
          <div className="grid gap-4">
            <AdminInput
              label="Form recipient"
              type="email"
              value={quoteForm.formRecipient}
              onChange={(e) =>
                setQuoteForm({ ...quoteForm, formRecipient: e.target.value })
              }
              hint="Live email delivery requires Hostinger / DNS access in Stage 2"
            />
            <AdminTextarea
              label="Thank you message"
              value={quoteForm.thankYouMessage}
              onChange={(e) =>
                setQuoteForm({
                  ...quoteForm,
                  thankYouMessage: e.target.value,
                })
              }
            />
            <AdminInput
              label="Step 1 service options"
              value={quoteForm.serviceOptions}
              onChange={(e) =>
                setQuoteForm({
                  ...quoteForm,
                  serviceOptions: e.target.value,
                })
              }
              hint="Comma separated"
            />
            <AdminInput
              label="Step 2 property types"
              value={quoteForm.propertyTypes}
              onChange={(e) =>
                setQuoteForm({
                  ...quoteForm,
                  propertyTypes: e.target.value,
                })
              }
              hint="Comma separated"
            />
          </div>
        </AdminCard>
      )}

      {activeSection === "brand-pages" && (
        <>
          <AdminCard
            title="Brand Pages"
            description="Per-brand page editor for the four boiler brand routes. Live on /boilers/{slug}/ - editable fields below are previewed locally. Stage 2 backend persistence connects when Hostinger access is confirmed."
          >
            <div className="rounded-lg border border-mint-500/30 bg-mint-500/5 px-4 py-3 text-[12px] leading-relaxed text-mint-300">
              Stage 2 local preview. Brand-page-level fields (H1, meta, hero) will write to the live CMS storage in Stage 2. Brand pricing is managed under Brand Pricing.
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
              <aside>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-mint-400">
                  Brand pages ({brands.length})
                </p>
                <ul className="space-y-1.5">
                  {brands.map((b) => (
                    <li key={b.id}>
                      <button
                        type="button"
                        onClick={() => setBrandPageSelected(b.id)}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left transition-colors",
                          brandPageSelected === b.id
                            ? "border-mint-500/50 bg-mint-500/10 text-mint-400"
                            : "border-carbon-800 bg-carbon-900 text-white hover:border-carbon-700"
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">
                            {b.name} Combi
                          </span>
                          <span className="block truncate text-[11px] text-carbon-400">
                            /boilers/{b.slug}/
                          </span>
                        </span>
                        <span className="shrink-0 rounded-full border border-mint-500/40 bg-mint-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-mint-400">
                          Live
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              {(() => {
                const brand = brands.find((b) => b.id === brandPageSelected);
                if (!brand) return null;
                const state = brandPageState[brand.id];
                return (
                  <div className="space-y-5">
                    <div className="rounded-xl border border-carbon-700 bg-carbon-900 p-4">
                      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-mint-400">
                            Editing
                          </p>
                          <h3 className="mt-1 text-base font-bold text-white">
                            {brand.name} Combi
                          </h3>
                          <p className="text-[11px] text-carbon-400">
                            URL: /boilers/{brand.slug}/ · Schema: Product, Offer, BreadcrumbList, FAQPage
                          </p>
                        </div>
                        <Link
                          href={`/boilers/${brand.slug}/`}
                          target="_blank"
                          className="inline-flex items-center gap-1 rounded-lg border border-carbon-700 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-carbon-200 hover:border-mint-500/40 hover:text-mint-400"
                        >
                          View page
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      </header>

                      <div className="space-y-4">
                        <AdminInput
                          label="H1"
                          value={state.h1}
                          onChange={(e) =>
                            setBrandPageState((prev) => ({
                              ...prev,
                              [brand.id]: { ...prev[brand.id], h1: e.target.value },
                            }))
                          }
                        />
                        <AdminInput
                          label="Meta title"
                          value={state.metaTitle}
                          onChange={(e) =>
                            setBrandPageState((prev) => ({
                              ...prev,
                              [brand.id]: { ...prev[brand.id], metaTitle: e.target.value },
                            }))
                          }
                          hint={`${state.metaTitle.length} characters`}
                        />
                        <AdminTextarea
                          label="Meta description"
                          rows={3}
                          value={state.metaDescription}
                          onChange={(e) =>
                            setBrandPageState((prev) => ({
                              ...prev,
                              [brand.id]: { ...prev[brand.id], metaDescription: e.target.value },
                            }))
                          }
                          hint={`${state.metaDescription.length} characters`}
                        />
                        <AdminInput
                          label="Hero subtitle"
                          value={state.heroSubtitle}
                          onChange={(e) =>
                            setBrandPageState((prev) => ({
                              ...prev,
                              [brand.id]: { ...prev[brand.id], heroSubtitle: e.target.value },
                            }))
                          }
                        />
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => notifySave(`${brand.name} brand page`)}
                          className="inline-flex items-center gap-2 rounded-lg bg-mint-500 px-4 py-2 text-xs font-bold uppercase tracking-wide text-carbon-900 transition-colors hover:bg-mint-400"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Save changes
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-carbon-700 bg-carbon-900 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-mint-400">
                        Read-only product fields
                      </p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <Stat label="Fitted price" value={`£${brand.standardPrice.toLocaleString("en-GB")}`} />
                        <Stat label="Premium price" value={`£${brand.premiumPrice.toLocaleString("en-GB")}`} />
                        <Stat label="Warranty" value={brand.warranty} />
                        <Stat label="Tag" value={brand.tag} />
                      </div>
                      <p className="mt-3 text-[11px] text-carbon-400">
                        Pricing and warranty are edited under Brand Pricing. This keeps Brand Pages focused on page content.
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </AdminCard>
        </>
      )}

      {activeSection === "district-pages" && (
        <>
          <AdminCard
            title="District Pages"
            description={`Per-district page editor for all ${districts.length} East Kilbride district routes. Content is generated from districts.ts and the district variation engine. Stage 2 backend persistence connects when Hostinger access is confirmed.`}
          >
            <div className="rounded-lg border border-mint-500/30 bg-mint-500/5 px-4 py-3 text-[12px] leading-relaxed text-mint-300">
              Stage 2 local preview. Editable fields below feed the H1, intro, and 9 keyword-driven sections on each district page. Save persists in Stage 2.
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
              <aside>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-mint-400">
                  G74 districts ({g74Districts.length})
                </p>
                <ul className="space-y-1">
                  {g74Districts.map((d) => (
                    <li key={d.slug}>
                      <button
                        type="button"
                        onClick={() => setDistrictSelected(d.slug)}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-1.5 text-left text-[12px] transition-colors",
                          districtSelected === d.slug
                            ? "border-mint-500/50 bg-mint-500/10 text-mint-400"
                            : "border-carbon-800 bg-carbon-900 text-white hover:border-carbon-700"
                        )}
                      >
                        <span className="truncate font-semibold">{d.name}</span>
                        <span className="shrink-0 text-[10px] uppercase tracking-wide text-carbon-400">
                          G74
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 mb-2 text-[10px] font-bold uppercase tracking-wider text-mint-400">
                  G75 districts ({g75Districts.length})
                </p>
                <ul className="space-y-1">
                  {g75Districts.map((d) => (
                    <li key={d.slug}>
                      <button
                        type="button"
                        onClick={() => setDistrictSelected(d.slug)}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-1.5 text-left text-[12px] transition-colors",
                          districtSelected === d.slug
                            ? "border-mint-500/50 bg-mint-500/10 text-mint-400"
                            : "border-carbon-800 bg-carbon-900 text-white hover:border-carbon-700"
                        )}
                      >
                        <span className="truncate font-semibold">{d.name}</span>
                        <span className="shrink-0 text-[10px] uppercase tracking-wide text-carbon-400">
                          G75
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              {(() => {
                const district = districts.find((d) => d.slug === districtSelected);
                if (!district) return null;
                const state = districtPageState[district.slug];
                return (
                  <div className="space-y-5">
                    <div className="rounded-xl border border-carbon-700 bg-carbon-900 p-4">
                      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-mint-400">
                            Editing
                          </p>
                          <h3 className="mt-1 text-base font-bold text-white">
                            {district.name}, {district.postcodeHub}
                          </h3>
                          <p className="text-[11px] text-carbon-400">
                            URL: /areas-we-serve/{district.slug}/ · Schema: Service, areaServed, BreadcrumbList, FAQPage
                          </p>
                        </div>
                        <Link
                          href={`/areas-we-serve/${district.slug}/`}
                          target="_blank"
                          className="inline-flex items-center gap-1 rounded-lg border border-carbon-700 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-carbon-200 hover:border-mint-500/40 hover:text-mint-400"
                        >
                          View page
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      </header>

                      <div className="space-y-4">
                        <AdminInput
                          label="District name"
                          value={state.name}
                          onChange={(e) =>
                            setDistrictPageState((prev) => ({
                              ...prev,
                              [district.slug]: { ...prev[district.slug], name: e.target.value },
                            }))
                          }
                        />
                        <AdminInput
                          label="Position in East Kilbride"
                          value={state.position}
                          onChange={(e) =>
                            setDistrictPageState((prev) => ({
                              ...prev,
                              [district.slug]: { ...prev[district.slug], position: e.target.value },
                            }))
                          }
                          hint="Used in the intro line, e.g. 'central East Kilbride'"
                        />
                        <AdminInput
                          label="Housing mix"
                          value={state.housingMix}
                          onChange={(e) =>
                            setDistrictPageState((prev) => ({
                              ...prev,
                              [district.slug]: { ...prev[district.slug], housingMix: e.target.value },
                            }))
                          }
                          hint="Typical properties we install in"
                        />
                        <AdminInput
                          label="Preferred brands (comma separated)"
                          value={state.preferredBrands}
                          onChange={(e) =>
                            setDistrictPageState((prev) => ({
                              ...prev,
                              [district.slug]: { ...prev[district.slug], preferredBrands: e.target.value },
                            }))
                          }
                          hint="2 brands from Worcester Bosch, Ideal, Vokera, Navien"
                        />
                        <AdminTextarea
                          label="Local angle"
                          rows={3}
                          value={state.localAngle}
                          onChange={(e) =>
                            setDistrictPageState((prev) => ({
                              ...prev,
                              [district.slug]: { ...prev[district.slug], localAngle: e.target.value },
                            }))
                          }
                          hint="One short paragraph that makes this page feel hyperlocal"
                        />
                        <AdminInput
                          label="Typical job"
                          value={state.typicalJob}
                          onChange={(e) =>
                            setDistrictPageState((prev) => ({
                              ...prev,
                              [district.slug]: { ...prev[district.slug], typicalJob: e.target.value },
                            }))
                          }
                          hint="Drives the hyperlocal FAQ answer"
                        />
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => notifySave(`${district.name} district page`)}
                          className="inline-flex items-center gap-2 rounded-lg bg-mint-500 px-4 py-2 text-xs font-bold uppercase tracking-wide text-carbon-900 transition-colors hover:bg-mint-400"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Save changes
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-carbon-700 bg-carbon-900 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-mint-400">
                        Generated page-level summary
                      </p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <Stat
                          label="H1"
                          value={`Boiler Replacement in ${state.name}, East Kilbride`}
                          small
                        />
                        <Stat
                          label="Meta title"
                          value={`Boiler Replacement in ${state.name}, East Kilbride (${district.postcodeHub}) | EKBC`}
                          small
                        />
                        <Stat
                          label="Sections rendered"
                          value="9 keyword-driven sections + intro + FAQs + silo links"
                          small
                        />
                        <Stat
                          label="Parent silo"
                          value={`${district.postcodeHub} hub - /areas-we-serve/${district.postcodeHub.toLowerCase()}/`}
                          small
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </AdminCard>
        </>
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </AdminShell>
  );
}

function Stat({
  label,
  value,
  small,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="rounded-lg border border-carbon-800 bg-carbon-950 p-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-carbon-400">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-white",
          small ? "text-[12px] leading-relaxed" : "text-sm"
        )}
      >
        {value || "(empty)"}
      </p>
    </div>
  );
}

function Legend({
  color,
  label,
  hint,
}: {
  color: string;
  label: string;
  hint: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-carbon-800 bg-carbon-900 p-3">
      <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", color)} />
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-white">
          {label}
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-carbon-400">
          {hint}
        </p>
      </div>
    </div>
  );
}

function ResourceCard({
  title,
  href,
  hint,
}: {
  title: string;
  href: string;
  hint: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="hover-card flex h-full flex-col gap-2 rounded-xl border border-carbon-700 bg-carbon-900 p-4 hover:border-mint-500/40"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm font-bold text-white">{title}</span>
        <ArrowUpRight className="h-4 w-4 text-mint-500" />
      </div>
      <p className="text-[11px] leading-snug text-carbon-400">{hint}</p>
    </Link>
  );
}

function SchemaCheck({
  label,
  where,
  status,
}: {
  label: string;
  where: string;
  status: "live" | "stage-2";
}) {
  return (
    <div className="rounded-xl border border-carbon-700 bg-carbon-900 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-bold text-white">{label}</p>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            status === "live"
              ? "border-mint-500/40 bg-mint-500/10 text-mint-400"
              : "border-yellow-500/40 bg-yellow-500/10 text-yellow-300"
          )}
        >
          {status === "live" ? "Live" : "Stage 2"}
        </span>
      </div>
      <p className="mt-1 text-[11px] text-carbon-400">{where}</p>
    </div>
  );
}

function SiloSummary({
  title,
  items,
  description,
}: {
  title: string;
  items: string[];
  description: string;
}) {
  return (
    <div className="rounded-xl border border-carbon-700 bg-carbon-900 p-4">
      <p className="text-sm font-bold text-white">{title}</p>
      <p className="mt-1 text-[11px] text-carbon-400">{description}</p>
      <ul className="mt-3 space-y-1 font-mono text-[12px] text-carbon-300">
        {items.map((item) => (
          <li key={item} className="truncate">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
