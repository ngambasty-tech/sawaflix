import { createClient } from '../../../../utils/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error(error.message);
      return redirect('/login?error=oauth_error');
    }
  }

  return redirect('/dashboard');
}