-- EKBC CMS - Phase 4 storage policies
-- Run this once in the Supabase SQL Editor AFTER you've manually
-- created the storage bucket below.
--
-- Step 1: Supabase Dashboard -> Storage -> "New bucket"
--   - Bucket name: ekbc-media
--   - Public bucket: ON (so file_url can be served directly)
--   - File size limit: 10 MB (sensible default for site images)
--   - Allowed MIME types: image/*, video/*, application/pdf
--
-- Step 2: run the SQL below. It adds RLS policies on
-- storage.objects so the server (anon role) can upload, read and
-- delete files inside the ekbc-media bucket. Service role bypasses
-- RLS entirely so these policies are a no-op if you're using the
-- service role key.

-- Allow anyone (server using anon key) to upload to ekbc-media
drop policy if exists "ekbc media upload" on storage.objects;
create policy "ekbc media upload" on storage.objects
  for insert to anon
  with check (bucket_id = 'ekbc-media');

-- Allow anyone to read files (the bucket is already public; this is
-- for parity if you ever toggle the bucket to private)
drop policy if exists "ekbc media read" on storage.objects;
create policy "ekbc media read" on storage.objects
  for select to anon
  using (bucket_id = 'ekbc-media');

-- Allow anyone to delete files from ekbc-media
drop policy if exists "ekbc media delete" on storage.objects;
create policy "ekbc media delete" on storage.objects
  for delete to anon
  using (bucket_id = 'ekbc-media');

-- Allow anyone to update file metadata in ekbc-media
drop policy if exists "ekbc media update" on storage.objects;
create policy "ekbc media update" on storage.objects
  for update to anon
  using (bucket_id = 'ekbc-media')
  with check (bucket_id = 'ekbc-media');
