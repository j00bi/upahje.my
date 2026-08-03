'use client'

import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import LiveJobFeed from '@/components/ui/LiveJobFeed'
import FadeUp from '@/components/motion/FadeUp'
import HeroNew from '@/components/ui/HeroNew'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import { getActiveCategories } from '@/lib/categories'
import { FEATURED_TALENTS } from '@/data/talentProfiles'
import { useLanguage } from '@/lib/i18n'

const stepsMs = [
  {
    num: '01', title: 'Post kerja anda',
    desc: 'Terangkan kerja, lokasi, bajet dan bila anda perlukan bantuan. Percuma untuk bermula.',
  },
  {
    num: '02', title: 'Banding & pilih',
    desc: 'Semak profil, portfolio, pengesahan dan cadangan harga sebelum membuat pilihan.',
  },
  {
    num: '03', title: 'Setuju sebelum mula',
    desc: 'Pilih talent, sahkan butiran kerja, dan pastikan kedua-dua pihak jelas tentang langkah seterusnya.',
  },
]

const stepsEn = [
  {
    num: '01', title: 'Post your job',
    desc: 'Describe the work, location, budget, and when you need help. It is free to start.',
  },
  {
    num: '02', title: 'Compare and choose',
    desc: 'Review profiles, portfolios, verification, and proposed rates before deciding.',
  },
  {
    num: '03', title: 'Agree before work starts',
    desc: 'Choose talent, confirm the details, and make sure both sides know what happens next.',
  },
]

const trustItemsMs = [
  { title: 'Profil yang boleh disemak', desc: 'Lihat kemahiran, portfolio, lokasi, dan status pengesahan sebelum anda pilih.' },
  { title: 'Brief yang jelas', desc: 'Lokasi, masa, bajet, dan skop kerja diberi tempat yang sama supaya semua orang faham.' },
  { title: 'Pilihan kekal di tangan anda', desc: 'Memohon kerja tidak terus menjadikan seseorang pilihan anda. Anda masih yang membuat keputusan.' },
]

const trustItemsEn = [
  { title: 'Profiles you can review', desc: 'See skills, portfolios, location, and verification status before choosing.' },
  { title: 'Clear job briefs', desc: 'Location, timing, budget, and scope stay together so everyone understands the work.' },
  { title: 'You remain in control', desc: 'An application does not automatically assign someone to your job. You make the decision.' },
]

const categoryEnglish: Record<string, { cluster: string; problem: string }> = {
  photography: { cluster: 'Shoot & content', problem: 'Need product photos?' },
  videography: { cluster: 'Shoot & content', problem: 'Need a video shoot?' },
  'home-services': { cluster: 'Home services', problem: 'Something broken at home?' },
  'web-design': { cluster: 'Digital & design', problem: 'Need a website?' },
}

const featuredAvatarTones = ['#c8efd3', '#cce9e4', '#f7dfae', '#d9d5f5']

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase()
}

