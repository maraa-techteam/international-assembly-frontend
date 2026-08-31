import { fetchContactsPage } from '@/common/api/fetchContactsPage'
import {
  isPdfFile,
  maxUploadFileSizeInBytes,
  sanitizePdfFilename,
} from '@/common/utils/fileUploadValidation'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

import { ReactEmail } from '../../../../emails/ReactEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
        { error: 'Все обязательные поля должны быть заполнены' },
        { status: 400 },
      )
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Неверный адрес электронной почты' },
        { status: 400 },
      )
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'Необходимо прикрепить PDF-файл' },
        { status: 400 },
      )
    }

    if (!isPdfFile(file)) {
      return NextResponse.json(
        { error: 'Форма принимает только PDF-файлы' },
        { status: 400 },
      )
    }

    if (file.size > maxUploadFileSizeInBytes) {
      return NextResponse.json(
        { error: 'Размер файла превышает допустимый лимит' },
        { status: 400 },
      )
    }

    const pageData = await fetchContactsPage()
    if (!pageData?.secretary_email) {
      return NextResponse.json(
        { error: 'Адрес электронной почты получателя не настроен' },
        { status: 500 },
      )
    }

    const secretaryEmail = pageData.secretary_email

    const normalizedSubject =
      typeof subject === 'string' && subject.trim()
        ? subject.trim()
        : 'Заявка на служение'

    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const base64FileContent = fileBuffer.toString('base64')
    const safeFilename = sanitizePdfFilename(file.name)
    const fromEmail = process.env.RESEND_FROM_EMAIL

    await resend.emails.send({
      from: `Международная Ассамблея <${fromEmail}>`,
      to: [secretaryEmail],
      subject: normalizedSubject,
      replyTo: email.trim(),
      react: ReactEmail({ name, email, subject: normalizedSubject, message }),
      attachments: [
        {
          filename: safeFilename,
          content: base64FileContent,
        },
      ],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(
      'Не удалось обработать запрос на подачу заявки на служение:',
      error,
    )
    return NextResponse.json(
      { error: 'Не удалось отправить электронное письмо' },
      { status: 500 },
    )
  }
}
