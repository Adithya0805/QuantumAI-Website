import { createClient } from '@supabase/supabase-js'

// Lazy-initialize the admin client so a missing env var is caught
// at request time (with a clear message) rather than at module load
// time (which causes a cold-start crash on Vercel / Edge runtimes).
let _adminClient: ReturnType<typeof createClient> | null = null

export function getSupabaseAdmin() {
  if (_adminClient) return _adminClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY'
    )
  }

  _adminClient = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return _adminClient
}

// Keep the named export for backwards compatibility
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    const client = getSupabaseAdmin()
    const value = (client as any)[prop]
    return typeof value === 'function' ? value.bind(client) : value
  },
})