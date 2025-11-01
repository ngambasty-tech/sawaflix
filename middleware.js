import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  try {
    // Create a response object
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            // Update request cookies for subsequent middleware
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
            });
            
            // Update response cookies
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
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

    const { pathname } = request.nextUrl;
    
    // Define route patterns
    const protectedRoutes = ['/', '/home', '/dashboard'];
    const isProtectedRoute = protectedRoutes.includes(pathname) || pathname.startsWith('/dashboard/');
    const isAuthRoute = ['/login', '/sign-up', '/sign-in'].includes(pathname);

    // Redirect logic
    if (!user && isProtectedRoute) {
      const redirectUrl = new URL('/login', request.url);
      console.log('Redirecting to login - no user found');
      return NextResponse.redirect(redirectUrl);
    }
    
    if (user && isAuthRoute) {
      const redirectUrl = new URL('/dashboard', request.url);
      console.log('Redirecting to dashboard - user already authenticated');
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
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};