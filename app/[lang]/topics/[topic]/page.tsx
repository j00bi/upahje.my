import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import ArticlePreview from '@/components/articles/ArticlePreview'
import { languageCodes } from '@/lib/articles.mjs'
import { TOPICS, articlesForTopic, topicBySlug } from '@/lib/topics.mjs'
import { absolute, languagesFor, social } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() {
  return languageCodes.flatMap((lang) => TOPICS.map((topic) => ({ lang, topic: topic.slug })))
}

export function generateMetadata({ params }: { params: { lang: string; topic: string } }): Metadata {
  const lang = params.lang === 'ms' ? 'ms' : 'en'
  const topic = topicBySlug(params.topic)
  if (!topic) return {}
  const label = lang === 'ms' ? topic.ms : topic.en
  const blurb = lang === 'ms' ? topic.blurbMs : topic.blurbEn
  const path = `/${lang}/topics/${topic.slug}`
  return { title: label, description: blurb, alternates: { canonical: absolute(path), languages: languagesFor(`/topics/${topic.slug}`) }, ...social(lang, path, label, blurb) }
}

export default function TopicPage({ params }: { params: { lang: string; topic: string } }) {
  const lang = params.lang === 'ms' ? 'ms' : 'en'
  const topic = topicBySlug(params.topic)
  if (!topic) notFound()
  const other = lang === 'en' ? 'ms' : 'en'
  const label = lang === 'ms' ? topic.ms : topic.en
  const blurb = lang === 'ms' ? topic.blurbMs : topic.blurbEn
  const articles = articlesForTopic(lang, topic.slug)

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${other}/topics/${topic.slug}`} />
      <main id="main" className="container-editorial" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
        <nav aria-label="Breadcrumb" className="type-small" style={{ color: 'var(--ui-muted)' }}>
          <Link href={`/${lang}/topics`} className="ui-link">{lang === 'ms' ? 'Topik' : 'Topics'}</Link>
          <span aria-hidden> / </span>
          <span>{label}</span>
        </nav>
        <h1 className="type-h1 mt-4" style={{ color: 'var(--ui-ink)' }}>{label}</h1>
        <p className="type-body mt-3" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{blurb}</p>
        <div className="mt-10">
          {articles.map((article) => (<ArticlePreview key={article.slug} article={article} lang={lang} />))}
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
