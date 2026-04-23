import { fetchContactsPage } from '@/common/api/fetchContactsPage'
import { buildContactEmailHtml } from '@/common/utils/contactEmailTemplate'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const maxFileSizeInBytes = 5 * 1024 * 1024

function sanitizeFilename(filename: string): string {
  const safeSource = filename.trim() || 'attachment'
  const filenameWithoutPath = safeSource.split(/[/\\]/).pop() || 'attachment'
  const filenameWithoutExtension = filenameWithoutPath.replace(/\.pdf$/i, '')
  const safeBaseName = filenameWithoutExtension
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')

  return `${safeBaseName || 'attachment'}.pdf`
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

    const normalizedSubject =
      typeof subject === 'string' && subject.trim()
        ? subject.trim()
        : 'Заявка на служение'

    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const base64FileContent = fileBuffer.toString('base64')
    const safeFilename = sanitizeFilename(file.name)
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

    await resend.emails.send({
      from: `Международная Ассамблея <${fromEmail}>`,
      to: [secretaryEmail],
      subject: normalizedSubject,
      replyTo: email.trim(),
      html: buildContactEmailHtml({
        name,
        email,
        subject: normalizedSubject,
        message,
      }),
      attachments: [
        {
          filename: safeFilename,
          content: base64FileContent,
        },
      ],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to process service application request:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
