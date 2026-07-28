'use client'

import { useLanguage } from '@/lib/i18n'

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-white/20 bg-white/5 p-0.5 text-[11px] font-bold tracking-wide ${compact ? '' : 'shrink-0'}`}
      role="group"
      aria-label="Pilihan bahasa"
    >
      <button
        type="button"
        onClick={() => setLanguage('ms')}
        className={`rounded-md px-2 py-1 transition ${
          language === 'ms'
            ? 'bg-white text-[var(--color-green-deep)]'
            : 'text-white/75 hover:bg-white/10 hover:text-white'
        }`}
        aria-pressed={language === 'ms'}
        aria-label="Gunakan Bahasa Melayu"
      >
        MY
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`rounded-md px-2 py-1 transition ${
          language === 'en'
            ? 'bg-white text-[var(--color-green-deep)]'
            : 'text-white/75 hover:bg-white/10 hover:text-white'
        }`}
        aria-pressed={language === 'en'}
        aria-label="Use English"
      >
        ENG
      </button>
    </div>
  )
}
