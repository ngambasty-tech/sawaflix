'use server';

import { createClient } from '../../utils/supabase/server';
// import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export async function signInWithPassword(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const supabase =createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    return { error: error.message };
  }

  redirect('/dashboard');
}

export async function signUpWithPassword(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const supabase =createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    return { error: error.message };
  }
  
  redirect('/login');
}

export async function signInWithGoogle() {
  const supabase =createClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.message);
    return redirect('/login?error=oauth_error');
  }

  return redirect(data.url);
}

// New function for password reset
export async function resetPassword(formData) {
  const email = formData.email;
  if (!email) {
    return { error: 'Email is required' };
  }
  
  const supabase = createClient();

  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/update-password`,
  });

  if (error) {
    console.error("Password reset error:", error.message);
    return { error: error.message };
  }

  return { error: null };
}

export async function handleSignOut() {
  'use server';
  
  try {
    const supabase =createClient();
    
    if (!supabase.auth) {
      console.error('Supabase auth module not available');
      return redirect('/login?error=auth_not_available');
    }
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error.message);
      return redirect('/login?error=signout_failed');
    }
    
    return redirect('/login');
  } catch (error) {
    console.error('Unexpected error in handleSignOut:', error.message);
    return redirect('/login?error=unexpected_error');
  }
}