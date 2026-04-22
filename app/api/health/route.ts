import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

// GET /api/health — verifies Supabase connectivity and all 4 tables
export async function GET() {
  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    env: {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    tables: {} as Record<string, any>,
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

    const allOk = Object.values(results.tables).every((t: any) => t.ok)

    return NextResponse.json(
      { status: allOk ? 'healthy' : 'degraded', ...results },
      { status: allOk ? 200 : 500 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', error: err.message, ...results },
      { status: 500 }
    )
  }
}
