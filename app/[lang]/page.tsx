import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import FeaturedStory from '@/components/home/FeaturedStory'
import StoryCard from '@/components/home/StoryCard'
import { copyFor, homeFor } from '@/lib/copy'
import { featuredArticle, publicationArticles, getPublishedArticle, bodyWithoutTitle, verifiedOn, formatDate, isoDate, categoryLabel } from '@/lib/articles.mjs'
import { articlesForTopic, topicCounts, topicLabel, TOPIC_MAPPING, TOPICS } from '@/lib/topics.mjs'
import { extractHeadings } from '@/lib/article-view'
import { SITE_NAME, absolute, languagesFor, social } from '@/lib/seo'

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const copy = copyFor(params.lang)
  const home = homeFor(params.lang)
  return {
    // The template already appends '| UpahJe.my'; prefixing SITE_NAME produced
    // 'UpahJe.my - ... | UpahJe.my' in the tab and in search results.
    title: copy.tagline,
    description: home.sub,
    alternates: { canonical: absolute(`/${params.lang}`), languages: languagesFor('') },
    ...social(params.lang, `/${params.lang}`, `${SITE_NAME} - ${copy.tagline}`, home.sub),
  }
}


// The front labels a story by subject, not by the shelf it sits on: the
// e-Invoice piece is a compliance story even though its category is a guide.
const topicFor = (article: any): string | null => {
  const entry = TOPIC_MAPPING[article.translationKey] || TOPIC_MAPPING[article.slug]
  return entry?.topic ? topicLabel(entry.topic, article.lang) : null
}

const section = (slug: string, lang: string, exclude: Array<string | undefined>, limit = 3) =>
  articlesForTopic(lang, slug).filter((article) => !exclude.includes(article.slug)).slice(0, limit)

export default function Hub({ params }: { params: { lang: string } }) {
  const lang = params.lang
  const copy = copyFor(lang)
  const home = homeFor(lang)
  const other = lang === 'ms' ? 'en' : 'ms'

  const featured = featuredArticle(lang)
  const featuredSlug = featured?.slug
  const allPublished = publicationArticles(lang)
  const secondaries = allPublished.filter((a) => a.slug !== featuredSlug).slice(0, 2)
  const secondarySlugs = new Set(secondaries.map((a) => a.slug))
  // "Recently checked" is the only front-page element no competitor has: the
  // date each story's sources were last verified, newest first.
  const recentlyChecked = [...allPublished]
    .map((a) => ({ article: a, checked: verifiedOn(a) }))
    .filter((row) => row.checked)
    .sort((a, b) => String(b.checked).localeCompare(String(a.checked)))
    .slice(0, 5)
  const compliance = section('compliance', lang, [featuredSlug, ...secondarySlugs])
  const buying = section('buying', lang, [featuredSlug, ...secondarySlugs])
  const ai = section('ai-automation', lang, [featuredSlug, ...secondarySlugs])
  const freelance = section('freelance', lang, [featuredSlug, ...secondarySlugs])
  const counts = new Map(topicCounts(lang).map((topic) => [topic.slug, topic.count]))

  // The CTA names the e-Invoice exemption, so it must resolve independently of the
  // sections: the featured article is deliberately excluded from those lists.
  const einvoice = articlesForTopic(lang, 'compliance')[0]
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

      <header className="container-editorial front-matter">
        <h1 className="front-strap">{home.h1}</h1>
        <p className="front-kicker">{home.kicker}</p>
      </header>

      <main className="container-editorial" style={{ paddingBottom: 'var(--space-16)' }}>
        {featured && <FeaturedStory article={featured} copy={copy} label={topicFor(featured) || categoryLabel(featured.category, lang)} />}

        {secondaries.length > 0 && (
          <section aria-label={lang === 'ms' ? 'Lagi dari edisi ini' : 'Also in this edition'} className="mt-10 grid gap-8 sm:grid-cols-2" style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-6)' }}>
            {secondaries.map((article) => {
              const href = `/${lang}/articles/${article.slug}`
              return (
                <article key={article.slug}>
                  <p className="type-label" style={{ color: 'var(--ui-accent)' }}>{categoryLabel(article.category, lang)}</p>
                  <h3 className="type-serif mt-2" style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)', lineHeight: 1.2, color: 'var(--ui-ink)' }}>
                    <Link href={href} className="ui-link" style={{ color: 'var(--ui-ink)' }}>{article.title}</Link>
                  </h3>
                  <p className="type-small mt-3" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{article.description}</p>
                  <p className="type-small mt-3" style={{ color: 'var(--ui-muted)' }}>
                    {article.author} · <time dateTime={isoDate(article.date)}>{formatDate(article.date, lang)}</time> · {article.readingTime} {copy.read}
                  </p>
                </article>
              )
            })}
          </section>
        )}

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

        {recentlyChecked.length > 0 && (
          <section aria-labelledby="recently-checked" className="mt-14" style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-4)' }}>
            <h2 id="recently-checked" className="type-h3" style={{ color: 'var(--ui-ink)' }}>
              {lang === 'ms' ? 'Baru disemak' : 'Recently checked'}
            </h2>
            <ul className="mt-4" style={{ borderTop: '1px solid var(--ui-rule)' }}>
              {recentlyChecked.map(({ article, checked }) => (
                <li key={article.slug} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3" style={{ borderBottom: '1px solid var(--ui-rule)' }}>
                  <Link href={`/${lang}/articles/${article.slug}`} className="ui-link type-small" style={{ color: 'var(--ui-ink)' }}>{article.title}</Link>
                  <span className="type-small tabular-nums" style={{ color: 'var(--ui-muted)' }}>
                    {lang === 'ms' ? 'disemak' : 'checked'} <time dateTime={isoDate(String(checked))}>{formatDate(String(checked), lang)}</time>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

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
