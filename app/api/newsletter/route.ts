import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { newsletterSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = newsletterSchema.parse(body)

    const supabase = getSupabaseAdmin()

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: validated.email,
      })

    if (error) {
      console.error('Supabase newsletter_subscribers insert error:', error)

      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'You are already subscribed to our newsletter! 📧' },
          { status: 409 }
        )
      }

      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Subscribed successfully' },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Newsletter API Error:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Subscription failed' },
      { status: 500 }
    )
  }
}