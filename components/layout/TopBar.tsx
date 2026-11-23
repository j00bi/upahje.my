import Link from 'next/link'
import { ARTICLE_CATEGORIES, categoryLabel, LANGUAGES, languageByCode } from '@/lib/articles.mjs'

/**
 * Content-site topbar: one line at lg, wordmark plus a native <details> sheet
 * below 768px (no client JS needed to open it). Pillar links, then the language
 * switch, then Articles, per the design spec. The language href is supplied by
 * the page so an article can point at its actual translation, not a guessed slug.
 */
export default function TopBar({ lang, otherHref }: { lang: string; otherHref: string }) {
  const other = lang === 'en' ? 'ms' : 'en'
  const otherLanguage = languageByCode(other)

  const languageSwitch = (
    <div className="inline-flex h-7 items-center overflow-hidden rounded-[8px] border" role="group" aria-label="Language">
      {LANGUAGES.map((language) => {
        const active = language.code === lang
        return (
          <Link
            key={language.code}
            href={active ? `/${language.code}` : otherHref}
            hrefLang={language.htmlLang}
            aria-current={active ? 'true' : undefined}
            className="inline-flex h-full min-w-[44px] items-center justify-center px-2 text-[13px] font-medium"
            style={{
              color: active ? 'var(--ui-ink)' : 'var(--ui-muted)',
              fontWeight: active ? 700 : 500,
              boxShadow: active ? 'inset 0 -2px 0 var(--ui-accent)' : undefined,
              borderLeft: language.code === LANGUAGES[1].code ? '1px solid var(--ui-rule)' : undefined,
            }}
          >
            {language.code}
          </Link>
        )
      })}
    </div>
  )

  return (
    <header className="ui-topbar sticky top-0 z-50">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href={`/${lang}`}
          className="text-[15px] font-bold tracking-tight"
          style={{ color: 'var(--ui-ink)' }}
        >
          UpahJe.my
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-6 lg:flex">
          {ARTICLE_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/${lang}/articles/category/${category.slug}`}
              className="ui-link text-[13px] font-medium"
            >
              {categoryLabel(category.slug, lang)}
            </Link>
          ))}
          {languageSwitch}
          <Link href={`/${lang}/repos`} className="ui-link text-[13px] font-medium">
            {lang === 'ms' ? 'Repo' : 'Repos'}
          </Link>
          <Link href={`/${lang}/resources`} className="ui-link text-[13px] font-medium">
            {lang === 'ms' ? 'Pustaka' : 'Library'}
          </Link>
          <Link href={`/${lang}/articles`} className="ui-link text-[13px] font-semibold" style={{ color: 'var(--ui-ink)' }}>
            Articles
          </Link>
        </nav>

        <details className="relative lg:hidden">
          <summary
            className="ui-focus inline-flex h-11 w-11 list-none items-center justify-center rounded-[10px] border"
            style={{ borderColor: 'var(--ui-rule)', color: 'var(--ui-ink)' }}
            aria-label="Open menu"
          >
            <span aria-hidden className="flex flex-col gap-[5px]">
              <span className="block h-[1.5px] w-5" style={{ background: 'currentColor' }} />
              <span className="block h-[1.5px] w-5" style={{ background: 'currentColor' }} />
              <span className="block h-[1.5px] w-5" style={{ background: 'currentColor' }} />
            </span>
          </summary>
          <div
            className="absolute right-0 top-12 w-64 rounded-[10px] border p-4 shadow-sm"
            style={{ background: 'var(--ui-surface)', borderColor: 'var(--ui-rule)' }}
          >
            <nav aria-label="Sections" className="flex flex-col gap-1">
              {ARTICLE_CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${lang}/articles/category/${category.slug}`}
                  className="ui-link rounded-[8px] px-2 py-3 text-[14px]"
                >
                  {categoryLabel(category.slug, lang)}
                </Link>
              ))}
              <Link href={`/${lang}/repos`} className="ui-link rounded-[8px] px-2 py-3 text-[14px]">
                {lang === 'ms' ? 'Repo' : 'Repos'}
              </Link>
              <Link href={`/${lang}/resources`} className="ui-link rounded-[8px] px-2 py-3 text-[14px]">
                {lang === 'ms' ? 'Pustaka' : 'Library'}
              </Link>
              <Link href={`/${lang}/articles`} className="ui-link rounded-[8px] px-2 py-3 text-[14px] font-semibold" style={{ color: 'var(--ui-ink)' }}>
                Articles
              </Link>
              <div className="mt-2 flex items-center justify-between gap-3 border-t pt-3" style={{ borderColor: 'var(--ui-rule)' }}>
                <Link href={otherHref} hrefLang={otherLanguage.htmlLang} className="ui-link px-2 py-3 text-[14px] font-semibold">
                  {otherLanguage.native}
                </Link>
              </div>
            </nav>
          </div>
        </details>
      </div>
    </header>
  )
}
