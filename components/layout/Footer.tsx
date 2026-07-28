'use client'

import Link from 'next/link'
import { MARKETPLACE_CATEGORIES } from '@/lib/categories'
import { useLanguage } from '@/lib/i18n'

const footerCategories = MARKETPLACE_CATEGORIES.filter((category) =>
  ['photography', 'videography', 'home-services', 'electrical-trade', 'admin-support', 'web-design'].includes(category.slug),
).map((category) => ({
  href: `/categories/${category.slug}`,
  label: category.name,
}))

export default function Footer() {
  const { isEnglish } = useLanguage()
  const footerSections = [
    {
      heading: isEnglish ? 'For clients' : 'Untuk pengupah',
      links: [
        { href: '/talent', label: isEnglish ? 'Find Talent' : 'Cari Talent' },
        { href: '/categories', label: isEnglish ? 'Browse Services' : 'Lihat Servis' },
        { href: '/jobs/post', label: isEnglish ? 'Post a Job' : 'Post Kerja' },
        { href: '/#how-it-works', label: isEnglish ? 'How It Works' : 'Cara Ia Berfungsi' },
      ],
    },
    {
      heading: isEnglish ? 'For talent' : 'Untuk talent',
      links: [
        { href: '/jobs', label: isEnglish ? 'Find Work' : 'Cari Kerja' },
        { href: '/auth/signup', label: isEnglish ? 'Create Profile' : 'Cipta Profil' },
        { href: '/talent', label: isEnglish ? 'Browse Talent' : 'Lihat Talent' },
        { href: '/#how-it-works', label: isEnglish ? 'How It Works' : 'Cara Ia Berfungsi' },
      ],
    },
    {
      heading: isEnglish ? 'Categories' : 'Kategori',
      links: footerCategories.map(category => ({
        ...category,
        label: isEnglish
          ? MARKETPLACE_CATEGORIES.find(item => `/categories/${item.slug}` === category.href)?.name ?? category.label
          : category.label,
      })),
    },
  ]

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
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.68)' }}>
              {isEnglish
                ? 'A local Malaysian marketplace for posting work, reviewing talent, and making clearer hiring decisions.'
                : 'Marketplace tempatan Malaysia untuk post kerja, semak talent, dan membuat pilihan dengan lebih jelas.'}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.68)' }}>
              <a href="https://instagram.com/upahje" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://facebook.com/upahje" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href="https://tiktok.com/@upahje" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
              <a href="https://linkedin.com/company/upahje" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
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
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
            © {new Date().getFullYear()} UpahJe.my. {isEnglish ? 'All rights reserved.' : 'Hak cipta terpelihara.'}
          </div>
          <div className="flex gap-6">
            <Link href="/about" className="text-xs footer-link">
              {isEnglish ? 'About' : 'Tentang'}
            </Link>
            <Link href="/faq" className="text-xs footer-link">
              FAQ
            </Link>
            <Link href="/contact" className="text-xs footer-link">
              {isEnglish ? 'Contact' : 'Hubungi'}
            </Link>
            <Link href="/privacy" className="text-xs footer-link">
              {isEnglish ? 'Privacy' : 'Privasi'}
            </Link>
            <Link href="/terms" className="text-xs footer-link">
              {isEnglish ? 'Terms' : 'Terma'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
