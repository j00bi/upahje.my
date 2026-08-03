'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import AuthFrame from '@/components/auth/AuthFrame'
import { updatePassword } from '@/lib/supabase/auth'
import { useLanguage } from '@/lib/i18n'

export default function ResetPasswordPage() {
  const { isEnglish } = useLanguage()
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [updated, setUpdated] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError(
        isEnglish
          ? 'Use at least 8 characters.'
          : 'Gunakan sekurang-kurangnya 8 aksara.',
      )
      return
    }

    if (password !== confirmation) {
      setError(
        isEnglish
          ? 'Passwords do not match.'
          : 'Kata laluan tidak sepadan.',
      )
      return
    }

    setLoading(true)
    const { error } = await updatePassword(password)

    if (error) {
      setError(error.message)
    } else {
      setUpdated(true)
    }

    setLoading(false)
  }

  return (
    <AuthFrame>
      <div className="w-full">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
          {isEnglish ? 'Secure your account' : 'Lindungi akaun anda'}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-neutral-950">
          {isEnglish ? 'Choose a new password' : 'Pilih kata laluan baharu'}
        </h1>

        {updated ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-800" role="status">
              {isEnglish
                ? 'Your password has been updated.'
                : 'Kata laluan anda telah dikemas kini.'}
            </div>
            <Link href="/dashboard" className="inline-flex rounded-md bg-green-mid px-4 py-2.5 text-sm font-semibold text-white">
              {isEnglish ? 'Continue to dashboard' : 'Teruskan ke dashboard'}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-neutral-700">
                {isEnglish ? 'New password' : 'Kata laluan baharu'}
              </label>
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2.5 text-sm focus:border-green-mid focus:outline-none focus:ring-1 focus:ring-green-mid"
              />
            </div>
            <div>
              <label htmlFor="confirm-new-password" className="block text-sm font-medium text-neutral-700">
                {isEnglish ? 'Confirm new password' : 'Sahkan kata laluan baharu'}
              </label>
              <input
                id="confirm-new-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2.5 text-sm focus:border-green-mid focus:outline-none focus:ring-1 focus:ring-green-mid"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-green-mid px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-deep disabled:opacity-60"
            >
              {loading
                ? (isEnglish ? 'Updating…' : 'Mengemas kini…')
                : (isEnglish ? 'Update password' : 'Kemas kini kata laluan')}
            </button>
          </form>
        )}
      </div>
    </AuthFrame>
  )
}
