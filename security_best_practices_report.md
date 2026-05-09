# Security Best Practices Review

Date: 2026-05-08  
Scope: Next.js app, React client code, Supabase RLS schema, auth flow, dependency posture, and visible app configuration.

## Executive Summary

The most urgent issue is dependency posture: the app is pinned to `next@14.2.21`, and `npm audit` reports that version in the affected range for multiple Next.js advisories, including a critical middleware authorization bypass. The Supabase RLS model is present and mostly doing useful work, but one public join-table policy exposes more schedule relationship data than the public UI needs. The admin login flow also lets any visitor ask Supabase Auth to send a magic link to any email address, which is an abuse and rate-limit concern even though database writes remain protected by RLS.

No committed production secrets were found in tracked files during this review. A local `.env.local` exists and was intentionally not opened.

## Critical Findings

### SEC-001: Vulnerable Next.js Version

- Rule ID: NEXT-SUPPLY-001
- Severity: Critical
- Location: `package.json` dependency declaration, line 16
- Evidence:

```json
"next": "14.2.21"
```

`npm audit --json` reports the installed `next` package as vulnerable, including `GHSA-f82v-jwr5-mffw` ("Authorization Bypass in Next.js Middleware") for `>=14.0.0 <14.2.25`, plus several later fixed advisories. The audit output reports a semver-compatible fix at `next@14.2.35`.

- Impact: A public deployment can inherit known framework-level vulnerabilities, including middleware authorization bypass and denial-of-service issues.
- Fix: Upgrade Next.js to at least `14.2.35` on the current major line, then run `npm install`, `npm audit`, `npm run lint`, and `npm run build`.
- Mitigation: Until upgraded, avoid relying on Next.js middleware as the only authorization boundary. This app’s database RLS helps, but framework advisories should still be patched promptly.
- False positive notes: This is confirmed by the local package metadata and `npm audit` result.

## High Findings

No high-severity application-code vulnerabilities were confirmed beyond the vulnerable Next.js dependency above.

## Medium Findings

### SEC-002: Public `session_speakers` Policy Exposes Draft Session Relationships

- Rule ID: SUPABASE-RLS-001
- Severity: Medium
- Location: `supabase/schema.sql`, policy `"Public can view session_speakers"`, lines 76-78
- Evidence:

```sql
create policy "Public can view session_speakers" on public.session_speakers
  for select using (true);
```

Public schedule queries only need speaker relationships for published sessions, but this policy allows anonymous users to select every row in `session_speakers`, including rows attached to draft sessions.

- Impact: Anonymous users can infer unpublished session-speaker assignments and draft schedule relationships before publication.
- Fix: Restrict the policy to rows whose parent session is published, for example with an `exists` check against `public.sessions` where `sessions.id = session_id and sessions.status = 'published'`.
- Mitigation: Avoid placing sensitive unpublished speaker/session relationships in the production database until the policy is narrowed.
- False positive notes: If draft speaker assignments are intentionally public, document that. The app UI and `sessions` policy suggest drafts are meant to stay private.

### SEC-003: Magic-Link Requests Are Not App-Whitelisted Before Sending Email

- Rule ID: AUTH-ABUSE-001
- Severity: Medium
- Location: `app/login/LoginPageClient.tsx`, `handleLogin`, lines 25-30
- Evidence:

```ts
const { error } = await supabase.auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: `${window.location.origin}/api/auth/callback`,
  },
})
```

The login page calls Supabase Auth directly from the browser. The database whitelist in `admin_emails` protects admin data after authentication, but it does not stop unauthenticated visitors from requesting magic-link emails to arbitrary addresses.

- Impact: Attackers can abuse the public login form to generate unwanted email, consume auth quotas, and create avoidable operational noise.
- Fix: Move magic-link initiation behind a server route or RPC that first checks whether the submitted email is in `admin_emails`, then calls Supabase Auth only for allowed emails. Keep user-facing errors generic.
- Mitigation: Configure Supabase Auth rate limits and SMTP abuse controls. Monitor failed or non-admin OTP request volume.
- False positive notes: Supabase platform rate limits may reduce impact, but the app-level whitelist is not visible in this code.

