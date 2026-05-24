import Link from 'next/link'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)]">
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="section-label mb-3" style={{ color: 'var(--color-teal-mid)' }}>
            Tentang Kami
          </p>
          <h1 className="font-display-xl mb-6" style={{ color: 'var(--color-ink-deep)' }}>
            Malaysia&apos;s local hiring platform, built for trust.
          </h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-body)' }}>
            UpahJe.my connects Malaysians with trusted local help — from photographers and
            videographers to electricians, cleaners, and freelance professionals.
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-body)' }}>
            We started because hiring help in Malaysia was either too risky (WhatsApp randos)
            or too expensive (agency fees). We wanted a middle ground: a platform where workers
            can verify their identity, clients can see real portfolios and reviews, and
            payments are held safely until the job is done right.
          </p>

          <div className="grid gap-6 sm:grid-cols-3 my-12">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-sm mb-1">Escrow Protected</h3>
              <p className="text-xs text-neutral-500">Pay only when you&apos;re satisfied</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
              <div className="text-3xl mb-3">✓</div>
              <h3 className="font-semibold text-sm mb-1">Verified Profiles</h3>
              <p className="text-xs text-neutral-500">ID, skills, and reviews on every profile</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
              <div className="text-3xl mb-3">🇲🇾</div>
              <h3 className="font-semibold text-sm mb-1">Malaysia-First</h3>
              <p className="text-xs text-neutral-500">Local pricing, local trust, local support</p>
            </div>
          </div>

          <h2 className="font-display-lg mb-4" style={{ color: 'var(--color-ink-deep)' }}>
            Why we built this
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-body)' }}>
            Every Malaysian has had this experience: you need a photographer for your wedding,
            a plumber for a burst pipe, or a runner for same-day delivery. You ask around, post
            on social media, or scroll through WhatsApp groups — and hope you don&apos;t get ghosted.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-body)' }}>
            UpahJe changes that. We make it easy to find verified workers, compare their work,
            and pay only when the job is done. No more awkward follow-ups, no more paying upfront
            to strangers.
          </p>

          <h2 className="font-display-lg mb-4 mt-12" style={{ color: 'var(--color-ink-deep)' }}>
            Our team
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-body)' }}>
            We&apos;re a small team based in Malaysia who believe that technology should make
            local hiring safer, faster, and more accessible for everyone. We&apos;re actively
            onboarding talent across KL and Selangor — and expanding nationwide.
          </p>
          <p className="text-sm" style={{ color: 'var(--color-mute)' }}>
            Have questions or feedback?{' '}
            <Link href="/contact" className="font-semibold underline" style={{ color: 'var(--color-teal-mid)' }}>
              Get in touch
            </Link>
            .
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}
