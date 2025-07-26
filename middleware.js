import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)', 
  '/auth(.*)',
  '/login(.*)',
  '/',
  '/api/webhooks/(.*)',
])

// Define routes that should redirect authenticated users
const isAuthRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/auth(.*)',
  '/login(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth()
  const pathname = request.nextUrl.pathname
  
  console.log(`Middleware: ${pathname}, userId: ${userId ? 'exists' : 'null'}`)
  
  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (userId && isAuthRoute(request)) {
    console.log('Authenticated user accessing auth route, redirecting to dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Special handling for interview routes - require auth
  if (pathname.startsWith('/interview/')) {
    if (!userId) {
      console.log('Unauthenticated user accessing interview, redirecting to auth')
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    return NextResponse.next()
  }
  
  // Allow access to public routes
  if (isPublicRoute(request)) {
    console.log('Public route, allowing access')
    return NextResponse.next()
  }
  
  // For protected routes, check if user is authenticated
  if (!userId) {
    console.log('Unauthenticated user accessing protected route, redirecting to sign-in')
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
  
  // User is authenticated, allow access to protected routes
  console.log('Authenticated user accessing protected route, allowing access')
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}