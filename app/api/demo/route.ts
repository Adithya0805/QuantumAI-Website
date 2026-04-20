import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { demoSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = demoSchema.parse(body)
    
    const { data, error } = await supabaseAdmin
      .from('demo_requests')
      .insert({
        name: validated.name,
        email: validated.email,
        company: validated.company,
        phone: validated.phone,
        team_size: validated.teamSize,
        message: validated.message,
        preferred_date: validated.preferredDate,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      { success: true, message: 'Demo request submitted! We will contact you soon.' },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Demo API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to submit demo request' },
      { status: 500 }
    )
  }
}
