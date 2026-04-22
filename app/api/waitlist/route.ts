import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { waitlistSchema } from '@/lib/validations'

export async function POST(request: Request) {
  // Check for environment variables at the start of the handler
  console.log('API Initialization: NEXT_PUBLIC_SUPABASE_URL presence:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('API Initialization: SUPABASE_SERVICE_ROLE_KEY presence:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

  try {
    const body = await request.json()

    // Validate input using Zod
    const validationResult = waitlistSchema.safeParse(body)
    if (!validationResult.success) {
      console.warn('Waitlist Validation Failed:', validationResult.error.format())
      return NextResponse.json(
        { 
          error: 'Invalid input data', 
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const { name, email, company, useCase } = validationResult.data

    // Check if Supabase Admin is available (should throw at module load if not, but safe check)
    if (!supabaseAdmin) {
      console.error('CRITICAL: supabaseAdmin is not initialized')
      return NextResponse.json(
        { error: 'Database service is currently unavailable' },
        { status: 503 }
      )
    }

    // Insert into waitlist table
    const { error } = await supabaseAdmin
      .from('waitlist')
      .insert({
        name,
        email,
        company: company || null,
        use_case: useCase || null,
      })

    if (error) {
      console.error('Supabase Error (Waitlist Insert):', error)

      // Handle duplicate email (PostgreSQL error code 23505)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waitlist 🚀' },
          { status: 409 }
        )
      }

      return NextResponse.json(
        { error: `Database Error: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Welcome to the quantum future!' },
      { status: 201 }
    )
  } catch (err: any) {
    console.error('Waitlist API Fatal Error:', err)

    return NextResponse.json(
      { error: err.message || 'An unexpected error occurred during registration' },
      { status: 500 }
    )
  }
}

