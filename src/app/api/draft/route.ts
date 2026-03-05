import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

const COLLECTION_PATHS: Record<string, string> = {
  article: '/news-and-events',
  groups: '/groups',
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const collection = searchParams.get('collection')

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  if (!slug) {
    return new Response('Missing slug parameter', { status: 400 })
  }

  if (!collection || !(collection in COLLECTION_PATHS)) {
    return new Response('Missing or invalid collection parameter', {
      status: 400,
    })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(`${COLLECTION_PATHS[collection]}/${slug}`)
}
