import { NextResponse } from 'next/server'
import { auth, getUserWithRole } from '@/lib/auth'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { role: null },
        { status: 401 }
      )
    }

    const { role } = await getUserWithRole()
    
    return NextResponse.json(
      { role },
      { status: 200 }
    )
  } catch (error) {
    console.error('Auth role error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch role' },
      { status: 500 }
    )
  }
}
