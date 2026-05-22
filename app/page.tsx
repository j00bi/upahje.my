import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import LiveJobFeed from '@/components/ui/LiveJobFeed'
import FadeUp from '@/components/motion/FadeUp'
import HeroNew from '@/components/ui/HeroNew'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import { MARKETPLACE_CATEGORIES } from '@/lib/categories'
import { FEATURED_TALENTS } from '@/data/talentProfiles'

const featuredCategories = MARKETPLACE_CATEGORIES.filter((category) =>
  ['photography', 'videography', 'home-services', 'electrical-trade', 'admin-support', 'web-design'].includes(category.slug),
)

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
  return (
    <div className="min-h-screen">
      {/* ─────────────── HERO ─────────────── */}
      <HeroNew />

      {/* ─────────────── LIVE JOB FEED + GALLERY ─────────────── */}
      <FadeUp distance={24}>
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-canvas-soft)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            <div>
              <p className="section-label mb-3" style={{ color: 'var(--color-green-mid)' }}>
                Built-in Portfolio
              </p>
              <h2 className="font-display-xl mb-4" style={{ color: 'var(--color-ink-deep)' }}>
                Browse real work<br />before you hire.
              </h2>
              <p className="max-w-md mb-6" style={{ color: 'var(--color-body)' }}>
                From event shoots to design, repairs, and freelance projects — see what local workers have delivered.
              </p>
              <div className="mt-6">
                <Link href="/talent" className="font-semibold text-sm transition-all hover:gap-2 inline-flex items-center gap-1" style={{ color: 'var(--color-green-mid)' }}>
                  Browse all portfolios →
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

      {/* ─────────────── HOW IT WORKS ─────────────── */}
      <FadeUp distance={24}>
      <section id="how-it-works" className="py-20 px-6" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-3" style={{ color: 'var(--color-green-mid)' }}>
              Cara UpahJe
            </p>
            <h2 className="font-display-xl" style={{ color: 'var(--color-ink-deep)' }}>
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

      {/* ─────────────── FEATURED TALENT ─────────────── */}
      <FadeUp distance={24}>
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-canvas-soft)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="section-label mb-2" style={{ color: 'var(--color-green-mid)' }}>
              Top Talent
            </p>
            <h2 className="font-display-xl" style={{ color: 'var(--color-ink-deep)' }}>
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
                    <div className="font-semibold text-sm" style={{ color: 'var(--color-ink)' }}>
                      {talent.name}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-body)' }}>
                      {talent.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs mb-3">
                  <span style={{ color: 'var(--color-mute)' }}>📍</span>
                  <span style={{ color: 'var(--color-body)' }}>{talent.location}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(14, 15, 12, 0.06)' }}>
                  {talent.rating > 0 ? (
                    <span className="badge badge-positive text-xs">★ {talent.rating} ({talent.reviewCount})</span>
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--color-mute)' }}>New to UpahJe</span>
                  )}
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-ink-deep)' }}>
                    {talent.rate}
                  </span>
                </div>
              </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-8">
            <Link href="/talent" className="font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all" style={{ color: 'var(--color-green-mid)' }}>
              View all talent →
            </Link>
          </div>
        </div>
      </section>
      </FadeUp>

      {/* ─────────────── TRUST & SAFETY ─────────────── */}
      <FadeUp distance={24}>
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-green-deep)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-medium text-sm tracking-widest uppercase" style={{ color: 'var(--color-primary)' }}>
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

      {/* ─────────────── FINAL CTA ─────────────── */}
      <FadeUp distance={24}>
      <section className="hero-band-green" style={{ padding: '100px 24px' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display-xl mb-4" style={{ color: 'var(--color-canvas)' }}>
            Nak settle kerja? UpahJe.
          </h2>
          <p className="max-w-md mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Cari orang, setuju harga, bayar bila siap. Daftar percuma.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/jobs/post" className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-green-deep font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              Post Kerja
            </Link>
            <Link href="/auth/signup" className="btn-secondary-inverse text-base px-8 py-4">
              Cari Upah
            </Link>
          </div>
        </div>
      </section>
      </FadeUp>

      <Footer />
    </div>
  )
}