'use client'

import { useEffect, useState } from 'react'

const WORDS = ['Kahwin?', 'Paip Tersumbat?', 'Shoot Produk?', 'Pindah Rumah?', 'Nak Tutor?', 'Nak Runner?']
const DURATION = 2800

export function NakWordTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % WORDS.length), DURATION)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="inline-flex flex-col h-[1.2em] overflow-hidden align-middle">
      <span
        className="transition-all duration-500 ease-in-out"
        style={{ transform: `translateY(-${index * 100}%)` }}
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