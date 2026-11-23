import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import FeaturedStory from '@/components/home/FeaturedStory'
import LatestList from '@/components/home/LatestList'
import TopicExplorer from '@/components/home/TopicExplorer'
import { copyFor } from '@/lib/copy'
import {
  ARTICLE_CATEGORIES,
  articlesInCategory,
  categoryBlurb,
  featuredArticle,
  publishedArticles,
} from '@/lib/articles.mjs'
import { SITE_NAME, absolute, languagesFor, social } from '@/lib/seo'

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const copy = copyFor(params.lang)
  return {
    title: copy.tagline,
    description: copy.intro,
    alternates: { canonical: absolute(`/${params.lang}`), languages: languagesFor('') },
    ...social(params.lang, `/${params.lang}`, `${SITE_NAME} - ${copy.tagline}`, copy.intro),
  }
}

export default function Hub({ params }: { params: { lang: string } }) {
  const lang = params.lang
  const copy = copyFor(lang)
  const other = lang === 'ms' ? 'en' : 'ms'

  const featured = featuredArticle(lang)
  const latest = publishedArticles(lang)
    .filter((article) => article.slug !== featured?.slug)
    .slice(0, 5)
  const topics = ARTICLE_CATEGORIES.map((category) => ({
    slug: category.slug,
    count: articlesInCategory(category.slug, lang).length,
    blurb: categoryBlurb(category.slug, lang),
  })).filter((topic) => topic.count > 0)

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${lang === 'en' ? 'ms' : 'en'}`} />

      <header className="container-editorial" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-10)' }}>
        <p className="type-label" style={{ color: 'var(--ui-muted)' }}>
          {lang === 'ms' ? 'Penerbitan pengetahuan bebas' : 'An independent knowledge publication'}
        </p>
        <h1 className="type-display mt-4" style={{ color: 'var(--ui-ink)', maxWidth: '22ch' }}>
          {copy.homeHeadline}
        </h1>
        <p className="type-body mt-6" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>
          {copy.homeStandfirst}
        </p>
        <Link
          href={`/${lang}/articles`}
          className="type-small ui-link mt-8 inline-flex items-center gap-2"
          style={{ color: 'var(--ui-accent)', fontWeight: 600 }}
        >
          {copy.journal}
          <span aria-hidden>→</span>
        </Link>
      </header>

      <main id="main" className="container-editorial" style={{ paddingBottom: 'var(--space-16)' }}>
        {featured ? (
          <FeaturedStory article={featured} copy={copy} />
        ) : (
          <p className="type-body" style={{ color: 'var(--ui-muted)' }}>{copy.empty}</p>
        )}

        <LatestList items={latest} lang={lang} copy={copy} />
        <TopicExplorer topics={topics} lang={lang} copy={copy} />

        <section aria-labelledby="who" className="mt-16" style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-6)' }}>
          <h2 id="who" className="type-h3" style={{ color: 'var(--ui-ink)' }}>{copy.whoTitle}</h2>
          <p className="type-body mt-3" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{copy.whoBody}</p>
          <p className="type-small mt-4" style={{ color: 'var(--ui-muted)' }}>
            {copy.alsoIn}:{' '}
            <Link href={`/${other}`} className="ui-link" style={{ color: 'var(--ui-accent)', fontWeight: 600 }} hrefLang={lang === 'ms' ? 'en-MY' : 'ms-MY'}>
              {other === 'en' ? 'English' : 'Bahasa Melayu'}
            </Link>
          </p>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
