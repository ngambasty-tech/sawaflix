// utils/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient(cookieStore: ReturnType<typeof cookies>) {
  // Await the cookieStore promise to get the actual object
  const resolvedCookieStore = await cookieStore;

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return resolvedCookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            resolvedCookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method is called from a Server Component.
            // This is not a problem since we'll be redirecting anyway.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            resolvedCookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // The `remove` method is called from a Server Component.
            // This is not a problem since we'll be redirecting anyway.
          }
        },
      },
    },
  );
}