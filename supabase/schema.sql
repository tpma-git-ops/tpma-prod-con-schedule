-- TPC2026 Schedule App Schema
-- Run this in Supabase SQL Editor

-- Enable RLS
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;

-- Sessions table
create table public.sessions (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  room text not null,
  start_time time not null,
  end_time time not null,
  session_type text not null check (session_type in ('keynote', 'talk', 'panel', 'break', 'lunch', 'unconference', 'afterparty', 'registration', 'sponsor', 'announcement')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer default 0,
  is_full_width boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Speakers table
create table public.speakers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  title text,
  company text,
  photo_url text,
  linkedin_url text,
  created_at timestamptz default now()
);

-- Junction table for sessions <-> speakers
create table public.session_speakers (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references public.sessions(id) on delete cascade,
  speaker_id uuid references public.speakers(id) on delete cascade,
  role text not null default 'speaker' check (role in ('speaker', 'moderator', 'panelist', 'host')),
  display_order integer default 0,
  unique(session_id, speaker_id)
);

-- Admin emails whitelist (for magic link auth)
create table public.admin_emails (
  email text primary key,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.sessions enable row level security;
alter table public.speakers enable row level security;
alter table public.session_speakers enable row level security;
alter table public.admin_emails enable row level security;

-- Public can read published sessions
create policy "Public can view published sessions" on public.sessions
  for select using (status = 'published');

-- Authenticated admins can do everything with sessions
create policy "Admins can manage sessions" on public.sessions
  for all using (
    auth.email() in (select email from public.admin_emails)
  );

-- Public can read speakers
create policy "Public can view speakers" on public.speakers
  for select using (true);

-- Admins can manage speakers
create policy "Admins can manage speakers" on public.speakers
  for all using (
    auth.email() in (select email from public.admin_emails)
  );

-- Public can read session_speakers
create policy "Public can view session_speakers" on public.session_speakers
  for select using (true);

-- Admins can manage session_speakers
create policy "Admins can manage session_speakers" on public.session_speakers
  for all using (
    auth.email() in (select email from public.admin_emails)
  );

-- Only admins can read admin_emails
create policy "Admins can view admin_emails" on public.admin_emails
  for select using (
    auth.email() in (select email from public.admin_emails)
  );

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger sessions_updated_at
  before update on public.sessions
  for each row execute function update_updated_at();

-- Enable realtime for sessions table
alter publication supabase_realtime add table public.sessions;
alter publication supabase_realtime add table public.session_speakers;

-- Index for common queries
create index idx_sessions_status on public.sessions(status);
create index idx_sessions_start_time on public.sessions(start_time);
create index idx_session_speakers_session on public.session_speakers(session_id);
