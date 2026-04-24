import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { contactSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = contactSchema.parse(body)
    
    const { error } = await supabaseAdmin
      .from('contact_messages')
      .insert({
        name: validated.name,
        email: validated.email,
        subject: validated.subject,
        message: validated.message,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase Insert Error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      throw error
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('Contact API Error:', error)
    const message = error instanceof Error ? error.message : 'Failed to send message'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}