import { createDirectus, rest, staticToken } from '@directus/sdk'

if (!process.env.DIRECTUS_CMS_URL) {
  throw new Error('DIRECTUS_CMS_URL environment variable is not defined')
}

const directusCmsUrl = `https://${process.env.DIRECTUS_CMS_URL}`

const directus = createDirectus(directusCmsUrl).with(
  rest({
    onRequest: (options) => ({ ...options }),
  }),
)

export function createPreviewDirectus(token: string) {
  return createDirectus(directusCmsUrl).with(staticToken(token)).with(rest())
}

export default directus
