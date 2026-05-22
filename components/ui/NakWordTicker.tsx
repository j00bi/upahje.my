'use client'

import { useEffect, useRef } from 'react'

const WORDS = ['Kahwin?', 'Paip Tersumbat?', 'Shoot Produk?', 'Pindah Rumah?', 'Nak Tutor?', 'Nak Runner?']
const DURATION = 2800

export function NakWordTicker() {
  const indexRef = useRef(0)
  const tickerRef = useRef<HTMLSpanElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const rafRef = useRef<number>()

  useEffect(() => {
    const tick = () => {
      indexRef.current = (indexRef.current + 1) % WORDS.length
      // Use rAF to align with browser paint cycle
      rafRef.current = requestAnimationFrame(() => {
        if (tickerRef.current) {
          tickerRef.current.style.transform = `translateY(-${indexRef.current * 100}%)`
        }
      })
    }

    // Use recursive setTimeout instead of setInterval to avoid clock drift
    let timeout: ReturnType<typeof setTimeout>
    const schedule = () => {
      timeout = setTimeout(() => {
        tick()
        schedule()
      }, DURATION)
    }
    schedule()

    // Pause when tab hidden — skip unnecessary ticks
    const onVisibility = () => {
      if (document.hidden) {
        clearTimeout(timeout)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      } else {
        schedule()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <span className="inline-flex flex-col h-[1.2em] overflow-hidden align-middle">
      <span
        ref={tickerRef}
        className="transition-all duration-500 ease-in-out"
        style={{ transform: 'translateY(0%)', willChange: 'transform' }}
      >
        {WORDS.map((w, i) => (
          <span key={i} className="block h-[1.2em] leading-[1.2]">
            {w}
          </span>
        ))}
      </span>
    </span>
  )
}
