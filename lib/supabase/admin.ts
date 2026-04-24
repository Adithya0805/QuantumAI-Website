import { createClient } from '@supabase/supabase-js'

// Use fallbacks for CI/CD build environments where secrets might not be injected
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'

// We only warn in production if it's missing (to avoid build crashes in Vercel)
if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.CI) {
  console.warn('Supabase URL missing')
}

if (process.env.NODE_ENV === 'production' && !process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.CI) {
  console.warn('Supabase service key missing')
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