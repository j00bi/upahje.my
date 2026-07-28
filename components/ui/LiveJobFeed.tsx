'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'

const FLOW_MS = [
  ['01', 'Tulis brief yang jelas', 'Apa kerja, di mana, bila, dan anggaran bajet.'],
  ['02', 'Semak siapa yang sesuai', 'Bandingkan profil, kerja terdahulu dan ketersediaan.'],
  ['03', 'Pilih bila anda yakin', 'Setuju butiran kerja sebelum bergerak ke pembayaran.'],
]

const FLOW_EN = [
  ['01', 'Write a clear brief', 'What needs doing, where, when, and your estimated budget.'],
  ['02', 'Review suitable people', 'Compare profiles, previous work, and availability.'],
  ['03', 'Choose when ready', 'Agree on the details before moving to payment.'],
]

/** A transparent early-marketplace alternative to a fabricated live activity feed. */
export default function LiveJobFeed() {
  const { isEnglish } = useLanguage()
  const flow = isEnglish ? FLOW_EN : FLOW_MS

  return (
    <aside className="rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_20px_50px_rgba(10,42,18,0.08)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-label" style={{ color: 'var(--color-green-mid)' }}>
            {isEnglish ? 'How a brief moves' : 'Cara brief bergerak'}
          </p>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-[var(--color-ink-deep)]">
            {isEnglish ? 'One brief. A cleaner decision.' : 'Satu brief. Keputusan yang lebih kemas.'}
          </h3>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-50 text-lg" aria-hidden="true">↗</span>
      </div>

      <ol className="mt-6 space-y-3">
        {flow.map(([number, title, description]) => (
          <li key={number} className="flex gap-3 rounded-2xl bg-[var(--color-canvas-soft)] p-3.5">
            <span className="grid h-8 w-8 flex-none place-items-center rounded-xl bg-[var(--color-green-deep)] text-xs font-bold text-white">
              {number}
            </span>
            <span>
              <strong className="block text-sm text-[var(--color-ink-deep)]">{title}</strong>
              <small className="mt-1 block text-xs leading-5 text-[var(--color-body)]">{description}</small>
            </span>
          </li>
        ))}
      </ol>

      <Link
        href="/jobs/post"
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[var(--color-green-mid)] px-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--color-green-deep)] hover:shadow-lg"
      >
        {isEnglish ? 'Write your brief' : 'Tulis brief anda'} <span className="ml-2" aria-hidden="true">→</span>
      </Link>
      <p className="mt-3 text-center text-[11px] leading-4 text-[var(--color-mute)]">
        {isEnglish
          ? 'You remain in control—UpahJe does not assign the job to the first applicant.'
          : 'Anda kekal memilih—UpahJe tidak menyerahkan kerja kepada orang pertama yang memohon.'}
      </p>
    </aside>
  )
}
