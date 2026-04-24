import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { newsletterSchema } from '@/lib/validations'
import { resend } from '@/lib/resend'

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

    try {
      await resend.emails.send({
        from: 'QuantumAI <hello@yourdomain.com>',
        to: validated.email,
        subject: '⚡ Subscribed to QuantumAI Updates',
        html: `<p>You're now synced. Expect weekly deep-dives on quantum hardware.</p>`
      })
    } catch (emailError) {
      console.error('Email send failed:', emailError)
    }

    return NextResponse.json(
      { success: true, message: 'Subscribed successfully' },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('Newsletter API Error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      )
    }

    const message = error instanceof Error ? error.message : 'Subscription failed'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}