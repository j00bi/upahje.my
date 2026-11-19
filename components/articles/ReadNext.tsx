import Link from 'next/link'
import { SITE } from '@/lib/seo'
import type { ReadNextItem } from '@/lib/article-view'

const internal = (href: string) =>
  href.startsWith(SITE) ? href.slice(SITE.length) || '/' : href.startsWith('/') ? href : null

/**
 * The writer's read-next block as its own end-of-article unit: a small muted
 * label and up to two links, one per line, never a sentence and never a
 * category name injected by the template.
 */
export default function ReadNext({ label, items }: { label: string; items: ReadNextItem[] }) {
  if (!items.length) return null
  return (
    <aside aria-label={label} className="max-w-[68ch]" style={{ marginTop: 'var(--space-section)' }}>
      <p className="text-[13px]" style={{ color: 'var(--ui-muted)' }}>
        {label}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => {
          const path = internal(item.href)
          return (
            <li key={item.href}>
              {path ? (
                <Link href={path} className="ui-link text-[17px] underline decoration-1 underline-offset-2">
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-link text-[17px] underline decoration-1 underline-offset-2"
                >
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
