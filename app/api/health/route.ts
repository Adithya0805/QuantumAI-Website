import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

type TableResult = { ok: true; rowCount: number | null } | { ok: false; error: string; code: string }

type HealthResults = {
  timestamp: string
  env: {
    NEXT_PUBLIC_SUPABASE_URL: boolean
    NEXT_PUBLIC_SUPABASE_ANON_KEY: boolean
    SUPABASE_SERVICE_ROLE_KEY: boolean
  }
  tables: Record<string, TableResult>
}

// GET /api/health — verifies Supabase connectivity and all 4 tables
export async function GET() {
  const results: HealthResults = {
    timestamp: new Date().toISOString(),
    env: {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    tables: {},
  }

  try {
    const supabase = getSupabaseAdmin()

    const tables = ['waitlist', 'contact_messages', 'newsletter_subscribers', 'demo_requests']

    for (const table of tables) {
      const { error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })

      results.tables[table] = error
        ? { ok: false, error: error.message, code: error.code }
        : { ok: true, rowCount: count }
    }

    const allOk = Object.values(results.tables).every((t) => t.ok)

    return NextResponse.json(
      { status: allOk ? 'healthy' : 'degraded', ...results },
      { status: allOk ? 200 : 500 }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json(
      { status: 'error', error: message, ...results },
      { status: 500 }
    )
  }
}
