import { createClient } from '../../../../utils/supabase/server';
import { NextResponse } from 'next/server';

// Force Node.js Runtime
export const runtime = 'nodejs';

export async function GET(request) {
  console.log('Auth callback started with Node.js runtime');
  
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (!code) {
      console.error('No code parameter found');
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=no_code`);
    }

    const supabase = createClient();
    
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Auth exchange error:', error.message);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=auth_failed`);
    }

    console.log('Auth successful, redirecting to dashboard');
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`);
    
  } catch (error) {
    console.error('Unexpected error in auth callback:', error.message);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=server_error`);
  }
}