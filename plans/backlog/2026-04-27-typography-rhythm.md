# Typography Rhythm & Time Label Branding

## Goal

Replace ad-hoc small font sizes and opacity steps with a **defined type scale**, align muted-on-dark text tokens, reuse the header’s gold eyebrow treatment for timeline times, and consider **Cirka + tabular numerals** for time labels so the most-scanned text matches brand hierarchy.

## Context

- Multiple near-duplicate sizes appear (`text-[10px]`, `text-[11px]`, etc.) scattered across components.
- Several muted text opacities on dark overlap in purpose (`/30`, `/40`, `/45`, `/50`, `/60`).
- The schedule header uses a strong gold uppercase `tracking-widest` eyebrow (`app/page.tsx` ~157–159) that does not recur elsewhere.
- Time labels on the timeline use Poppins while Cirka carries headings; times are primary scan targets.

## Decided Approach

### Scale

- Introduce semantic classes or tokens: **`xs`**, **`2xs`** (custom ~11px), and **`3xs`** (~10px) **only for badges** — reduce the four overlapping small sizes to this system.
- Consolidate muted-on-dark (and analogous light-surface) grays into **fewer intentional steps** documented in one place (e.g. Tailwind `@theme`, CSS variables, or a short `TYPOGRAPHY.md` comment in `globals.css` — avoid large new docs unless the project already uses them).

### Header eyebrow → timeline

- Reuse the same **gold uppercase tracked eyebrow** styling (or a single shared component/class) for **time labels** in `ScheduleTimeline` so header and timeline feel **of-a-piece**.

### Cirka for times

- Evaluate **Cirka with tabular nums** for time labels (`font-variant-numeric: tabular-nums` or `font-features` per how Cirka is loaded) so columns align and brand matches headings; fallback: keep Poppins only if Cirka renders poorly at small sizes — decision recorded in PR.

## Implementation Steps

- [ ] Audit `text-[10px]`, `text-[11px]`, and similar arbitrary sizes; map to `3xs` / `2xs` / `xs`.
- [ ] Add Tailwind extend or component classes for the scale; replace call sites.
- [ ] Reduce redundant opacity steps for secondary text; document the chosen ramp.
- [ ] Extract shared “eyebrow” / time-label class or small `TimeLabel` subcomponent; apply to `ScheduleTimeline` time column.
- [ ] Prototype Cirka + tabular numerals on times; adjust line-height/weight for legibility.

## Testing / Review

- [ ] No accidental regression in layout from font metrics (especially multi-line times).
- [ ] Timeline times visually match header brand weight when scrolling.
- [ ] Accessibility: small text still meets contrast where required (or stays non-essential if decorative).

## Open Questions

- Whether `2xs` at 11px should be a Tailwind plugin `fontSize` or only CSS variables — follow existing project pattern.
