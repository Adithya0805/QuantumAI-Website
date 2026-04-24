import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    // Expected payload from Supabase Database Webhook (pg_net)
    const newRecord = payload.record
    const oldRecord = payload.old_record

    if (payload.type === 'UPDATE' && newRecord?.status !== oldRecord?.status) {
      if (newRecord.status === 'approved') {
        await resend.emails.send({
          from: 'QuantumAI <hello@yourdomain.com>',
          to: newRecord.email,
          subject: "Your Demo is Approved! 🚀",
          html: `<p>Hi ${newRecord.name},</p><p>Great news! Your demo request has been approved. Our team will reach out shortly to coordinate the date.</p>`
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Webhook Error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
