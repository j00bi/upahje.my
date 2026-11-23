'use client'

import { useEffect, useRef } from 'react'

/**
 * Thin lime reading-progress rule. Fixed to the viewport so it cannot shift
 * layout, and it only writes a transform, never a height. Reduced-motion users
 * get the same rule without a transition.
 */
export default function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${ratio})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div aria-hidden className="reading-progress">
      <div ref={bar} className="reading-progress-bar" />
    </div>
  )
}
