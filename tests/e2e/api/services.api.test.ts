import { expect, test } from '@playwright/test'

const BASE_URL = process.env.DIRECTUS_CMS_URL
  ? `https://${process.env.DIRECTUS_CMS_URL}`
  : ''

test.describe('Services API', () => {
  test('services_page collection returns valid data', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/services_page`, {
      params: { fields: 'meta_title,meta_description,title,text' },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
  })

  test('services collection returns a list of services', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/services`, {
      params: {
        fields:
          'id,slug,name,description,category,required_sobriety_time,engagement',
        limit: '5',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
    if (json.data.length > 0) {
      const service = json.data[0]
      expect(service).toHaveProperty('id')
      expect(service).toHaveProperty('name')
      expect(service).toHaveProperty('slug')
    }
  })

  test('service can be fetched by slug filter', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const listResponse = await request.get(`${BASE_URL}/items/services`, {
      params: { fields: 'slug', limit: '1' },
    })

    expect(listResponse.ok()).toBeTruthy()
    const listJson = await listResponse.json()
    expect(Array.isArray(listJson.data)).toBe(true)

    if (listJson.data.length > 0) {
      const slug = listJson.data[0].slug

      const response = await request.get(`${BASE_URL}/items/services`, {
        params: {
          'filter[slug][_eq]': slug,
          fields:
            'id,slug,name,description,category,required_sobriety_time,engagement',
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

  test('services endpoint returns 200 for invalid slug with empty result', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/services`, {
      params: {
        'filter[slug][_eq]': 'non-existent-service-slug-xyz-000',
        fields: 'id,slug,name',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
    expect(json.data.length).toBe(0)
  })
})
