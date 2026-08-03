'use client'

import Link from 'next/link'
import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  resendSignupConfirmation,
  signInWithEmail,
  signInWithOAuth,
  signUpWithEmail,
} from '@/lib/supabase/auth'
import { normalizeInternalRedirect, normalizeRegistrationRole } from '@/lib/auth-redirect'
import AuthFrame from '@/components/auth/AuthFrame'
import { useLanguage } from '@/lib/i18n'

type AuthMode = 'signin' | 'signup'
type RegistrationRole = 'employer' | 'talent'

function AuthContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = normalizeInternalRedirect(searchParams.get('callbackUrl'), '/dashboard')
  const initialMode = searchParams.get('mode') === 'signin' ? 'signin' : 'signup'
  const initialRole = normalizeRegistrationRole(searchParams.get('role'))
  const { isEnglish } = useLanguage()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode)
  const [role, setRole] = useState<RegistrationRole | null>(initialRole)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)

  const isSignup = authMode === 'signup'

  const validateForm = () => {
    if (!email || !password) {
      setError(isEnglish ? 'Please fill in all required fields.' : 'Sila lengkapkan semua ruangan wajib.')
      return false
    }

    if (isSignup && !role) {
      setError(isEnglish ? 'Please choose Employer or Talent.' : 'Pilih sama ada Pengupah atau Talent.')
      return false
    }

    if (isSignup && password !== confirmPassword) {
      setError(isEnglish ? 'Passwords do not match.' : 'Kata laluan tidak sepadan.')
      return false
    }

    if (isSignup && password.length < 6) {
      setError(isEnglish ? 'Password must be at least 6 characters.' : 'Kata laluan mesti sekurang-kurangnya 6 aksara.')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!validateForm()) return

    setLoading(true)

    try {
      if (isSignup) {
        const { data, error } = await signUpWithEmail(email, password, {
          role: role ?? undefined,
          callbackUrl,
        })
        if (error) {
          setError(error.message)
        } else if (data.session) {
          const completeUrl = new URL('/auth/complete', window.location.origin)
          completeUrl.searchParams.set('role', role!)
          completeUrl.searchParams.set('next', callbackUrl)
          router.replace(`${completeUrl.pathname}${completeUrl.search}`)
        } else {
          setSuccess(
            isEnglish
              ? 'Registration started. Check your email to confirm the account.'
              : 'Pendaftaran dimulakan. Semak e-mel anda untuk mengesahkan akaun.'
          )
        }
      } else {
        const { error } = await signInWithEmail(email, password)
        if (error) {
          setError(error.message)
        } else {
          const completeUrl = new URL('/auth/complete', window.location.origin)
          completeUrl.searchParams.set('next', callbackUrl)
          router.replace(`${completeUrl.pathname}${completeUrl.search}`)
        }
      }
    } catch (err) {
      setError(isEnglish ? 'An unexpected error occurred. Please try again.' : 'Ralat tidak dijangka berlaku. Cuba lagi.')
      console.error('Auth error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setError(null)
    setSuccess(null)

    if (isSignup && !role) {
      setError(
        isEnglish
          ? 'Choose Employer or Talent before registering with Google.'
          : 'Pilih Pengupah atau Talent sebelum mendaftar dengan Google.'
      )
      return
    }

    setOauthLoading(true)

    try {
      const { error } = await signInWithOAuth('google', {
        role: isSignup ? role ?? undefined : undefined,
        callbackUrl,
      })
      if (error) {
        setError(error.message)
        setOauthLoading(false)
      }
    } catch (err) {
      setError(isEnglish ? 'Unable to start Google authentication. Please try again.' : 'Pengesahan Google tidak dapat dimulakan. Cuba lagi.')
      setOauthLoading(false)
      console.error('Google auth error:', err)
    }
  }

  const handleResendConfirmation = async () => {
    if (!email || !role || resending) return
    setResending(true)
    setError(null)
    setResendMessage(null)

    const { error } = await resendSignupConfirmation(email, {
      role,
      callbackUrl,
    })

    if (error) {
      setError(error.message)
    } else {
      setResendMessage(
        isEnglish
          ? 'Confirmation email sent again.'
          : 'E-mel pengesahan telah dihantar semula.',
      )
    }

    setResending(false)
  }

  const toggleMode = () => {
    setAuthMode((prev) => (prev === 'signin' ? 'signup' : 'signin'))
    setError(null)
    setSuccess(null)
  }

  return (
    <AuthFrame>
        <div className="w-full">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              {isSignup
                ? (isEnglish ? 'Start with UpahJe' : 'Mulakan dengan UpahJe')
                : (isEnglish ? 'Welcome back' : 'Selamat kembali')}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.04em] text-neutral-950">
              {isSignup
                ? (isEnglish ? 'Create your account' : 'Cipta akaun anda')
                : (isEnglish ? 'Sign in to continue' : 'Log masuk untuk teruskan')}
            </h1>
            <p className="mt-2 text-sm text-neutral-600">
              {isSignup
                ? (isEnglish ? 'Choose how you want to use the marketplace.' : 'Pilih cara anda mahu menggunakan marketplace ini.')
                : (isEnglish ? 'Continue to your jobs and applications.' : 'Teruskan ke kerja dan permohonan anda.')}
            </p>
          </div>

          {isSignup && (
            <fieldset className="mt-6 space-y-3">
              <legend className="block text-sm font-medium text-neutral-700">
                {isEnglish ? 'I want to' : 'Saya mahu'}
              </legend>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  aria-pressed={role === 'employer'}
                  className={`rounded-md border px-4 py-3 text-left transition ${
                    role === 'employer'
                      ? 'border-green-mid bg-green-soft text-green-mid'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-green-mid/40'
                  }`}
                >
                  <span className="block text-sm font-semibold">
                    {isEnglish ? 'Hire talent' : 'Upah talent'}
                  </span>
                  <span className="mt-1 block text-xs text-neutral-500">
                    {isEnglish ? 'Post a job' : 'Post kerja'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('talent')}
                  aria-pressed={role === 'talent'}
                  className={`rounded-md border px-4 py-3 text-left transition ${
                    role === 'talent'
                      ? 'border-green-mid bg-green-soft text-green-mid'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-green-mid/40'
                  }`}
                >
                  <span className="block text-sm font-semibold">
                    {isEnglish ? 'Find work' : 'Cari kerja'}
                  </span>
                  <span className="mt-1 block text-xs text-neutral-500">
                    {isEnglish ? 'Build a talent profile' : 'Bina profil talent'}
                  </span>
                </button>
              </div>
            </fieldset>
          )}

          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={oauthLoading || loading}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 text-xs font-bold">
              G
            </span>
            {oauthLoading
              ? (isEnglish ? 'Opening Google...' : 'Membuka Google...')
              : isSignup
                ? (isEnglish ? 'Register with Google' : 'Daftar dengan Google')
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
            {success && (
              <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800" role="status">
                <p>{success}</p>
                <button
                  type="button"
                  onClick={handleResendConfirmation}
                  disabled={resending}
                  className="mt-2 font-semibold underline disabled:opacity-60"
                >
                  {resending
                    ? (isEnglish ? 'Sending…' : 'Menghantar…')
                    : (isEnglish ? 'Resend confirmation email' : 'Hantar semula e-mel pengesahan')}
                </button>
                {resendMessage && <p className="mt-2">{resendMessage}</p>}
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
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                {isEnglish ? 'Password' : 'Kata laluan'}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                required
                minLength={isSignup ? 6 : undefined}
                aria-describedby={isSignup ? 'password-requirements' : undefined}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-green-mid focus:outline-none focus:ring-1 focus:ring-green-mid"
                placeholder={isEnglish ? 'Password' : 'Kata laluan'}
              />
              {isSignup && (
                <p id="password-requirements" className="mt-1.5 text-xs text-neutral-500">
                  {isEnglish ? 'Use at least 6 characters.' : 'Gunakan sekurang-kurangnya 6 aksara.'}
                </p>
              )}
            </div>

            {isSignup && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700">
                  {isEnglish ? 'Confirm password' : 'Sahkan kata laluan'}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-green-mid focus:outline-none focus:ring-1 focus:ring-green-mid"
                  placeholder={isEnglish ? 'Password' : 'Kata laluan'}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || oauthLoading}
              className="flex w-full justify-center rounded-md border border-transparent bg-green-mid px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? (isEnglish ? 'Processing...' : 'Sedang diproses...')
                : isSignup
                  ? (isEnglish ? 'Create account' : 'Cipta akaun')
                  : (isEnglish ? 'Sign in' : 'Log masuk')}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm font-medium text-green-mid hover:text-green-deep"
            >
              {isSignup
                ? (isEnglish ? 'Already have an account? Sign in' : 'Sudah ada akaun? Log masuk')
                : (isEnglish ? 'Need an account? Register' : 'Belum ada akaun? Daftar')}
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-neutral-500">
            {isEnglish ? 'By continuing, you agree to the ' : 'Dengan meneruskan, anda bersetuju dengan '}
            <Link href="/terms" className="text-green-mid hover:text-green-deep">
              {isEnglish ? 'Terms' : 'Terma'}
            </Link>{' '}
            {isEnglish ? 'and ' : 'dan '}
            <Link href="/privacy" className="text-green-mid hover:text-green-deep">
              {isEnglish ? 'Privacy Policy' : 'Dasar Privasi'}
            </Link>
            .
          </p>
        </div>
    </AuthFrame>
  )
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-canvas-soft)] px-4">
          <div className="animate-pulse text-neutral-400">Memuatkan...</div>
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  )
}
