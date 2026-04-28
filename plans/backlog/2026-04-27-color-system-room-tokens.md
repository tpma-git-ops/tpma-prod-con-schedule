# Color System: Room Tokens & Visual Distinctions

## Goal

Tighten the color system so room treatments, keynote vs. room styling, utility rows, and saved-state signals are consistent, non-duplicated, and scannable — with **highest visual impact** across the schedule UI.

## Context

- `ROOM_DOT_COLORS` (or equivalent) is duplicated in `components/SessionCard.tsx` (~lines 15–21) and `components/RoomFilter.tsx` (~19–25); a third “light” variant exists in `lib/types.ts` (~58–64).
- `session.room` is still typed as a general `string`, and admin flow writes `'all'` for full-width rows, so any centralized room styling must preserve safe fallbacks for unknown or non-room values.
- Keynote sessions use `border-l-tpma-blue bg-indigo-50/80` in `SessionCard.tsx` (~48), matching Auditorium room treatment, so non-keynote Auditorium talks and keynotes are indistinguishable by color alone.
- Registration and Announcement blocks share the same treatment (`bg-tpma-blue/5 border border-tpma-blue/20`) in `ScheduleTimeline.tsx` (~75, 78).
- Saved sessions use `ring-tpma-gold/60` on `SessionCard.tsx` (~48), which collides with Room 3’s gold room accent when both apply.
- `docs/tpc2026-design-system.md` still describes track/type-led card accents, including a gold keynote accent, so this room-led color system needs an accompanying docs update or explicit supersession note.

## Decided Approach

### Single source of truth

- Define **one** room map in `lib/types.ts` (or a dedicated `lib/roomStyles.ts` if types file should stay data-only) exporting per-room tokens: `{ dot, tint, border, text }` (names can match existing Tailwind usage).
- Remove duplicate maps from `SessionCard` and `RoomFilter`; import the shared map everywhere room color is needed.
- Keep explicit fallback styling for unknown room strings and non-room values so the schedule still renders safely if data drifts or new rooms are added before code is updated.

### Keynote vs. Auditorium

- **Do not** rely on a second blue treatment to distinguish keynote from Auditorium.
- Keep the existing session-type slot in the card meta row, but render `Keynote` as a small filled badge rather than muted plain text.
- Use room styling for the card accent as usual; keynote distinction comes from the badge and optional title emphasis, **not** a second Auditorium-like blue border/tint.

### Registration vs. Announcement

- Keep one row on the “brand blue” family if product requires it; move the other to a **neutral stone** treatment so attendees can scan them apart at a glance.

### Saved state vs. Room 3 gold

- Replace ring-based “saved” with a **non-gold-overlapping** pattern: filled gold star + thin **top-edge** accent.
- Do **not** use any left-edge saved indicator, since the left edge is already reserved for room styling.

### Docs alignment

- Update `docs/tpc2026-design-system.md` to match the implemented room-led card system, or add a clear note that the document has been superseded in this area.

## Implementation Steps

- [ ] Add centralized room style map `{ dot, tint, border, text }` and migrate `lib/types.ts` light variant into it or delete redundancy.
- [ ] Update `SessionCard` and `RoomFilter` to import shared map; delete local duplicates.
- [ ] Preserve fallback styling for unknown room strings and non-room values while centralizing room tokens.
- [ ] Implement keynote distinction without color clash by converting the existing `Keynote` meta label into a badge; verify Auditorium + keynote vs. Auditorium + non-keynote.
- [ ] Split Registration vs. Announcement styling (stone vs. blue or vice versa — document which is which for future editors).
- [ ] Replace saved ring with star + top-edge accent; visually verify Room 3 + saved combo.
- [ ] Update or supersede `docs/tpc2026-design-system.md` so the repo documents the same accent system the UI uses.

## Testing / Review

- [ ] All rooms still read correctly in filter and on cards (including dark/light balance).
- [ ] Unknown room strings still render with safe fallback styles instead of broken or missing accents.
- [ ] Keynote and non-keynote in same room are distinguishable without relying on duplicate blue borders.
- [ ] Saved + Room 3 does not double-read as “extra gold ring.”

## Open Questions

- Which utility row (Registration vs. Announcement) should stay on brand blue vs. neutral, if marketing has a preference.
