import Link from 'next/link'
import { MARKETPLACE_CATEGORIES } from '@/lib/categories'

const footerCategories = MARKETPLACE_CATEGORIES.filter((category) =>
  ['photography', 'videography', 'home-services', 'electrical-trade', 'admin-support', 'web-design'].includes(category.slug),
).map((category) => ({
  href: `/categories/${category.slug}`,
  label: category.name,
}))

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
      { href: '/#how-it-works', label: 'How It Works' },
    ],
  },
  {
    heading: 'Categories',
    links: footerCategories,
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
              style={{ color: 'var(--color-ink)' }}
            >
              UpahJe.my
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Malaysia&apos;s local hiring platform for trusted work — connect with verified
              workers across events, home services, creative projects, and more.
            </p>
            <div className="flex gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">TikTok</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
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
