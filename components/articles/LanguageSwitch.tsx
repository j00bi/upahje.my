import Link from 'next/link'
import { LANGUAGES } from '@/lib/articles.mjs'

/** A plain pair of links: the same page in each language. */
export default function LanguageSwitch({ lang, hrefs }: { lang: string; hrefs: Record<string, string> }) {
  return (
    <nav aria-label="Language" className="flex items-center gap-1 text-sm">
      {LANGUAGES.map((language) => (
        <Link
          key={language.code}
          href={hrefs[language.code] || `/${language.code}`}
          hrefLang={language.htmlLang}
          aria-current={language.code === lang ? 'true' : undefined}
          className={
            language.code === lang
              ? 'rounded-pill bg-green-deep px-3 py-1 font-semibold text-white'
              : 'rounded-pill border border-neutral-200 px-3 py-1 font-semibold text-ink hover:border-neutral-300 hover:bg-canvas-soft'
          }
        >
          {language.code.toUpperCase()}
        </Link>
      ))}
    </nav>
  )
}
