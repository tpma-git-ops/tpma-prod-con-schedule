#!/usr/bin/env node
/**
 * One-off: fetch OG image + headings from TPMA speaker-author pages.
 * Run: node scripts/fetch-tpma-speaker-meta.mjs
 */

const speakers = [
  { id: 'a0000001-0000-0000-0000-000000000001', slug: 'radhika-dutt' },
  { id: 'a0000001-0000-0000-0000-000000000002', slug: 'ben-erez' },
  { id: 'a0000001-0000-0000-0000-000000000003', slug: 'marc-baselga' },
  { id: 'a0000001-0000-0000-0000-000000000004', slug: 'michael-ho' },
  { id: 'a0000001-0000-0000-0000-000000000005', slug: 'may-wong' },
  { id: 'a0000001-0000-0000-0000-000000000006', slug: null }, // Kristine Dizon — no page on conference site
  { id: 'a0000001-0000-0000-0000-000000000007', slug: null },
  { id: 'a0000001-0000-0000-0000-000000000008', slug: 'abinandhini-c-a-raju' },
  { id: 'a0000001-0000-0000-0000-000000000009', slug: 'colin-matthews' },
  { id: 'a0000001-0000-0000-0000-000000000010', slug: 'joan-milway' },
  { id: 'a0000001-0000-0000-0000-000000000011', slug: 'daniel-de-repentigny' },
  { id: 'a0000001-0000-0000-0000-000000000012', slug: null }, // Angeli Mehta — not on conference links
  { id: 'a0000001-0000-0000-0000-000000000013', slug: 'emily-k-reid' },
  { id: 'a0000001-0000-0000-0000-000000000014', slug: 'scott-miller-c6edc' },
  { id: 'a0000001-0000-0000-0000-000000000015', slug: 'andrea-michalek' },
  { id: 'a0000001-0000-0000-0000-000000000016', slug: 'ross-saunders' },
  { id: 'a0000001-0000-0000-0000-000000000017', slug: 'rowan-noronha' },
  { id: 'a0000001-0000-0000-0000-000000000018', slug: 'april-dunford' },
  { id: 'a0000001-0000-0000-0000-000000000019', slug: 'ben-yoskovitz' },
  { id: 'a0000001-0000-0000-0000-000000000020', slug: 'iris-guo' },
  { id: 'a0000001-0000-0000-0000-000000000021', slug: 'john-cutler' },
  { id: 'a0000001-0000-0000-0000-000000000022', slug: 'jenya-farris-e0a3e' },
]

function parseOgImage(html) {
  const m =
    html.match(/property="og:image"\s+content="([^"]+)"/i) ||
    html.match(/content="([^"]+)"\s+property="og:image"/i)
  return m ? m[1].replace(/&amp;/g, '&') : null
}

/** Hero headshot: Webflow uses author-image-circle on the main speaker image. */
function parseHeroPhoto(html) {
  const m = html.match(
    /<img[^>]*\ssrc="([^"]+)"[^>]*author-image-circle/i
  )
  if (m) return m[1].replace(/&amp;/g, '&')
  const m2 = html.match(
    /<img[^>]*author-image-circle[^>]*\ssrc="([^"]+)"/i
  )
  return m2 ? m2[1].replace(/&amp;/g, '&') : null
}

function parseSpeakerPageHeading(html) {
  const h1m = html.match(/<h1[^>]*class="[^"]*speaker-page[^"]*"[^>]*>([^<]+)<\/h1>/i)
  const h3m = html.match(
    /<h3[^>]*class="[^"]*speaker-page-sub-head[^"]*"[^>]*>([^<]+)<\/h3>/i
  )
  const rawName = h1m ? h1m[1].trim() : null
  const pageName = rawName ? rawName.replace(/,\s*$/, '').trim() : null
  const subtitle = h3m ? h3m[1].replace(/&amp;/g, '&').trim() : null
  return { pageName, subtitle }
}

/**
 * Exactly two comma-separated parts → title + company; otherwise one-line title only.
 */
function splitTitleCompany(subtitle) {
  if (!subtitle) return { title: null, company: null }
  const parts = subtitle.split(',').map((s) => s.trim())
  if (parts.length === 1) return { title: parts[0], company: null }
  if (parts.length === 2) return { title: parts[0], company: parts[1] }
  return { title: subtitle, company: null }
}

async function fetchOne(slug) {
  const url = `https://www.tpma.ca/speakers-authors/${slug}`
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  const html = await res.text()
  const photo_url = parseOgImage(html) || parseHeroPhoto(html)
  const { pageName, subtitle } = parseSpeakerPageHeading(html)
  const { title, company } = splitTitleCompany(subtitle)
  const profile_url = url
  return { pageName, title, company, photo_url, profile_url, subtitle }
}

async function main() {
  const rows = []
  for (const s of speakers) {
    if (!s.slug) {
      rows.push({ id: s.id, error: 'no_tpma_slug' })
      continue
    }
    try {
      const data = await fetchOne(s.slug)
      rows.push({ id: s.id, ...data })
      console.error('ok', s.slug)
    } catch (e) {
      rows.push({ id: s.id, error: String(e.message) })
      console.error('fail', s.slug, e.message)
    }
    await new Promise((r) => setTimeout(r, 150))
  }
  console.log(JSON.stringify(rows, null, 2))
}

main()
