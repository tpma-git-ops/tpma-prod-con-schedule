-- Security review fixes for existing Supabase projects.
-- Run after the base schema has already been applied.

-- Public-safe whitelist lookup for login requests.
-- This exposes only a yes/no answer, not the admin email list.
create or replace function public.is_admin_email(candidate_email text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_emails
    where lower(email) = lower(candidate_email)
  );
$$;

revoke all on function public.is_admin_email(text) from public;
grant execute on function public.is_admin_email(text) to anon, authenticated;

drop policy if exists "Public can view session_speakers" on public.session_speakers;

-- Public can read speaker relationships only for published sessions.
create policy "Public can view session_speakers" on public.session_speakers
  for select using (
    exists (
      select 1
      from public.sessions
      where sessions.id = session_speakers.session_id
        and sessions.status = 'published'
    )
  );
