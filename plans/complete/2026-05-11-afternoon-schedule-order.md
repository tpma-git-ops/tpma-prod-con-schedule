# Afternoon Schedule Order

## Goal

Update the schedule ordering so the afternoon Auditorium sequence matches the supplied reference, without changing session titles, speaker assignments, or descriptions.

## Context

- The app fetches sessions ordered by `sort_order`.
- The existing seed places Colin Matthews and Ross Saunders in morning blocks.
- The supplied reference places Colin Matthews, Ben Yoskovitz, and Ross Saunders after the April Dunford keynote, followed by John Cutler at 16:20.
- Follow-up room ordering sets Room 4 to Scott Miller, Iris Guo, Jenya Farris, and Room 2 to Michael Ho, Joan Milway, Abinandhini Raju.
- Follow-up break correction adds 15-minute afternoon breaks at 13:45, 14:30, and 15:15, shifting afternoon session blocks to 14:00, 14:45, and 15:30.

## Decided Approach

- Update `supabase/seed.sql` so fresh local databases match the new order.
- Add an idempotent SQL patch for existing Supabase databases.
- Keep content and speaker mappings intact by updating only timing/order fields.

## Steps

- [x] Update seed session times and sort orders.
- [x] Add database patch SQL for existing environments.
- [x] Run validation checks.
- [x] Move this plan to `plans/complete/` when done.

## Open Questions

- None for the current scope. The reference includes setup/intro/transition rows that are not represented as schedule sessions in the seed; this change keeps the app content as-is and reorders existing sessions.
