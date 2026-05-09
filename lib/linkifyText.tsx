import type { ReactNode } from 'react'

const MD_LINK_RE = /\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g
const URL_RE = /https?:\/\/[^\s<>"')]+/gi

const linkClassName = 'text-tpma-blue underline underline-offset-2'

function linkifyPlainUrls(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  URL_RE.lastIndex = 0
  while ((match = URL_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      out.push(text.slice(lastIndex, match.index))
    }
    const url = match[0]
    out.push(
      <a
        key={`${keyPrefix}-${key++}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {url}
      </a>
    )
    lastIndex = match.index + url.length
  }
  if (lastIndex < text.length) {
    out.push(text.slice(lastIndex))
  }
  return out
}

/** Plain text with optional [label](url) links and bare http(s) URLs rendered as external links. */
export function linkifyText(text: string): ReactNode {
  const segments: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let mdKey = 0
  MD_LINK_RE.lastIndex = 0
  while ((match = MD_LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push(...linkifyPlainUrls(text.slice(lastIndex, match.index), `p-${mdKey}`))
    }
    segments.push(
      <a
        key={`md-${mdKey++}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {match[1]}
      </a>
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    segments.push(...linkifyPlainUrls(text.slice(lastIndex), `s-${mdKey}`))
  }
  return segments.length > 0 ? segments : text
}
