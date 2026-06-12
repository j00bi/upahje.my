import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import LiveJobFeed from '@/components/ui/LiveJobFeed'
import FadeUp from '@/components/motion/FadeUp'
import HeroNew from '@/components/ui/HeroNew'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import { getActiveCategories, getCategoriesByCluster } from '@/lib/categories'
import { FEATURED_TALENTS } from '@/data/talentProfiles'

const steps = [
  {
    num: '01',
    title: 'Post What You Need',
    desc: 'Describe your project — from event shoots to home repairs. Set your budget and timeline in minutes, free.',
  },
  {
    num: '02',
    title: 'Compare & Connect',
    desc: 'Browse proposals, check portfolios and reviews, and message workers directly. No commitment until you\'re ready.',
  },
  {
    num: '03',
    title: 'Pay When It\'s Done',
    desc: 'Pay via FPX or DuitNow. Funds are held in escrow and released only after you approve the work.',
  },
]

const trustItems = [
  { title: 'Verified profiles', desc: 'Workers can show ID, skills, reviews, and portfolio.' },
  { title: 'Escrow-ready', desc: 'Clients approve work before payment is released.' },
  { title: 'Malaysia-first', desc: 'Built around local jobs, local pricing, and local trust.' },
]

const testimonials = [
  {
    quote: 'First time using this platform and the whole process was so smooth. Found a great photographer for my wedding within a day.',
    name: 'Sarah Kamarudin',
    role: 'Bride, KL',
    emoji: '👰',
    avatarId: 2,
  },
  {
    quote: 'I was skeptical about escrow at first, but it actually saved me. Paid only after the videographer delivered. No more ghosting.',
    name: 'Ahmad Rosli',
    role: 'Small Business Owner',
    emoji: '💼',
    avatarId: 5,
  },
  {
    quote: 'Sebagai freelancer, I love that clients can see my portfolio before hiring. No more wasting time explaining my work.',
    name: 'Aina Razali',
    role: 'Photographer',
    emoji: '📸',
    avatarId: 1,
  },
]

