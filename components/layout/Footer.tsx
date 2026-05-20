import Link from 'next/link'

const footerSections = [
  {
    heading: 'For Clients',
    links: [
      { href: '/talent', label: 'Find Talent' },
      { href: '/categories', label: 'Browse Categories' },
      { href: '/jobs/post', label: 'Post a Job' },
      { href: '/#how-it-works', label: 'How It Works' },
    ],
  },
  {
    heading: 'For Talent',
    links: [
      { href: '/jobs', label: 'Find Work' },
      { href: '/auth/signup', label: 'Create Profile' },
      { href: '/talent', label: 'Portfolio Gallery' },
      { href: '/resources', label: 'Resources' },
    ],
  },
  {
    heading: 'Categories',
    links: [
      { href: '/categories/photography', label: 'Photography' },
      { href: '/categories/videography', label: 'Videography' },
      { href: '/categories/web-development', label: 'Web Development' },
      { href: '/categories/design-creative', label: 'Design & Creative' },
      { href: '/categories/labour-general', label: 'Labour & Trade' },
      { href: '/categories/admin-data', label: 'Admin & Data' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div
              className="text-lg font-bold tracking-tight mb-4"
              style={{ color: 'var(--color-canvas)' }}
            >
              UpahJe.my
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Malaysia&apos;s freelance and labour marketplace — connect with verified
              talent across every category. From web development to photography,
              we make hiring simple and secure.
            </p>
            <div className="flex gap-3">
              {['IG', 'FB', 'TW', 'LI'].map((s) => (
                <span
                  key={s}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-semibold"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.heading}>
              <div className="footer-heading">{section.heading}</div>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 mt-8 border-t flex flex-col sm:flex-row justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} UpahJe.my. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs footer-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs footer-link">
              Terms of Service
            </Link>
            <Link href="mailto:support@upahje.my" className="text-xs footer-link">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
