-- TPC2026: Update session titles and descriptions
-- Source: Speaker Details Collection Form (Responses) – Talk details.csv  (2026-05-08)
-- Run once in the Supabase SQL Editor against the live database.
--
-- NOTE: Scott Miller's CSV submission opened with the Ben Yoskovitz "Lean Analytics"
-- paragraph (apparent accidental paste). That preamble has been removed here.

-- -----------------------------------------------------------------------
-- OPENING KEYNOTE — Radhika Dutt
-- -----------------------------------------------------------------------
UPDATE public.sessions
SET
  title       = 'Radically Rethinking Metrics: How to harness the power of puzzle-setting and solving to level up your organization',
  description = 'Through real-world examples, you''ll see how shifting to a mindset of puzzle-setting and puzzle-solving drives far better business outcomes. You''ll learn about a powerful framework to help you put this into practice so you can encourage experimentation, measure what matters, and make meaningful progress.',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000002';

-- -----------------------------------------------------------------------
-- 10:00 BLOCK
-- -----------------------------------------------------------------------

-- Ben Erez & Marc Baselga — The Role of PMs (no description submitted)
UPDATE public.sessions
SET
  title      = 'How the PM role is evolving and what people can do to future-proof their product career',
  updated_at = now()
WHERE id = 'b0000001-0000-0000-0000-000000000003';

-- Mike Ho — Burnout is real
UPDATE public.sessions
SET
  title       = 'Burnout is real',
  description = 'Michael will share his 20 year struggle with burnout, what finally helped him and how that framework is the basis for building great products',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000004';

-- Product Operations Panel (May Wong, moderator)
UPDATE public.sessions
SET
  title       = 'Product Operations in 2026: The PDLC is broken.',
  description = 'With the shifts in AI and delivery speed, the traditional way product work flows across a company no longer works the way it used to. The expectations are different, but the larger organization takes so much more time to move. What does good product operations look like? How do we shape stronger product teams in these times of rapid change?',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000005';

-- Abinandhini Chandranat — Content Strategy & AI
UPDATE public.sessions
SET
  title       = 'Beyond the Play Button: Architecting Content Strategy for the AI Era',
  description = 'Streaming has entered an era of "synthetic abundance," where the strategic challenge is no longer just hosting great titles, but architecting the governance frameworks that make them discoverable. As AI moves from a back-end tool to a front-end differentiator, content strategy must evolve from static library management to the orchestration of "liquid" experiences. This session explores how AI-driven conversational search, personalized previews, and the automated verticalization of assets are fundamentally redefining the streaming journey and platform loyalty. Drawing from a practical product and platform perspective, we will examine the critical shift toward "entity-based" discovery and the strategy required to scale short-form, vertical content from long-form libraries. Attendees will learn how to balance high-speed AI output with human-centric trust, ensuring that innovation leads to genuine retention rather than "content bloat".',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000006';

-- -----------------------------------------------------------------------
-- 10:50 BLOCK
-- -----------------------------------------------------------------------

-- Colin Matthews — AI-native builder
UPDATE public.sessions
SET
  title       = 'Become an AI-Native Builder',
  description = 'PMs are being asked to become builders. As AI enables engineers, designers, and PMs to do more, high-velocity IC work is becoming more valuable than coordinating large teams. Colin Matthews will provide an overview of what''s working for leading teams using AI tooling and how to bring your team along with you. He''ll cover running discovery against your own product data, prototyping with real components, shipping small features through coding agents, and automating the recurring work around it. Colin will also provide clear guidance on what''s achievable today and where we''ll be headed in the next 16–24 months.',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000007';

-- Joan Milway — Mission-driven startup career
UPDATE public.sessions
SET
  title       = 'Purpose Built: Accelerating Your Product Career at a Mission-Driven Startup',
  description = 'Growth hacks don''t solve hard problems. In this session, you''ll learn how building something that genuinely matters — whether in finance, healthcare, education, or beyond — demands the kind of product clarity and discipline that accelerates your career faster than optimizing a conversion funnel ever will.',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000008';

-- Senior PM Panel (Daniel de Repentigny, moderator)
UPDATE public.sessions
SET
  title       = 'The Fork in the Road: Senior IC or Manager',
  description = 'Staring down the PM career fork between Senior IC and management? Join three experienced PMs to dismantle the myth that management is the default "next step." We''ll explore transition realities, the "player-coach" trap, and the true trade-offs of leadership. Leave with actionable litmus tests to clarify your career path.',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000009';

-- Scott Miller — Pricing as a product decision
-- (Opening "Lean Analytics" paragraph removed — appears to be an accidental paste)
UPDATE public.sessions
SET
  title       = 'Your Pricing is a Product Decision. Start Treating It Like One',
  description = 'Product teams often obsess over roadmap prioritization and feature trade-offs, but how much work effort goes into the proper designing of pricing & offer structures? For most product teams, pricing can be an afterthought, gut-feel, an over-reliance on competitor practices, or avoided entirely. Yet pricing is one of the highest-leverage growth decisions a product organization can make — getting it wrong at any stage can be costly for growth and profitability. This session makes the case that pricing & offer design should be a core product competency. We''ll explore why pricing strategy matters more than most PMs realize, how the right approach evolves as your company moves from startup to scale, and what best practices separate high-growth SaaS & digital technology companies from the rest. We''ll also close with the question every product team is now grappling with: how does AI fundamentally change the rules of pricing? Attendees will leave with a framework around pricing excellence as well as concrete tools to start treating pricing like the product decision it actually is.',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000020';

