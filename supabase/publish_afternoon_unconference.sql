-- Publish afternoon unconference sessions in Room 2, 3, 4
-- Mirrors the afternoon Auditorium time blocks (13:55, 14:35, 15:35).
-- Idempotent: inserts the rows if missing, otherwise flips status to 'published'.
-- Run in Supabase SQL Editor.

insert into public.sessions
  (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order)
values
  ('b0000001-0000-0000-0000-000000000027', 'Unconference Session', 'Topic selected by attendee vote.', 'Room 2', '13:55', '14:25', 'unconference', 'published', false, 301),
  ('b0000001-0000-0000-0000-000000000028', 'Unconference Session', 'Topic selected by attendee vote.', 'Room 3', '13:55', '14:25', 'unconference', 'published', false, 302),
  ('b0000001-0000-0000-0000-000000000029', 'Unconference Session', 'Topic selected by attendee vote.', 'Room 4', '13:55', '14:25', 'unconference', 'published', false, 303),
  ('b0000001-0000-0000-0000-000000000032', 'Unconference Session', 'Topic selected by attendee vote.', 'Room 2', '14:35', '15:05', 'unconference', 'published', false, 351),
  ('b0000001-0000-0000-0000-000000000033', 'Unconference Session', 'Topic selected by attendee vote.', 'Room 3', '14:35', '15:05', 'unconference', 'published', false, 352),
  ('b0000001-0000-0000-0000-000000000034', 'Unconference Session', 'Topic selected by attendee vote.', 'Room 4', '14:35', '15:05', 'unconference', 'published', false, 353),
  ('b0000001-0000-0000-0000-000000000037', 'Unconference Session', 'Topic selected by attendee vote.', 'Room 2', '15:35', '16:05', 'unconference', 'published', false, 451),
  ('b0000001-0000-0000-0000-000000000038', 'Unconference Session', 'Topic selected by attendee vote.', 'Room 3', '15:35', '16:05', 'unconference', 'published', false, 452),
  ('b0000001-0000-0000-0000-000000000039', 'Unconference Session', 'Topic selected by attendee vote.', 'Room 4', '15:35', '16:05', 'unconference', 'published', false, 453)
on conflict (id) do update set
  title         = excluded.title,
  description   = excluded.description,
  room          = excluded.room,
  start_time    = excluded.start_time,
  end_time      = excluded.end_time,
  session_type  = excluded.session_type,
  status        = excluded.status,
  is_full_width = excluded.is_full_width,
  sort_order    = excluded.sort_order;
