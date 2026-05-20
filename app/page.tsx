import Link from 'next/link'
import Footer from '@/components/layout/Footer'

const categories = [
  'Photography',
  'Videography',
  'Home Services',
  'Electrical & Trade',
  'Admin Support',
  'Web & Design',
]

const talentProfiles = [
  {
    name: 'Aina Razali', role: 'Photographer', location: 'Kuala Lumpur',
    rate: 'RM 800/day', rating: 4.9, reviews: 24,
    avatar: '/avatars/aina.jpg', fallback: 'AR',
  },
  {
    name: 'Danial Harith', role: 'Videographer', location: 'Petaling Jaya',
    rate: 'RM 1,200/day', rating: 4.8, reviews: 18,
    avatar: '/avatars/danial.jpg', fallback: 'DH',
  },
  {
    name: 'Sharifah Nur', role: 'Content Creator', location: 'Shah Alam',
    rate: 'RM 600/day', rating: 4.9, reviews: 31,
    avatar: '/avatars/sharifah.jpg', fallback: 'SN',
  },
  {
    name: 'Amir Hakim', role: 'Web Developer', location: 'Cyberjaya',
    rate: 'RM 1,500/day', rating: 4.7, reviews: 42,
    avatar: '/avatars/amir.jpg', fallback: 'AH',
  },
]

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

const galleryCovers = [
  { initials: 'WN', label: 'Wedding' },
  { initials: 'CH', label: 'Corporate' },
  { initials: 'EP', label: 'Event' },
  { initials: 'PP', label: 'Portrait' },
  { initials: 'PD', label: 'Product' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ─────────────── HERO ─────────────── */}
      <section className="text-center py-24 md:py-32 px-6" style={{ backgroundColor: '#F5F5F4' }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Hire trusted local help.
            <span className="block text-emerald-700">Pay only when it&apos;s done.</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl" style={{ color: 'var(--color-body)' }}>
            UpahJe.my helps Malaysians find verified freelancers and workers for events,
            home services, admin work, creative projects, and more.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/jobs/post"
              className="inline-flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-semibold text-base px-8 py-4 rounded-full transition-all"
            >
              Post a Job
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center border-2 border-neutral-300 hover:border-neutral-400 text-neutral-800 font-semibold text-base px-8 py-4 rounded-full transition-all"
            >
              Join as Worker
            </Link>
          </div>

          {/* Category Pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {categories.map((item) => (
              <Link
                key={item}
                href={`/categories/${item.toLowerCase().replace(/[ &]+/g, '-')}`}
                className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm text-neutral-700 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4">
            {[
              { value: 'Early Access', label: 'Now Open' },
              { value: 'Verified', label: 'Worker Profiles' },
              { value: 'Escrow', label: 'Payment Protection' },
              { value: 'Local', label: 'Malaysia First' },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-bold text-base" style={{ color: 'var(--color-ink-deep)' }}>
                  {item.value}
                </div>
                <div className="text-sm text-neutral-500">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── GALLERY CALLOUT ─────────────── */}
      <section className="hero-band-green">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-3" style={{ color: 'var(--color-primary)' }}>
                Built-in Portfolio
              </p>
              <h2 className="font-display-xl mb-4" style={{ color: 'var(--color-canvas)' }}>
                Showcase your work.<br />Stand out from the crowd.
              </h2>
              <p className="text-base md:text-lg mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Browse real work before you hire — from event shoots to design,
                repairs, and freelance projects.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/talent" className="btn-primary">
                  Browse Portfolios
                </Link>
                <Link href="/auth/signup" className="btn-secondary-inverse">
                  Join as Creative
                </Link>
              </div>
            </div>

            <div className="gallery-showcase">
              {galleryCovers.map((item) => (
                <div key={item.label} className="gallery-item">
                  <div
                    className="w-full h-full flex items-center justify-center text-lg font-bold"
                    style={{
                      background: `linear-gradient(135deg, var(--color-green-forest), var(--color-green-mid))`,
                      color: 'var(--color-primary)',
                    }}
                  >
                    {item.initials}
                  </div>
                  <div className="gallery-item-overlay">
                    <span className="text-sm font-medium" style={{ color: 'var(--color-canvas)' }}>
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── HOW IT WORKS ─────────────── */}
      <section id="how-it-works" className="content-band">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-3" style={{ color: 'var(--color-green-mid)' }}>
              How It Works
            </p>
            <h2 className="font-display-xl" style={{ color: 'var(--color-ink-deep)' }}>
              Get it done in three steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <div key={step.num} className={`${i < steps.length - 1 ? 'step-connector' : ''} text-center`}>
                <div className="flex justify-center mb-6">
                  <div className="step-number">{step.num}</div>
                </div>
                <h3 className="font-display-md mb-3" style={{ color: 'var(--color-ink-deep)' }}>
                  {step.title}
                </h3>
                <p style={{ color: 'var(--color-body)' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── FEATURED TALENT ─────────────── */}
      <section className="content-band-soft">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="section-label mb-2" style={{ color: 'var(--color-green-mid)' }}>
                Top Talent
              </p>
              <h2 className="font-display-xl" style={{ color: 'var(--color-ink-deep)' }}>
                Featured freelancers
              </h2>
            </div>
            <Link href="/talent" className="btn-tertiary hidden sm:inline-flex">
              View All →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {talentProfiles.map((talent) => (
              <Link
                key={talent.name}
                href={`/talent/${talent.name.toLowerCase().replace(' ', '-')}`}
                className="card-content block"
                style={{ textDecoration: 'none' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="talent-avatar-placeholder">
                    {talent.fallback}
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--color-ink)' }}>
                      {talent.name}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-body)' }}>
                      {talent.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm mb-1">
                  <span style={{ color: 'var(--color-mute)' }}>📍</span>
                  <span style={{ color: 'var(--color-body)' }}>{talent.location}</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: 'rgba(14, 15, 12, 0.06)' }}>
                  <span className="badge badge-positive">★ {talent.rating} ({talent.reviews})</span>
                  <span className="font-semibold" style={{ color: 'var(--color-ink-deep)' }}>
                    {talent.rate}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/talent" className="btn-tertiary inline-flex">
              View All Talent →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── TRUST & SAFETY ─────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-green-deep)' }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-medium text-sm tracking-widest uppercase" style={{ color: 'var(--color-primary)' }}>
            Trust &amp; Safety
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-canvas)' }}>
            Designed to reduce ghosting, scams, and bad hires.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl p-6 border"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
              >
                <h3 className="font-semibold text-xl" style={{ color: 'var(--color-canvas)' }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── FINAL CTA ─────────────── */}
      <section className="hero-band-green" style={{ padding: '100px 24px' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display-xl mb-4" style={{ color: 'var(--color-canvas)' }}>
            Ready to get started?
          </h2>
          <p className="text-base md:text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Post a job or join as a worker — it&apos;s free to start.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/jobs/post" className="btn-primary text-base px-8 py-4">
              Post a Job
            </Link>
            <Link href="/auth/signup" className="btn-secondary-inverse text-base px-8 py-4">
              Join as Worker
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <Footer />
    </div>
  )
}
