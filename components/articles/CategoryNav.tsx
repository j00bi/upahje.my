import Link from 'next/link'
import { ARTICLE_CATEGORIES, categoryLabel, categoryPath } from '@/lib/articles.mjs'
import { copyFor } from '@/lib/copy'

export default function CategoryNav({ lang, active }: { lang: string; active?: string }) {
  return (
    <nav aria-label="Article categories" className="flex flex-wrap gap-2">
      <Link
        href={`/${lang}/articles`}
        className={`rounded-pill border px-4 py-2 text-sm font-medium transition ${
          !active
            ? 'border-emerald-700 bg-emerald-700 text-white'
            : 'border-neutral-200 bg-white text-ink hover:border-neutral-300 hover:bg-canvas-soft'
        }`}
      >
        {copyFor(lang).all}
      </Link>
      {ARTICLE_CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          href={categoryPath(lang, category.slug)}
          className={`rounded-pill border px-4 py-2 text-sm font-medium transition ${
            active === category.slug
              ? 'border-emerald-700 bg-emerald-700 text-white'
              : 'border-neutral-200 bg-white text-ink hover:border-neutral-300 hover:bg-canvas-soft'
          }`}
        >
          {categoryLabel(category.slug, lang)}
        </Link>
      ))}
    </nav>
  )
}
