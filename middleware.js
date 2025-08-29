import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  try {
    // Create a response object
    let response = NextResponse.next({
      request: {
        headers: new Headers(request.headers),
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return request.cookies.get(name)?.value;
          },
          set(name, value, options) {
            // If the cookie is set, update the response
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name, options) {
            // If the cookie is removed, update the response
            response.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );

    // Get the user session
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Auth error:', error);
      // Continue without redirecting on auth errors
    }

    const protectedRoutes = ['/', '/home', '/dashboard'];
    const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);
    const isAuthRoute = ['/login', '/sign-up'].includes(request.nextUrl.pathname);

    // Redirect logic
    if (!user && isProtectedRoute) {
      const redirectUrl = new URL('/login', request.url);
      return NextResponse.redirect(redirectUrl);
    }
    
    if (user && isAuthRoute) {
      const redirectUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    // Return a basic response without authentication on error
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/home',
    '/login',
    '/',
    '/sign-up',
    '/dashboard/:path*',
    '/update-password',
  ],
};