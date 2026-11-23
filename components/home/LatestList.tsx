import Link from 'next/link'
import { formatDate, isoDate } from '@/lib/articles.mjs'

type Article = { lang: string; slug: string; title: string; description: string; date: string; category: string }

/**
 * Latest stories as an asymmetric list, not a card grid: the first row is a
 * larger headline and the rest are quieter rows, so the page has one focal
 * point rather than six equal boxes.
 */
export default function LatestList({ items, lang, copy }: { items: Article[]; lang: string; copy: any }) {
  if (!items.length) return null
  return (
    <section aria-labelledby="latest" className="mt-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="latest" className="type-h2" style={{ color: 'var(--ui-ink)' }}>{copy.latest}</h2>
        <Link href={`/${lang}/articles`} className="type-small ui-link" style={{ color: 'var(--ui-accent)' }}>
          {copy.journal}
        </Link>
      </div>
      <ul className="mt-6" style={{ borderTop: '1px solid var(--ui-rule)' }}>
        {items.map((article, index) => (
          <li key={article.slug} style={{ borderBottom: index === items.length - 1 ? 'none' : '1px solid var(--ui-rule)' }}>
            <div className={index === 0 ? 'grid gap-3 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline' : 'grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline'}>
              <div>
                <h3 className={index === 0 ? 'type-h3' : 'type-h4'} style={{ color: 'var(--ui-ink)' }}>
                  <Link href={`/${article.lang}/articles/${article.slug}`} className="ui-link" style={{ color: 'var(--ui-ink)' }}>
                    {article.title}
                  </Link>
                </h3>
                {index === 0 && (
                  <p className="type-small mt-2" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{article.description}</p>
                )}
              </div>
              <p className="type-small" style={{ color: 'var(--ui-muted)', whiteSpace: 'nowrap' }}>
                <time dateTime={isoDate(article.date)}>{formatDate(article.date, article.lang)}</time>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
