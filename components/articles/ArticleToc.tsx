'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

export type TocItem = { id: string; label: string }

/**
 * Table of contents: plain links in the HTML, so it works with JS disabled.
 * The client part adds the one allowed scroll reveal and marks the section in
 * view with aria-current. Motion collapses under prefers-reduced-motion.
 */
export default function ArticleToc({ items }: { items: TocItem[] }) {
  const reduce = useReducedMotion()
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
    <motion.nav
      aria-label="On this page"
      initial={reduce ? false : { opacity: 0, y: 6 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-0.5"
    >
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
    </motion.nav>
  )
}
