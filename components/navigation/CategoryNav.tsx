import Link from 'next/link'
import { LANGUAGES } from '@/lib/articles.mjs'

/**
 * Site chrome for the content site. The marketplace links that used to live here
 * (Browse, Categories, Sign in, Get Started) are gone with the pivot; those
 * routes still exist but are unlinked and noindexed.
 */
export default function CategoryNav() {
  return (
    <nav className="nav-bar" aria-label="Site">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/en" className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-canvas)' }}>
          UpahJe.my
        </Link>
        <div className="flex items-center gap-2 sm:gap-6">
          <Link href="/en/articles" className="nav-link" hrefLang="en-MY">
            Articles
          </Link>
          {LANGUAGES.map((language) => (
            <Link
              key={language.code}
              href={`/${language.code}`}
              className="nav-link"
              hrefLang={language.htmlLang}
            >
              {language.code.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
