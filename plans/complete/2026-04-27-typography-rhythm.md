# Typography Rhythm & Time Label Branding

## Goal

Replace ad-hoc small font sizes and opacity steps on the **attendee-facing schedule UI** with a **defined small-type scale**, align muted text tokens, evolve the existing timeline time-label styling so it shares the header eyebrow’s rhythm, and consider **Cirka + tabular numerals** for time labels only if legibility holds at schedule sizes.

## Context

- This pass is limited to the public schedule experience (`app/page.tsx`, `components/ScheduleTimeline.tsx`, `components/SessionCard.tsx`, `components/RoomFilter.tsx`, and directly related shared styles). Admin, auth, and error states stay out of scope unless a shared token change is truly required.
- Multiple near-duplicate sizes appear (`text-[10px]`, `text-[11px]`, `text-xs`, etc.) across the schedule surface.
- Several muted text opacities on dark overlap in purpose (`/30`, `/40`, `/45`, `/50`, `/60`).
- The schedule header uses a strong gold uppercase `tracking-widest` eyebrow (`app/page.tsx` ~157–159) that does not recur elsewhere.
- Time labels on the timeline already use a shared `.time-label` class in `app/globals.css`; that utility should be refactored rather than replaced with a second primitive.
- Time labels on the timeline use Poppins while Cirka carries headings; times are primary scan targets.

## Decided Approach

### Scale

- Introduce semantic classes or tokens for the schedule surface: **`xs`**, **`2xs`** (custom ~11px), and **`3xs`** (~10px, badges/counters only). Map existing `text-xs` and arbitrary small sizes intentionally instead of keeping both systems alive.
- Consolidate muted-on-dark (and analogous light-surface) grays into **fewer intentional steps** documented in one place (e.g. Tailwind `@theme`, CSS variables, or a short `TYPOGRAPHY.md` comment in `globals.css` — avoid large new docs unless the project already uses them).

### Header eyebrow → timeline

- Reuse the same **uppercase tracked eyebrow rhythm** for **time labels** in `ScheduleTimeline`, but with a **surface-appropriate color variant** instead of blindly copying the header’s gold-on-dark color treatment. Prefer evolving the existing `.time-label` utility or a closely related variant so header and timeline feel **of-a-piece** without harming contrast.

### Cirka for times

- Evaluate **Cirka with tabular nums** for time labels (`font-variant-numeric: tabular-nums` or `font-features` per how Cirka is loaded) so columns align and brand matches headings. First verify the shipped Cirka files actually support tabular figures; fallback: keep Poppins if Cirka lacks support or renders poorly at small sizes. Record the decision in the PR.

## Implementation Steps

- [x] Audit small-text usage on the attendee-facing schedule surface (`text-[10px]`, `text-[11px]`, `text-xs`, and similar); map each case to `3xs` / `2xs` / `xs` with clear intent.
- [x] Add Tailwind extend or component classes for the scale; replace call sites.
- [x] Reduce redundant opacity steps for secondary text; document the chosen ramp.
- [x] Refactor the existing `.time-label` utility (or add a tightly related variant) to carry the eyebrow rhythm; apply it to `ScheduleTimeline` time labels without creating a competing primitive.
- [x] Prototype Cirka + tabular numerals on times; adjust line-height/weight for legibility, and fall back to Poppins if the font support or rendering quality is not there.

## Testing / Review

- [x] No accidental regression in layout from font metrics (especially multi-line times).
- [x] Timeline times visually match the header’s brand rhythm while preserving contrast on light and dark surfaces.
- [x] Accessibility: small text still meets contrast where required (or stays non-essential if decorative).

## Outcome

- Shipped a schedule-specific small-type scale via Tailwind `2xs` / `3xs` tokens plus shared schedule typography classes in `app/globals.css`.
- Kept the timeline time rail on Cirka with tabular numerals enabled; visual review on desktop and mobile showed the rhythm matched the header without harming legibility.
- Increased duration-label contrast after review so the smallest timeline metadata stayed readable on desktop.

## Open Questions

- Resolved: `2xs` shipped as a Tailwind `fontSize` token because the project already extends theme tokens in `tailwind.config.ts`.
- Resolved: the timeline kept Cirka with tabular numerals enabled after visual review; no fallback to Poppins was needed.
