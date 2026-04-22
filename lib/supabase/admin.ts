import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('CRITICAL: NEXT_PUBLIC_SUPABASE_URL is not defined in environment variables.')
}

if (!supabaseServiceKey) {
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