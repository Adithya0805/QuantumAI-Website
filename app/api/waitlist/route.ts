import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { waitlistSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input
    const validated = waitlistSchema.parse(body)
    
    // Insert into database
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert({
        name: validated.name,
        email: validated.email,
        company: validated.company,
        use_case: validated.useCase,
      })
      .select()
      .single()

    if (error) {
      // Duplicate email conflict
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'You are already on the waitlist! 🚀' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json(
      { success: true, data, message: 'Welcome to the quantum future!' },
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
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
