-- Public bucket for project screenshots, the profile photo, and testimonial
-- avatars. Reads are public (these are marketing images, not sensitive);
-- writes only ever happen via the service-role client from verified admin
-- Server Actions, which bypasses storage RLS the same way it bypasses table
-- RLS — so no explicit storage policies are needed for writes.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do nothing;