-- -----------------------------------------------------------------------
-- 11:30 BLOCK
-- -----------------------------------------------------------------------

-- Andrea Michalek — Feature Factory to Breakthrough Leadership
UPDATE public.sessions
SET
  title       = 'From Feature Factory to Breakthrough Leadership',
  description = 'Most product teams are optimizing for the wrong things. Capable leaders get trapped focusing on delivery when they should be focused on direction, shipping features instead of creating market impact. This session explores the three leadership traps that keep product teams stuck in incremental mode and the specific shifts that separate feature shippers from market makers. Attendees will leave with a practical framework for building teams that move with strategic clarity, make bold bets without waiting for perfect data, and create competitive advantage rather than just completed sprints.',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000021';

-- Ross Saunders — Privacy as a product discipline
UPDATE public.sessions
SET
  title       = 'Don''t LEAN on Legal: Why Privacy is a Product Discipline',
  description = 'Many teams expect that privacy is taken care of by the company''s security program or addressed by the legal and compliance teams. Fact is, privacy is often lagging behind security when it comes to product development, and there are still obligations that need to make their way into the lifecycle. In each function of Research, Design, Development, Testing, Launch and Operations, there are privacy considerations that need to be addressed. The earlier you can get these considerations locked in, the more time it saves you later when there''s an incident, design challenge, a user exercising their rights, or simply scaling up. Attendees will leave with: concrete techniques to surface hidden privacy requirements before they bite you; strategies to shift privacy left without adding weeks to your sprints; practical features that can save loads of time when you scale; real-world scenarios and war stories about how privacy directly affects product teams.',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000022';

-- PMM Panel (Rowan Noronha, moderator)
UPDATE public.sessions
SET
  title       = 'How PMs Ship Faster and Launch Smarter with PMM',
  description = 'AI has shortened the path from idea to release, but many PM and PMM teams still rely on slow planning cycles, too many documents, and late handoffs. In this session, PM and PMM leaders will share how they stay aligned on product and go-to-market readiness without adding unnecessary process. You''ll leave with a practical playbook for moving faster: fewer docs, clearer handoffs, and better launch decisions.',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000023';

-- Jenya Faris — Product measurement practice
UPDATE public.sessions
SET
  title       = 'From Gut Feel to Evidence: Building a Product Measurement Practice at a Startup',
  description = 'How a small startup team moved from building on gut feel to measuring the impact of every feature shipped, without a dedicated analytics team. A practical walkthrough for product people growing that practice in their own organizations.',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000024';

-- -----------------------------------------------------------------------
-- AFTERNOON KEYNOTE — April Dunford
-- -----------------------------------------------------------------------
UPDATE public.sessions
SET
  title       = 'Advanced Positioning',
  description = 'How to avoid the not-so-obvious roadblocks',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000025';

-- -----------------------------------------------------------------------
-- 14:35 BLOCK
-- -----------------------------------------------------------------------

-- Ben Yoskovitz — Lean Analytics in the Age of AI
UPDATE public.sessions
SET
  title       = 'Lean Analytics in the Age of AI',
  description = 'Lean Analytics created frameworks for how to measure progress and success from idea to scale. Those concepts hold true today, but much has changed. AI is changing how we build and what we build. Many of the metrics we used to care about now need to change, and new metrics become more important. In this talk, Ben will cover core Lean Analytics principles and why they still hold true, and then deep dive on product and business metrics that are changing because of AI.',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000031';

-- -----------------------------------------------------------------------
-- 15:35 BLOCK
-- -----------------------------------------------------------------------

-- Iris Guo — Becoming an AI PM
UPDATE public.sessions
SET
  title       = 'Becoming an AI PM',
  description = 'Iris will share stories from her career journey of transitioning from a non-technical background to an AI PM. She will give you practical tips on how you can become an AI PM and how to leverage LinkedIn for personal branding.',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000036';

-- -----------------------------------------------------------------------
-- CLOSING KEYNOTE — John Cutler
-- -----------------------------------------------------------------------
UPDATE public.sessions
SET
  title       = 'Single-Player vs. Multiplayer Product: Context Through Collaboration',
  description = 'Context isn''t fixed. It is something we create through interactions. It is tempting to believe that if we assemble and surface enough information, clarity and control will follow — that context can be packaged, shared, and merged. But context is not something we simply bring into the room and pool together, or store in a repo of static markdown files. It emerges through the interactions themselves. This talk is for product managers grappling with how AI is changing collaboration, expertise, and leadership — people who want to preserve the multiplayer essence of product management but feel the push toward single-player work. We can sense the potential, but also sense that something is increasingly missing as AI seeps into every workflow. The goal is to share a set of practical models to help you design better interactions and shape the contexts your teams operate within — helping your team thrive on behalf of your customers, your company, and the broader product community.',
  updated_at  = now()
WHERE id = 'b0000001-0000-0000-0000-000000000041';

-- -----------------------------------------------------------------------
-- Afternoon unconference — breakout rooms (same copy on each slot)
-- -----------------------------------------------------------------------
UPDATE public.sessions
SET
  description = E'The unconference is where the agenda is set by the people in the room. Attendees pitch session topics before the conference (forms are shared with every attendee ticket).\n\nAt the conference, attendees will vote on what they want to dig into, and the highest-voted ideas become real sessions later in the day. Expect peer-led discussions on the challenges, questions, and ideas that product people are actually wrestling with right now. [Learn more here](https://www.tpma.ca/post/the-unconference-everything-you-need-to-know).',
  updated_at  = now()
WHERE title = 'Unconference Session'
  AND session_type = 'unconference';
