import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { demoSchema } from '@/lib/validations'
import { getResend } from '@/lib/resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = demoSchema.parse(body)

    const supabase = getSupabaseAdmin()

    const { error } = await supabase
      .from('demo_requests')
      .insert({
        name: validated.name,
        email: validated.email,
        company: validated.company,
        phone: validated.phone || null,
        team_size: validated.teamSize,
        message: validated.message || null,
        preferred_date: validated.preferredDate || null,
      })

    if (error) {
      console.error('Supabase demo_requests insert error:', error)
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    try {
      await getResend().emails.send({
        from: 'QuantumAI <hello@yourdomain.com>',
        to: validated.email,
        subject: '✅ Demo Request Received',
        html: `
          <div style="font-family: sans-serif;">
            <h2>Hi ${validated.name},</h2>
            <p>We received your demo request for <strong>${validated.company}</strong>.</p>
            <p>Our team will reach out within 24 hours to confirm your preferred date.</p>
            <p><strong>Team size:</strong> ${validated.teamSize}</p>
          </div>
        `
      })
    } catch (emailError) {
      console.error('Email send failed:', emailError)
    }

    return NextResponse.json(
      { success: true, message: 'Demo request submitted! We will contact you soon.' },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('Demo API Error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      )
    }

    const message = error instanceof Error ? error.message : 'Failed to submit demo request'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
