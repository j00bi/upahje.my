'use client'

import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/supabase/auth'

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <button
      onClick={handleSignOut}
      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
    >
      Sign out
    </button>
  )
}
