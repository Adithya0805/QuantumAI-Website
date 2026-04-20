import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { contactSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = contactSchema.parse(body)
    
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .insert({
        name: validated.name,
        email: validated.email,
        subject: validated.subject,
        message: validated.message,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send message' },
      { status: 500 }
    )
  }
}
