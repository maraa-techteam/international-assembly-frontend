import { fetchContactsPage } from '@/common/api/fetchContactsPage'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

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
    if (!pageData.length || !pageData[0]?.secretary_email) {
      return NextResponse.json(
        { error: 'Recipient email not configured' },
        { status: 500 },
      )
    }
    const secretaryEmail = pageData[0].secretary_email

    const safeName = escapeHtml(name.trim())
    const safeEmail = escapeHtml(email.trim())
    const safeSubject = escapeHtml(subject.trim())
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>')

    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

    await resend.emails.send({
      from: `Международная Ассамблея <${fromEmail}>`,
      to: [secretaryEmail],
      subject: subject.trim(),
      replyTo: email.trim(),
      html: `<p><strong>От:</strong> ${safeName} (${safeEmail})</p><p><strong>Тема:</strong> ${safeSubject}</p><p><strong>Сообщение:</strong></p><p>${safeMessage}</p>`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
