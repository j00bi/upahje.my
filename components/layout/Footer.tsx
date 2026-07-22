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
    heading: 'Untuk Client',
    links: [
      { href: '/talent', label: 'Cari Talent' },
      { href: '/categories', label: 'Semua Kategori' },
      { href: '/jobs/post', label: 'Post Kerja' },
      { href: '/#how-it-works', label: 'Macam Mana' },
    ],
  },
  {
    heading: 'Untuk Talent',
    links: [
      { href: '/jobs', label: 'Cari Kerja' },
      { href: '/auth/signup', label: 'Buat Profil' },
      { href: '/talent', label: 'Galeri Portfolio' },
      { href: '/#how-it-works', label: 'Macam Mana' },
    ],
  },
  {
    heading: 'Kategori',
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
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-body)' }}>
              Malaysia&apos;s local hiring platform for trusted work: labour, creative,
              technical, and admin services with clearer profiles and safer payment flow.
            </p>
            <div className="flex gap-4 text-sm font-bold" style={{ color: 'var(--color-mute)' }}>
              <a href="https://instagram.com/upahje" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Instagram</a>
              <a href="https://facebook.com/upahje" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Facebook</a>
              <a href="https://tiktok.com/@upahje" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">TikTok</a>
              <a href="https://linkedin.com/company/upahje" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">LinkedIn</a>
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
          style={{ borderColor: 'rgba(17,17,17,0.08)' }}
        >
          <div className="text-xs" style={{ color: 'var(--color-mute)' }}>
            © {new Date().getFullYear()} UpahJe.my. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/about" className="text-xs footer-link">
              About
            </Link>
            <Link href="/faq" className="text-xs footer-link">
              FAQ
            </Link>
            <Link href="/contact" className="text-xs footer-link">
              Contact
            </Link>
            <Link href="/privacy" className="text-xs footer-link">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs footer-link">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
