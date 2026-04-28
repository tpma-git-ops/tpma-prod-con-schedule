# Toronto Product Con — Schedule App

Web application for the **[Toronto Product Con](https://www.tpma.ca/conference/toronto-product-conference)** — the annual conference from the **[Toronto Product Management Association (TPMA)](https://www.tpma.ca/)**.

The app gives attendees a browsable day-of schedule (sessions by time and room) and gives organisers an admin area to manage sessions, drafts, and speakers. Updates to published content propagate to open schedule pages in realtime so the floor does not depend on manual refreshes after every edit.

## Features

| Area | What it does |
|------|----------------|
| **Public schedule** | Timeline view, room filters, favouriting (where enabled), live updates from Supabase Realtime when organisers publish or change sessions. |
| **Admin** | Magic-link sign-in for approved emails; draft vs published; session and speaker editing (`/login` → `/admin`). |

**Implementation:** [Next.js](https://nextjs.org/) 14 (App Router) · [React](https://react.dev/) 18 · [TypeScript](https://www.typescriptlang.org/) · [Tailwind CSS](https://tailwindcss.com/) · [Supabase](https://supabase.com/) (Postgres, Auth, Realtime).

Design tokens and UI conventions are described in **`docs/tpc2026-design-system.md`** — read that before substantial visual changes.

## Local development

Volunteers and maintainers run the app against their own Supabase project (the [free tier](https://supabase.com/pricing) is enough for development).

### Prerequisites

- **Node.js** — current LTS (e.g. 20+)
- **npm** — bundled with Node
- **Supabase account** — one project per developer, or a shared dev database (coordinate schema and seed changes if you share)

### Install and run

```bash
git clone <repository-url>
cd <repo-directory>
npm install
cp .env.local.example .env.local
```

Configure Supabase:

1. Create a project at [supabase.com](https://supabase.com).
2. **SQL Editor:** run `supabase/schema.sql`, then `supabase/seed.sql` (edit **admin emails** in the seed file first, or insert into `admin_emails` afterward — you need a listed address to sign into `/admin`).
3. **Authentication → URL configuration:** set **Site URL** to `http://localhost:3000` and add **Redirect URL** `http://localhost:3000/api/auth/callback`. Keep the email provider enabled for magic links.
4. **Project Settings → API:** copy **Project URL** and **`anon` public key** into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Do not commit `.env.local` (it is gitignored).

### Fonts (optional)

TPMA marketing uses **Cirka** for headings. With a valid licence, place `Cirka-Light.ttf`, `Cirka-Regular.ttf`, and `Cirka-Bold.ttf` under `public/fonts/` — see `globals.css` (`@font-face`). Without those files the UI uses a Georgia fallback. Prefer `.woff2` in production if you convert assets and update `url()` / `format()` accordingly.

### npm scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |

## Repository layout

```
app/                    Next.js routes — public schedule, admin, login, auth callback
components/             Schedule timeline, session cards, filters, admin UI
lib/                    Types, utilities, Supabase clients (browser/server)
middleware.ts           Session cookie refresh for Supabase Auth
docs/                   Design system notes
plans/backlog|complete/ Implementation and design plans
supabase/               schema.sql, seed.sql (+ other SQL helpers in repo)
```

## Trying admin locally

1. Ensure your email appears in Supabase **`admin_emails`** (from seed or manual insert).
2. Go to `/login`, request a magic link, complete sign-in → `/admin`.
3. Publish or edit sessions: connected public clients see changes via Realtime without reloading.

## Contributing

**Branching:** integrate all work on **`develop`** (branch from it, open PRs into it). **`main`** is for releases only—merge **`develop` → `main`** via PR when cutting a release; do not use `main` for day-to-day development. Details are in **`CONTRIBUTING.md`**.

Development norms, security reporting, and community expectations live in **`CONTRIBUTING.md`**, **`SECURITY.md`**, and **`CODE_OF_CONDUCT.md`**. Automated contributors should follow **`AGENTS.md`** and the `plans/` workflow. If you are stuck on Supabase or env setup, open an issue with what you tried.

## Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| Empty schedule or client errors | Schema and seed applied in order; env var names match `.env.local.example`; restart `npm run dev` after changing env. |
| Magic link fails or redirects incorrectly | Redirect URL matches your dev URL (including port) and `/api/auth/callback`. |
| No access to `/admin` | Email present in **`admin_emails`** in Supabase. |
