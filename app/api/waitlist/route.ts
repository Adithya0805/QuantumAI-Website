import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { waitlistSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const validated = waitlistSchema.parse(body)

    const supabase = getSupabaseAdmin()

    // Insert into waitlist table (no .single() – avoids PGRST116 on 0 rows)
    const { error } = await supabase
      .from('waitlist')
      .insert({
        name: validated.name,
        email: validated.email,
        company: validated.company || null,
        use_case: validated.useCase || null,
      })

    if (error) {
      console.error('Supabase waitlist insert error:', error)

      // Duplicate email conflict
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'You are already on the waitlist! 🚀' },
          { status: 409 }
        )
      }

      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Welcome to the quantum future!' },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Waitlist API Error:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
