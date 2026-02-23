import { createDirectus, rest } from '@directus/sdk'

if (!process.env.DIRECTUS_CMS_URL) {
  throw new Error('DIRECTUS_CMS_URL environment variable is not defined')
}

const directusCmsUrl = `https://${process.env.DIRECTUS_CMS_URL}`

const directus = createDirectus(directusCmsUrl).with(
  rest({
    onRequest: (options) => ({ ...options, cache: 'no-store' }),
  }),
)

export default directus
