import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import FeaturedStory from '@/components/home/FeaturedStory'
import StoryCard from '@/components/home/StoryCard'
import { copyFor, homeFor } from '@/lib/copy'
import { featuredArticle, publicationArticles, getPublishedArticle, bodyWithoutTitle } from '@/lib/articles.mjs'
import { articlesForTopic, topicCounts } from '@/lib/topics.mjs'
import { extractHeadings } from '@/lib/article-view'
import { SITE_NAME, absolute, languagesFor, social } from '@/lib/seo'

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const copy = copyFor(params.lang)
  const home = homeFor(params.lang)
  return {
    title: `${SITE_NAME} - ${copy.tagline}`,
    description: home.sub,
    alternates: { canonical: absolute(`/${params.lang}`), languages: languagesFor('') },
    ...social(params.lang, `/${params.lang}`, `${SITE_NAME} - ${copy.tagline}`, home.sub),
  }
}

const section = (slug: string, lang: string, exclude: string | undefined, limit = 3) =>
  articlesForTopic(lang, slug).filter((article) => article.slug !== exclude).slice(0, limit)

export default function Hub({ params }: { params: { lang: string } }) {
  const lang = params.lang
  const copy = copyFor(lang)
  const home = homeFor(lang)
  const other = lang === 'ms' ? 'en' : 'ms'

  const featured = featuredArticle(lang)
  const featuredSlug = featured?.slug
  const compliance = section('compliance', lang, featuredSlug)
  const buying = section('buying', lang, featuredSlug)
  const ai = section('ai-automation', lang, featuredSlug)
  const freelance = section('freelance', lang, featuredSlug)
  const counts = new Map(topicCounts(lang).map((topic) => [topic.slug, topic.count]))

  const einvoice = compliance[0]
  const exempt = einvoice
    ? extractHeadings(bodyWithoutTitle(einvoice.body, einvoice.title)).find((heading) => /exempt|pengecualian/i.test(heading.label))
    : null
  const startHref = einvoice
    ? `/${lang}/articles/${einvoice.slug}${exempt ? `#${exempt.id}` : ''}`
    : `/${lang}/articles`

  const sections = [
    { slug: 'compliance', title: home.sections.rules, items: compliance },
    { slug: 'buying', title: home.sections.buying, items: buying },
    { slug: 'ai-automation', title: home.sections.ai, items: ai },
    { slug: 'freelance', title: home.sections.freelancers, items: freelance },
  ]
  const blocks = sections.filter((block) => block.items.length > 0)

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${lang === 'en' ? 'ms' : 'en'}`} />

      <header className="container-editorial" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-8)' }}>
        <h1 className="type-display" style={{ color: 'var(--ui-ink)', maxWidth: '20ch' }}>{home.h1}</h1>
        <p className="type-body mt-5" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{home.sub}</p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href={startHref}
            className="type-small inline-flex items-center rounded-[10px] px-5 py-3"
            style={{ background: 'var(--ui-forest)', color: 'var(--ui-paper)', fontWeight: 600 }}
          >
            {home.startCta}
          </Link>
          <Link
            href={`/${lang}/articles`}
            className="type-small inline-flex items-center rounded-[10px] px-5 py-3"
            style={{ border: '1px solid var(--ui-rule)', color: 'var(--ui-ink)', fontWeight: 600 }}
          >
            {home.browseCta}
          </Link>
        </div>
      </header>

      <main className="container-editorial" style={{ paddingBottom: 'var(--space-16)' }}>
        {featured && <FeaturedStory article={featured} copy={copy} />}

        {blocks.map((block) => (
          <section key={block.slug} aria-labelledby={`section-${block.slug}`} className="mt-14">
            <div className="flex flex-wrap items-baseline justify-between gap-2" style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-4)' }}>
              <h2 id={`section-${block.slug}`} className="type-h2" style={{ color: 'var(--ui-ink)' }}>{block.title}</h2>
              {counts.get(block.slug) ? (
                <Link href={`/${lang}/topics/${block.slug}`} className="type-small ui-link" style={{ color: 'var(--ui-accent)' }}>
                  {String(copy.seeAll)} <span style={{ color: 'var(--ui-muted)' }}>{String(counts.get(block.slug) ?? '')}</span>
                </Link>
              ) : null}
            </div>
            {block.items.length === 0 ? (
              <p className="type-small mt-4" style={{ color: 'var(--ui-muted)' }}>{copy.empty}</p>
            ) : (
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {block.items.map((article) => (
                  <StoryCard key={article.slug} article={article} lang={lang} copy={copy} />
                ))}
              </div>
            )}
          </section>
        ))}

        <section aria-labelledby="how-we-check" className="mt-16" style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-6)' }}>
          <h2 id="how-we-check" className="type-h2" style={{ color: 'var(--ui-ink)' }}>{home.sections.howWeCheck}</h2>
          <ul className="mt-4 space-y-1">
            {home.howWeCheck.map((line) => (
              <li key={line} className="type-body" style={{ color: 'var(--ui-body)' }}>{line}</li>
            ))}
          </ul>
          <Link href={`/${lang}${home.policyPath}`} className="type-small ui-link mt-4 inline-block" style={{ color: 'var(--ui-accent)', fontWeight: 600 }}>
            {lang === 'ms' ? 'Baca dasar editorial' : 'Read the editorial policy'}
          </Link>
        </section>

        <section aria-labelledby="who" className="mt-14" style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-6)' }}>
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
