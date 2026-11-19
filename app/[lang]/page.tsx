import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import LanguageSwitch from '@/components/articles/LanguageSwitch'
import { copyFor } from '@/lib/copy'
import {
  ARTICLE_CATEGORIES,
  articlesInCategory,
  categoryLabel,
  languageByCode,
  publishedArticles,
} from '@/lib/articles.mjs'
import { SITE_NAME, absolute, languagesFor } from '@/lib/seo'

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const copy = copyFor(params.lang)
  return {
    title: `${SITE_NAME} — ${copy.tagline}`,
    description: copy.intro,
    alternates: { canonical: absolute(`/${params.lang}`), languages: languagesFor('') },
  }
}

export default function Hub({ params }: { params: { lang: string } }) {
  const lang = params.lang
  const copy = copyFor(lang)
  const other = lang === 'ms' ? 'en' : 'ms'
  const groups = ARTICLE_CATEGORIES.map((category) => ({
    category,
    en: articlesInCategory(category.slug, 'en'),
    ms: articlesInCategory(category.slug, 'ms'),
  })).filter((group) => group.en.length + group.ms.length > 0)
  const total = publishedArticles('en').length + publishedArticles('ms').length

  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-neutral-200/70 bg-canvas-soft">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="section-label text-emerald-700">{copy.site}</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-mute">{copy.langSwitch}</span>
              <LanguageSwitch lang={lang} hrefs={{ en: '/en', ms: '/ms' }} />
            </div>
          </div>
          <h1 className="font-display-xl mt-4 max-w-3xl text-ink">{copy.tagline}</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-8 text-body">{copy.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${lang}/articles`}
              className="inline-flex items-center justify-center rounded-pill bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              {copy.journal} →
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <section aria-labelledby="concepts">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="concepts" className="font-display-lg text-ink">
              {copy.concepts}
            </h2>
            <p className="text-sm text-mute">
              {total} {lang === 'ms' ? 'artikel' : 'articles'}
            </p>
          </div>

          <div className="mt-8 space-y-10">
            {groups.length === 0 && (
              <div className="rounded-lg border border-neutral-200 bg-white p-6 text-body shadow-card">
                {copy.empty}
              </div>
            )}
            {groups.map(({ category, en, ms }) => (
              <div key={category.slug} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display-sm text-ink">{categoryLabel(category.slug, lang)}</h3>
                  <Link
                    href={`/${lang}/articles/category/${category.slug}`}
                    className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    {categoryLabel(category.slug, lang)} →
                  </Link>
                </div>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  {[
                    { code: 'en', label: 'EN', items: en },
                    { code: 'ms', label: 'BM', items: ms },
                  ].map((column) => (
                    <div key={column.code}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mute">
                        {column.label}
                      </p>
                      {column.items.length === 0 ? (
                        <p className="mt-2 text-sm text-mute">{copy.empty}</p>
                      ) : (
                        <ul className="mt-2 space-y-2">
                          {column.items.map((article) => (
                            <li key={`${column.code}-${article.slug}`}>
                              <Link
                                href={`/${article.lang}/articles/${article.slug}`}
                                className="text-[15px] font-medium text-ink underline decoration-transparent underline-offset-2 transition hover:text-emerald-800 hover:decoration-emerald-300"
                                hrefLang={languageByCode(article.lang).htmlLang}
                              >
                                {article.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="who" className="mt-16 rounded-lg bg-canvas-warm p-6 sm:p-8">
          <h2 id="who" className="font-display-sm text-ink">
            {copy.whoTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-8 text-body">{copy.whoBody}</p>
          <p className="mt-4 text-sm text-mute">
            {copy.alsoIn}:{' '}
            <Link href={`/${other}`} hrefLang={languageByCode(other).htmlLang} className="font-semibold text-emerald-700">
              {languageByCode(other).native}
            </Link>
          </p>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
