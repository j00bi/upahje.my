import Link from 'next/link'
import Footer from '@/components/layout/Footer'

const categories = [
  { label: 'Web Development', icon: '🖥️', slug: 'web-development', count: 312 },
  { label: 'Design & Creative', icon: '🎨', slug: 'design-creative', count: 524 },
  { label: 'Labour & General Work', icon: '🔧', slug: 'labour-general', count: 187 },
  { label: 'Electrical & Trade', icon: '⚡', slug: 'electrical-trade', count: 143 },
  { label: 'Admin & Data Entry', icon: '📊', slug: 'admin-data', count: 256 },
  { label: 'Content & Marketing', icon: '📱', slug: 'content-marketing', count: 398 },
  { label: 'Photography', icon: '📸', slug: 'photography', count: 267, badge: 'Gallery' },
  { label: 'Videography', icon: '🎬', slug: 'videography', count: 198, badge: 'Gallery' },
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
    desc: 'Describe your project — from website development to event photography. Set your budget and timeline in minutes.',
  },
  {
    num: '02', title: 'Compare & Connect',
    desc: 'Browse proposals, check portfolios, read reviews, and message talent directly. No commitment until you\'re ready.',
  },
  {
    num: '03', title: 'Pay When It\'s Done',
    desc: 'Pay via FPX or DuitNow. Funds are held securely in escrow and released only when you approve the work.',
  },
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
      <section className="hero-band" style={{ backgroundColor: 'var(--color-canvas-soft)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="section-label mb-4" style={{ color: 'var(--color-green-mid)' }}>
              Malaysia's Freelance &amp; Labour Marketplace
            </p>
            <h1 className="font-display-mega mb-6" style={{ color: 'var(--color-ink-deep)' }}>
              Upah sesiapa.<br />Untuk apa sahaja.
            </h1>
            <p className="text-lg md:text-xl mb-10" style={{ color: 'var(--color-body)', maxWidth: 560 }}>
              Hire verified freelancers and workers across every category — from web dev to photography, electrical work to admin support.
            </p>

            {/* Search-style CTA */}
            <div
              className="flex items-center gap-3 p-2 rounded-2xl mb-10 max-w-xl"
              style={{
                backgroundColor: 'var(--color-canvas)',
                border: '1px solid rgba(14, 15, 12, 0.08)',
                boxShadow: '0 4px 24px rgba(14, 15, 12, 0.06)',
              }}
            >
              <span className="pl-4" style={{ color: 'var(--color-mute)', fontSize: '1.25rem' }}>🔍</span>
              <input
                type="text"
                placeholder="What do you need done?"
                className="flex-1 bg-transparent border-none outline-none text-base"
                style={{ color: 'var(--color-ink)' }}
                readOnly
              />
              <Link
                href="/jobs/post"
                className="btn-primary whitespace-nowrap"
                style={{ borderRadius: 12 }}
              >
                Post a Job — Free
              </Link>
            </div>
          </div>

          {/* Category Pills — broad marketplace */}
          <div className="flex flex-wrap gap-2.5 mt-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="category-pill"
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                {cat.badge && (
                  <span className="category-pill-badge">{cat.badge}</span>
                )}
              </Link>
            ))}
          </div>

          {/* Trust stats row */}
          <div
            className="flex flex-wrap items-center gap-8 mt-10 pt-8 border-t"
            style={{ borderColor: 'rgba(14, 15, 12, 0.06)' }}
          >
            {[
              { label: 'Active Freelancers', value: '2,500+' },
              { label: 'Jobs Completed', value: '1,847' },
              { label: 'Avg. Response Time', value: '2 hours' },
              { label: 'Payment Protection', value: 'Escrow' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-bold text-lg" style={{ color: 'var(--color-ink-deep)' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: 'var(--color-mute)' }}>
                  {stat.label}
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
                The only Malaysian marketplace with a built-in portfolio gallery. 
                Creatives can showcase their best work, and clients can browse visual 
                proof of quality before they hire. No other platform has this.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/talent" className="btn-primary">
                  Browse Portfolios
                </Link>
                <Link href="/auth/signup" className="btn-secondary-inverse">
                  I'm a Creative — Join Free
                </Link>
              </div>
            </div>

            {/* Gallery preview grid */}
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
                  <div
                    className="talent-avatar-placeholder"
                  >
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

      {/* ─────────────── STATS BAND ─────────────── */}
      <section
        className="py-12"
        style={{ backgroundColor: 'var(--color-green-forest)' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '2,500+', label: 'Freelancers' },
            { value: '1,847', label: 'Jobs Done' },
            { value: '98%', label: 'Satisfaction' },
            { value: 'RM 0', label: 'Platform Fees' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="font-display-lg mb-1"
                style={{ color: 'var(--color-primary)' }}
              >
                {stat.value}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────── FINAL CTA ─────────────── */}
      <section className="hero-band-green" style={{ padding: '100px 24px' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display-xl mb-4" style={{ color: 'var(--color-canvas)' }}>
            Ready to get started?
          </h2>
          <p className="text-base md:text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Join thousands of Malaysians hiring and earning on UpahJe.my
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/jobs/post" className="btn-primary text-base px-8 py-4">
              Post a Job — Free
            </Link>
            <Link href="/auth/signup" className="btn-secondary-inverse text-base px-8 py-4">
              I'm a Freelancer
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <Footer />
    </div>
  )
}
