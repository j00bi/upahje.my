import { languageCodes } from '@/lib/articles.mjs'
import { feedXml } from '@/lib/feed.mjs'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }))
}

export function GET(_request: Request, { params }: { params: { lang: string } }) {
  return new Response(feedXml(params.lang === 'ms' ? 'ms' : 'en'), {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  })
}
