import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import ArticlePreview from '@/components/articles/ArticlePreview'
import PillarNav from '@/components/articles/PillarNav'
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
import { articlesForPillar, pillarBySlug, visiblePillars } from '@/lib/pillars.mjs'
import { SITE_NAME, absolute, categoryLanguages, languagesFor, social } from '@/lib/seo'

export const dynamicParams = false

/** Both the pillar topic pages and the legacy category URLs are generated here. */
export function generateStaticParams() {
  const slugs = new Set([
    ...visiblePillars().map((pillar) => pillar.slug),
    ...ARTICLE_CATEGORIES.map((category) => category.slug),
  ])
  return languageCodes.flatMap((lang) => [...slugs].map((category) => ({ lang, category })))
}

function describe(slug: string, lang: string) {
  const pillar = pillarBySlug(slug)
  if (pillar) {
    return {
      pillar: true as const,
      label: lang === 'ms' ? pillar.nameMs : pillar.nameEn,
      blurb: (lang === 'ms' ? pillar.descriptionMs : pillar.descriptionEn) ?? '',
      articles: articlesForPillar(lang, slug),
      languages: languagesFor(`/articles/category/${slug}`),
    }
  }
  const category = categoryBySlug(slug)
  if (!category) return null
  return {
    pillar: false as const,
    label: categoryLabel(category.slug, lang),
    blurb: category.blurb[lang],
    articles: articlesInCategory(category.slug, lang),
    languages: categoryLanguages(category.slug),
  }
}

export function generateMetadata({ params }: { params: { lang: string; category: string } }): Metadata {
  const topic = describe(params.category, params.lang)
  if (!topic) return {}
  return {
    title: `${topic.label} - ${SITE_NAME}`,
    description: topic.blurb,
    alternates: { canonical: absolute(`/${params.lang}/articles/category/${params.category}`), languages: topic.languages },
    ...social(params.lang, `/${params.lang}/articles/category/${params.category}`, `${topic.label} - ${SITE_NAME}`, topic.blurb),
  }
}

export default function CategoryPage({ params }: { params: { lang: string; category: string } }) {
  const topic = describe(params.category, params.lang)
  if (!topic) notFound()
  const copy = copyFor(params.lang)
  const url = absolute(`/${params.lang}/articles/category/${params.category}`)

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={params.lang} otherHref={`/${params.lang === 'en' ? 'ms' : 'en'}/articles/category/${params.category}`} />
      <header className="container-editorial" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-6)' }}>
        <h1 className="type-h1" style={{ color: 'var(--ui-ink)' }}>{topic.label}</h1>
        {topic.blurb && (
          <p className="type-body mt-3" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{topic.blurb}</p>
        )}
        <div className="mt-6"><PillarNav lang={params.lang} active={topic.pillar ? params.category : undefined} /></div>
      </header>

      <main className="container-editorial" style={{ paddingBottom: 'var(--space-12)' }}>
        {topic.articles.length === 0 ? (
          <p className="type-body py-10" style={{ color: 'var(--ui-muted)', borderTop: '1px solid var(--ui-rule)' }}>{copy.empty}</p>
        ) : (
          <div>{topic.articles.map((article) => <ArticlePreview key={article.slug} article={article} lang={params.lang} />)}</div>
        )}
      </main>

      {!topic.pillar && params.category === 'definitions' && topic.articles.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd(topic.label, url, topic.articles)) }}
        />
      )}

      <Footer lang={params.lang} />
    </div>
  )
}
