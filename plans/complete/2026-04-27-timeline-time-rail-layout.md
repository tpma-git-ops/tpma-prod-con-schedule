# Time Column Consistency & Timeline Layout

## Goal

Make the schedule timeline **one coherent layout**: consistent time “rail” behavior, alignment across breakpoints, and **vertical rhythm** driven from a single spacing unit — eliminating the “two layouts stitched together” feel.

## Context

- Horizontal divider rule beside the time in `ScheduleTimeline.tsx` (~121) appears for parallel-session blocks but not full-width rows.
- `pl-[88px]` (~126) applies from `md` up; it currently works as a shared content offset, but only for the parallel-session branch.
- Duration is rendered as a separate piece of metadata today in both row types, so any layout refactor needs an explicit duration rule rather than leaving it implied.
- Spacing mixes `space-y-1`, `py-2` on parallel blocks, and `my-2` + `py-3` on full-width rows — but those values are doing both inter-block rhythm and row-internal padding work.

## Decided Approach

### Remove the partial rail

- Do **not** introduce a continuous decorative rail.
- Remove the current parallel-only horizontal divider so both parallel and full-width rows rely on the same alignment and spacing rules instead of a rail that appears only in one branch.

### Shared column contract

- Keep **mobile intentionally stacked** for every row type: one metadata row above the content.
- From `md` up, every time block uses the same outer grid contract: `time | content | duration`, e.g. `grid-cols-[var(--timeline-time-col)_minmax(0,1fr)_auto]`.
- The time column width must be a **shared token** (`--timeline-time-col` or equivalent utility), not row-local `auto`, so every row gets the same content start edge even when rendered time strings differ.
- If typography work changes time-label font metrics later, adjust that token in one place instead of letting rows size themselves independently.

### Duration placement

- Preserve duration as a separate metadata element.
- On mobile, duration sits in the same top metadata row as the time and aligns to the end.
- On `md` and up, duration occupies the third grid column for both full-width and parallel blocks.
- Break rows may still omit duration if that remains the desired treatment, but that choice should be explicit.

### Vertical rhythm

- Define one **outer rhythm token** (e.g. 12px) for spacing between timeline blocks at the parent level.
- Define **row-internal padding separately** for full-width event rows vs. session-card groups; do not treat inter-block spacing and row-internal padding as the same knob.
- Any remaining deltas should be multiples of the base rhythm and documented in the component or adjacent plan notes.

## Implementation Steps

- [x] Remove the parallel-only horizontal divider and update both row branches to use the same metadata structure.
- [x] Introduce a shared time-column token and refactor `ScheduleTimeline` so `md+` rows use a common `time | content | duration` grid; remove `pl-[88px]`.
- [x] Keep mobile intentionally stacked for both row types, with the same top metadata pattern instead of one stacked layout and one inline layout.
- [x] Separate inter-block spacing from row-internal padding; normalize `space-y-1`, `py-2`, `my-2`, and `py-3` against the chosen rhythm tokens.
- [ ] Regression pass: mobile, tablet, desktop; All rooms vs. single room; full-width rows, parallel rows, and break rows.

## Testing / Review

- [ ] Full-width rows and session blocks line up to the same left content edge as multi-column blocks.
- [ ] Mobile shows the same metadata pattern for both full-width and parallel rows.
- [ ] Duration placement stays consistent and intentional; no accidental drop of duration except break rows if kept.
- [ ] No horizontal scroll or overflow from grid on narrow viewports.
- [ ] Visual comparison before/after screenshots for key breakpoints optional but useful.

## Implementation Notes

- Implemented with `--timeline-time-col: 5rem` and `--timeline-block-gap: 0.75rem` in `app/globals.css`.
- Break rows continue to hide duration; all other row types render it in the shared metadata positions.
- Verified with `npm run build` on April 27, 2026. Screenshot comparison was not captured in this pass.
