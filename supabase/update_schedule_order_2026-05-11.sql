-- Update schedule order to match the latest afternoon run-of-show.
-- Idempotent: only updates timing, room, and sort_order for existing sessions.
-- Run in Supabase SQL Editor.

update public.sessions
set
  room = 'Yonge Room',
  start_time = '10:50',
  end_time = '11:20',
  sort_order = 110
where id = 'b0000001-0000-0000-0000-000000000026';

update public.sessions
set
  room = 'Adelaide Room',
  start_time = '10:00',
  end_time = '10:35',
  sort_order = 53
where id = 'b0000001-0000-0000-0000-000000000020';

update public.sessions
set
  room = 'Bay Room',
  start_time = '11:30',
  end_time = '12:00',
  sort_order = 161
where id = 'b0000001-0000-0000-0000-000000000006';

update public.sessions
set
  room = 'Adelaide Room',
  start_time = '10:50',
  end_time = '11:20',
  sort_order = 113
where id = 'b0000001-0000-0000-0000-000000000036';

update public.sessions
set
  room = 'Adelaide Room',
  start_time = '11:30',
  end_time = '12:00',
  sort_order = 163
where id = 'b0000001-0000-0000-0000-000000000024';

update public.sessions
set
  room = 'Yonge Room',
  start_time = '13:05',
  end_time = '13:35',
  sort_order = 250
where id = 'b0000001-0000-0000-0000-000000000025';

insert into public.sessions
  (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order)
values
  ('b0000001-0000-0000-0000-000000000042', 'Break', null, 'all', '13:45', '14:00', 'break', 'published', true, 275),
  ('b0000001-0000-0000-0000-000000000043', 'Break', null, 'all', '14:30', '14:45', 'break', 'published', true, 325)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  room = excluded.room,
  start_time = excluded.start_time,
  end_time = excluded.end_time,
  session_type = excluded.session_type,
  status = excluded.status,
  is_full_width = excluded.is_full_width,
  sort_order = excluded.sort_order;

update public.sessions
set
  room = 'Yonge Room',
  start_time = '14:00',
  end_time = '14:30',
  sort_order = 300
where id = 'b0000001-0000-0000-0000-000000000007';

update public.sessions
set
  room = 'Yonge Room',
  start_time = '14:45',
  end_time = '15:15',
  sort_order = 350
where id = 'b0000001-0000-0000-0000-000000000031';

update public.sessions
set
  room = 'all',
  start_time = '15:15',
  end_time = '15:30',
  sort_order = 400
where id = 'b0000001-0000-0000-0000-000000000013';

update public.sessions
set
  room = 'Yonge Room',
  start_time = '15:30',
  end_time = '16:00',
  sort_order = 450
where id = 'b0000001-0000-0000-0000-000000000022';

update public.sessions
set start_time = '14:00', end_time = '14:30'
where id in (
  'b0000001-0000-0000-0000-000000000027',
  'b0000001-0000-0000-0000-000000000028',
  'b0000001-0000-0000-0000-000000000029',
  'b0000001-0000-0000-0000-000000000030'
);

update public.sessions
set start_time = '14:45', end_time = '15:15'
where id in (
  'b0000001-0000-0000-0000-000000000032',
  'b0000001-0000-0000-0000-000000000033',
  'b0000001-0000-0000-0000-000000000034',
  'b0000001-0000-0000-0000-000000000035'
);

update public.sessions
set start_time = '15:30', end_time = '16:00'
where id in (
  'b0000001-0000-0000-0000-000000000037',
  'b0000001-0000-0000-0000-000000000038',
  'b0000001-0000-0000-0000-000000000039',
  'b0000001-0000-0000-0000-000000000040'
);

update public.sessions
set
  room = 'Yonge Room',
  start_time = '16:20',
  end_time = '16:50',
  sort_order = 550
where id = 'b0000001-0000-0000-0000-000000000041';

update public.sessions
set room = case room
  when 'Main Room' then 'Yonge Room'
  when 'Auditorium' then 'Yonge Room'
  when 'Room 2' then 'Bay Room'
  when 'Room 3' then 'Richmond Room'
  when 'Room 4' then 'Adelaide Room'
  else room
end
where room in ('Main Room', 'Auditorium', 'Room 2', 'Room 3', 'Room 4');
