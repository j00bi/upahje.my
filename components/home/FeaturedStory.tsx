import Link from 'next/link'
import { categoryLabel, formatDate, isoDate } from '@/lib/articles.mjs'

type Article = {
  lang: string
  slug: string
  title: string
  description: string
  date: string
  author: string
  readingTime: number
  category: string
}

/**
 * One front page story. The headline is the only serif display on the site so
 * far, which is what separates a front page from a list of cards.
 */
export default function FeaturedStory({ article, copy }: { article: Article; copy: any }) {
  const href = `/${article.lang}/articles/${article.slug}`
  return (
    <section aria-labelledby="featured-story" style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-6)' }}>
      <p className="type-label" style={{ color: 'var(--ui-muted)' }}>{copy.featured}</p>
      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <p className="type-small" style={{ color: 'var(--ui-accent)', fontWeight: 600 }}>
            {categoryLabel(article.category, article.lang)}
          </p>
          <h2 id="featured-story" className="type-serif mt-3" style={{ fontSize: 'var(--text-display)', lineHeight: 'var(--leading-display)', color: 'var(--ui-ink)' }}>
            <Link href={href} className="ui-link" style={{ color: 'var(--ui-ink)' }}>{article.title}</Link>
          </h2>
          <p className="type-body mt-5" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{article.description}</p>
          <Link href={href} className="type-small ui-link mt-6 inline-flex items-center gap-2" style={{ color: 'var(--ui-accent)', fontWeight: 600 }}>
            {copy.readStory}
            <span aria-hidden>→</span>
          </Link>
        </div>
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-3" style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-4)' }}>
          <div>
            <dt className="type-label" style={{ color: 'var(--ui-muted)' }}>{article.lang === 'ms' ? 'Oleh' : 'By'}</dt>
            <dd className="type-small mt-1" style={{ color: 'var(--ui-ink)' }}>{article.author}</dd>
          </div>
          <div>
            <dt className="type-label" style={{ color: 'var(--ui-muted)' }}>{copy.published}</dt>
            <dd className="type-small mt-1" style={{ color: 'var(--ui-ink)' }}>
              <time dateTime={isoDate(article.date)}>{formatDate(article.date, article.lang)}</time>
            </dd>
          </div>
          <div>
            <dt className="type-label" style={{ color: 'var(--ui-muted)' }}>{copy.minRead}</dt>
            <dd className="type-small mt-1" style={{ color: 'var(--ui-ink)' }}>{article.readingTime}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
