import { notFound } from 'next/navigation'
import { isLanguage, languageCodes, languageByCode } from '@/lib/articles.mjs'

export const dynamicParams = false

export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }))
}

/**
 * The wrapper language attribute. Next requires the <html> element in the root
 * layout, which has no language param, so `lang` goes on this wrapper and the
 * per-page hreflang tags carry the signal. See docs/ARTICLES.md.
 */
export default function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  if (!isLanguage(params.lang)) notFound()
  const feed = `/${params.lang}/feed.xml`
  return (
    <div lang={languageByCode(params.lang).htmlLang}>
      <link rel="alternate" type="application/rss+xml" title={`UpahJe.my ${params.lang.toUpperCase()} feed`} href={feed} />
      {children}
    </div>
  )
}
