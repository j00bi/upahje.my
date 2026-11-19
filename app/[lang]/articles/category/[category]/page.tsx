import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import ArticleCard from '@/components/articles/ArticleCard'
import CategoryNav from '@/components/articles/CategoryNav'
import TopBar from '@/components/layout/TopBar'
import { copyFor } from '@/lib/copy'
import { definedTermSetJsonLd } from '@/lib/jsonld'
import {
  ARTICLE_CATEGORIES,
  articlesInCategory,
  categoryBySlug,
  categoryLabel,
  languageCodes,
} from '@/lib/articles.mjs'
import { SITE_NAME, absolute, categoryLanguages, social } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return languageCodes.flatMap((lang) =>
    ARTICLE_CATEGORIES.map((category) => ({ lang, category: category.slug })),
  )
}

export function generateMetadata({ params }: { params: { lang: string; category: string } }): Metadata {
  const category = categoryBySlug(params.category)
  if (!category) return {}
  const label = categoryLabel(params.category, params.lang)
  return {
    title: `${label} - ${SITE_NAME}`,
    description: category.blurb[params.lang],
    alternates: {
      canonical: absolute(`/${params.lang}/articles/category/${params.category}`),
      languages: categoryLanguages(params.category),
    },
    ...social(params.lang, `/${params.lang}/articles/category/${params.category}`, `${label} - ${SITE_NAME}`, category.blurb[params.lang]),
  }
}

export default function CategoryPage({ params }: { params: { lang: string; category: string } }) {
  const category = categoryBySlug(params.category)
  if (!category) notFound()
  const copy = copyFor(params.lang)
  const articles = articlesInCategory(category.slug, params.lang)
  const label = categoryLabel(category.slug, params.lang)
  const url = absolute(`/${params.lang}/articles/category/${category.slug}`)

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={params.lang} otherHref={`/${params.lang === 'en' ? 'ms' : 'en'}/articles/category/${category.slug}`} />
      <header className="border-b" style={{ borderColor: 'var(--ui-rule)' }}>
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="font-display-xl mt-4 text-ink">{label}</h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-8 text-body">{category.blurb[params.lang]}</p>
          <div className="mt-8">
            <CategoryNav lang={params.lang} active={category.slug} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {articles.length === 0 ? (
          <p className="text-body">{copy.empty}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </main>

      {category.slug === 'definitions' && articles.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd(label, url, articles)) }}
        />
      )}

      <Footer lang={params.lang} />
    </div>
  )
}
