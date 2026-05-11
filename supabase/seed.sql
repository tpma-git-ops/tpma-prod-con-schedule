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
  ('a0000001-0000-0000-0000-000000000022', 'Jenya Farris', 'Chief Product Officer', 'Routific', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea3281ec9018980acc6f3_Jenya%20Farris.jpg', 'https://www.tpma.ca/speakers-authors/jenya-farris-e0a3e'),
  ('a0000001-0000-0000-0000-000000000023', 'Andrew Shaw', 'Head of Executive & Product Search', 'The Product Recruiter', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea3588f28796fc566c88e_Andrew%20Shaw.jpg', 'https://www.tpma.ca/speakers-authors/andrew-shaw'),
  ('a0000001-0000-0000-0000-000000000024', 'Amber Foucault', 'Senior Vice President of Product Management', 'Dayforce', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea2e4d64d43ecf71f9310_Amber%20Foucault.jpg', 'https://www.tpma.ca/speakers-authors/amber-foucault'),
  ('a0000001-0000-0000-0000-000000000025', 'John Stetic', 'CPO', 'Ziflow', 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea2f4d3a487e039cddeb2_John%20Stetic.jpg', 'https://www.tpma.ca/speakers-authors/john-stetic');

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

  -- Afternoon breaks
  ('b0000001-0000-0000-0000-000000000042', 'Break', null,
   'all', '13:45', '14:00', 'break', 'published', true, 275),

  ('b0000001-0000-0000-0000-000000000043', 'Break', null,
   'all', '14:30', '14:45', 'break', 'published', true, 325),

  ('b0000001-0000-0000-0000-000000000013', 'Break', null,
   'all', '15:15', '15:30', 'break', 'published', true, 400),

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
  ('b0000001-0000-0000-0000-000000000002', 'Radically Rethinking Metrics: How to harness the power of puzzle-setting and solving to level up your organization',
   'Through real-world examples, you''ll see how shifting to a mindset of puzzle-setting and puzzle-solving drives far better business outcomes. You''ll learn about a powerful framework to help you put this into practice so you can encourage experimentation, measure what matters, and make meaningful progress.',
   'Yonge Room', '09:00', '09:55', 'keynote', 'published', false, 20);

-- === 10:00 BLOCK ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000003', 'How the PM role is evolving and what people can do to future-proof their product career',
   null,
   'Yonge Room', '10:00', '10:35', 'talk', 'published', false, 50),

  ('b0000001-0000-0000-0000-000000000004', 'Burnout is real',
   'Michael will share his 20 year struggle with burnout, what finally helped him and how that framework is the basis for building great products',
   'Bay Room', '10:00', '10:35', 'talk', 'published', false, 51),

  ('b0000001-0000-0000-0000-000000000005', 'Product Operations in 2026: The PDLC is broken.',
   'With the shifts in AI and delivery speed, the traditional way product work flows across a company no longer works the way it used to. The expectations are different, but the larger organization takes so much more time to move. What does good product operations look like? How do we shape stronger product teams in these times of rapid change?',
   'Richmond Room', '10:00', '10:35', 'panel', 'published', false, 52),

  ('b0000001-0000-0000-0000-000000000020', 'Your Pricing is a Product Decision. Start Treating It Like One',
   'Product teams often obsess over roadmap prioritization and feature trade-offs, but how much work effort goes into the proper designing of pricing & offer structures? For most product teams, pricing can be an afterthought, gut-feel, an over-reliance on competitor practices, or avoided entirely. Yet pricing is one of the highest-leverage growth decisions a product organization can make — getting it wrong at any stage can be costly for growth and profitability. This session makes the case that pricing & offer design should be a core product competency. We''ll explore why pricing strategy matters more than most PMs realize, how the right approach evolves as your company moves from startup to scale, and what best practices separate high-growth SaaS & digital technology companies from the rest. We''ll also close with the question every product team is now grappling with: how does AI fundamentally change the rules of pricing? Attendees will leave with a framework around pricing excellence as well as concrete tools to start treating pricing like the product decision it actually is.',
   'Adelaide Room', '10:00', '10:35', 'talk', 'published', false, 53);

-- === 10:50 BLOCK ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000026', 'The Product Recruiter',
   'Sponsor session.',
   'Yonge Room', '10:50', '11:20', 'sponsor', 'published', false, 110),

  ('b0000001-0000-0000-0000-000000000008', 'Purpose Built: Accelerating Your Product Career at a Mission-Driven Startup',
   'Growth hacks don''t solve hard problems. In this session, you''ll learn how building something that genuinely matters — whether in finance, healthcare, education, or beyond — demands the kind of product clarity and discipline that accelerates your career faster than optimizing a conversion funnel ever will.',
   'Bay Room', '10:50', '11:20', 'talk', 'published', false, 111),

  ('b0000001-0000-0000-0000-000000000009', 'The Fork in the Road: Senior IC or Manager',
   'Staring down the PM career fork between Senior IC and management? Join three experienced PMs to dismantle the myth that management is the default "next step." We''ll explore transition realities, the "player-coach" trap, and the true trade-offs of leadership. Leave with actionable litmus tests to clarify your career path.',
   'Richmond Room', '10:50', '11:20', 'panel', 'published', false, 112),

  ('b0000001-0000-0000-0000-000000000036', 'Becoming an AI PM',
   'Iris will share stories from her career journey of transitioning from a non-technical background to an AI PM. She will give you practical tips on how you can become an AI PM and how to leverage LinkedIn for personal branding.',
   'Adelaide Room', '10:50', '11:20', 'talk', 'published', false, 113);

-- === 11:30 BLOCK ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000021', 'From Feature Factory to Breakthrough Leadership',
   'Most product teams are optimizing for the wrong things. Capable leaders get trapped focusing on delivery when they should be focused on direction, shipping features instead of creating market impact. This session explores the three leadership traps that keep product teams stuck in incremental mode and the specific shifts that separate feature shippers from market makers. Attendees will leave with a practical framework for building teams that move with strategic clarity, make bold bets without waiting for perfect data, and create competitive advantage rather than just completed sprints.',
   'Yonge Room', '11:30', '12:00', 'talk', 'published', false, 160),

  ('b0000001-0000-0000-0000-000000000006', 'Beyond the Play Button: Architecting Content Strategy for the AI Era',
   'Streaming has entered an era of "synthetic abundance," where the strategic challenge is no longer just hosting great titles, but architecting the governance frameworks that make them discoverable. As AI moves from a back-end tool to a front-end differentiator, content strategy must evolve from static library management to the orchestration of "liquid" experiences. This session explores how AI-driven conversational search, personalized previews, and the automated verticalization of assets are fundamentally redefining the streaming journey and platform loyalty. Drawing from a practical product and platform perspective, we will examine the critical shift toward "entity-based" discovery and the strategy required to scale short-form, vertical content from long-form libraries. Attendees will learn how to balance high-speed AI output with human-centric trust, ensuring that innovation leads to genuine retention rather than "content bloat".',
   'Bay Room', '11:30', '12:00', 'talk', 'published', false, 161),

  ('b0000001-0000-0000-0000-000000000023', 'How PMs Ship Faster and Launch Smarter with PMM',
   'AI has shortened the path from idea to release, but many PM and PMM teams still rely on slow planning cycles, too many documents, and late handoffs. In this session, PM and PMM leaders will share how they stay aligned on product and go-to-market readiness without adding unnecessary process. You''ll leave with a practical playbook for moving faster: fewer docs, clearer handoffs, and better launch decisions.',
   'Richmond Room', '11:30', '12:00', 'panel', 'published', false, 162),

  ('b0000001-0000-0000-0000-000000000024', 'From Gut Feel to Evidence: Building a Product Measurement Practice at a Startup',
   'How a small startup team moved from building on gut feel to measuring the impact of every feature shipped, without a dedicated analytics team. A practical walkthrough for product people growing that practice in their own organizations.',
   'Adelaide Room', '11:30', '12:00', 'talk', 'published', false, 163);

-- === AFTERNOON KEYNOTE: APRIL DUNFORD ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000025', 'Advanced Positioning',
   'How to avoid the not-so-obvious roadblocks',
   'Yonge Room', '13:05', '13:35', 'keynote', 'published', false, 250);

