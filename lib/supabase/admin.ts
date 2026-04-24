import { createClient } from '@supabase/supabase-js'

// Use fallbacks for CI/CD build environments where secrets might not be injected
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'

// We only throw in production if it's missing (to avoid silent failures in Vercel)
if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.CI) {
  throw new Error('CRITICAL: NEXT_PUBLIC_SUPABASE_URL is not defined in environment variables.')
}

if (process.env.NODE_ENV === 'production' && !process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.CI) {
  throw new Error('CRITICAL: SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables.')
}

// Initialize the admin client with service role key
// This client bypasses RLS and should only be used in server-side contexts
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Export helper for cases where a fresh client might be needed or for consistency
export function getSupabaseAdmin() {
  return supabaseAdmin
}