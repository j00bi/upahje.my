'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export type TocItem = { id: string; label: string }

/**
 * Table of contents: plain links in the HTML, so it works with JS disabled.
 * The entrance is a CSS animation whose final state is visible, never an
 * inline opacity from JS. The client part marks the section in view with
 * aria-current; the reveal collapses under prefers-reduced-motion.
 */
export default function ArticleToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!items.length) return
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element))
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) setActive(visible[0].target.id)
      },
      { rootMargin: '-88px 0px -60% 0px', threshold: [0, 1] },
    )
    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav aria-label="On this page" className="toc-reveal flex flex-col gap-0.5">
      {items.map((item) => {
        const current = item.id === active
        return (
          <Link
            key={item.id}
            href={`#${item.id}`}
            aria-current={current ? 'location' : undefined}
            className="py-1.5 pl-3 text-[13px] leading-5 transition-colors duration-150"
            style={{
              borderLeft: `2px solid ${current ? 'var(--ui-accent)' : 'transparent'}`,
              color: current ? 'var(--ui-ink)' : 'var(--ui-muted)',
              fontWeight: current ? 600 : 400,
            }}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
