'use client'

import MarketplaceCanvasPanel from '@/components/ui/MarketplaceCanvasPanel'
import { useLanguage } from '@/lib/i18n'
import { PostJobForm } from './PostJobForm'

interface PostJobExperienceProps {
  session?: { user: { id: string } } | null
}

export default function PostJobExperience({ session }: PostJobExperienceProps) {
  const { isEnglish } = useLanguage()

  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)] px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
        <div className="hidden lg:sticky lg:top-24 lg:block">
          <MarketplaceCanvasPanel variant="post" />
        </div>

        <section className="rounded-[30px] border border-neutral-200 bg-white p-5 shadow-[0_20px_60px_rgba(11,35,24,0.08)] sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
            {isEnglish ? 'Create a job brief' : 'Cipta brief kerja'}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-neutral-950 sm:text-4xl">
            {isEnglish ? 'What needs to get done?' : 'Apa kerja yang perlu diselesaikan?'}
          </h1>
          <p className="mb-8 mt-3 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base">
            {isEnglish
              ? 'Give talent enough detail to decide whether the job fits. You can review everything before publishing.'
              : 'Beri talent maklumat yang cukup untuk menilai kesesuaian kerja. Anda boleh semak semuanya sebelum diterbitkan.'}
          </p>
          <PostJobForm session={session} />
        </section>
      </div>
    </div>
  )
}
