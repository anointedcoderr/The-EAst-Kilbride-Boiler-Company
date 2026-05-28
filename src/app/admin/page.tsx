"use client";

import { useMemo, useState } from "react";
import { Phone, Mail, MapPin, Users, Star, Layers, Newspaper } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminInput, AdminTextarea } from "@/components/admin/AdminInput";
import { Toast } from "@/components/admin/Toast";
import { siteSettings } from "@/data/siteSettings";
import { brands } from "@/data/brands";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blogPosts";
import { districts } from "@/data/districts";
import { reviews } from "@/data/reviews";

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

const seoPages = [
  { id: "home", label: "Home", title: "East Kilbride Boiler Company | EKBC - Boiler Replacement G74 / G75", description: "East Kilbride's #1 boiler replacement company. Fixed-price installations across 35 EK areas. Gas Safe Experts, up to 12-year warranties. Call 01355 204045." },
  ...services.map((s) => ({ id: s.slug, label: s.name, title: s.seoTitle, description: s.seoDescription })),
  { id: "boilers", label: "Boiler Prices", title: "Boiler Prices in East Kilbride | EKBC - Fixed Price From £1,299", description: "Fixed-price combi boiler installations across East Kilbride. Worcester Bosch, Ideal, Vokera and Navien. Up to 12-year warranty. Call 01355 204045 for a no-obligation quote." },
  { id: "blogs", label: "Blogs", title: "Blog | East Kilbride Boiler Company - Heating advice for G74 & G75", description: "Practical boiler buying, repair and servicing advice from East Kilbride's Gas Safe Experts. Worcester Bosch, Ideal, Vokera, Navien and more." },
];

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

  const stats = useMemo(
    () => [
      { label: "Pages live", value: 12, icon: Layers, hint: "Homepage + 5 sample + 6 navigation" },
      { label: "Brands", value: brands.length, icon: Star, hint: "Worcester Bosch, Ideal, Vokera, Navien" },
      { label: "Districts", value: districts.length, icon: MapPin, hint: "Full G74 and G75 silo prepared" },
      { label: "Reviews", value: reviews.length, icon: Users, hint: "Verified 5-star featured reviews" },
    ],
    []
  );

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
          description="See how each page renders in search results. Title and description are read-only here. Fields become editable per page in Stage 2."
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

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </AdminShell>
  );
}
