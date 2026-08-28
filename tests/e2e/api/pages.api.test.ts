import { expect, test } from '@playwright/test'

const BASE_URL = process.env.DIRECTUS_CMS_URL
  ? `https://${process.env.DIRECTUS_CMS_URL}`
  : ''

test.describe('Pages API', () => {
  test('quiz_page collection returns valid data', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/quiz_page`, {
      params: { fields: 'meta_title,meta_description,title,text' },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    // quiz_page is a singleton: the item is returned directly.
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(false)
    expect(json.data).toHaveProperty('meta_title')
    expect(json.data).toHaveProperty('title')
  })
})
