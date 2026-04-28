/** Treat `speakers.linkedin_url` as LinkedIn only when the host is linkedin.com */
export function isLinkedInProfileUrl(url: string | null | undefined): boolean {
  if (!url) return false
  try {
    const host = new URL(url).hostname
    return host === 'linkedin.com' || host.endsWith('.linkedin.com')
  } catch {
    return false
  }
}
