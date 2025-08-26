import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Create an empty response object to clone the request and set cookies
  const response = NextResponse.next({
    request: {
      headers: request.headers,
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
        // Correctly set cookies on the response object
        set(name, value, options) {
          response.cookies.set({ name, value, ...options });
        },
        // Correctly remove cookies by setting an empty value
        remove(name, options) {
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const protectedRoutes = ['/home', '/dashboard'];
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  if (!user && isProtectedRoute) {
    // Redirect to login and return the response
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/sign-up')) {
    // Redirect to dashboard and return the response
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Return the response object, now with any new cookies set
  return response;
}

export const config = {
  matcher: [
    '/home',
    '/login',
    '/sign-up',
    '/dashboard/:path*',
    '/update-password',
  ],
};