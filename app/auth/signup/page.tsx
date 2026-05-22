'use client'

import Link from 'next/link'
import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { signInWithEmail, signInWithOAuth, signUpWithEmail } from '@/lib/supabase/auth'

type AuthMode = 'signin' | 'signup'
type RegistrationRole = 'employer' | 'talent'

function AuthContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'
  const initialMode = searchParams.get('mode') === 'signin' ? 'signin' : 'signup'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode)
  const [role, setRole] = useState<RegistrationRole | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  const isSignup = authMode === 'signup'

  const validateForm = () => {
    if (!email || !password) {
      setError('Please fill in all required fields.')
      return false
    }

    if (isSignup && !role) {
      setError('Please select Employer or Talent.')
      return false
    }

    if (isSignup && password !== confirmPassword) {
      setError('Passwords do not match.')
      return false
    }

    if (isSignup && password.length < 6) {
      setError('Password must be at least 6 characters.')
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
        const { error } = await signUpWithEmail(email, password, role ?? undefined)
        if (error) {
          setError(error.message)
        } else {
          setSuccess('Registration started. Check your email to confirm the account.')
        }
      } else {
        const { error } = await signInWithEmail(email, password)
        if (error) {
          setError(error.message)
        } else {
          router.push(callbackUrl)
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Auth error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setError(null)
    setSuccess(null)

    if (isSignup && !role) {
      setError('Please select Employer or Talent before using Google registration.')
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
      setError('Unable to start Google authentication. Please try again.')
      setOauthLoading(false)
      console.error('Google auth error:', err)
    }
  }

  const toggleMode = () => {
    setAuthMode((prev) => (prev === 'signin' ? 'signup' : 'signin'))
    setError(null)
    setSuccess(null)
  }

  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)] px-4 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <div className="w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold leading-tight text-neutral-950">
              {isSignup ? 'Register for UpahJe.my' : 'Welcome Back'}
            </h1>
            <p className="mt-2 text-sm text-neutral-600">
              {isSignup
                ? 'Create an employer or talent profile.'
                : 'Sign in to continue to your dashboard.'}
            </p>
          </div>

          {isSignup && (
            <div className="mt-6 space-y-3">
              <label className="block text-sm font-medium text-neutral-700">Register as</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={`rounded-md border px-4 py-3 text-left transition ${
                    role === 'employer'
                      ? 'border-green-mid bg-green-soft text-green-mid'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-green-mid/40'
                  }`}
                >
                  <span className="block text-sm font-semibold">Employer</span>
                  <span className="mt-1 block text-xs text-neutral-500">Post jobs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('talent')}
                  className={`rounded-md border px-4 py-3 text-left transition ${
                    role === 'talent'
                      ? 'border-green-mid bg-green-soft text-green-mid'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-green-mid/40'
                  }`}
                >
                  <span className="block text-sm font-semibold">Talent</span>
                  <span className="mt-1 block text-xs text-neutral-500">Find work</span>
                </button>
              </div>
            </div>
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
            {oauthLoading ? 'Opening Google...' : isSignup ? 'Register with Google' : 'Continue with Google'}
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">or email</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                {success}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email address
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
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-green-mid focus:outline-none focus:ring-1 focus:ring-green-mid"
                placeholder="Password"
              />
            </div>

            {isSignup && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-green-mid focus:outline-none focus:ring-1 focus:ring-green-mid"
                  placeholder="Password"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || oauthLoading}
              className="flex w-full justify-center rounded-md border border-transparent bg-green-mid px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Processing...' : isSignup ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm font-medium text-green-mid hover:text-green-deep"
            >
              {isSignup ? 'Already have an account? Sign in' : 'Need an account? Register'}
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-neutral-500">
            By continuing, you agree to the{' '}
            <Link href="/terms" className="text-green-mid hover:text-green-deep">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-green-mid hover:text-green-deep">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-canvas-soft)] px-4">
          <div className="animate-pulse text-neutral-400">Loading...</div>
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  )
}
