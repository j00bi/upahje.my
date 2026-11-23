import Link from 'next/link'
import { LANGUAGES, languageByCode } from '@/lib/articles.mjs'
import { TOPICS, topicLabel } from '@/lib/topics.mjs'

/**
 * Publication header. One line at lg, a native <details> sheet below 768px so
 * it still works with JavaScript off. Semantic structure only: no article
 * content lives here. Search is deliberately absent until Phase 6 ships a real
 * index, because a control that opens nothing is worse than no control.
 */
export default function TopBar({ lang, otherHref }: { lang: string; otherHref: string }) {
  const other = lang === 'en' ? 'ms' : 'en'
  const otherLanguage = languageByCode(other)
  // Five topics in one link: the topic index carries the counts. Repos and the
  // library moved to Developer notes in the footer.
  // One Topics link in the bar: the five topics and their counts live on the
  // topic pages, where the numbers can be read without a crowded header.
  const sections = [{ href: `/${lang}/topics`, label: lang === 'ms' ? 'Topik' : 'Topics' }]
  const more: { href: string; label: string }[] = []

  const languageSwitch = (
    <div className="inline-flex h-9 items-center overflow-hidden rounded-[8px] border" role="group" aria-label="Language" style={{ borderColor: 'var(--ui-rule)' }}>
      {LANGUAGES.map((language) => {
        const active = language.code === lang
        return (
          <Link
            key={language.code}
            href={active ? `/${language.code}` : otherHref}
            hrefLang={language.htmlLang}
            aria-current={active ? 'true' : undefined}
            className="inline-flex h-full min-w-[44px] items-center justify-center px-2 text-[13px] font-semibold tracking-[0.04em]"
            style={{
              color: active ? 'var(--ui-ink)' : 'var(--ui-muted)',
              boxShadow: active ? 'inset 0 -2px 0 var(--ui-lime)' : undefined,
              borderLeft: language.code === LANGUAGES[1].code ? '1px solid var(--ui-rule)' : undefined,
            }}
          >
            {language.code.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )

  return (
    <header className="ui-topbar sticky top-0 z-50">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="container-editorial flex h-[68px] items-center justify-between gap-6">
        <Link
          href={`/${lang}`}
          className="type-h3"
          style={{ color: 'var(--ui-ink)', letterSpacing: '-0.02em' }}
          aria-label="UpahJe.my, home"
        >
          UpahJe<span style={{ color: 'var(--ui-muted)' }}>.my</span>
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-7 lg:flex">
          {sections.map((item) => (
            <Link key={item.href} href={item.href} className="type-small ui-link" style={{ fontWeight: 500 }}>
              {item.label}
            </Link>
          ))}
          {more.map((item) => (
            <Link key={item.href} href={item.href} className="type-small ui-link" style={{ fontWeight: 500 }}>
              {item.label}
            </Link>
          ))}
          {languageSwitch}
          <Link href={`/${lang}/articles`} className="type-small ui-link" style={{ color: 'var(--ui-ink)', fontWeight: 600 }}>
            {lang === 'ms' ? 'Semua artikel' : 'All articles'}
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
            className="absolute right-0 top-12 w-72 rounded-[10px] border p-4"
            style={{ background: 'var(--ui-surface)', borderColor: 'var(--ui-rule)' }}
          >
            <nav aria-label="Sections" className="flex flex-col">
              {[...sections, ...more, { href: `/${lang}/articles`, label: lang === 'ms' ? 'Semua artikel' : 'All articles' }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="type-small ui-link rounded-[8px] px-2 py-3"
                  style={{ color: 'var(--ui-ink)' }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 border-t pt-3" style={{ borderColor: 'var(--ui-rule)' }}>
                {languageSwitch}
              </div>
            </nav>
          </div>
        </details>
      </div>
    </header>
  )
}
