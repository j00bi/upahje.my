import Link from 'next/link'
import { categoryLabel } from '@/lib/articles.mjs'

/**
 * Topics with real counts from the content loader. Empty pillars are filtered
 * out before this renders; there is no empty-state card because an empty topic
 * does not get a slot on the front page.
 */
export default function TopicExplorer({ topics, lang, copy }: { topics: { slug: string; count: number; blurb: string }[]; lang: string; copy: any }) {
  if (!topics.length) return null
  return (
    <section aria-labelledby="topics" className="mt-16" style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-6)' }}>
      <h2 id="topics" className="type-h2" style={{ color: 'var(--ui-ink)' }}>{copy.topics}</h2>
      <ul className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link href={`/${lang}/articles/category/${topic.slug}`} className="ui-link group block">
              <span className="type-h4" style={{ color: 'var(--ui-ink)' }}>{categoryLabel(topic.slug, lang)}</span>
              <span className="type-small ml-2" style={{ color: 'var(--ui-muted)' }}>{topic.count}</span>
              <span className="type-small mt-1 block" style={{ color: 'var(--ui-body)' }}>{topic.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
