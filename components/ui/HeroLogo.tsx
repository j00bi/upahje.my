'use client'

import { useState, useEffect } from 'react'

export default function HeroLogo() {
  const [showIntro, setShowIntro] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Animation is ~6s. Start fade-out at 5.5s (near end of loop cycle)
    const fadeTimer = setTimeout(() => setFadeOut(true), 5500)
    const hideTimer = setTimeout(() => setShowIntro(false), 6500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!showIntro) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-100 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <video
        src="/upahje-logo-animation.mp4"
        autoPlay
        muted
        loop={false}
        playsInline
        className="w-36 h-36 md:w-48 md:h-48 object-contain"
      />
      {/* Show tagline once animation is close to done */}
      <p
        className={`mt-6 text-base md:text-lg text-center text-stone-500 transition-opacity duration-700 ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        Upah sesiapa. Untuk apa sahaja.
      </p>
    </div>
  )
}
