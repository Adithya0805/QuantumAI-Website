import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { waitlistSchema } from '@/lib/validations'
import { resend } from '@/lib/resend'

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
    const { data: insertedData, error } = await supabaseAdmin
      .from('waitlist')
      .insert({
        name,
        email,
        company: company || null,
        use_case: useCase || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase Error (Waitlist Insert):', error)

      // Handle duplicate email (PostgreSQL error code 23505)
      if (error.code === '23505') {
        return NextResponse.json(
          { already_exists: true, message: "You're already on the list! We'll reach out soon." },
          { status: 200 }
        )
      }

      return NextResponse.json(
        { error: `Database Error: ${error.message}` },
        { status: 500 }
      )
    }

    const { count } = await supabaseAdmin
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .lte('created_at', insertedData?.created_at)

    try {
      await resend.emails.send({
        from: 'QuantumAI <hello@yourdomain.com>',
        to: email,
        subject: '🚀 You\'re on the QuantumAI waitlist',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #00F0FF;">Welcome, ${name}!</h1>
            <p>You've secured your spot on the QuantumAI waitlist.</p>
            <p>We'll notify you the moment early access opens.</p>
            <hr/>
            <p style="color: #888; font-size: 12px;">QuantumAI — Next-Gen AI Hardware</p>
          </div>
        `
      })
    } catch (emailError) {
      console.error('Email send failed:', emailError)
    }

    return NextResponse.json(
      { success: true, message: 'Welcome to the quantum future!', count },
      { status: 201 }
    )
  } catch (err: unknown) {
    console.error('Waitlist API Fatal Error:', err)
    const message = err instanceof Error ? err.message : 'An unexpected error occurred during registration'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}

