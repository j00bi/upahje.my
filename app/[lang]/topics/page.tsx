import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import { languageCodes } from '@/lib/articles.mjs'
import { topicCounts } from '@/lib/topics.mjs'
import { absolute, languagesFor, social } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }))
}

const COPY = {
  en: { title: 'Topics', intro: 'Five subjects. Every article sits in one, and some in two.' },
  ms: { title: 'Topik', intro: 'Lima subjek. Setiap artikel berada dalam satu, dan sesetengahnya dua.' },
} as const

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang === 'ms' ? 'ms' : 'en'
  const copy = COPY[lang]
  const path = `/${lang}/topics`
  return { title: copy.title, description: copy.intro, alternates: { canonical: absolute(path), languages: languagesFor('/topics') }, ...social(lang, path, copy.title, copy.intro) }
}

export default function TopicsIndex({ params }: { params: { lang: string } }) {
  const lang = params.lang === 'ms' ? 'ms' : 'en'
  const copy = COPY[lang]
  const other = lang === 'en' ? 'ms' : 'en'
  const topics = topicCounts(lang)

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${other}/topics`} />
      <main id="main" className="container-editorial" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
        <h1 className="type-h1" style={{ color: 'var(--ui-ink)' }}>{copy.title}</h1>
        <p className="type-body mt-3" style={{ color: 'var(--ui-body)' }}>{copy.intro}</p>
        <ul className="mt-10">
          {topics.map((topic) => (
            <li key={topic.slug} className="py-5" style={{ borderTop: '1px solid var(--ui-rule)' }}>
              <Link href={`/${lang}/topics/${topic.slug}`} className="type-h3" style={{ color: 'var(--ui-ink)' }}>
                {lang === 'ms' ? topic.ms : topic.en}
              </Link>
              <span className="type-small ml-3" style={{ color: 'var(--ui-muted)' }}>{topic.count} {lang === 'ms' ? 'artikel' : 'articles'}</span>
              <p className="type-small mt-1" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{lang === 'ms' ? topic.blurbMs : topic.blurbEn}</p>
            </li>
          ))}
        </ul>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
