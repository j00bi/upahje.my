'use client'

import Link from 'next/link'
import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { signInWithEmail, signInWithOAuth } from '@/lib/supabase/auth'
import { normalizeInternalRedirect } from '@/lib/auth-redirect'

function SignInContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = normalizeInternalRedirect(searchParams.get('callbackUrl'), '/dashboard')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)

    try {
      const { error } = await signInWithEmail(email, password)
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.')
        } else if (error.message.includes('Email not confirmed')) {
          setError('Please confirm your email address before signing in.')
        } else {
          setError(error.message)
        }
      } else {
        router.push(callbackUrl)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
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
      setError('Unable to start Google sign in. Please try again.')
      setOauthLoading(false)
      console.error('Google sign in error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)] px-4 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <div className="w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold leading-tight text-neutral-950">Welcome Back</h1>
            <p className="mt-2 text-sm text-neutral-600">
              Sign in to UpahJe.my to continue.
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
            {oauthLoading ? 'Opening Google...' : 'Continue with Google'}
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
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-green-mid focus:outline-none focus:ring-1 focus:ring-green-mid"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              disabled={loading || oauthLoading}
              className="flex w-full justify-center rounded-md border border-transparent bg-green-mid px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <Link href="/auth/signup" className="text-sm font-medium text-green-mid hover:text-green-deep">
              Need an account? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-canvas-soft)] px-4">
          <div className="animate-pulse text-neutral-400">Loading...</div>
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  )
}
