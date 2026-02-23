import { expect, test } from '@playwright/test'

const BASE_URL = process.env.DIRECTUS_CMS_URL
  ? `https://${process.env.DIRECTUS_CMS_URL}`
  : ''

test.describe('Articles API', () => {
  test('article collection returns a list of articles', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/article`, {
      params: {
        fields: 'id,slug,title,date_updated,date_created,image,perex',
        limit: '5',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
    if (json.data.length > 0) {
      const article = json.data[0]
      expect(article).toHaveProperty('id')
      expect(article).toHaveProperty('title')
    }
  })

  test('article can be fetched by slug filter', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const listResponse = await request.get(`${BASE_URL}/items/article`, {
      params: { fields: 'slug', limit: '1' },
    })

    expect(listResponse.ok()).toBeTruthy()
    const listJson = await listResponse.json()
    expect(Array.isArray(listJson.data)).toBe(true)

    if (listJson.data.length > 0) {
      const slug = listJson.data[0].slug

      const response = await request.get(`${BASE_URL}/items/article`, {
        params: {
          'filter[slug][_eq]': slug,
          fields: 'id,slug,title,date_updated,date_created,content,image,perex',
        },
      })

      expect(response.ok()).toBeTruthy()
      const json = await response.json()
      expect(json.data).toBeDefined()
      expect(Array.isArray(json.data)).toBe(true)
      expect(json.data.length).toBe(1)
      expect(json.data[0].slug).toBe(slug)
    }
  })

  test('article endpoint returns 200 for invalid slug with empty result', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/article`, {
      params: {
        'filter[slug][_eq]': 'non-existent-slug-xyz-000',
        fields: 'id,slug,title',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
    expect(json.data.length).toBe(0)
  })
})
