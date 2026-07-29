create extension if not exists pgcrypto;

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

-- RLS on with no policies: default-deny for anon/authenticated.
-- Only the service-role client (used from verified Server Actions) can
-- read/write this table; service_role bypasses RLS by design.
alter table admin_users enable row level security;
