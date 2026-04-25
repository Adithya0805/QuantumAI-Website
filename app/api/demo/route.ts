import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { demoSchema } from '@/lib/validations'
import { getResend } from '@/lib/resend'

export async function POST(request: Request) {
  const startTime = Date.now()

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

    // Non-blocking email sending
    getResend().emails.send({
      from: 'QuantumAI <hello@yourdomain.com>',
      to: validated.email,
      subject: '✅ Demo Request Received',
      html: `
        <div style="font-family: sans-serif; background: #050508; color: white; padding: 40px; border-radius: 20px;">
          <h2 style="color: #00f0ff;">Hi ${validated.name},</h2>
          <p>We received your demo request for <strong>${validated.company}</strong>.</p>
          <p>Our team will reach out within 24 hours to confirm your preferred date.</p>
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin-top: 20px;">Team size: ${validated.teamSize}</p>
        </div>
      `
    }).catch(emailError => {
      console.error('Email send failed:', emailError)
    })

    const duration = Date.now() - startTime
    console.log(`Demo request processed in ${duration}ms`)

    return NextResponse.json(
      { success: true, message: 'Demo request submitted! We will contact you soon.' },
      { status: 201 }
    )
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.warn('Validation failed:', error.errors)
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      )
    }

    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Demo API Error:', message)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
