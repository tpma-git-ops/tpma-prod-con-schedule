-- TPC2026 Seed Data
-- Run after schema.sql in Supabase SQL Editor

-- ============================================
-- ADMIN EMAILS (update with your actual emails)
-- ============================================
insert into public.admin_emails (email) values
  ('andrew@tpma.ca'),        -- update these
  ('hannah@tpma.ca'),        -- update these
  ('admin3@example.com'),    -- update these
  ('admin4@example.com');    -- update these

-- ============================================
-- SPEAKERS
-- ============================================
-- Speaker names, photos, and profile URLs synced from tpma.ca/speakers-authors (see scripts/fetch-tpma-speaker-meta.mjs)
insert into public.speakers (id, name, title, company, photo_url, linkedin_url) values
  ('a0000001-0000-0000-0000-000000000001', 'Radhika Dutt', 'Author of Radical Product Thinking', null, 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69deefbba198fd249063ee50_Preferred%20headshot%20-%20Radhika%20Dutt-optimised.jpg', 'https://www.tpma.ca/speakers-authors/radhika-dutt'),
  ('a0000001-0000-0000-0000-000000000002', 'Ben Erez', 'Co-founder, Insider Loops, Host of Supra Insider Podcast', null, 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69b959efc7517a410678b0b9_d6db6f11-e031-4897-b798-055744748fc2_1311x1311.jpg', 'https://www.tpma.ca/speakers-authors/ben-erez'),
  ('a0000001-0000-0000-0000-000000000003', 'Marc Baselga', 'Founder', 'Supra', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69b9593225f1eb8576677dcb_9efda187-8d8c-42f2-a27c-f331a32554b1_797x690.jpg', 'https://www.tpma.ca/speakers-authors/marc-baselga'),
  ('a0000001-0000-0000-0000-000000000004', 'Michael Ho', 'Founder', 'Progress Everyday', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69df840ef9204540c27ce8b5_Michael%20Ho.jpg', 'https://www.tpma.ca/speakers-authors/michael-ho'),
  ('a0000001-0000-0000-0000-000000000005', 'May Wong', 'Product TO', 'Product Ops Consultant', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/65bba83151324a486b64e262_May%20Wong%20(1).jpg', 'https://www.tpma.ca/speakers-authors/may-wong'),
  ('a0000001-0000-0000-0000-000000000006', 'Kristine Dizon', null, null, null, null),
  ('a0000001-0000-0000-0000-000000000007', 'Ana Lobo', null, null, null, null),
  ('a0000001-0000-0000-0000-000000000008', 'Abinandhini Raju', 'Director, Product Management, Quickplay', null, 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea330a00c7a4eac573f28_Abinandhini%20Raju.jpg', 'https://www.tpma.ca/speakers-authors/abinandhini-c-a-raju'),
  ('a0000001-0000-0000-0000-000000000009', 'Colin Matthews', 'Founder', 'Tech for Product', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea3741d1b9007b249c622_Colin%20Matthews.jpg', 'https://www.tpma.ca/speakers-authors/colin-matthews'),
  ('a0000001-0000-0000-0000-000000000010', 'Joan Milway', 'Head of Product', 'Common Wealth Retirement', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea341484ef61f3a14e637_Joan%20Milway.jpg', 'https://www.tpma.ca/speakers-authors/joan-milway'),
  ('a0000001-0000-0000-0000-000000000011', 'Daniel de Repentigny', 'Principal Product Manager - Spotify', null, 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dfa34c3d7308fe2281cb7a_Daniel%20de%20Re.jpg', 'https://www.tpma.ca/speakers-authors/daniel-de-repentigny'),
  ('a0000001-0000-0000-0000-000000000012', 'Angeli Mehta', null, null, null, null),
  ('a0000001-0000-0000-0000-000000000013', 'Emily K Reid', 'Senior Product Manager, Clubs, Ticketmaster/ TicketWeb', null, 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dfa1a627fd89a1aaa86257_1776260305688.jpg', 'https://www.tpma.ca/speakers-authors/emily-k-reid'),
  ('a0000001-0000-0000-0000-000000000014', 'Scott Miller, CPA, CMA', 'CEO', 'Miller Advisors Inc', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea318454b337960084222_Scott%20Miller.jpg', 'https://www.tpma.ca/speakers-authors/scott-miller-c6edc'),
  ('a0000001-0000-0000-0000-000000000015', 'Andrea Michalek', 'Product Leadership Coach and Author', null, 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69df8339340a927191e25d0f_Andrea%20Michalek.jpg', 'https://www.tpma.ca/speakers-authors/andrea-michalek'),
  ('a0000001-0000-0000-0000-000000000016', 'Ross Saunders', 'Nerd with Trust Issues', 'Ross G Saunders Consulting', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69df869017841cc1cef862e8_1741388159837.jpeg', 'https://www.tpma.ca/speakers-authors/ross-saunders'),
  ('a0000001-0000-0000-0000-000000000017', 'Rowan Noronha', 'Product Marketing Leader', null, 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea2fef28a5c3a80db9a3f_Rowan%20Noronha.jpg', 'https://www.tpma.ca/speakers-authors/rowan-noronha'),
  ('a0000001-0000-0000-0000-000000000018', 'April Dunford', 'CEO', 'Ambient Strategy', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea3698396b51137aadec7_April%20Dunford.jpg', 'https://www.tpma.ca/speakers-authors/april-dunford'),
  ('a0000001-0000-0000-0000-000000000019', 'Ben Yoskovitz', 'Founding Partner', 'Highline Beta', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea37f034dc92b9731fd61_Ben%20Yoskovitz.jpg', 'https://www.tpma.ca/speakers-authors/ben-yoskovitz'),
  ('a0000001-0000-0000-0000-000000000020', 'Iris Guo', 'AI Product Manager & Career Coach', 'Zynga', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea360454b33796008493d_Iris%20Guo.jpg', 'https://www.tpma.ca/speakers-authors/iris-guo'),
  ('a0000001-0000-0000-0000-000000000021', 'John Cutler', 'Head of Product', 'Dotwork', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69df7d9a42c22239b7055027_1516254666144.jpeg', 'https://www.tpma.ca/speakers-authors/john-cutler'),
  ('a0000001-0000-0000-0000-000000000022', 'Jenya Farris', 'Chief Product Officer', 'Routific', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea3281ec9018980acc6f3_Jenya%20Farris.jpg', 'https://www.tpma.ca/speakers-authors/jenya-farris-e0a3e');

-- ============================================
-- SESSIONS
-- ============================================

-- === FULL-WIDTH EVENTS ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  -- Registration & Coffee
  ('b0000001-0000-0000-0000-000000000001', 'Registration, Coffee & Unconference Voting',
   'Pick up your badge, grab a coffee, and vote for the afternoon unconference topics.',
   'all', '08:00', '08:55', 'registration', 'published', true, 10),

  -- Breaks
  ('b0000001-0000-0000-0000-000000000010', 'Break', null,
   'all', '10:35', '10:50', 'break', 'published', true, 100),

  ('b0000001-0000-0000-0000-000000000011', 'Break', null,
   'all', '11:20', '11:30', 'break', 'published', true, 150),

  -- Lunch
  ('b0000001-0000-0000-0000-000000000012', 'Lunch',
   'Head to the Lunch Room for a catered lunch.',
   'all', '12:00', '13:00', 'lunch', 'published', true, 200),

  -- Afternoon break
  ('b0000001-0000-0000-0000-000000000013', 'Break', null,
   'all', '15:05', '15:35', 'break', 'published', true, 400),

  -- Conference Close
  ('b0000001-0000-0000-0000-000000000014', 'Conference Close',
   'Wrap-up and transition to the afterparty.',
   'all', '16:50', '17:00', 'announcement', 'published', true, 600),

  -- Afterparty
  ('b0000001-0000-0000-0000-000000000015', 'Afterparty', 
   'Celebrate with fellow product people!',
   'all', '17:00', '19:00', 'afterparty', 'published', true, 700);

-- === MORNING KEYNOTE ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000002', 'Conference Kickoff & Opening Keynote',
   null,
   'Auditorium', '09:00', '09:55', 'keynote', 'published', false, 20);

-- === 10:00 BLOCK ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000003', 'The Role of PMs',
   'Supra Podcast live session.',
   'Auditorium', '10:00', '10:35', 'talk', 'published', false, 50),

  ('b0000001-0000-0000-0000-000000000004', 'Blind Spots in Beliefs',
   null,
   'Room 2', '10:00', '10:35', 'talk', 'published', false, 51),

  ('b0000001-0000-0000-0000-000000000005', 'Product Operations Panel',
   null,
   'Room 3', '10:00', '10:35', 'panel', 'published', false, 52),

  ('b0000001-0000-0000-0000-000000000006', 'Evolution of Content Consumption & the Role of AI',
   null,
   'Room 4', '10:00', '10:35', 'talk', 'published', false, 53);

-- === 10:50 BLOCK ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000007', 'AI Tools',
   null,
   'Auditorium', '10:50', '11:20', 'talk', 'published', false, 110),

  ('b0000001-0000-0000-0000-000000000008', 'Joining for the Mission, Not the Title',
   null,
   'Room 2', '10:50', '11:20', 'talk', 'published', false, 111),

  ('b0000001-0000-0000-0000-000000000009', 'Senior PM Panel',
   null,
   'Room 3', '10:50', '11:20', 'panel', 'published', false, 112),

  ('b0000001-0000-0000-0000-000000000020', 'B2B Pricing',
   null,
   'Room 4', '10:50', '11:20', 'talk', 'published', false, 113);

-- === 11:30 BLOCK ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000021', 'IC PMs & Leadership',
   null,
   'Auditorium', '11:30', '12:00', 'talk', 'published', false, 160),

  ('b0000001-0000-0000-0000-000000000022', 'Privacy',
   null,
   'Room 2', '11:30', '12:00', 'talk', 'published', false, 161),

  ('b0000001-0000-0000-0000-000000000023', 'PMM in the Age of AI',
   'Product Marketing Management Panel.',
   'Room 3', '11:30', '12:00', 'panel', 'published', false, 162),

  ('b0000001-0000-0000-0000-000000000024', 'Measuring Feature Value',
   null,
   'Room 4', '11:30', '12:00', 'talk', 'published', false, 163);

-- === AFTERNOON KEYNOTE: APRIL DUNFORD ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000025', 'Keynote: April Dunford',
   null,
   'Auditorium', '13:00', '13:45', 'keynote', 'published', false, 250);

-- === 13:55 BLOCK ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000026', 'The Product Recruiter',
   'Sponsor session.',
   'Auditorium', '13:55', '14:25', 'sponsor', 'published', false, 300),

  ('b0000001-0000-0000-0000-000000000027', 'Unconference Session',
   'Topic selected by attendee vote.',
   'Room 2', '13:55', '14:25', 'unconference', 'published', false, 301),

  ('b0000001-0000-0000-0000-000000000028', 'Unconference Session',
   'Topic selected by attendee vote.',
   'Room 3', '13:55', '14:25', 'unconference', 'published', false, 302),

  ('b0000001-0000-0000-0000-000000000029', 'Unconference Session',
   'Topic selected by attendee vote.',
   'Room 4', '13:55', '14:25', 'unconference', 'published', false, 303),

  ('b0000001-0000-0000-0000-000000000030', 'Unconference Table Rounds',
   'Open-format table discussions.',
   'Lunch Room', '13:55', '14:25', 'unconference', 'published', false, 304);

-- === 14:35 BLOCK ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000031', 'Analytics',
   null,
   'Auditorium', '14:35', '15:05', 'talk', 'published', false, 350),

  ('b0000001-0000-0000-0000-000000000032', 'Unconference Session',
   'Topic selected by attendee vote.',
   'Room 2', '14:35', '15:05', 'unconference', 'published', false, 351),

  ('b0000001-0000-0000-0000-000000000033', 'Unconference Session',
   'Topic selected by attendee vote.',
   'Room 3', '14:35', '15:05', 'unconference', 'published', false, 352),

  ('b0000001-0000-0000-0000-000000000034', 'Unconference Session',
   'Topic selected by attendee vote.',
   'Room 4', '14:35', '15:05', 'unconference', 'published', false, 353),

  ('b0000001-0000-0000-0000-000000000035', 'Unconference Table Rounds',
   'Open-format table discussions.',
   'Lunch Room', '14:35', '15:05', 'unconference', 'published', false, 354);

-- === 15:35 BLOCK ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000036', 'Becoming an AI PM',
   null,
   'Auditorium', '15:35', '16:05', 'talk', 'published', false, 450),

  ('b0000001-0000-0000-0000-000000000037', 'Unconference Session',
   'Topic selected by attendee vote.',
   'Room 2', '15:35', '16:05', 'unconference', 'published', false, 451),

  ('b0000001-0000-0000-0000-000000000038', 'Unconference Session',
   'Topic selected by attendee vote.',
   'Room 3', '15:35', '16:05', 'unconference', 'published', false, 452),

  ('b0000001-0000-0000-0000-000000000039', 'Unconference Session',
   'Topic selected by attendee vote.',
   'Room 4', '15:35', '16:05', 'unconference', 'published', false, 453),

  ('b0000001-0000-0000-0000-000000000040', 'Unconference Table Rounds',
   'Open-format table discussions.',
   'Lunch Room', '15:35', '16:05', 'unconference', 'published', false, 454);

-- === CLOSING KEYNOTE: JOHN CUTLER ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000041', 'Closing Keynote: John Cutler',
   null,
   'Auditorium', '16:15', '16:50', 'keynote', 'published', false, 550);

-- ============================================
-- SESSION <-> SPEAKER ASSIGNMENTS
-- ============================================

-- Opening Keynote: Radhika Dutt
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000001', 'speaker', 1);

-- 10:00 Block
-- Ben Erez & Marc Baselga - Role of PMs
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000002', 'speaker', 1),
  ('b0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000003', 'speaker', 2);

-- Mike Ho - Blind Spots
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000004', 'speaker', 1);

-- Product Ops Panel
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000005', 'moderator', 1),
  ('b0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000006', 'panelist', 2),
  ('b0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000007', 'panelist', 3);

-- Abinandhini
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000008', 'speaker', 1);

-- 10:50 Block
-- Colin Matthews
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000009', 'speaker', 1);

-- Joan Milway
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000010', 'speaker', 1);

-- Sr PM Panel
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000011', 'moderator', 1),
  ('b0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000012', 'panelist', 2),
  ('b0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000013', 'panelist', 3);

-- Scott Miller
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000020', 'a0000001-0000-0000-0000-000000000014', 'speaker', 1);

-- 11:30 Block
-- Andrea Michalek
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000021', 'a0000001-0000-0000-0000-000000000015', 'speaker', 1);

-- Ross Saunders
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000022', 'a0000001-0000-0000-0000-000000000016', 'speaker', 1);

-- PMM Panel
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000023', 'a0000001-0000-0000-0000-000000000017', 'moderator', 1);

-- Jenya Faris
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000024', 'a0000001-0000-0000-0000-000000000022', 'speaker', 1);

-- April Dunford Keynote
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000025', 'a0000001-0000-0000-0000-000000000018', 'speaker', 1);

-- Ben Yoskovitz
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000031', 'a0000001-0000-0000-0000-000000000019', 'speaker', 1);

-- Iris Guo
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000036', 'a0000001-0000-0000-0000-000000000020', 'speaker', 1);

-- John Cutler Closing Keynote
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000041', 'a0000001-0000-0000-0000-000000000021', 'speaker', 1);
