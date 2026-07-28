'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Language = 'ms' | 'en'

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  isEnglish: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = 'upahje-language'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ms')

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY)
    if (savedLanguage === 'en' || savedLanguage === 'ms') {
      setLanguageState(savedLanguage)
      document.documentElement.lang = savedLanguage
    }
  }, [])

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    window.localStorage.setItem(STORAGE_KEY, nextLanguage)
    document.documentElement.lang = nextLanguage
  }

  const value = useMemo(
    () => ({ language, setLanguage, isEnglish: language === 'en' }),
    [language]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
