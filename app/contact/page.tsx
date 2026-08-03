'use client'

import { useState } from 'react'
import Footer from '@/components/layout/Footer'

export default function ContactPage() {
  const [emailPrepared, setEmailPrepared] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = String(formData.get('name') || '')
    const email = String(formData.get('email') || '')
    const subject = String(formData.get('subject') || 'UpahJe support request')
    const message = String(formData.get('message') || '')
    const body = [`Name: ${name}`, `Email: ${email}`, '', message].join('\n')

    setEmailPrepared(true)
    window.location.href = `mailto:support@upahje.my?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)]">
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="section-label mb-3" style={{ color: 'var(--color-green-mid)' }}>
            Hubungi Kami
          </p>
          <h1 className="font-display-xl mb-4" style={{ color: 'var(--color-ink-deep)' }}>
            Ada soalan? Kami dengar.
          </h1>
          <p className="text-base mb-10" style={{ color: 'var(--color-body)' }}>
            Nak tanya pasal platform, ada feedback, atau nak bekerjasama? Hantarkan mesej.
          </p>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="text-xl mb-2">📧</div>
              <h3 className="font-semibold text-sm mb-1">Email</h3>
              <p className="text-sm text-neutral-500">support@upahje.my</p>
              <p className="text-xs text-neutral-400 mt-1">Balas dalam 24 jam waktu kerja</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="text-xl mb-2">💬</div>
              <h3 className="font-semibold text-sm mb-1">Social</h3>
              <p className="text-sm text-neutral-500">@UpahJe on Instagram, Facebook, TikTok</p>
              <p className="text-xs text-neutral-400 mt-1">DM for quick questions</p>
            </div>
          </div>

          {emailPrepared && (
            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5" role="status">
              <h2 className="font-semibold text-emerald-950">Your email app should be open.</h2>
              <p className="mt-1 text-sm leading-6 text-emerald-900">
                Review and send the message from your email app. If it did not open, email{' '}
                <a className="font-semibold underline" href="mailto:support@upahje.my">support@upahje.my</a>.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-6 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5 text-neutral-700">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-green-mid)] focus:ring-2 focus:ring-green-100"
                    placeholder="Nama awak"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5 text-neutral-700">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-green-mid)] focus:ring-2 focus:ring-green-100"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium mb-1.5 text-neutral-700">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-green-mid)] focus:ring-2 focus:ring-green-100"
                  placeholder="Apa pasal?"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5 text-neutral-700">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-green-mid)] focus:ring-2 focus:ring-green-100 resize-y"
                  placeholder="Cerita kat kami..."
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[var(--color-green-mid)] hover:bg-[var(--color-green-forest)] text-white font-semibold text-base px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Open Email to Send
              </button>
            </form>
        </div>
      </section>
      <Footer />
    </div>
  )
}
