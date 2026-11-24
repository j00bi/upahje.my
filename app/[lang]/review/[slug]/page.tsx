import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleView from '@/components/articles/ArticleView'
import { getArticle } from '@/lib/articles.mjs'
import { requireReview } from '@/lib/review'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Draft preview',
  robots: { index: false, follow: false },
}

export default function ReviewArticle({ params, searchParams }: { params: { lang: string; slug: string }; searchParams: { k?: string } }) {
  requireReview(searchParams.k)
  const article = getArticle(params.lang, params.slug)
  if (!article || !article.draft) notFound()
  return <ArticleView article={article} draftBanner={params.lang === 'ms' ? 'Pratonton draf. Belum diterbitkan.' : 'Draft preview. Not published.'} />
}
