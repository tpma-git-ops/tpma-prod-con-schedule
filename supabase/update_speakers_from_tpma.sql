-- Apply speaker sync from tpma.ca (April 2026). Run in Supabase SQL after seed or to refresh production.
-- Matches supabase/seed.sql speaker rows by id.

update public.speakers set
  name = 'Radhika Dutt',
  title = 'Author of Radical Product Thinking',
  company = null,
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69deefbba198fd249063ee50_Preferred%20headshot%20-%20Radhika%20Dutt-optimised.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/radhika-dutt'
where id = 'a0000001-0000-0000-0000-000000000001';

update public.speakers set
  name = 'Ben Erez',
  title = 'Co-founder, Insider Loops, Host of Supra Insider Podcast',
  company = null,
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69b959efc7517a410678b0b9_d6db6f11-e031-4897-b798-055744748fc2_1311x1311.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/ben-erez'
where id = 'a0000001-0000-0000-0000-000000000002';

update public.speakers set
  name = 'Marc Baselga',
  title = 'Founder',
  company = 'Supra',
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69b9593225f1eb8576677dcb_9efda187-8d8c-42f2-a27c-f331a32554b1_797x690.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/marc-baselga'
where id = 'a0000001-0000-0000-0000-000000000003';

update public.speakers set
  name = 'Michael Ho',
  title = 'Founder',
  company = 'Progress Everyday',
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69df840ef9204540c27ce8b5_Michael%20Ho.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/michael-ho'
where id = 'a0000001-0000-0000-0000-000000000004';

update public.speakers set
  name = 'May Wong',
  title = 'Product TO',
  company = 'Product Ops Consultant',
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/65bba83151324a486b64e262_May%20Wong%20(1).jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/may-wong'
where id = 'a0000001-0000-0000-0000-000000000005';

update public.speakers set
  name = 'Abinandhini Raju',
  title = 'Director, Product Management, Quickplay',
  company = null,
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea330a00c7a4eac573f28_Abinandhini%20Raju.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/abinandhini-c-a-raju'
where id = 'a0000001-0000-0000-0000-000000000008';

update public.speakers set
  name = 'Colin Matthews',
  title = 'Founder',
  company = 'Tech for Product',
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea3741d1b9007b249c622_Colin%20Matthews.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/colin-matthews'
where id = 'a0000001-0000-0000-0000-000000000009';

update public.speakers set
  name = 'Joan Milway',
  title = 'Head of Product',
  company = 'Common Wealth Retirement',
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea341484ef61f3a14e637_Joan%20Milway.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/joan-milway'
where id = 'a0000001-0000-0000-0000-000000000010';

update public.speakers set
  name = 'Daniel de Repentigny',
  title = 'Principal Product Manager - Spotify',
  company = null,
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dfa34c3d7308fe2281cb7a_Daniel%20de%20Re.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/daniel-de-repentigny'
where id = 'a0000001-0000-0000-0000-000000000011';

update public.speakers set
  name = 'Emily K Reid',
  title = 'Senior Product Manager, Clubs, Ticketmaster/ TicketWeb',
  company = null,
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dfa1a627fd89a1aaa86257_1776260305688.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/emily-k-reid'
where id = 'a0000001-0000-0000-0000-000000000013';

update public.speakers set
  name = 'Scott Miller, CPA, CMA',
  title = 'CEO',
  company = 'Miller Advisors Inc',
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea318454b337960084222_Scott%20Miller.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/scott-miller-c6edc'
where id = 'a0000001-0000-0000-0000-000000000014';

update public.speakers set
  name = 'Andrea Michalek',
  title = 'Product Leadership Coach and Author',
  company = null,
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69df8339340a927191e25d0f_Andrea%20Michalek.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/andrea-michalek'
where id = 'a0000001-0000-0000-0000-000000000015';

update public.speakers set
  name = 'Ross Saunders',
  title = 'Nerd with Trust Issues',
  company = 'Ross G Saunders Consulting',
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69df869017841cc1cef862e8_1741388159837.jpeg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/ross-saunders'
where id = 'a0000001-0000-0000-0000-000000000016';

update public.speakers set
  name = 'Rowan Noronha',
  title = 'Product Marketing Leader',
  company = null,
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea2fef28a5c3a80db9a3f_Rowan%20Noronha.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/rowan-noronha'
where id = 'a0000001-0000-0000-0000-000000000017';

update public.speakers set
  name = 'April Dunford',
  title = 'CEO',
  company = 'Ambient Strategy',
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea3698396b51137aadec7_April%20Dunford.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/april-dunford'
where id = 'a0000001-0000-0000-0000-000000000018';

update public.speakers set
  name = 'Ben Yoskovitz',
  title = 'Founding Partner',
  company = 'Highline Beta',
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea37f034dc92b9731fd61_Ben%20Yoskovitz.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/ben-yoskovitz'
where id = 'a0000001-0000-0000-0000-000000000019';

update public.speakers set
  name = 'Iris Guo',
  title = 'AI Product Manager & Career Coach',
  company = 'Zynga',
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea360454b33796008493d_Iris%20Guo.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/iris-guo'
where id = 'a0000001-0000-0000-0000-000000000020';

update public.speakers set
  name = 'John Cutler',
  title = 'Head of Product',
  company = 'Dotwork',
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69df7d9a42c22239b7055027_1516254666144.jpeg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/john-cutler'
where id = 'a0000001-0000-0000-0000-000000000021';

update public.speakers set
  name = 'Jenya Farris',
  title = 'Chief Product Officer',
  company = 'Routific',
  photo_url = 'https://cdn.prod.website-files.com/640a6c2e1897820dfd10615d/69dea3281ec9018980acc6f3_Jenya%20Farris.jpg',
  linkedin_url = 'https://www.tpma.ca/speakers-authors/jenya-farris-e0a3e'
where id = 'a0000001-0000-0000-0000-000000000022';
