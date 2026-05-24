'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const PHRASES = [
  'Kahwin?',
  'Paip Tersumbat?',
  'Shoot Produk?',
  'Pindah Rumah?',
  'Nak Tutor?',
  'Nak Runner?',
]

export function HeroTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-flex items-center gap-2">
      <span className="font-black" style={{ color: 'var(--color-ink)' }}>
        Nak
      </span>
      <span className="relative inline-flex overflow-hidden h-[1.2em]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={PHRASES[index]}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="block"
            style={{ color: 'var(--color-amber-deep)' }}
          >
            {PHRASES[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
