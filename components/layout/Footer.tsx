import Link from 'next/link'
import { ARTICLE_CATEGORIES, categoryLabel, categoryPath, LANGUAGES } from '@/lib/articles.mjs'
import { copyFor } from '@/lib/copy'

/**
 * Editorial footer. Forest field, paper text, no marketplace links: those routes
 * still exist but stay unlinked and noindexed. Only links that resolve are here.
 */
export default function Footer({ lang = 'en' }: { lang?: string }) {
  const copy = copyFor(lang)
  const other = lang === 'ms' ? 'en' : 'ms'
  const year = new Date().getFullYear()
  const columnLabel = { color: 'rgba(250,249,245,0.62)' }
  const linkStyle = { color: 'rgba(250,249,245,0.82)' }

  return (
    <footer style={{ background: 'var(--ui-forest)', color: 'rgba(250,249,245,0.82)' }}>
      <div className="container-editorial grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="type-h3" style={{ color: 'var(--ui-paper)', letterSpacing: '-0.02em' }}>
            UpahJe<span style={{ color: 'rgba(250,249,245,0.55)' }}>.my</span>
          </p>
          <p className="type-small mt-4" style={{ color: 'rgba(250,249,245,0.66)' }}>
            {copy.tagline}
          </p>
        </div>

        <div>
          <p className="type-label" style={columnLabel}>{copy.categories}</p>
          <ul className="mt-4 space-y-3">
            {ARTICLE_CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link href={categoryPath(lang, category.slug)} className="type-small ui-link" style={linkStyle}>
                  {categoryLabel(category.slug, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="type-label" style={columnLabel}>{copy.journal}</p>
          <ul className="mt-4 space-y-3">
            {LANGUAGES.map((language) => (
              <li key={language.code}>
                <Link href={`/${language.code}/articles`} hrefLang={language.htmlLang} className="type-small ui-link" style={linkStyle}>
                  {language.native}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="type-label" style={columnLabel}>Site</p>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href={`/${other}`} className="type-small ui-link" style={linkStyle}>
                {LANGUAGES.find((l) => l.code === other)?.native}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/dev-notes`} className="type-small ui-link" style={linkStyle}>
                Developer notes
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/about`} className="type-small ui-link" style={linkStyle}>
                About
              </Link>
            </li>
            <li><Link href="/privacy" className="type-small ui-link" style={linkStyle}>Privacy</Link></li>
            <li><Link href="/terms" className="type-small ui-link" style={linkStyle}>Terms</Link></li>
          </ul>
        </div>
      </div>

      <div className="container-editorial border-t py-6" style={{ borderColor: 'rgba(250,249,245,0.16)' }}>
        <p className="type-small" style={{ color: 'rgba(250,249,245,0.55)' }}>
          © {year} UpahJe.my. Practical knowledge, clearly explained.
        </p>
      </div>
    </footer>
  )
}
