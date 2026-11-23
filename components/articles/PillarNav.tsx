import Link from 'next/link'
import { pillarCounts } from '@/lib/pillars.mjs'

/**
 * Topic navigation built from data/pillars.json, with real article counts.
 * Empty pillars never render. Links point at the topic pages.
 */
export default function PillarNav({ lang, active }: { lang: string; active?: string }) {
  const topics = pillarCounts(lang)
  return (
    <nav aria-label="Topics" className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <Link href={`/${lang}/articles`} className="type-small ui-link" style={{ color: !active ? 'var(--ui-ink)' : 'var(--ui-muted)', fontWeight: !active ? 600 : 500 }}>
        All
      </Link>
      {topics.map((topic) => {
        const current = topic.slug === active
        return (
          <Link
            key={topic.slug}
            href={`/${lang}/articles/category/${topic.slug}`}
            aria-current={current ? 'page' : undefined}
            className="type-small ui-link"
            style={{ color: current ? 'var(--ui-ink)' : 'var(--ui-muted)', fontWeight: current ? 600 : 500, boxShadow: current ? 'inset 0 -2px 0 var(--ui-lime)' : undefined }}
          >
            {topic.nameEn && lang === 'ms' ? topic.nameMs : topic.nameEn}
            <span className="ml-1.5" style={{ color: 'var(--ui-muted)', fontWeight: 400 }}>{topic.count}</span>
          </Link>
        )
      })}
    </nav>
  )
}
