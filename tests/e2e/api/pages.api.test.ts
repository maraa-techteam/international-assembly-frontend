import { expect, test } from '@playwright/test'

const BASE_URL = process.env.DIRECTUS_CMS_URL
  ? `https://${process.env.DIRECTUS_CMS_URL}`
  : ''

test.describe('Pages API', () => {
  test('contacts_page collection returns valid data', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/contacts_page`, {
      params: {
        fields: 'meta_title,meta_description,title,text,secretary_email',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
  })

  test('contributions_page collection returns valid data', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/contributions_page`, {
      params: {
        fields: 'id,meta_title,meta_description,title,text,provider',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
    if (json.data.length > 0) {
      expect(json.data[0]).toHaveProperty('meta_title')
    }
  })

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
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
  })
})
