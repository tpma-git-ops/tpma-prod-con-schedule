# Update Session Titles & Descriptions

**Date:** 2026-05-08  
**Source:** Speaker Details Collection Form (Responses) – Talk details.csv

## Goal

Apply confirmed talk titles and descriptions from the speaker submission form to the schedule database.

## Approach

1. Create `supabase/update_session_content_2026-05-08.sql` — a one-shot `UPDATE` script to run in the Supabase SQL Editor against the live database.
2. Update `supabase/seed.sql` — so fresh database installs reflect the final content.

## Sessions being updated

| Speaker | Session ID (suffix) | New Title |
|---|---|---|
| Radhika Dutt | …000002 | Radically Rethinking Metrics |
| Ben Erez & Marc Baselga | …000003 | How the PM role is evolving… |
| Mike Ho | …000004 | Burnout is real |
| May Wong (panel mod.) | …000005 | Product Operations in 2026: The PDLC is broken. |
| Abinandhini Chandranat | …000006 | Beyond the Play Button |
| Colin Matthews | …000007 | Become an AI-Native Builder |
| Joan Milway | …000008 | Purpose Built |
| Daniel de Repentigny (panel mod.) | …000009 | The Fork in the Road: Senior IC or Manager |
| Scott Miller | …000020 | Your Pricing is a Product Decision. Start Treating It Like One |
| Andrea Michalek | …000021 | From Feature Factory to Breakthrough Leadership |
| Ross Saunders | …000022 | Don't LEAN on Legal |
| Rowan Noronha (panel mod.) | …000023 | How PMs Ship Faster and Launch Smarter with PMM |
| Jenya Faris | …000024 | From Gut Feel to Evidence |
| April Dunford | …000025 | Advanced Positioning |
| Ben Yoskovitz | …000031 | Lean Analytics in the Age of AI |
| Iris Guo | …000036 | Becoming an AI PM |
| John Cutler | …000041 | Single-Player vs. Multiplayer Product |

## Notes / open questions

- **Scott Miller description** — the CSV submission started with the Ben Yoskovitz "Lean Analytics" paragraph (likely an accidental paste). The first paragraph was stripped; only the pricing-specific content was used. Confirm with Scott if needed.
- **April Dunford description** — very short ("How to avoid the not-so-obvious roadblocks"). Retained as provided; may want to expand later.
- **Ben Erez & Marc Baselga** — no description provided in the form; description left unchanged (was `null`/`'Supra Podcast live session.'`).

## Status

- [x] `supabase/update_session_content_2026-05-08.sql` created
- [x] `supabase/seed.sql` updated
