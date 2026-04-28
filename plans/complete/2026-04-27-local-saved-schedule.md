# Local Saved Schedule Plan

## Goal

Add an attendee-facing way to star sessions and build a personal schedule that is stored locally in the browser. This must require no accounts, no admin workflow, and no Supabase schema or auth changes.

## Context

- The public schedule is rendered from [`app/page.tsx`](/Users/os/Documents/Github%20Repos/tpma-prod-con-schedule/app/page.tsx), which fetches published sessions from Supabase and owns the top-level client state.
- Session grouping and timeline rendering flow through [`lib/utils.ts`](/Users/os/Documents/Github%20Repos/tpma-prod-con-schedule/lib/utils.ts) and [`components/ScheduleTimeline.tsx`](/Users/os/Documents/Github%20Repos/tpma-prod-con-schedule/components/ScheduleTimeline.tsx).
- Individual attendee interaction currently lives in [`components/SessionCard.tsx`](/Users/os/Documents/Github%20Repos/tpma-prod-con-schedule/components/SessionCard.tsx).
- Room filtering is already handled in [`components/RoomFilter.tsx`](/Users/os/Documents/Github%20Repos/tpma-prod-con-schedule/components/RoomFilter.tsx).
- The public page already re-fetches on realtime session changes, so any saved-session solution needs to tolerate sessions changing or disappearing underneath local state.

## Decided Approach

### Product shape

- Add a star/save affordance to each saveable session card in the attendee view.
- Let users switch between the full schedule and a saved-only view ("My Schedule" or "Saved").
- Keep saved sessions combined with the existing room filter rather than building a separate page first.
- Treat saving as a lightweight bookmark, not a reservation, registration, or conflict validator.

### Persistence

- Store saved session IDs in browser `localStorage` under a versioned key such as `tpc-schedule:saved-session-ids:v1`.
- Persist only the IDs, not full session payloads, so realtime updates still come from Supabase and the saved state stays small.
- On load, hydrate saved IDs client-side after mount and render safely without server assumptions.
- When fresh session data arrives, ignore or prune IDs for sessions that no longer exist or are no longer published.

### State ownership

- Keep fetched session data in `app/page.tsx` as it is today.
- Add saved-session state at the same level, either directly in `app/page.tsx` or via a small client hook such as `useSavedSessions`.
- Derive:
  - `savedSessionIds`
  - `savedSessions`
  - `showSavedOnly`
  - filtered timeline input after both room filtering and saved-only filtering are applied

### UI changes

- Add a dedicated star button to `SessionCard` with clear saved/unsaved states.
- Ensure the star button does not toggle card expansion when clicked.
- Show saved state visually even when cards are collapsed.
- Add a compact saved-only toggle near the existing room filters, ideally with a count of saved sessions.
- Keep full-width utility blocks like breaks/lunch/afterparty unsaveable unless there is a strong product reason to include them.

### Non-goals

- No backend table for favorites or attendee schedules.
- No syncing across browsers or devices.
- No admin tooling for attendee saved sessions.
- No account creation, sign-in requirement, or export/share flow in the first pass.

## Implementation Steps

- [ ] Add a small client persistence layer for saved session IDs, including read, write, toggle, and cleanup behavior for missing sessions.
- [ ] Extend the public schedule page state in `app/page.tsx` to hydrate saved IDs and derive a saved-only session list without changing the Supabase fetch path.
- [ ] Update `SessionCard` to render a star/save control and accept saved/toggle props from the page or timeline layer.
- [ ] Thread saved-session props through `ScheduleTimeline` so cards can render saved state consistently in both single-column and multi-column blocks.
- [ ] Add a saved-only toggle in the public filter area, keeping it compatible with the existing room filter behavior.
- [ ] Decide whether unsaveable session types are hidden or still shown in saved-only mode when they are not explicitly saved. Default: hide them.
- [ ] Handle stale local IDs after realtime updates or admin unpublishes by removing dead IDs during reconciliation.
- [ ] Add lightweight empty states:
  - no saved sessions yet
  - no saved sessions match the active room
- [ ] Verify interaction details on mobile and desktop, especially sticky filters, card expansion, and star-button tap targets.

## Testing Checklist

- [ ] Saving a session persists after refresh.
- [ ] Unsaving a session removes it immediately from saved-only mode.
- [ ] Saved state survives realtime content edits to the same session.
- [ ] If a saved session is unpublished or removed, it disappears cleanly and the stale ID is cleaned up.
- [ ] Clicking the star does not expand/collapse the card.
- [ ] Room filters still behave correctly in both all-sessions and saved-only views.
- [ ] Empty-state messaging is correct when saved-only has zero results.
- [ ] The UI behaves sensibly when `localStorage` is unavailable or throws.

## Open Questions

- Label choice: should the attendee-facing language be `Saved`, `Starred`, or `My Schedule`?
- Should the saved-only toggle live inside `RoomFilter`, beside it, or in the page header?
- Do we want to show saved sessions in the normal feed with stronger highlighting, or is the star icon alone enough for v1?
- Should keynote/break/lunch/afterparty sessions be saveable, or only standard attendee session types?
- Is cross-tab sync worth adding with the `storage` event now, or should that wait until the feature proves useful?

## Suggested Acceptance Criteria

- An attendee can save and unsave sessions on the public schedule without signing in.
- Saved sessions persist locally across reloads on the same browser.
- The attendee can switch to a saved-only view to see their personal schedule.
- Existing admin publishing and realtime schedule updates continue to work unchanged.