export default function Home() {
  const activeCats = getActiveCategories()
  const eventCats = getCategoriesByCluster('events')

  return (
    <div className="min-h-screen">
      {/* ────────────────── HERO ────────────────── */}
      <HeroNew />

      {/* ────────────────── APA NAK SETTLE? ────────────────── */}
      <section className="py-20 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3 text-green-mid">Apa Nak Settle?</p>
            <h2 className="font-display-xl text-ink-deep">Pilih apa yang nak dibuat</h2>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {activeCats.map((cat) => (
              <StaggerItem key={cat.slug}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="block rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg text-center"
                >
                  <div className="text-4xl mb-4">{cat.emoji}</div>
                  <h3 className="text-xl font-bold mb-2 text-ink-deep">{cat.problemPhrase}</h3>
                  <p className="text-sm leading-relaxed mb-4 text-body">{cat.description}</p>
                  <span className="badge badge-positive text-xs">{cat.talentCount} talent sedia</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-6">
            <Link
              href="/categories"
              className="font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all text-green-mid"
            >
              See all categories →
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────── STATS BAR ────────────────── */}
      <section className="py-12 px-6 border-y border-neutral-100 bg-canvas">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-item">
            <div className="stat-number">3</div>
            <div className="stat-label">Active Categories</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5+</div>
            <div className="stat-label">Verified Talent</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">RM0</div>
            <div className="stat-label">Platform Fee for Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">🇲🇾</div>
            <div className="stat-label">100% Malaysia</div>
          </div>
        </div>
      </section>

      {/* ────────────────── EVENTS CLUSTER ────────────────── */}
      {eventCats.filter((c) => c.talentCount > 0).length > 0 && (
        <FadeUp distance={24}>
          <section className="py-20 px-6 bg-canvas-soft">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="section-label mb-3 text-green-mid">Ada Majlis Nak Cover?</p>
                <h2 className="font-display-xl mb-3 text-ink-deep">Event & Wedding Services</h2>
                <p className="max-w-md mx-auto text-sm text-body">
                  Dari pre-wedding sampai hari besar — semua dalam satu ekosistem.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {eventCats.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className={`group rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                      cat.talentCount > 0
                        ? 'border-emerald-200 bg-white hover:border-emerald-300'
                        : 'border-dashed border-neutral-300 bg-neutral-50 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{cat.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-bold ${cat.talentCount > 0 ? 'text-neutral-950' : 'text-neutral-500'}`}>
                            {cat.problemPhrase}
                          </h3>
                          {cat.talentCount > 0 ? (
                            <span className="badge badge-positive text-xs">{cat.talentCount} sedia</span>
                          ) : (
                            <span className="text-xs px-2.5 py-1 rounded-full border border-dashed border-neutral-300 text-neutral-400">
                              Coming soon
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mt-1 leading-relaxed ${cat.talentCount > 0 ? 'text-neutral-600' : 'text-neutral-400'}`}>
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>
      )}

      {/* ────────────────── LIVE JOB FEED + PORTFOLIO ────────────────── */}
      <FadeUp distance={24}>
        <section className="py-20 px-6 bg-canvas">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="section-label mb-3 text-green-mid">Built-in Portfolio</p>
                <h2 className="font-display-xl mb-4 text-ink-deep">
                  Browse real work<br />before you hire.
                </h2>
                <p className="max-w-md mb-6 text-body">
                  From event shoots to design, repairs, and freelance projects — see what local workers have delivered.
                </p>
                <Link
                  href="/talent"
                  className="font-semibold text-sm transition-all hover:gap-2 inline-flex items-center gap-1 text-green-mid"
                >
                  Browse all portfolios →
                </Link>
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
        <section id="how-it-works" className="py-20 px-6 bg-canvas-soft">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-3 text-green-mid">Cara UpahJe</p>
              <h2 className="font-display-xl text-ink-deep">Cerita apa yang anda perlukan</h2>
            </div>

            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <StaggerItem key={step.num}>
                  <div className={`${i < steps.length - 1 ? 'step-connector' : ''} text-center`}>
                    <div className="flex justify-center mb-4">
                      <div className="step-number">{step.num}</div>
                    </div>
                    <h3 className="font-display-sm mb-2 text-ink-deep">{step.title}</h3>
                    <p className="max-w-xs mx-auto text-sm text-body">{step.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </FadeUp>

      {/* ────────────────── FEATURED TALENT ────────────────── */}
      <FadeUp distance={24}>
        <section className="py-20 px-6 bg-canvas">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="section-label mb-2 text-green-mid">Top Talent</p>
              <h2 className="font-display-xl text-ink-deep">Featured freelancers</h2>
            </div>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {FEATURED_TALENTS.map((talent) => (
                <StaggerItem key={talent.name}>
                  <Link
                    href={`/talent/${talent.slug}`}
                    className="block p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-canvas border border-[rgba(14,15,12,0.06)]"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-11 h-11 rounded-full bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(https://i.pravatar.cc/88?img=${talent.avatarImg})` }}
                      />
                      <div>
                        <div className="font-semibold text-sm flex items-center gap-1.5 text-ink">
                          {talent.name}
                          {talent.verified && <span className="badge badge-verified text-[9px] leading-none">✓</span>}
                        </div>
                        <div className="text-xs text-body">{talent.role}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs mb-3">
                      <span>📍</span>
                      <span className="text-body">{talent.location}</span>
                    </div>

                    {talent.availability && (
                      <div className="flex items-center gap-1.5 text-xs mb-3">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: talent.availability.toLowerCase().includes('week')
                              ? 'var(--color-teal-mid)'
                              : 'var(--color-amber-mid)',
                          }}
                        />
                        <span className="text-body">{talent.availability}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-[rgba(14,15,12,0.06)]">
                      {talent.rating > 0 ? (
                        <span className="text-xs flex items-center gap-1 text-ink">
                          <span className="text-amber-500">★</span> {talent.rating}
                          <span className="text-mute">({talent.reviewCount})</span>
                        </span>
                      ) : (
                        <span className="text-xs text-mute">New to UpahJe</span>
                      )}
                      <span className="font-semibold text-sm text-teal-deep">{talent.rate}</span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="text-center mt-8">
              <Link
                href="/talent"
                className="font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all text-green-mid"
              >
                View all talent →
              </Link>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* ────────────────── TESTIMONIALS ────────────────── */}
      <FadeUp distance={24}>
        <section className="py-20 px-6 bg-canvas-soft">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-label mb-3 text-green-mid">Testimoni</p>
              <h2 className="font-display-xl text-ink-deep">Apa orang kata pasal UpahJe</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t) => (
                <div key={t.name} className="testimonial-card">
                  <div className="text-2xl mb-3">{t.emoji}</div>
                  <p className="text-sm leading-relaxed mb-5 text-body">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-[rgba(14,15,12,0.06)]">
                    <div
                      className="w-9 h-9 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(https://i.pravatar.cc/64?img=${t.avatarId})` }}
                    />
                    <div>
                      <div className="text-sm font-semibold text-ink">{t.name}</div>
                      <div className="text-xs text-mute">{t.role}</div>
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
        <section className="py-24 px-6 bg-green-deep">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-medium text-sm tracking-widest uppercase text-green-soft">
                  Trust &amp; Safety
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
                  Dibina untuk kurangkan ghosting, scam, dan hirup tenung.
                </h2>
                <div className="mt-8 space-y-5">
                  {trustItems.map((item) => (
                    <div key={item.title}>
                      <h3 className="font-semibold text-lg text-white">{item.title}</h3>
                      <p className="mt-1 text-base text-white/60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl p-8 border flex flex-col items-center justify-center text-center hidden md:flex bg-white/[0.03] border-white/[0.08]">
                <div className="text-4xl mb-4">🔒</div>
                <p className="text-sm font-medium text-white">Your money is safe with escrow</p>
                <p className="text-xs mt-1 text-white/50">
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
            <h2 className="font-display-xl mb-4 text-white">Nak settle kerja? UpahJe.</h2>
            <p className="max-w-md mx-auto mb-8 text-white/70">
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
              <Link
                href="/jobs/post"
                className="inline-flex items-center justify-center bg-green-mid hover:bg-green-deep text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Post Kerja
              </Link>
              <Link href="/auth/signup" className="btn-secondary-inverse text-base px-8 py-4">
                Jadi Freelancer
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/50">
              Perlukan servis? Post kerja. Nak cari pendapatan? Daftar freelancer.
            </p>
          </div>
        </section>
      </FadeUp>

      <Footer />
    </div>
  )
}
