# Magic Link Auth Fix

## Goal

Fix admin magic-link login when Supabase redirects back with auth data that the app currently cannot consume.

## Context

- `/api/auth/login` sends the magic link from a server route.
- `/api/auth/callback` expects either a query `code` or `token_hash` plus `type`.
- The failing link lands on `/login?error=missing_auth_params`, consistent with Supabase returning implicit-flow tokens in the URL fragment. URL fragments are not sent to server routes, so the callback cannot exchange them.

## Approach

- Use the Supabase SSR server client in the login route so OTP links use the PKCE flow and store the verifier in auth cookies.
- Keep the existing callback exchange logic for `code` and `token_hash`.
- Add a `/login` client fallback that consumes `#access_token` and `#refresh_token` links already issued before the route fix.
- Verify with lint/build or TypeScript checks.

## Steps

- [x] Patch login route to use SSR cookies.
- [x] Patch login page to consume fragment tokens and redirect to admin.
- [x] Run verification.
- [x] Move this plan to `plans/complete/`.
