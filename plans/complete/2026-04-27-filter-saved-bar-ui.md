# Filter + Saved Bar: Pills, Copy, Sticky Header

## Goal

Unify **My Schedule** and **room filter** controls into one pill pattern, improve **saved empty-state** legibility or placement, and add **sticky header** affordance (divider + subtle shadow on scroll) so filters don’t visually merge into content.

## Context

- “My Schedule” pill (`app/SchedulePageClient.tsx`) and room pills (`RoomFilter.tsx`) use **different** border/active styles.
- Caption “Star sessions to save them” uses `text-tpma-dark/45`, which reads **weak** on `stone-50`.
- Sticky header already has a bottom border, but it has **no shadow**; on scroll it still blends into the schedule body.

## Decided Approach

### Shared pill foundation

- Introduce a reusable **`Pill`** (or `FilterPill`) that owns the shared shell only:
  - default / hover / active states
  - consistent border radius, border color, background, typography, and padding
  - explicit `focus-visible` treatment so keyboard affordance does not regress
- Keep pill content composable so both current use cases still fit cleanly:
  - optional leading visual (room dot or star)
  - label text
  - optional trailing badge/count
- Preserve control semantics instead of forcing both controls into the same behavior:
  - `My Schedule` remains a toggle with `aria-pressed`
  - room filters remain a single-select set, but should get equivalent focus treatment
- Refactor the `My Schedule` toggle and `RoomFilter` items to use the shared shell while preserving their distinct content.

### Saved caption

- Keep the empty-state hint as **standalone text** below the room pills.
- Increase its contrast/opacity enough to read on `stone-50`.
- Do **not** move the hint into the `My Schedule` pill for this pass; keeping the pill label/count stable avoids width changes and mobile overflow when `savedCount` changes from `0` to `>0`.

### Sticky header on scroll

- Keep the existing **1px bottom border** on the sticky region.
- Add a **subtle shadow** only after the page has scrolled past the top of the schedule controls.
- Prefer a small sentinel + `IntersectionObserver` approach over per-scroll style toggling so the effect is lightweight and less likely to flicker.

## Implementation Steps

- [x] Add a shared `Pill` shell component or utility with optional leading/trailing content and documented focus/active styles.
- [x] Migrate `SchedulePageClient.tsx` `My Schedule` control and `RoomFilter` pills to the shared shell while preserving the room dots, star icon, and saved-count badge.
- [x] Increase saved empty-copy contrast without moving the message into the pill; verify the bar stays stable on narrow mobile widths.
- [x] Reuse the existing sticky border and add a conditional shadow after scroll via sentinel state.

## Testing / Review

- [x] Production build passes (`npm run build`).
- [ ] Keyboard and focus order through pills unchanged or improved; `focus-visible` state is obvious.
- [ ] Active room + My Schedule on together still look coherent.
- [ ] Saved bar does not wrap or overflow on narrow mobile widths when the saved count changes.
- [ ] Caption readable on stone background.
- [ ] Scroll shadow doesn’t flicker on iOS; performance acceptable.
- [ ] Sticky divider/shadow combination reads as separation without looking double-stacked.

## Resolved Decisions

- Room pills kept their single-select button semantics; only `My Schedule` exposes `aria-pressed`.
- The sticky shadow appears after roughly **8px** of scroll via `IntersectionObserver` `rootMargin`.
