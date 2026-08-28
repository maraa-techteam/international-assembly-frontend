import { fetchContactsPage } from '@/common/api/fetchContactsPage'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

import { ReactEmail } from '../../../../emails/ReactEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body as Record<string, unknown>

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      )
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 },
      )
    }

    const pageData = await fetchContactsPage()
    if (!pageData?.secretary_email) {
      return NextResponse.json(
        { error: 'Recipient email not configured' },
        { status: 500 },
      )
    }
    const secretaryEmail = pageData.secretary_email

    const fromEmail = process.env.RESEND_FROM_EMAIL

    await resend.emails.send({
      from: `Международная Ассамблея <${fromEmail}>`,
      to: [secretaryEmail],
      subject: subject.trim(),
      replyTo: email.trim(),
      react: ReactEmail({ name, email, subject, message }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to process contact form request:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
