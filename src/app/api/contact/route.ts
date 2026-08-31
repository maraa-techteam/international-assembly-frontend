import { fetchContactsPage } from '@/common/api/fetchContactsPage'
import { PRIVACY_NOTICE_UPDATED_AT } from '@/config/site'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

import { ReactEmail } from '../../../../emails/ReactEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, consent } = body as Record<
      string,
      unknown
    >

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

    /**
     * Art. 9(2)(a) consent is checked here as well as in the form because the
     * checkbox is a UI affordance, not a control — this endpoint accepts a direct
     * POST from anywhere. A submission without it is refused rather than quietly
     * processed, since the whole point of the basis is that it was actually given.
     */
    if (consent !== true) {
      return NextResponse.json(
        { error: 'Consent is required' },
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
      react: ReactEmail({
        name,
        email,
        subject,
        message,
        consentNoticeVersion: PRIVACY_NOTICE_UPDATED_AT,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to process contact form request:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
