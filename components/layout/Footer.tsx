'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/50 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-900">
              UpahJe.my
            </div>
            <p className="text-sm text-slate-600">
              Malaysia&apos;s trusted freelance marketplace for labour and technical talent.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-sm text-slate-600 hover:text-emerald-700 transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="text-sm text-slate-600 hover:text-emerald-700 transition">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/ai" className="text-sm text-slate-600 hover:text-emerald-700 transition">
                  UpahJe.Ai
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-slate-600 hover:text-emerald-700 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-600 hover:text-emerald-700 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@upahje.my" className="text-sm text-slate-600 hover:text-emerald-700 transition">
                  support@upahje.my
                </a>
              </li>
              <li className="text-sm text-slate-600">
                Kuala Lumpur, Malaysia
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <p className="text-center text-xs text-slate-500">
            © {new Date().getFullYear()} UpahJe.my. All rights reserved. Registered in Malaysia.
          </p>
        </div>
      </div>
    </footer>
  )
}