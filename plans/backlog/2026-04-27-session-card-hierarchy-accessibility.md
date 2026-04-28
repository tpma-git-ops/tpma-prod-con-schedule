# Session Card: Hierarchy, Compact Mode, Panel Order & A11y

## Goal

Optimize `SessionCard` for **title-first scanning**, tighten **compact (two-column) density**, reorder **expanded** content for engagement, and make the card **keyboard-accessible** with visible focus — including optional deduplication of room dot when a room filter is active.

## Context

- Metadata row (“• Auditorium · Talk”) currently sits **above** the title; attendees scanning by title must skip a line.
- Compact and full-width modes use the **same** padding; compact feels cramped.
- Expanded panel shows **description above speakers** (`SessionCard.tsx` ~152–156); speakers (photos, LinkedIn) are often higher value.
- The interactive surface is a `<div onClick>` (~51), not focusable; no Enter/Space, no focus ring.

## Decided Approach

### Title leads

- Restructure so **title is first** (primary), with **room + type** as a **single subline** beneath (secondary). Maintains scan order for attendees.

### Room dot when filtered

- When a **single room** is selected in the filter, consider **hiding the duplicate room dot** on cards (or show only type) to reduce noise — product call: still show if “all rooms” or multi-select.

### Compact mode

- In two-column / compact layout: **smaller title** (`text-sm` or token equivalent), **tighter** padding than full-width, **speaker line one row max** (truncate with ellipsis / `line-clamp`).

### Expanded: speakers first

- Swap order: **speakers block above description** in the expanded panel.

### Accessibility

- Replace outer `<div onClick>` with a **`<button type="button">`** (if entire card is one control) **or** add `role="button"`, `tabIndex={0}`, and **Enter/Space** handlers — button is preferred for native semantics.
- Add **visible focus ring** (match design system focus styles).

## Implementation Steps

- [ ] Reorder DOM: title → subline (room dot + type); adjust styles for hierarchy.
- [ ] Thread “active room filter” (or boolean `hideRoomInCard`) from page/timeline into `SessionCard`; conditionally hide redundant room indicator.
- [ ] Differentiate compact vs. full-width padding and title size; clamp speaker line to one row in compact.
- [ ] Move speakers above description in expanded section.
- [ ] Convert card shell to `<button>` (or fix roles/keyboard); add focus-visible ring; ensure star/inner controls don’t double-activate (stop propagation as needed).

## Testing / Review

- [ ] Keyboard: Tab to card, Enter/Space toggles expand; focus visible.
- [ ] Screen reader: button name reflects session (title), expanded state if using `aria-expanded`.
- [ ] Compact column: long titles/speakers don’t break layout.
- [ ] Star click still doesn’t collapse/expand wrongly.

## Open Questions

- If the whole card is a button, nested interactive elements (star, LinkedIn) must remain **valid HTML** — may require restructuring (e.g. card as `<div>` with visible focusable button overlay vs. splitting controls). Follow **one** consistent pattern aligned with WCAG nesting rules.
