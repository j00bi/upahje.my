'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import AuthFrame from '@/components/auth/AuthFrame'
import { sendPasswordResetEmail } from '@/lib/supabase/auth'
import { useLanguage } from '@/lib/i18n'

export default function ForgotPasswordPage() {
  const { isEnglish } = useLanguage()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await sendPasswordResetEmail(email)
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }

    setLoading(false)
  }

  return (
    <AuthFrame>
      <div className="w-full">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
          {isEnglish ? 'Account recovery' : 'Pemulihan akaun'}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-neutral-950">
          {isEnglish ? 'Reset your password' : 'Tetapkan semula kata laluan'}
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          {isEnglish
            ? 'Enter your email and we will send a secure reset link.'
            : 'Masukkan e-mel anda dan kami akan menghantar pautan tetapan semula yang selamat.'}
        </p>

        {sent ? (
          <div className="mt-6 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-800" role="status">
            {isEnglish
              ? 'If an account exists for that email, a reset link is on its way.'
              : 'Jika akaun wujud untuk e-mel tersebut, pautan tetapan semula sedang dihantar.'}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="recovery-email" className="block text-sm font-medium text-neutral-700">
                {isEnglish ? 'Email address' : 'Alamat e-mel'}
              </label>
              <input
                id="recovery-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2.5 text-sm focus:border-green-mid focus:outline-none focus:ring-1 focus:ring-green-mid"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-green-mid px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-deep disabled:opacity-60"
            >
              {loading
                ? (isEnglish ? 'Sending…' : 'Menghantar…')
                : (isEnglish ? 'Send reset link' : 'Hantar pautan tetapan semula')}
            </button>
          </form>
        )}

        <Link href="/auth/signin" className="mt-5 inline-block text-sm font-semibold text-green-mid hover:text-green-deep">
          ← {isEnglish ? 'Back to sign in' : 'Kembali ke log masuk'}
        </Link>
      </div>
    </AuthFrame>
  )
}