export default function Home() {
  const activeCats = getActiveCategories()
  const { isEnglish } = useLanguage()
  const steps = isEnglish ? stepsEn : stepsMs
  const trustItems = isEnglish ? trustItemsEn : trustItemsMs
  const decisionItems = isEnglish
    ? [
        { title: 'Review previous work', desc: 'A portfolio helps you judge style, experience, and the kind of work already completed.', num: '01' },
        { title: 'Read the profile carefully', desc: 'Check services, coverage area, rates, and availability before making contact.', num: '02' },
        { title: 'Clarify details early', desc: 'A good brief reduces confusion about scope, timing, location, and budget.', num: '03' },
      ]
    : [
        { title: 'Tengok hasil kerja', desc: 'Portfolio membantu anda nilai gaya, pengalaman, dan jenis kerja yang pernah dibuat.', num: '01' },
        { title: 'Baca profil dengan teliti', desc: 'Semak servis yang ditawarkan, kawasan liputan, kadar, dan ketersediaan sebelum hubungi.', num: '02' },
        { title: 'Jelaskan butiran awal', desc: 'Brief yang baik mengurangkan salah faham tentang skop, masa, lokasi, dan bajet.', num: '03' },
      ]

  return (
    <div className="min-h-screen">
      {/* ────────────────── HERO ────────────────── */}
      <HeroNew />

      {/* ────────────────── BROWSE BY NEED ────────────────── */}
      <section className="px-6 py-20 md:py-24" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="section-label mb-3" style={{ color: 'var(--color-green-mid)' }}>
                {isEnglish ? 'Start with what you need' : 'Mulakan dengan keperluan anda'}
              </p>
              <h2 className="font-display-xl" style={{ color: 'var(--color-ink-deep)' }}>
                {isEnglish ? 'Not just categories. Real work to get done.' : 'Bukan sekadar kategori. Ini kerja yang nak diselesaikan.'}
              </h2>
            </div>
            <Link
              href="/categories"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 transition hover:border-emerald-600 hover:bg-emerald-50"
            >
              {isEnglish ? 'All services' : 'Semua servis'} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <StaggerContainer className="grid gap-4 md:grid-cols-2 md:gap-5">
            {activeCats.map((cat, index) => (
              <StaggerItem key={cat.slug}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className={`group relative block min-h-[232px] overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                    index === 0
                      ? 'border-emerald-900 bg-[var(--color-green-deep)] text-white md:col-span-2'
                      : index === 1
                        ? 'border-emerald-100 bg-emerald-50'
                        : index === 2
                          ? 'border-amber-100 bg-amber-50'
                          : 'border-teal-100 bg-teal-50'
                  }`}
                >
                  <span
                    className={`absolute -right-2 -top-6 text-8xl opacity-20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 sm:text-9xl ${index === 0 ? 'opacity-25' : ''}`}
                    aria-hidden="true"
                  >
                    {cat.emoji}
                  </span>
                  <div className="relative flex h-full flex-col items-start">
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${
                      index === 0 ? 'bg-white/10 text-[var(--color-green-soft)]' : 'bg-white/70 text-[var(--color-green-mid)]'
                    }`}>
                      {isEnglish ? (categoryEnglish[cat.slug]?.cluster ?? cat.name) : cat.clusterLabel}
                    </span>
                    <div className="mt-auto max-w-md">
                      <h3 className={`text-2xl font-bold tracking-tight sm:text-3xl ${index === 0 ? 'text-white' : 'text-[var(--color-ink-deep)]'}`}>
                        {isEnglish ? (categoryEnglish[cat.slug]?.problem ?? cat.name) : cat.problemPhrase}
                      </h3>
                      <p className={`mt-3 max-w-lg text-sm leading-relaxed ${index === 0 ? 'text-white/70' : 'text-[var(--color-body)]'}`}>
                        {cat.description}
                      </p>
                      <span className={`mt-5 inline-flex items-center gap-2 text-sm font-bold ${index === 0 ? 'text-[var(--color-green-soft)]' : 'text-[var(--color-green-mid)]'}`}>
                        {isEnglish ? `Explore ${cat.name}` : `Teroka ${cat.nameMs}`} <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ────────────────── BRIEF + DECISION FLOW ────────────────── */}
      <FadeUp distance={24}>
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            <div>
              <p className="section-label mb-3" style={{ color: 'var(--color-green-mid)' }}>
                {isEnglish ? 'No guesswork' : 'Bukan teka-teki'}
              </p>
              <h2 className="font-display-xl mb-4" style={{ color: 'var(--color-ink-deep)' }}>
                {isEnglish ? 'A clear brief makes choosing easier.' : 'Brief yang jelas buat pilihan jadi lebih mudah.'}
              </h2>
              <p className="max-w-md mb-6" style={{ color: 'var(--color-body)' }}>
                {isEnglish
                  ? 'The clearer your scope, the easier it is to see who genuinely fits. Profiles and portfolios help you judge work—not promises.'
                  : 'Semakin jelas skop kerja anda, semakin mudah untuk melihat siapa yang benar-benar sesuai. Profil dan portfolio membantu anda nilai kerja, bukan sekadar janji.'}
              </p>
              <div className="mt-6">
                <Link href="/talent" className="font-semibold text-sm transition-all hover:gap-2 inline-flex items-center gap-1" style={{ color: 'var(--color-green-mid)' }}>
                  {isEnglish ? 'Review talent profiles →' : 'Semak profil talent →'}
                </Link>
              </div>
            </div>

            <div>
              <LiveJobFeed />
            </div>
          </div>
        </div>
      </section>
      </FadeUp>

      {/* ────────────────── HOW IT WORKS ────────────────── */}
      <FadeUp distance={24}>
      <section id="how-it-works" className="py-20 px-6" style={{ backgroundColor: 'var(--color-canvas-soft)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-3" style={{ color: 'var(--color-green-mid)' }}>
              {isEnglish ? 'How UpahJe works' : 'Cara UpahJe'}
            </p>
            <h2 className="font-display-xl" style={{ color: 'var(--color-ink-deep)' }}>
              {isEnglish ? 'Tell us what you need' : 'Cerita apa yang anda perlukan'}
            </h2>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <StaggerItem key={step.num}>
                <div className={`${i < steps.length - 1 ? 'step-connector' : ''} text-center`}>
                  <div className="flex justify-center mb-4">
                    <div className="step-number">{step.num}</div>
                  </div>
                  <h3 className="font-display-sm mb-2" style={{ color: 'var(--color-ink-deep)' }}>
                    {step.title}
                  </h3>
                  <p className="max-w-xs mx-auto text-sm" style={{ color: 'var(--color-body)' }}>
                    {step.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      </FadeUp>

      {/* ────────────────── FEATURED TALENT ────────────────── */}
      <FadeUp distance={24}>
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="section-label mb-2" style={{ color: 'var(--color-green-mid)' }}>
              {isEnglish ? 'Featured talent' : 'Pilihan talent'}
            </p>
            <h2 className="font-display-xl" style={{ color: 'var(--color-ink-deep)' }}>
              {isEnglish ? 'Profiles you can review' : 'Profil yang boleh anda semak'}
            </h2>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED_TALENTS.map((talent, index) => (
              <StaggerItem key={talent.name}>
              <Link
                href={`/talent/${talent.slug}`}
                className="group block rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  textDecoration: 'none',
                  backgroundColor: 'var(--color-canvas)',
                  border: '1px solid rgba(14, 15, 12, 0.06)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl text-xs font-extrabold text-[var(--color-green-deep)] transition-transform duration-300 group-hover:rotate-3"
                    style={{ backgroundColor: featuredAvatarTones[index % featuredAvatarTones.length] }}
                    aria-hidden="true"
                  >{initials(talent.name)}</div>
                  <div>
                    <div className="font-semibold text-sm flex items-center gap-1.5" style={{ color: 'var(--color-ink)' }}>
                      {talent.name}
                      {talent.verified && <span className="badge badge-verified text-[9px] leading-none">✓</span>}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-body)' }}>
                      {talent.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs mb-3">
                  <span>📍</span>
                  <span style={{ color: 'var(--color-body)' }}>{talent.location}</span>
                </div>
                {talent.availability && (
                  <div className="flex items-center gap-1.5 text-xs mb-3">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: talent.availability.toLowerCase().includes('week') ? 'var(--color-teal-mid)' : 'var(--color-amber-mid)' }} />
                    <span style={{ color: 'var(--color-body)' }}>{talent.availability}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(14, 15, 12, 0.06)' }}>
                  {talent.rating > 0 ? (
                    <span className="text-xs flex items-center gap-1" style={{ color: 'var(--color-ink)' }}>
                      <span className="text-amber-500">★</span> {talent.rating}
                      <span style={{ color: 'var(--color-mute)' }}>({talent.reviewCount})</span>
                    </span>
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--color-mute)' }}>
                      {isEnglish ? 'New to UpahJe' : 'Baru di UpahJe'}
                    </span>
                  )}
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-teal-deep)' }}>
                    {talent.rate}
                  </span>
                </div>
              </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-8">
            <Link href="/talent" className="font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all" style={{ color: 'var(--color-green-mid)' }}>
              {isEnglish ? 'View all talent →' : 'Lihat semua talent →'}
            </Link>
          </div>
        </div>
      </section>
      </FadeUp>

      {/* ────────────────── DECISION CHECKLIST ────────────────── */}
      <FadeUp distance={24}>
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-canvas-soft)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3" style={{ color: 'var(--color-green-mid)' }}>
              {isEnglish ? 'Before you choose' : 'Sebelum anda pilih'}
            </p>
            <h2 className="font-display-xl" style={{ color: 'var(--color-ink-deep)' }}>
              {isEnglish ? 'Do not rely on promises alone.' : 'Jangan bergantung pada janji sahaja.'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {decisionItems.map((item) => (
              <div key={item.num} className="testimonial-card">
                <div className="text-xs font-extrabold tracking-[0.16em]" style={{ color: 'var(--color-green-mid)' }}>{item.num}</div>
                <h3 className="mt-5 text-xl font-bold tracking-tight" style={{ color: 'var(--color-ink-deep)' }}>{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-body)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeUp>

      {/* ────────────────── TRUST & SAFETY ────────────────── */}
      <FadeUp distance={24}>
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-green-deep)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-medium text-sm tracking-widest uppercase" style={{ color: 'var(--color-green-soft)' }}>
                {isEnglish ? 'Built for confident decisions' : 'Bina dengan lebih yakin'}
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-canvas)' }}>
                {isEnglish
                  ? 'More clarity from the first brief to your final choice.'
                  : 'Lebih jelas dari brief pertama sampai anda buat pilihan.'}
              </h2>
              <div className="mt-8 space-y-5">
                {trustItems.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--color-canvas)' }}>
                      {item.title}
                    </h3>
                    <p className="mt-1 text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-3xl p-8 border flex flex-col items-center justify-center text-center hidden md:block"
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <div className="text-4xl mb-4">🔒</div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-canvas)' }}>
                {isEnglish ? 'Choose based on information, not assumptions' : 'Pilih berdasarkan maklumat, bukan andaian'}
              </p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {isEnglish ? 'Profiles · Portfolios · Clear briefs' : 'Profil · Portfolio · Brief yang jelas'}
              </p>
            </div>
          </div>
        </div>
      </section>
      </FadeUp>

      {/* ────────────────── FINAL CTA ────────────────── */}
      <FadeUp distance={24}>
      <section className="hero-band-green" style={{ padding: '100px 24px' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display-xl mb-4" style={{ color: 'var(--color-canvas)' }}>
            {isEnglish ? 'Need it done? UpahJe.' : 'Nak settle kerja? UpahJe.'}
          </h2>
          <p className="max-w-md mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {isEnglish
              ? 'Describe the work, compare suitable talent, and start with confidence. Registration is free.'
              : 'Terangkan kerja anda, bandingkan talent yang sesuai, dan mula dengan lebih yakin. Daftar percuma.'}
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/jobs/post" className="inline-flex items-center justify-center bg-green-mid hover:bg-green-deep text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              {isEnglish ? 'Post a Job' : 'Post Kerja'}
            </Link>
            <Link href="/auth/signup" className="btn-secondary-inverse text-base px-8 py-4">
              {isEnglish ? 'Find Work' : 'Jadi Freelancer'}
            </Link>
          </div>
          <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {isEnglish
              ? 'Need a service? Post a job. Looking for income? Register as talent.'
              : 'Perlukan servis? Post kerja. Nak cari pendapatan? Daftar sebagai talent.'}
          </p>
        </div>
      </section>
      </FadeUp>

      <Footer />
    </div>
  )
}
