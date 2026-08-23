type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitOptions = {
  endpoint: string
  payload: ContactPayload
  file?: File | null
}

export async function submitContactForm({
  endpoint,
  payload,
  file,
}: SubmitOptions): Promise<boolean> {
  let response: Response

  if (file) {
    const body = new FormData()
    body.set('name', payload.name)
    body.set('email', payload.email)
    body.set('message', payload.message)
    if (payload.subject) body.set('subject', payload.subject)
    body.set('file', file)

    response = await fetch(endpoint, { method: 'POST', body })
  } else {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  }

  return response.ok
}
