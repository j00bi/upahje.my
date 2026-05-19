import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Auth is handled by individual pages and API routes
  // This middleware only exists for route matching
  const pathname = request.nextUrl.pathname

  // Public routes
  const publicRoutes = [
    '/',
    '/auth/signin',
    '/auth/signup',
    '/auth/callback',
    '/privacy',
    '/terms',
    '/api/health',
    '/api/webhook',
  ]

  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  )

  // Check for Supabase session cookie as a lightweight auth check
  const hasSession = request.cookies.has('sb-uyzoinyuicsnzqpewqop-auth-token')

  // Redirect unauthenticated users from protected pages
  if (!hasSession && !isPublicRoute) {
    if (pathname.startsWith('/api/v1')) {
      return NextResponse.next()
    }

    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    redirectUrl.searchParams.set(
      'callbackUrl',
      `${request.nextUrl.pathname}${request.nextUrl.search}`
    )

    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from auth pages
  if (hasSession && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
