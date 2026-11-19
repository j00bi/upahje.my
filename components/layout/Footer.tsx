import Link from 'next/link'
import { ARTICLE_CATEGORIES, categoryLabel, categoryPath, LANGUAGES } from '@/lib/articles.mjs'
import { copyFor } from '@/lib/copy'

/**
 * Content-site footer. The marketplace links (jobs, talent, categories, auth)
 * were removed with the pivot; the routes still exist but are unlinked and
 * noindexed until the user decides whether to delete them.
 */
export default function Footer({ lang = 'en' }: { lang?: string }) {
  const copy = copyFor(lang)
  const other = lang === 'ms' ? 'en' : 'ms'

  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div>
            <div className="text-lg font-bold tracking-tight mb-4" style={{ color: 'var(--color-canvas)' }}>
              {copy.site}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {copy.tagline}
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {copy.journal}
            </div>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {LANGUAGES.map((language) => (
                <li key={language.code}>
                  <Link href={`/${language.code}/articles`} className="hover:text-white transition-colors" hrefLang={language.htmlLang}>
                    {language.native}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {copy.categories}
            </div>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {ARTICLE_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link href={categoryPath(lang, category.slug)} className="hover:text-white transition-colors">
                    {categoryLabel(category.slug, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Site
            </div>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
              <li>
                <Link href={`/${other}`} className="hover:text-white transition-colors">
                  {LANGUAGES.find((l) => l.code === other)?.native}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
