import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { auth, getUserWithRole } from '@/lib/auth'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { user: null, role: null },
        { status: 401 }
      )
    }

    const { user, role, profile } = await getUserWithRole()
    
    return NextResponse.json(
      {
        user: {
          id: user?.id,
          email: user?.email,
          name: user?.name || user?.email,
        },
        role,
        profile,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
