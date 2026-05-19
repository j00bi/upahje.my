'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

interface UserContextType {
  user: User | null
  role: string | null
  loading: boolean
  error: string | null
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/auth/me')
      
      if (!response.ok) {
        if (response.status === 401) {
          setUser(null)
          setRole(null)
          return
        }
        throw new Error('Failed to fetch user')
      }
      
      const data = await response.json()
      setUser(data.user as User | null)
      setRole(data.role)
    } catch (err) {
      console.error('Error fetching user:', err)
      setError('Failed to load user data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const refreshUser = async () => {
    await fetchUser()
  }

  return (
    <UserContext.Provider value={{ user, role, loading, error, refreshUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export function useRole() {
  const { role, loading } = useUser()
  return { role, loading }
}

export function useRequireRole(allowedRoles: string[]) {
  const { role, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && role && !allowedRoles.includes(role)) {
      router.push('/onboarding')
    }
  }, [role, loading, allowedRoles, router])

  return { role, loading }
}
