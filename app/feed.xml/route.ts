import { feedXml } from '@/lib/feed.mjs'

export const dynamic = 'force-static'

/** The original English feed URL. It keeps working; `/en/feed.xml` is canonical. */
export function GET() {
  return new Response(feedXml('en'), {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  })
}
