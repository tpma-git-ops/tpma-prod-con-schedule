# Security Review Fixes

## Goal

Address the findings from `security_best_practices_report.md` with small, reviewable changes.

## Context

The review found a vulnerable Next.js pin, over-broad public RLS for `session_speakers`, client-side magic-link initiation without an app whitelist check, broad remote image config, missing visible security headers, and incomplete env-file ignore coverage.

## Approach

- [x] Upgrade Next.js to a patched supported line and refresh the lockfile.
- [x] Tighten public `session_speakers` RLS and add a safe admin-email lookup RPC.
- [x] Move login OTP initiation behind a server route that checks the RPC first.
- [x] Remove the wildcard remote image optimizer allowlist.
- [x] Add conservative browser security headers.
- [x] Broaden env-file ignores while keeping `.env.local.example` tracked.
- [x] Run audit and build verification. `next lint` is not configured and prompts interactively.

## Open Questions

- Confirm whether any deployment edge layer already sets stricter headers; app-level headers will provide a visible baseline either way.
