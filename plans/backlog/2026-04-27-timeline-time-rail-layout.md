# Time-Rail Consistency & Timeline Layout

## Goal

Make the schedule timeline **one coherent layout**: consistent time “rail” behavior, alignment across breakpoints, and **vertical rhythm** driven from a single spacing unit — eliminating the “two layouts stitched together” feel.

## Context

- Horizontal divider rule beside the time in `ScheduleTimeline.tsx` (~121) appears for parallel-session blocks but not full-width rows.
- `pl-[88px]` (~126) applies from `md` up; mobile shows time above the card with a gap, while desktop offsets cards vs. full-width rows differently.
- Spacing mixes `space-y-1`, `py-2` on parallel blocks, and `my-2` + `py-3` on full-width rows — uneven vertical rhythm.

## Decided Approach

### Rail: all or nothing

- **Either** show a **continuous** left-aligned timeline rail for every row type, **or** remove the partial rail so parallel and full-width blocks match. Pick one rule and apply everywhere.

### Grid instead of magic padding

- Replace breakpoint-only `pl-[88px]` with a **CSS grid**: e.g. `grid-cols-[auto_1fr]` (or `auto minmax(0,1fr)`) with consistent `gap` (e.g. `gap-4`) so time and content **align top-to-bottom** at all breakpoints without floating time on mobile vs. pushed content on desktop.

### Vertical rhythm

- Choose **one base unit** (e.g. 12px between blocks) and express spacing from the **parent** (`gap` / `space-y` / shared padding token) rather than ad-hoc per-row `my`/`py` combinations. Full-width vs. parallel may still differ slightly if needed, but deltas should be **multiples** of the base.

## Implementation Steps

- [ ] Decide: continuous rail vs. no rail; update `ScheduleTimeline` markup/CSS accordingly for parallel + full-width rows.
- [ ] Refactor time + card layout to CSS grid with `auto` + `1fr` tracks; remove or replace `pl-[88px]` hack.
- [ ] Normalize vertical spacing: document base unit, replace `space-y-1` / mixed `py` / `my` with consistent parent-driven spacing.
- [ ] Regression pass: mobile (stacked time), tablet, desktop; parallel columns and single column.

## Testing / Review

- [ ] Full-width rows and session blocks line up to the same left content edge as multi-column blocks.
- [ ] No horizontal scroll or overflow from grid on narrow viewports.
- [ ] Visual comparison before/after screenshots for key breakpoints optional but useful.

## Open Questions

- If grid `auto` column width jumps between “9:00 AM” and “10:30 AM”, consider `tabular-nums` + `minmax` for the time column (may overlap with typography plan — coordinate order of implementation).
