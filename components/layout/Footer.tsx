'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-500">
              UpahJe.my
            </div>
            <p className="text-sm text-zinc-500">
              Malaysia&apos;s creative talent marketplace — hiring photographers, videographers, content creators, and more.
            </p>
          </div>

          {/* Creative Categories */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Creative</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/photography" className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">
                  📸 Photography
                </Link>
              </li>
              <li>
                <Link href="/categories/videography" className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">
                  🎥 Videography
                </Link>
              </li>
              <li>
                <Link href="/categories/content-creator" className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">
                  📱 Content Creator
                </Link>
              </li>
              <li>
                <Link href="/categories/photo-editor" className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">
                  ✨ Photo Editor
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/jobs/post" className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@upahje.my" className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">
                  support@upahje.my
                </a>
              </li>
              <li className="text-sm text-zinc-600">
                Kuala Lumpur, Malaysia
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-800 pt-8">
          <p className="text-center text-xs text-zinc-600">
            © {new Date().getFullYear()} UpahJe.my. All rights reserved. Registered in Malaysia.
          </p>
        </div>
      </div>
    </footer>
  )
}
