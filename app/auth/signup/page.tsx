'use client'

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { signUpWithEmail, signInWithEmail } from '@/lib/supabase/auth'

type AuthMode = 'signin' | 'signup'

function AuthContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [authMode, setAuthMode] = useState<AuthMode>('signin')
  const [role, setRole] = useState<'employer' | 'talent' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  const validateForm = () => {
    if (!email || !password) {
      setError('Please fill in all required fields')
      return false
    }
    
    if (authMode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    
    if (authMode === 'signup' && password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    
    if (authMode === 'signup' && !role) {
      setError('Please select a role (Employer or Talent)')
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
      if (authMode === 'signup') {
        const { error } = await signUpWithEmail(email, password, role || undefined)
        if (error) {
          setError(error.message)
        } else {
          setSuccess('Sign up successful! Please check your email to confirm your account.')
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
      setError('An unexpected error occurred')
      console.error('Auth error:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setAuthMode(prev => prev === 'signin' ? 'signup' : 'signin')
    setError(null)
    setSuccess(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 p-6 sm:p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
            {authMode === 'signup' ? 'Create your UpahJe.my account' : 'Sign in to UpahJe.my'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {authMode === 'signup' 
              ? 'Join Malaysia\'s trusted freelance marketplace' 
              : 'Welcome back! Sign in to continue'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800 border border-green-200">
              {success}
            </div>
          )}
          
          {/* Role Selection (Sign Up Only) */}
          {authMode === 'signup' && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    role === 'employer'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-2xl mb-1">🏢</div>
                  <div className="font-semibold">Employer</div>
                  <div className="text-xs text-gray-500">Hire talent</div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('talent')}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    role === 'talent'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-2xl mb-1">👷</div>
                  <div className="font-semibold">Talent</div>
                  <div className="text-xs text-gray-500">Find work</div>
                </button>
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </div>
          
          {authMode === 'signup' && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="••••••••"
              />
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              authMode === 'signup' ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={toggleMode}
            className="text-sm text-emerald-600 hover:text-emerald-500 font-medium"
          >
            {authMode === 'signup' 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="mt-6 text-center text-xs sm:text-sm text-gray-500">
          <p>
            By {authMode === 'signup' ? 'signing up' : 'signing in'}, you agree to our{' '}
            <a href="/terms" className="text-emerald-600 hover:text-emerald-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-emerald-600 hover:text-emerald-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  )
}
