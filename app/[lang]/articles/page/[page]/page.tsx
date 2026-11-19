import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import ArticleCard from '@/components/articles/ArticleCard'
import CategoryNav from '@/components/articles/CategoryNav'
import LanguageSwitch from '@/components/articles/LanguageSwitch'
import Pagination from '@/components/articles/Pagination'
import { copyFor } from '@/lib/copy'
import { articlePageCount, articlesForPage, languageCodes } from '@/lib/articles.mjs'
import { SITE_NAME, absolute, languagesFor, social } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return languageCodes.flatMap((lang) => {
    const pages = articlePageCount(lang)
    return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ lang, page: String(i + 2) }))
  })
}

function pageNumber(value: string): number {
  return /^\d+$/.test(value) ? Number(value) : NaN
}

export function generateMetadata({ params }: { params: { lang: string; page: string } }): Metadata {
  const copy = copyFor(params.lang)
  const n = pageNumber(params.page)
  return {
    title: `${copy.journal} — page ${n} — ${SITE_NAME}`,
    description: copy.intro,
    alternates: {
      canonical: absolute(`/${params.lang}/articles/page/${n}`),
      languages: languagesFor(`/articles/page/${n}`),
    },
    robots: { index: false, follow: true },
    ...social(params.lang, `/${params.lang}/articles/page/${n}`, `${copy.journal} — page ${n} — ${SITE_NAME}`, copy.intro),
  }
}

export default function ArticlesPage({ params }: { params: { lang: string; page: string } }) {
  const lang = params.lang
  const copy = copyFor(lang)
  const n = pageNumber(params.page)
  const pages = articlePageCount(lang)
  if (!Number.isFinite(n) || n < 2 || n > pages) notFound()
  const articles = articlesForPage(n, lang)

  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-neutral-200/70 bg-canvas-soft">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="section-label text-emerald-700">{copy.site}</p>
            <LanguageSwitch
              lang={lang}
              hrefs={{ en: `/en/articles/page/${n}`, ms: `/ms/articles/page/${n}` }}
            />
          </div>
          <h1 className="font-display-xl mt-4 text-ink">{copy.journal}</h1>
          <div className="mt-8">
            <CategoryNav lang={lang} />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <Pagination page={n} pageCount={pages} lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  )
}
