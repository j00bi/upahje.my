import Link from 'next/link'
import { categoryBySlug, formatDate } from '@/lib/articles.mjs'
import type { Article } from '@/lib/types'

export default function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const category = categoryBySlug(article.category)
  const label = category?.label[article.lang] || category?.slug
  return (
    <article
      className={`group flex h-full flex-col rounded-lg border border-neutral-200 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-elevated ${
        featured ? 'sm:p-8' : ''
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
        <Link href={`/${article.lang}/topics`} className="text-emerald-700 hover:text-emerald-800">
          {label}
        </Link>
        <span aria-hidden className="text-neutral-300">·</span>
        <time dateTime={article.date} className="font-medium normal-case tracking-normal text-mute">
          {formatDate(article.date, article.lang)}
        </time>
      </div>
      <h3 className={`mt-3 ${featured ? 'font-display-lg' : 'font-display-sm'} text-ink`}>
        <Link href={`/${article.lang}/articles/${article.slug}`} className="hover:text-emerald-800">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 text-[15px] leading-7 text-body">{article.description}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5 text-xs text-mute">
        <span>{article.readingTime} min</span>
        <span aria-hidden>·</span>
        <span>{article.author}</span>
        {article.tags.length > 0 && (
          <>
            <span aria-hidden>·</span>
            <span>{article.tags.slice(0, 2).join(', ')}</span>
          </>
        )}
      </div>
    </article>
  )
}
