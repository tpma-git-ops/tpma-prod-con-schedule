# TPC2026 Schedule App

Conference schedule for Toronto Product Con 2026.

## Quick Start

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In SQL Editor, run `supabase/schema.sql`
3. Then run `supabase/seed.sql`
4. **Update the admin emails** in the seed file before running (or update the `admin_emails` table after)

### 2. Configure Supabase Auth

1. Go to Authentication > URL Configuration
2. Set Site URL to `http://localhost:3000` (update to production URL later)
3. Add `http://localhost:3000/api/auth/callback` to Redirect URLs
4. Enable Email provider (it's on by default)
5. In Email Templates, the magic link template should work as-is

### 3. Set Up the App

```bash
# Clone/copy this project
cd tpc-schedule

# Install dependencies
npm install

# Copy env file and add your Supabase credentials
cp .env.local.example .env.local
# Edit .env.local with your Supabase URL and anon key
# (Found in Supabase > Settings > API)

# Run dev server
npm run dev
```

### 4. Add Cirka Font

The TPMA brand uses Cirka for headings. Add font files to `public/fonts/`:
- `Cirka-Bold.woff2`
- `Cirka-Regular.woff2`

If you only have .otf or .ttf files, convert at https://cloudconvert.com/otf-to-woff2

The app will fall back to Georgia if Cirka isn't loaded.

### 5. Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Then:
- Add environment variables in Vercel dashboard
- Point `schedule.torontoproductcon.com` DNS to Vercel
- Update Supabase Auth redirect URLs to include the production domain

## Structure

```
/app
  /page.tsx          → Public schedule (attendee view)
  /admin/page.tsx    → Admin panel (session management)
  /login/page.tsx    → Magic link login
  /api/auth/callback → Auth callback handler
/components
  /ScheduleTimeline  → Main timeline rendering
  /SessionCard       → Individual session cards
  /RoomFilter        → Room filter tabs
  /admin/            → Admin-only components
/lib
  /types.ts          → TypeScript types
  /utils.ts          → Time formatting, grouping
  /supabase-*.ts     → Supabase client setup
/supabase
  /schema.sql        → Database schema
  /seed.sql          → Initial data
```

## Admin Usage

1. Go to `/login` and enter an admin email
2. Click the magic link in your email
3. You'll land on `/admin`
4. Toggle sessions between draft/published with the switch
5. Published sessions appear immediately on the public schedule (real-time)
6. Click any session to edit title, description, room, time, speakers
7. Use the Speakers tab to manage the speaker directory

## Real-Time Updates

The public schedule uses Supabase Realtime subscriptions. When an admin:
- Publishes a draft session → it appears on all connected devices
- Updates a session title → the change propagates immediately
- No page refresh needed
