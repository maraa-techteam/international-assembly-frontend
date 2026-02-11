import { createDirectus, rest } from '@directus/sdk'

const directusCmsUrl = `https://${process.env.DIRECTUS_CMS_URL}`

if (!directusCmsUrl) {
  throw new Error('DIRECTUS_CMS_URL environment variable is not defined')
}

const directus = createDirectus(directusCmsUrl).with(
  rest({
    onRequest: (options) => ({ ...options, cache: 'no-store' }),
  }),
)

export default directus