### SEC-004: Wildcard Remote Image Host Allowlist

- Rule ID: NEXT-IMG-001
- Severity: Medium
- Location: `next.config.js`, lines 3-9
- Evidence:

```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
},
```

This allows Next’s image optimizer to fetch from any HTTPS host if any remote image is rendered through `next/image`.

- Impact: On deployments using the image optimizer, an attacker who can influence an optimized image URL can increase server-side fetch and cache pressure. `npm audit` also reports a Next.js image optimizer DoS advisory affecting the current installed version.
- Fix: Replace the wildcard with the specific trusted image hosts used for speaker photos and TPMA assets, or remove the remote pattern until remote `next/image` is needed.
- Mitigation: Continue rendering admin-controlled remote speaker photos with plain `<img>` if image optimization is not required.
- False positive notes: Current speaker photos use `<img>` in `SessionCard` and `SpeakerManager`, so this is a configuration risk rather than a currently proven exploit path.

## Low Findings

### SEC-005: Security Headers Are Not Defined in App Configuration

- Rule ID: NEXT-HEADERS-001
- Severity: Low
- Location: `next.config.js`, lines 1-13
- Evidence: The config only declares `images`; no `headers()` function or equivalent CSP, clickjacking, content-type, referrer, or permissions-policy headers are visible.

- Impact: The app has less browser defense-in-depth against XSS, clickjacking, MIME sniffing, and over-broad browser feature access.
- Fix: Add conservative security headers in `next.config.js`, especially `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, and a frame embedding control such as CSP `frame-ancestors 'none'` if embedding is not required.
- Mitigation: If Vercel or another edge layer already sets these, verify with a deployed response header check and document that location.
- False positive notes: Headers may be set outside this repo; they are not visible in app code.

### SEC-006: Gitignore Only Ignores `.env.local`

- Rule ID: NEXT-SECRETS-001
- Severity: Low
- Location: `.gitignore`, lines 1-2
- Evidence:

```gitignore
node_modules
.env.local
```

Next.js projects commonly use several `.env*` filenames. This repo tracks `.env.local.example`, which is fine, but does not ignore accidental `.env`, `.env.development`, or `.env.production` files.

- Impact: A contributor could accidentally commit secrets under another standard env filename.
- Fix: Ignore `.env*` and explicitly unignore `.env.local.example`.
- Mitigation: Keep reviewing PRs for accidental env files and run secret scanning in the repository.
- False positive notes: No committed secret file was found in tracked files during this review.

## Positive Observations

- Supabase tables have RLS enabled in `supabase/schema.sql` lines 50-54.
- Public `sessions` reads are limited to `status = 'published'` in `supabase/schema.sql` lines 56-58.
- Table IDs use UUID defaults instead of incremental public IDs in `supabase/schema.sql` lines 8-9, 24-25, and 35-36.
- External text links generated by `lib/linkifyText.tsx` restrict to `http(s)` and include `rel="noopener noreferrer"` on lines 20-25 and 50-55.
- The review did not find use of `eval`, `new Function`, `document.write`, or untrusted `innerHTML` sinks. The only `dangerouslySetInnerHTML` is static JSON-LD in `app/layout.tsx` lines 134-137.

## Verification Performed

- Read the relevant Next.js, React, and frontend JavaScript security guidance from the local `security-best-practices` skill.
- Searched the repo for dangerous DOM sinks, redirects, storage use, env variable use, secrets-like names, public policies, and security headers.
- Ran `npm audit --json`; it failed with reported vulnerabilities as expected because advisories were found.
- Checked tracked env files with `git ls-files`; only `.env.local.example` is tracked.
