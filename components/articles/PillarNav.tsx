import Link from 'next/link'
import { topicCounts } from '@/lib/topics.mjs'

/**
 * Topic navigation built from data/topics.json, with real article counts.
 * Empty topics never render. Links point at the topic pages.
 */
export default function PillarNav({ lang, active }: { lang: string; active?: string }) {
  const topics = topicCounts(lang)
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
            href={`/${lang}/topics/${topic.slug}`}
            aria-current={current ? 'page' : undefined}
            className="type-small ui-link"
            style={{ color: current ? 'var(--ui-ink)' : 'var(--ui-muted)', fontWeight: current ? 600 : 500, boxShadow: current ? 'inset 0 -2px 0 var(--ui-lime)' : undefined }}
          >
            {lang === 'ms' ? topic.ms : topic.en}
            <span className="ml-1.5" style={{ color: 'var(--ui-muted)', fontWeight: 400 }}>{topic.count}</span>
          </Link>
        )
      })}
    </nav>
  )
}
