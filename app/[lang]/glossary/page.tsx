import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import ArticlePreview from '@/components/articles/ArticlePreview'
import { languageCodes } from '@/lib/articles.mjs'
import { glossaryArticles } from '@/lib/topics.mjs'
import { absolute, languagesFor, social } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }))
}

const COPY = {
  en: { title: 'Glossary', intro: 'The pieces that define a term, gathered in one place. Every entry is a full article with its sources.', empty: 'No glossary entries in this language yet.' },
  ms: { title: 'Glosari', intro: 'Artikel yang mentakrifkan istilah, dikumpulkan di satu tempat. Setiap entri ialah artikel penuh dengan sumbernya.', empty: 'Belum ada entri glosari dalam bahasa ini.' },
} as const

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang === 'ms' ? 'ms' : 'en'
  const copy = COPY[lang]
  const path = `/${lang}/glossary`
  return { title: copy.title, description: copy.intro, alternates: { canonical: absolute(path), languages: languagesFor('/glossary') }, ...social(lang, path, copy.title, copy.intro) }
}

export default function Glossary({ params }: { params: { lang: string } }) {
  const lang = params.lang === 'ms' ? 'ms' : 'en'
  const copy = COPY[lang]
  const other = lang === 'en' ? 'ms' : 'en'
  const articles = glossaryArticles(lang)

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${other}/glossary`} />
      <main id="main" className="container-editorial" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
        <h1 className="type-h1" style={{ color: 'var(--ui-ink)' }}>{copy.title}</h1>
        <p className="type-body mt-3" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{copy.intro}</p>
        <div className="mt-10">
          {articles.length === 0
            ? <p className="type-body" style={{ color: 'var(--ui-muted)' }}>{copy.empty}</p>
            : articles.map((article) => (<ArticlePreview key={article.slug} article={article} lang={lang} />))}
        </div>
        <p className="mt-10">
          <Link href={`/${lang}/topics`} className="ui-link type-small" style={{ color: 'var(--ui-accent)' }}>
            {lang === 'ms' ? 'Semua topik' : 'All topics'}
          </Link>
        </p>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
