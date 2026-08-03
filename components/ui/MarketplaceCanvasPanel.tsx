'use client'

import { useEffect, useState } from 'react'
import { Check, MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import { Grid } from '@/components/canvasui/Grid'
import { useLanguage } from '@/lib/i18n'

interface MarketplaceCanvasPanelProps {
  variant: 'auth' | 'post'
}

export default function MarketplaceCanvasPanel({ variant }: MarketplaceCanvasPanelProps) {
  const { isEnglish } = useLanguage()
  const [canRenderCanvas, setCanRenderCanvas] = useState(false)
  const isAuth = variant === 'auth'

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const sync = () => setCanRenderCanvas(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  const copy = isAuth
    ? {
        eyebrow: isEnglish ? 'One account, two paths' : 'Satu akaun, dua hala',
        title: isEnglish
          ? 'Return to work already in motion.'
          : 'Sambung semula urusan yang sedang bergerak.',
        description: isEnglish
          ? 'Your drafts, applications, and hiring decisions stay together.'
          : 'Draf, permohonan, dan pilihan talent anda kekal di satu tempat.',
        rows: isEnglish
          ? ['Saved job drafts', 'Profiles ready to review', 'Your decision stays private']
          : ['Draf kerja tersimpan', 'Profil sedia untuk disemak', 'Pilihan anda kekal peribadi'],
        cardTitle: isEnglish ? 'Weekly office cleaning' : 'Pembersihan pejabat mingguan',
        cardMeta: isEnglish ? 'KL Sentral · RM80–120' : 'KL Sentral · RM80–120',
      }
    : {
        eyebrow: isEnglish ? 'A clearer brief' : 'Brief yang lebih jelas',
        title: isEnglish
          ? 'Better details lead to better matches.'
          : 'Butiran yang tepat bantu anda jumpa talent yang sesuai.',
        description: isEnglish
          ? 'Tell people what, where, when, and your expected budget before they respond.'
          : 'Terangkan kerja, lokasi, masa, dan bajet sebelum talent memberi respons.',
        rows: isEnglish
          ? ['Use a specific job title', 'Set a realistic location and budget', 'Review everything before publishing']
          : ['Gunakan tajuk kerja yang khusus', 'Tetapkan lokasi dan bajet yang realistik', 'Semak semuanya sebelum diterbitkan'],
        cardTitle: isEnglish ? 'Paint a two-room terrace house' : 'Cat rumah teres dua bilik',
        cardMeta: isEnglish ? 'Kajang · This Saturday' : 'Kajang · Sabtu ini',
      }

  if (!canRenderCanvas) return null

  return (
    <Grid
      className="h-full"
      tileSize={156}
      gap={3}
      cornerRadius={18}
      amplitude={0.6}
      waveSpeed={0.32}
      frequency={10}
      waveWidth={0.055}
      fadeTime={0.3}
      maxLift={0.28}
      liftHeight={11}
      perspective={1800}
      tilt={0.16}
      shading={0.05}
      tint={[0.66, 0.96, 0.76]}
      tintStrength={0.08}
      idleRipples={5.5}
    >
      <div className="relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-[30px] bg-[var(--color-green-deep)] p-8 text-white lg:p-10">
        <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-teal-300/15 blur-3xl" />
        </div>

        <div className="relative">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h2 className="mt-5 max-w-md text-3xl font-bold leading-tight tracking-[-0.04em] lg:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/65 lg:text-base">
            {copy.description}
          </p>
        </div>

        <div className="relative mt-8 space-y-3">
          {copy.rows.map((row) => (
            <div key={row} className="flex items-center gap-3 text-sm text-white/80">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-emerald-200">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              {row}
            </div>
          ))}
        </div>

        <div className="relative mt-auto pt-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-200">
                  {isEnglish ? 'Example brief' : 'Contoh brief'}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{copy.cardTitle}</h3>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-200 text-emerald-950">
                {isAuth ? <ShieldCheck className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}
              </span>
            </div>
            <p className="mt-4 text-sm text-white/60">{copy.cardMeta}</p>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
              <span className="text-white/50">
                {isEnglish ? 'Ready to review' : 'Sedia untuk disemak'}
              </span>
              <span className="rounded-full bg-emerald-200/15 px-3 py-1 font-semibold text-emerald-200">
                {isEnglish ? 'Clear brief' : 'Brief jelas'}
              </span>
            </div>
          </div>
          <p className="mt-4 text-center text-[11px] text-white/40">
            {isEnglish
              ? 'Move your pointer across the panel'
              : 'Gerakkan penuding anda di atas panel'}
          </p>
        </div>
      </div>
    </Grid>
  )
}
