import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { newsletterSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = newsletterSchema.parse(body)
    
    const { data, error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert({
        email: validated.email,
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'You are already subscribed to our newsletter! 📧' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json(
      { success: true, message: 'Subscribed successfully' },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Newsletter API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Subscription failed' },
      { status: 500 }
    )
  }
}