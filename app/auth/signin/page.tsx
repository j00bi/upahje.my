'use client'

import Link from 'next/link'
import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { signInWithEmail, signInWithOAuth } from '@/lib/supabase/auth'
import { normalizeInternalRedirect } from '@/lib/auth-redirect'
import AuthFrame from '@/components/auth/AuthFrame'
import { useLanguage } from '@/lib/i18n'

function SignInContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = normalizeInternalRedirect(searchParams.get('callbackUrl'), '/dashboard')
  const { isEnglish } = useLanguage()
  const callbackError = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(() => {
    if (callbackError === 'session_missing') {
      return isEnglish
        ? 'Your session expired. Please sign in again.'
        : 'Sesi anda telah tamat. Sila log masuk semula.'
    }

    if (callbackError === 'profile_setup_failed') {
      return isEnglish
        ? 'We could not finish setting up your profile. Please try again.'
        : 'Kami tidak dapat melengkapkan profil anda. Sila cuba lagi.'
    }

    if (callbackError) {
      return isEnglish
        ? 'Authentication could not be completed. Please try again.'
        : 'Pengesahan tidak dapat diselesaikan. Sila cuba lagi.'
    }

    return null
  })
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError(isEnglish ? 'Please fill in all fields.' : 'Sila lengkapkan semua ruangan.')
      return
    }

    setLoading(true)

    try {
      const { error } = await signInWithEmail(email, password)
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError(isEnglish ? 'Invalid email or password. Please try again.' : 'E-mel atau kata laluan tidak sah. Cuba lagi.')
        } else if (error.message.includes('Email not confirmed')) {
          setError(isEnglish ? 'Please confirm your email address before signing in.' : 'Sahkan alamat e-mel anda sebelum log masuk.')
        } else {
          setError(error.message)
        }
      } else {
        const completeUrl = new URL('/auth/complete', window.location.origin)
        completeUrl.searchParams.set('next', callbackUrl)
        router.replace(`${completeUrl.pathname}${completeUrl.search}`)
      }
    } catch (err) {
      setError(isEnglish ? 'An unexpected error occurred. Please try again.' : 'Ralat tidak dijangka berlaku. Cuba lagi.')
      console.error('Sign in error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setOauthLoading(true)

    try {
      const { error } = await signInWithOAuth('google', { callbackUrl })
      if (error) {
        setError(error.message)
        setOauthLoading(false)
      }
    } catch (err) {
      setError(isEnglish ? 'Unable to start Google sign in. Please try again.' : 'Log masuk Google tidak dapat dimulakan. Cuba lagi.')
      setOauthLoading(false)
      console.error('Google sign in error:', err)
    }
  }

  return (
    <AuthFrame>
        <div className="w-full">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              {isEnglish ? 'Welcome back' : 'Selamat kembali'}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.04em] text-neutral-950">
              {isEnglish ? 'Sign in to continue' : 'Log masuk untuk teruskan'}
            </h1>
            <p className="mt-2 text-sm text-neutral-600">
              {isEnglish
                ? 'Return to your jobs, applications, and saved drafts.'
                : 'Kembali kepada kerja, permohonan, dan draf yang anda simpan.'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={oauthLoading || loading}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 text-xs font-bold">
              G
            </span>
            {oauthLoading
              ? (isEnglish ? 'Opening Google...' : 'Membuka Google...')
              : (isEnglish ? 'Continue with Google' : 'Teruskan dengan Google')}
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
              {isEnglish ? 'or email' : 'atau e-mel'}
            </span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                {isEnglish ? 'Email address' : 'Alamat e-mel'}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-green-mid focus:outline-none focus:ring-1 focus:ring-green-mid"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                  {isEnglish ? 'Password' : 'Kata laluan'}
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-semibold text-green-mid hover:text-green-deep"
                >
                  {isEnglish ? 'Forgot password?' : 'Lupa kata laluan?'}
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-green-mid focus:outline-none focus:ring-1 focus:ring-green-mid"
                placeholder={isEnglish ? 'Password' : 'Kata laluan'}
              />
            </div>

            <button
              type="submit"
              disabled={loading || oauthLoading}
              className="flex w-full justify-center rounded-md border border-transparent bg-green-mid px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? (isEnglish ? 'Signing in...' : 'Sedang log masuk...')
                : (isEnglish ? 'Sign in' : 'Log masuk')}
            </button>
          </form>

          <div className="mt-5 text-center">
            <Link
              href={`/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="text-sm font-medium text-green-mid hover:text-green-deep"
            >
              {isEnglish ? 'Need an account? Register' : 'Belum ada akaun? Daftar'}
            </Link>
          </div>
        </div>
    </AuthFrame>
  )
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-canvas-soft)] px-4">
          <div className="animate-pulse text-neutral-400">Memuatkan...</div>
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  )
}
