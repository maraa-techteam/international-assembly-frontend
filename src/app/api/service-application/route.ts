import { fetchContactsPage } from '@/common/api/fetchContactsPage'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const maxFileSizeInBytes = 5 * 1024 * 1024

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function sanitizeFilename(filename: string): string {
  const trimmed = filename.trim()
  const baseName = trimmed || 'attachment.pdf'
  const safe = baseName.replace(/[^a-zA-Z0-9._-]/g, '_')

  if (safe.toLowerCase().endsWith('.pdf')) {
    return safe
  }

  return `${safe}.pdf`
}

function isPdfFile(file: File): boolean {
  return (
    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
  )
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')
    const subject = formData.get('subject')
    const file = formData.get('file')

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 },
      )
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 },
      )
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'PDF file is required' },
        { status: 400 },
      )
    }

    if (!isPdfFile(file)) {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 },
      )
    }

    if (file.size > maxFileSizeInBytes) {
      return NextResponse.json(
        { error: 'File size exceeds allowed limit' },
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
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>')
    const safeSubject =
      typeof subject === 'string' && subject.trim()
        ? escapeHtml(subject.trim())
        : 'Заявка на служение'

    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const safeFilename = sanitizeFilename(file.name)
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

    await resend.emails.send({
      from: `Международная Ассамблея <${fromEmail}>`,
      to: [secretaryEmail],
      subject: safeSubject,
      replyTo: email.trim(),
      html: `<p><strong>От:</strong> ${safeName} (${safeEmail})</p><p><strong>Тема:</strong> ${safeSubject}</p><p><strong>Сообщение:</strong></p><p>${safeMessage}</p>`,
      attachments: [
        {
          filename: safeFilename,
          content: fileBuffer.toString('base64'),
        },
      ],
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
