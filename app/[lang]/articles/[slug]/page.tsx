import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleView from '@/components/articles/ArticleView'
import { articleLanguages, absolute, SITE_NAME } from '@/lib/seo'
import { cleanText } from '@/lib/text'
import { getArticle, languageCodes, publishedArticles, translatedArticle } from '@/lib/articles.mjs'

export const dynamicParams = true

export function generateStaticParams() {
  return languageCodes.flatMap((lang) => publishedArticles(lang).map((article) => ({ lang, slug: article.slug })))
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const article = getArticle(params.lang, params.slug)
  if (!article) return {}
  const pair = translatedArticle(article)
  const url = absolute(`/${article.lang}/articles/${article.slug}`)
  const title = cleanText(article.title)
  const description = cleanText(article.description)
  return {
    title,
    description,
    alternates: { canonical: url, ...(pair ? { languages: articleLanguages(article, pair) } : {}) },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: article.lang === 'ms' ? 'ms_MY' : 'en_MY',
      publishedTime: article.date,
      modifiedTime: article.updated || article.date,
      authors: [cleanText(article.author)],
      tags: article.tags.map(cleanText),
      images: [{ url: `${url}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${url}/opengraph-image`] },
  }
}

export default function ArticlePage({ params }: { params: { lang: string; slug: string } }) {
  const article = getArticle(params.lang, params.slug)
  if (!article) notFound()
  if (article.draft && process.env.NODE_ENV === 'production') notFound()
  return <ArticleView article={article} />
}
