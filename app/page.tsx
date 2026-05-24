import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import LiveJobFeed from '@/components/ui/LiveJobFeed'
import FadeUp from '@/components/motion/FadeUp'
import HeroNew from '@/components/ui/HeroNew'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import { getActiveCategories, getCategoriesByCluster, MARKETPLACE_CATEGORIES } from '@/lib/categories'
import { FEATURED_TALENTS } from '@/data/talentProfiles'

const steps = [
  {
    num: '01', title: 'Post What You Need',
    desc: 'Describe your project — from event shoots to home repairs. Set your budget and timeline in minutes, free.',
  },
  {
    num: '02', title: 'Compare & Connect',
    desc: 'Browse proposals, check portfolios and reviews, and message workers directly. No commitment until you\'re ready.',
  },
  {
    num: '03', title: 'Pay When It\'s Done',
    desc: 'Pay via FPX or DuitNow. Funds are held in escrow and released only after you approve the work.',
  },
]

const trustItems = [
  { title: 'Verified profiles', desc: 'Workers can show ID, skills, reviews, and portfolio.' },
  { title: 'Escrow-ready', desc: 'Clients approve work before payment is released.' },
  { title: 'Malaysia-first', desc: 'Built around local jobs, local pricing, and local trust.' },
]

export default function Home() {
  const activeCats = getActiveCategories()
  const eventCats = getCategoriesByCluster('events')

  return (
    <div className="min-h-screen">
      {/* ────────────────── HERO ────────────────── */}
      <HeroNew />

      {/* ────────────────── APA NAK SETTLE? ────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3" style={{ color: 'var(--color-teal-mid)' }}>
              Apa Nak Settle?
            </p>
            <h2 className="font-display-xl mb-3" style={{ color: 'var(--color-ink)' }}>
              Pilih apa yang nak dibuat
            </h2>
            <p className="max-w-md mx-auto text-sm" style={{ color: 'var(--color-mute)' }}>
              dari photo shoot sampai home repair — semua ada talent verified
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {activeCats.map((cat) => (
              <StaggerItem key={cat.slug}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="block rounded-2xl border-2 border-transparent bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-mid/20 hover:border-teal-mid/30 group"
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 transition-colors duration-300"
                    style={{ backgroundColor: 'var(--color-teal-soft)' }}
                  >
                    <span className="text-3xl" role="img" aria-label={cat.problemPhrase}>{cat.emoji}</span>
                  </div>
                  <h3 className="font-display-sm mb-3" style={{ color: 'var(--color-ink)' }}>
                    {cat.problemPhrase}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-body)' }}>
                    {cat.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: 'var(--color-teal-soft)',
                      color: 'var(--color-teal-deep)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--color-teal-mid)' }}
                    />
                    {cat.talentCount} talent sedia
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-8">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
              style={{ color: 'var(--color-teal-mid)' }}
            >
              Semua Kategori
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────── STATS BAR ────────────────── */}
      <section
        className="py-14 px-6 border-y"
        style={{ backgroundColor: 'var(--color-teal-deep)', borderColor: 'var(--color-teal-mid)' }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '3', label: 'Kategori Aktif' },
            { number: '5+', label: 'Talent Sedia' },
            { number: 'RM0', label: 'Yuran Platform' },
            { number: '🇲🇾', label: '100% Malaysia' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display-lg mb-1"
                style={{ color: 'var(--color-amber-mid)', letterSpacing: '-0.02em' }}
              >
                {stat.number}
              </div>
              <div
                className="text-xs font-medium tracking-wider"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────── EVENTS CLUSTER ────────────────── */}
      {eventCats.filter((c) => c.talentCount > 0).length > 0 && (
        <FadeUp distance={24}>
        <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-canvas)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-label mb-3" style={{ color: 'var(--color-teal-mid)' }}>
                Ada Majlis Nak Cover?
              </p>
              <h2 className="font-display-xl mb-3" style={{ color: 'var(--color-ink)' }}>
                Event & Wedding Services
              </h2>
              <p className="max-w-md mx-auto text-sm" style={{ color: 'var(--color-mute)' }}>
                Dari pre-wedding sampai hari besar — semua dalam satu ekosistem.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {eventCats.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-mid/20 flex items-start gap-5"
                  style={{
                    backgroundColor: cat.talentCount > 0 ? 'white' : 'var(--color-canvas-soft)',
                    borderColor: cat.talentCount > 0 ? 'rgba(20, 184, 166, 0.3)' : 'rgba(20, 184, 166, 0.1)',
                  }}
                >
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-2xl flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-teal-soft)' }}
                  >
                    <span className="text-2xl" role="img" aria-label={cat.problemPhrase}>{cat.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className="font-display-sm"
                        style={{ color: cat.talentCount > 0 ? 'var(--color-ink)' : 'var(--color-mute)' }}
                      >
                        {cat.problemPhrase}
                      </h3>
                      {cat.talentCount > 0 ? (
                        <span
                          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: 'var(--color-teal-soft)',
                            color: 'var(--color-teal-deep)',
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-teal-mid)' }} />
                          {cat.talentCount} sedia
                        </span>
                      ) : (
                        <Link
                          href="/auth/signup?role=talent"
                          className="text-xs font-medium px-3 py-1 rounded-full transition-colors duration-200"
                          style={{
                            backgroundColor: 'rgba(245, 158, 11, 0.15)',
                            color: '#92400e',
                          }}
                        >
                          + Notify me
                        </Link>
                      )}
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: cat.talentCount > 0 ? 'var(--color-body)' : 'var(--color-mute)' }}
                    >
                      {cat.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        </FadeUp>
      )}

      {/* ────────────────── LIVE JOB FEED + GALLERY ────────────────── */}
      <FadeUp distance={24}>
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            <div>
              <p className="section-label mb-3" style={{ color: 'var(--color-teal-mid)' }}>
                Built-in Portfolio
              </p>
              <h2 className="font-display-xl mb-4" style={{ color: 'var(--color-ink)' }}>
                Browse real work<br />before you hire.
              </h2>
              <p className="max-w-md mb-6" style={{ color: 'var(--color-body)' }}>
                From event shoots to design, repairs, and freelance projects — see what local workers have delivered.
              </p>
              <div className="mt-6">
                <Link href="/talent" className="font-semibold text-sm transition-all hover:gap-2 inline-flex items-center gap-1" style={{ color: 'var(--color-teal-mid)' }}>
                  Semua Portfolio →
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
            <p className="section-label mb-3" style={{ color: 'var(--color-teal-mid)' }}>
              Cara UpahJe
            </p>
            <h2 className="font-display-xl" style={{ color: 'var(--color-ink)' }}>
              Cerita apa yang anda perlukan
            </h2>
          </div>

          <StaggerContainer className="grid md:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <StaggerItem key={step.num}>
                <div className={`${i < steps.length - 1 ? 'step-connector' : ''} text-center`}>
                  <div className="flex justify-center mb-4">
                    <div className="step-number">{step.num}</div>
                  </div>
                  <h3 className="font-display-sm mb-2" style={{ color: 'var(--color-ink)' }}>
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
            <p className="section-label mb-2" style={{ color: 'var(--color-teal-mid)' }}>
              Top Talent
            </p>
            <h2 className="font-display-xl" style={{ color: 'var(--color-ink)' }}>
              Featured freelancers
            </h2>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED_TALENTS.map((talent) => (
              <StaggerItem key={talent.name}>
              <Link
                href={`/talent/${talent.slug}`}
                className="block p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  textDecoration: 'none',
                  backgroundColor: 'var(--color-canvas)',
                  border: '1px solid rgba(14, 15, 12, 0.06)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-full bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(https://i.pravatar.cc/88?img=${talent.avatarImg})` }}
                  />
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
                    <span className="text-xs" style={{ color: 'var(--color-mute)' }}>New to UpahJe</span>
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
            <Link href="/talent" className="font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all" style={{ color: 'var(--color-teal-mid)' }}>
              View all talent →
            </Link>
          </div>
        </div>
      </section>
      </FadeUp>

      {/* ────────────────── TESTIMONIALS ────────────────── */}
      <FadeUp distance={24}>
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-canvas-soft)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3" style={{ color: 'var(--color-teal-mid)' }}>
              Testimoni
            </p>
            <h2 className="font-display-xl" style={{ color: 'var(--color-ink)' }}>
              Apa orang kata pasal UpahJe
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                quote: 'First time using this platform and the whole process was so smooth. Found a great photographer for my wedding within a day.',
                name: 'Sarah Kamarudin',
                role: 'Bride, KL',
                emoji: '👰',
              },
              {
                quote: 'I was skeptical about escrow at first, but it actually saved me. Paid only after the videographer delivered. No more ghosting.',
                name: 'Ahmad Rosli',
                role: 'Small Business Owner',
                emoji: '💼',
              },
              {
                quote: 'Sebagai freelancer, I love that clients can see my portfolio before hiring. No more wasting time explaining my work.',
                name: 'Farah Zainal',
                role: 'Freelancer, KL',
                emoji: '📸',
              },
            ].map((t, i) => (
              <div key={t.name} className="testimonial-card">
                <div className="text-2xl mb-3">{t.emoji}</div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-body)' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: 'rgba(14, 15, 12, 0.06)' }}>
                  <div
                    className="w-9 h-9 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(https://i.pravatar.cc/64?img=${['2', '5', '1'][i]})` }}
                  />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: 'var(--color-mute)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeUp>

      {/* ────────────────── TRUST & SAFETY ────────────────── */}
      <FadeUp distance={24}>
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-teal-deep)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-medium text-sm tracking-widest uppercase" style={{ color: 'var(--color-teal-soft)' }}>
                Trust &amp; Safety
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-canvas)' }}>
                Dibina untuk kurangkan ghosting, scam, dan hirup tenung.
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
                Your money is safe with escrow
              </p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Verified profiles · Escrow protection · Local support
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
            Nak settle kerja? UpahJe.
          </h2>
          <p className="max-w-md mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Cari orang, setuju harga, bayar bila siap. Daftar percuma.
          </p>

          {/* Audience split labels */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/20">
              Untuk Yang Nak Upah
            </span>
            <span className="text-xs text-white/40">·</span>
            <span className="text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/20">
              Untuk Yang Nak Cari Upah
            </span>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/jobs/post" className="inline-flex items-center justify-center bg-teal-mid hover:bg-teal-deep text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              Post Kerja
            </Link>
            <Link href="/auth/signup" className="btn-secondary-inverse text-base px-8 py-4">
              Jadi Freelancer
            </Link>
          </div>
          <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Perlukan servis? Post kerja. Nak cari pendapatan? Daftar freelancer.
          </p>
        </div>
      </section>
      </FadeUp>

      <Footer />
    </div>
  )
}
