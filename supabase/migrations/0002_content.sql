-- Singleton row: hero/about copy, contact details, social + resume links.
-- No status column — this is always public, there's no draft state for it.
create table if not exists site_settings (
  id integer primary key default 1,
  hero_lead text not null default '',
  about_bio text not null default '',
  about_education text not null default '',
  available_for text[] not null default '{}',
  phone text not null default '',
  location text not null default '',
  contact_email text not null default '',
  github_url text not null default '',
  linkedin_url text not null default '',
  resume_url text not null default '',
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

alter table site_settings enable row level security;

create policy "site_settings_public_read" on site_settings
  for select to anon using (true);

-- Covers both the About section's inline stats and the GitHub-stats
-- section's numbers, distinguished by stat_group.
create table if not exists stats (
  id uuid primary key default gen_random_uuid(),
  stat_group text not null check (stat_group in ('about', 'contributions')),
  value text not null,
  label text not null,
  sort_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

alter table stats enable row level security;

create policy "stats_public_read" on stats
  for select to anon using (status = 'published');

create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  role text not null,
  company text not null,
  description text not null,
  sort_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

alter table experiences enable row level security;

create policy "experiences_public_read" on experiences
  for select to anon using (status = 'published');

create table if not exists skill_groups (
  id uuid primary key default gen_random_uuid(),
  tag text not null,
  name text not null,
  items text[] not null default '{}',
  sort_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

alter table skill_groups enable row level security;

create policy "skill_groups_public_read" on skill_groups
  for select to anon using (status = 'published');

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  name text not null,
  status_label text not null,
  description text not null,
  stack text[] not null default '{}',
  -- Placeholder text shown until a real screenshot is uploaded (Phase 2).
  shot_label text not null default '',
  screenshot_url text,
  sort_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

alter table projects enable row level security;

create policy "projects_public_read" on projects
  for select to anon using (status = 'published');

-- Schema only for now — no public section renders this yet. Ready for
-- Phase 2 admin CRUD; the display component comes later once designed.
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_role text not null,
  quote text not null,
  avatar_url text,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

alter table testimonials enable row level security;

create policy "testimonials_public_read" on testimonials
  for select to anon using (status = 'published');
