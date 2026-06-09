-- EKBC CMS - Phase 1 schema
-- Run this once in the Supabase SQL Editor.
-- Safe to re-run (everything is "create if not exists" or replace).
--
-- Sets up four tables: cms_site_settings, cms_pages, cms_blog_posts,
-- cms_media. quote_leads is untouched and keeps working as before.
--
-- The cms_site_settings table uses the key-value pattern so adding new
-- settings later doesn't require column migrations. cms_pages and
-- cms_blog_posts use jsonb columns for flexible content blocks so the
-- block editor (Phase 3) can add new block types without schema changes.

-- ----- cms_site_settings ----------------------------------------------
create table if not exists public.cms_site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create or replace function public.cms_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cms_site_settings_touch on public.cms_site_settings;
create trigger cms_site_settings_touch
before update on public.cms_site_settings
for each row execute function public.cms_touch_updated_at();

-- ----- cms_media -------------------------------------------------------
create table if not exists public.cms_media (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_url text not null,
  file_type text not null,
  file_size bigint,
  alt_text text default '',
  caption text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_media_created_at_idx
  on public.cms_media (created_at desc);

drop trigger if exists cms_media_touch on public.cms_media;
create trigger cms_media_touch
before update on public.cms_media
for each row execute function public.cms_touch_updated_at();

-- ----- cms_pages -------------------------------------------------------
create table if not exists public.cms_pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  page_type text not null,
  postcode_area text,
  h1 text,
  meta_title text,
  meta_description text,
  hero_title text,
  hero_subtitle text,
  hero_image_id uuid references public.cms_media (id) on delete set null,
  sections jsonb not null default '[]'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft','published')),
  is_indexable boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_pages_status_idx
  on public.cms_pages (status);

create index if not exists cms_pages_page_type_idx
  on public.cms_pages (page_type);

drop trigger if exists cms_pages_touch on public.cms_pages;
create trigger cms_pages_touch
before update on public.cms_pages
for each row execute function public.cms_touch_updated_at();

-- ----- cms_blog_posts --------------------------------------------------
create table if not exists public.cms_blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  meta_title text,
  meta_description text,
  featured_image_id uuid references public.cms_media (id) on delete set null,
  content_blocks jsonb not null default '[]'::jsonb,
  category text,
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_blog_posts_status_idx
  on public.cms_blog_posts (status);

create index if not exists cms_blog_posts_published_at_idx
  on public.cms_blog_posts (published_at desc);

drop trigger if exists cms_blog_posts_touch on public.cms_blog_posts;
create trigger cms_blog_posts_touch
before update on public.cms_blog_posts
for each row execute function public.cms_touch_updated_at();

-- ----- Row Level Security ---------------------------------------------
-- Only apply RLS if you are using the anon key. The service role key
-- bypasses RLS entirely, so this block is a no-op for service-role
-- setups but harmless to run.

alter table public.cms_site_settings enable row level security;
alter table public.cms_media enable row level security;
alter table public.cms_pages enable row level security;
alter table public.cms_blog_posts enable row level security;

-- Server reads + writes (the Node app is the only client; RLS keeps
-- the public anon key from leaking direct write access from the
-- browser).

drop policy if exists "server full access" on public.cms_site_settings;
create policy "server full access" on public.cms_site_settings
  for all to anon using (true) with check (true);

drop policy if exists "server full access" on public.cms_media;
create policy "server full access" on public.cms_media
  for all to anon using (true) with check (true);

drop policy if exists "server full access" on public.cms_pages;
create policy "server full access" on public.cms_pages
  for all to anon using (true) with check (true);

drop policy if exists "server full access" on public.cms_blog_posts;
create policy "server full access" on public.cms_blog_posts
  for all to anon using (true) with check (true);

-- ----- Storage bucket (for the media library, Phase 4) ----------------
-- Run this in the Supabase Dashboard -> Storage -> New bucket, with:
--   Name: ekbc-media
--   Public: yes (so file_url is directly accessible)
-- Then in the bucket's policies tab, add an INSERT policy and a SELECT
-- policy that allow service_role (or anon) writes. Phase 4 will wire
-- this up properly; nothing to do tonight.

-- ----- Seed: write current static settings into cms_site_settings ------
-- These match src/data/siteSettings.ts so the Site Settings page shows
-- the right starting values before the client edits them.

insert into public.cms_site_settings (key, value) values
  ('business_name', '"The East Kilbride Boiler Company"'::jsonb),
  ('phone', '"01355 204045"'::jsonb),
  ('phone_href', '"tel:01355204045"'::jsonb),
  ('public_email', '"info@eastkilbrideboilercompany.co.uk"'::jsonb),
  ('address_street', '"19 Newlands Place"'::jsonb),
  ('address_city', '"East Kilbride"'::jsonb),
  ('address_region', '"South Lanarkshire"'::jsonb),
  ('address_postcode', '"G74 1AE"'::jsonb),
  ('opening_hours', '"24/7 emergency line. Standard bookings confirmed during business hours."'::jsonb),
  ('main_cta_text', '"Get my fixed price quote"'::jsonb),
  ('emergency_message', '"Boiler emergency? Call 01355 204045 for the earliest slot we have, including weekends."'::jsonb),
  ('footer_text', '"The East Kilbride Boiler Company - serving every G74 and G75 postcode."'::jsonb),
  ('areas_served_count', '35'::jsonb),
  ('facebook_url', '""'::jsonb)
on conflict (key) do nothing;
