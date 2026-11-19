import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import ArticleCard from '@/components/articles/ArticleCard'
import CategoryNav from '@/components/articles/CategoryNav'
import LanguageSwitch from '@/components/articles/LanguageSwitch'
import Pagination from '@/components/articles/Pagination'
import { copyFor } from '@/lib/copy'
import { articlePageCount, articlesForPage } from '@/lib/articles.mjs'
import { SITE_NAME, absolute, languagesFor } from '@/lib/seo'

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const copy = copyFor(params.lang)
  return {
    title: `${copy.journal} — ${SITE_NAME}`,
    description: copy.intro,
    alternates: { canonical: absolute(`/${params.lang}/articles`), languages: languagesFor('/articles') },
  }
}

export default function ArticlesIndex({ params }: { params: { lang: string } }) {
  const lang = params.lang
  const copy = copyFor(lang)
  const articles = articlesForPage(1, lang)
  const pages = articlePageCount(lang)

  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-neutral-200/70 bg-canvas-soft">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="section-label text-emerald-700">{copy.site}</p>
            <LanguageSwitch lang={lang} hrefs={{ en: '/en/articles', ms: '/ms/articles' }} />
          </div>
          <h1 className="font-display-xl mt-4 text-ink">{copy.journal}</h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-8 text-body">{copy.intro}</p>
          <div className="mt-8">
            <CategoryNav lang={lang} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="section-label text-mute">{copy.latest}</h2>
        {articles.length === 0 ? (
          <p className="mt-6 text-body">{copy.empty}</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {articles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} featured={index === 0 && pages === 1} />
            ))}
          </div>
        )}
        <Pagination page={1} pageCount={pages} lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  )
}
