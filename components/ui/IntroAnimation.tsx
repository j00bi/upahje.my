'use client'

import { useEffect, useState } from 'react'

/**
 * IntroAnimation — simple brand splash on first visit per session.
 * Uses a CSS fade transition instead of a video file.
 * Shows the brand name with a subtle scale-in, then fades out.
 */
export default function IntroAnimation() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('upahje-intro-seen')

    if (seen) {
      document.documentElement.removeAttribute('data-intro')
      setVisible(false)
      return
    }

    sessionStorage.setItem('upahje-intro-seen', 'true')

    // Start fade-out after a brief display
    const fadeTimer = setTimeout(() => setFading(true), 1200)
    // Remove from DOM after fade completes
    const removeTimer = setTimeout(() => {
      document.documentElement.removeAttribute('data-intro')
      setVisible(false)
    }, 1800)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
      document.documentElement.removeAttribute('data-intro')
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className={`text-center transition-transform duration-700 ${fading ? 'scale-95' : 'scale-100'}`}>
        <div className="text-2xl font-bold tracking-tight text-green-deep">
          UpahJe.my
        </div>
        <div className="mt-1 text-xs text-mute tracking-widest uppercase">
          Local work, verified
        </div>
      </div>
    </div>
  )
}
