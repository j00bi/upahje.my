'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'upahje-theme'

/**
 * Reader-chosen dark mode. Light is the default; the inline script in the root
 * layout applies the saved value before paint, and this button is right of the
 * language switch. 28px visual, 44px hit area, aria-pressed.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark')
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    if (next) document.documentElement.dataset.theme = 'dark'
    else delete document.documentElement.dataset.theme
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
    } catch {
      /* private mode: the choice still applies for this page */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="theme-toggle ui-focus h-7 min-w-[44px] items-center justify-center rounded-[8px] border px-2 text-[13px] font-medium"
      style={{
        borderColor: 'var(--ui-rule)',
        color: 'var(--ui-body)',
        background: 'transparent',
      }}
    >
      {dark ? 'Light' : 'Dark'}
    </button>
  )
}
