function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

type BuildContactEmailHtmlParams = {
  name: string
  email: string
  subject: string
  message: string
}

export function buildContactEmailHtml({
  name,
  email,
  subject,
  message,
}: BuildContactEmailHtmlParams): string {
  const safeName = escapeHtml(name.trim())
  const safeEmail = escapeHtml(email.trim())
  const safeSubject = escapeHtml(subject.trim())
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>')

  return `<p><strong>От:</strong> ${safeName} (${safeEmail})</p><p><strong>Тема:</strong> ${safeSubject}</p><p><strong>Сообщение:</strong></p><p>${safeMessage}</p>`
}
