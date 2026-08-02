-- Nullable: falls back to the static /images/hasan_profile.png bundled with
-- the app until an admin uploads a real photo through Site Settings.
alter table site_settings
  add column if not exists profile_image_url text;
