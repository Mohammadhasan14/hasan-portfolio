create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  referrer text,
  -- SHA-256 hash of the submitter's IP, used only to rate-limit — never the
  -- raw IP itself.
  ip_hash text,
  is_read boolean not null default false,
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'won', 'lost')),
  created_at timestamptz not null default now()
);

-- RLS on, no policies at all: fully locked, same as admin_users. The public
-- contact form never talks to Supabase directly — it POSTs to our own
-- Server Action, which validates (honeypot, Turnstile, rate limit) and then
-- writes via the service-role client, bypassing RLS by design.
alter table contact_submissions enable row level security;

create index if not exists contact_submissions_ip_hash_created_at_idx
  on contact_submissions (ip_hash, created_at);