-- === 14:00 BLOCK ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000007', 'Become an AI-Native Builder',
   'PMs are being asked to become builders. As AI enables engineers, designers, and PMs to do more, high-velocity IC work is becoming more valuable than coordinating large teams. Colin Matthews will provide an overview of what''s working for leading teams using AI tooling and how to bring your team along with you. He''ll cover running discovery against your own product data, prototyping with real components, shipping small features through coding agents, and automating the recurring work around it. Colin will also provide clear guidance on what''s achievable today and where we''ll be headed in the next 16–24 months.',
   'Yonge Room', '14:00', '14:30', 'talk', 'published', false, 300),

  ('b0000001-0000-0000-0000-000000000027', 'Unconference Session',
   'The unconference is where the agenda is set by the people in the room. Attendees pitch session topics before the conference (forms are shared with every attendee ticket).

At the conference, attendees will vote on what they want to dig into, and the highest-voted ideas become real sessions later in the day. Expect peer-led discussions on the challenges, questions, and ideas that product people are actually wrestling with right now. [Learn more here](https://www.tpma.ca/post/the-unconference-everything-you-need-to-know).',
   'Bay Room', '14:00', '14:30', 'unconference', 'published', false, 301),

  ('b0000001-0000-0000-0000-000000000028', 'Unconference Session',
   'The unconference is where the agenda is set by the people in the room. Attendees pitch session topics before the conference (forms are shared with every attendee ticket).

At the conference, attendees will vote on what they want to dig into, and the highest-voted ideas become real sessions later in the day. Expect peer-led discussions on the challenges, questions, and ideas that product people are actually wrestling with right now. [Learn more here](https://www.tpma.ca/post/the-unconference-everything-you-need-to-know).',
   'Richmond Room', '14:00', '14:30', 'unconference', 'published', false, 302),

  ('b0000001-0000-0000-0000-000000000029', 'Unconference Session',
   'The unconference is where the agenda is set by the people in the room. Attendees pitch session topics before the conference (forms are shared with every attendee ticket).

At the conference, attendees will vote on what they want to dig into, and the highest-voted ideas become real sessions later in the day. Expect peer-led discussions on the challenges, questions, and ideas that product people are actually wrestling with right now. [Learn more here](https://www.tpma.ca/post/the-unconference-everything-you-need-to-know).',
   'Adelaide Room', '14:00', '14:30', 'unconference', 'published', false, 303),

  ('b0000001-0000-0000-0000-000000000030', 'Unconference Table Rounds',
   'Open-format table discussions.',
   'Lunch Room', '14:00', '14:30', 'unconference', 'published', false, 304);

-- === 14:45 BLOCK ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000031', 'Lean Analytics in the Age of AI',
   'Lean Analytics created frameworks for how to measure progress and success from idea to scale. Those concepts hold true today, but much has changed. AI is changing how we build and what we build. Many of the metrics we used to care about now need to change, and new metrics become more important. In this talk, Ben will cover core Lean Analytics principles and why they still hold true, and then deep dive on product and business metrics that are changing because of AI.',
   'Yonge Room', '14:45', '15:15', 'talk', 'published', false, 350),

  ('b0000001-0000-0000-0000-000000000032', 'Unconference Session',
   'The unconference is where the agenda is set by the people in the room. Attendees pitch session topics before the conference (forms are shared with every attendee ticket).

At the conference, attendees will vote on what they want to dig into, and the highest-voted ideas become real sessions later in the day. Expect peer-led discussions on the challenges, questions, and ideas that product people are actually wrestling with right now. [Learn more here](https://www.tpma.ca/post/the-unconference-everything-you-need-to-know).',
   'Bay Room', '14:45', '15:15', 'unconference', 'published', false, 351),

  ('b0000001-0000-0000-0000-000000000033', 'Unconference Session',
   'The unconference is where the agenda is set by the people in the room. Attendees pitch session topics before the conference (forms are shared with every attendee ticket).

At the conference, attendees will vote on what they want to dig into, and the highest-voted ideas become real sessions later in the day. Expect peer-led discussions on the challenges, questions, and ideas that product people are actually wrestling with right now. [Learn more here](https://www.tpma.ca/post/the-unconference-everything-you-need-to-know).',
   'Richmond Room', '14:45', '15:15', 'unconference', 'published', false, 352),

  ('b0000001-0000-0000-0000-000000000034', 'Unconference Session',
   'The unconference is where the agenda is set by the people in the room. Attendees pitch session topics before the conference (forms are shared with every attendee ticket).

At the conference, attendees will vote on what they want to dig into, and the highest-voted ideas become real sessions later in the day. Expect peer-led discussions on the challenges, questions, and ideas that product people are actually wrestling with right now. [Learn more here](https://www.tpma.ca/post/the-unconference-everything-you-need-to-know).',
   'Adelaide Room', '14:45', '15:15', 'unconference', 'published', false, 353),

  ('b0000001-0000-0000-0000-000000000035', 'Unconference Table Rounds',
   'Open-format table discussions.',
   'Lunch Room', '14:45', '15:15', 'unconference', 'published', false, 354);

-- === 15:30 BLOCK ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000022', 'Don''t LEAN on Legal: Why Privacy is a Product Discipline',
   'Many teams expect that privacy is taken care of by the company''s security program or addressed by the legal and compliance teams. Fact is, privacy is often lagging behind security when it comes to product development, and there are still obligations that need to make their way into the lifecycle. In each function of Research, Design, Development, Testing, Launch and Operations, there are privacy considerations that need to be addressed. The earlier you can get these considerations locked in, the more time it saves you later when there''s an incident, design challenge, a user exercising their rights, or simply scaling up. Attendees will leave with: concrete techniques to surface hidden privacy requirements before they bite you; strategies to shift privacy left without adding weeks to your sprints; practical features that can save loads of time when you scale; real-world scenarios and war stories about how privacy directly affects product teams.',
   'Yonge Room', '15:30', '16:00', 'talk', 'published', false, 450),

  ('b0000001-0000-0000-0000-000000000037', 'Unconference Session',
   'The unconference is where the agenda is set by the people in the room. Attendees pitch session topics before the conference (forms are shared with every attendee ticket).

At the conference, attendees will vote on what they want to dig into, and the highest-voted ideas become real sessions later in the day. Expect peer-led discussions on the challenges, questions, and ideas that product people are actually wrestling with right now. [Learn more here](https://www.tpma.ca/post/the-unconference-everything-you-need-to-know).',
   'Bay Room', '15:30', '16:00', 'unconference', 'published', false, 451),

  ('b0000001-0000-0000-0000-000000000038', 'Unconference Session',
   'The unconference is where the agenda is set by the people in the room. Attendees pitch session topics before the conference (forms are shared with every attendee ticket).

At the conference, attendees will vote on what they want to dig into, and the highest-voted ideas become real sessions later in the day. Expect peer-led discussions on the challenges, questions, and ideas that product people are actually wrestling with right now. [Learn more here](https://www.tpma.ca/post/the-unconference-everything-you-need-to-know).',
   'Richmond Room', '15:30', '16:00', 'unconference', 'published', false, 452),

  ('b0000001-0000-0000-0000-000000000039', 'Unconference Session',
   'The unconference is where the agenda is set by the people in the room. Attendees pitch session topics before the conference (forms are shared with every attendee ticket).

At the conference, attendees will vote on what they want to dig into, and the highest-voted ideas become real sessions later in the day. Expect peer-led discussions on the challenges, questions, and ideas that product people are actually wrestling with right now. [Learn more here](https://www.tpma.ca/post/the-unconference-everything-you-need-to-know).',
   'Adelaide Room', '15:30', '16:00', 'unconference', 'published', false, 453),

  ('b0000001-0000-0000-0000-000000000040', 'Unconference Table Rounds',
   'Open-format table discussions.',
   'Lunch Room', '15:30', '16:00', 'unconference', 'published', false, 454);

-- === CLOSING KEYNOTE: JOHN CUTLER ===

insert into public.sessions (id, title, description, room, start_time, end_time, session_type, status, is_full_width, sort_order) values
  ('b0000001-0000-0000-0000-000000000041', 'Single-Player vs. Multiplayer Product: Context Through Collaboration',
   'Context isn''t fixed. It is something we create through interactions. It is tempting to believe that if we assemble and surface enough information, clarity and control will follow — that context can be packaged, shared, and merged. But context is not something we simply bring into the room and pool together, or store in a repo of static markdown files. It emerges through the interactions themselves. This talk is for product managers grappling with how AI is changing collaboration, expertise, and leadership — people who want to preserve the multiplayer essence of product management but feel the push toward single-player work. We can sense the potential, but also sense that something is increasingly missing as AI seeps into every workflow. The goal is to share a set of practical models to help you design better interactions and shape the contexts your teams operate within — helping your team thrive on behalf of your customers, your company, and the broader product community.',
   'Yonge Room', '16:20', '16:50', 'keynote', 'published', false, 550);

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

-- The Product Recruiter (sponsor session)
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000026', 'a0000001-0000-0000-0000-000000000023', 'moderator', 1),
  ('b0000001-0000-0000-0000-000000000026', 'a0000001-0000-0000-0000-000000000024', 'speaker', 2),
  ('b0000001-0000-0000-0000-000000000026', 'a0000001-0000-0000-0000-000000000025', 'speaker', 3);

-- Ben Yoskovitz
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000031', 'a0000001-0000-0000-0000-000000000019', 'speaker', 1);

-- Iris Guo
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000036', 'a0000001-0000-0000-0000-000000000020', 'speaker', 1);

-- John Cutler Closing Keynote
insert into public.session_speakers (session_id, speaker_id, role, display_order) values
  ('b0000001-0000-0000-0000-000000000041', 'a0000001-0000-0000-0000-000000000021', 'speaker', 1);
