import { expect, test } from '@playwright/test'

const BASE_URL = process.env.DIRECTUS_CMS_URL
  ? `https://${process.env.DIRECTUS_CMS_URL}`
  : ''

test.describe('Groups API', () => {
  test('groups collection returns a list of groups', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/groups`, {
      params: {
        fields: 'id,slug,name,description,country,presence',
        limit: '5',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
    if (json.data.length > 0) {
      const group = json.data[0]
      expect(group).toHaveProperty('id')
      expect(group).toHaveProperty('name')
    }
  })

  test('groups collection supports pagination', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/groups`, {
      params: {
        fields: 'id,slug,name',
        limit: '10',
        page: '1',
        'meta[]': 'total_count',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
  })

  test('group can be fetched by slug filter', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const listResponse = await request.get(`${BASE_URL}/items/groups`, {
      params: { fields: 'slug', limit: '1' },
    })

    expect(listResponse.ok()).toBeTruthy()
    const listJson = await listResponse.json()
    expect(Array.isArray(listJson.data)).toBe(true)

    if (listJson.data.length > 0) {
      const slug = listJson.data[0].slug

      const response = await request.get(`${BASE_URL}/items/groups`, {
        params: {
          'filter[slug][_eq]': slug,
          fields: 'name,description,country,presence,slug',
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

  test('groups endpoint returns 200 for invalid slug with empty result', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/groups`, {
      params: {
        'filter[slug][_eq]': 'non-existent-group-slug-xyz-000',
        fields: 'id,slug,name',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
    expect(json.data.length).toBe(0)
  })

  test('groups collection supports country filter', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/groups`, {
      params: {
        'filter[country][_in]': 'US',
        fields: 'id,slug,name,country',
        limit: '5',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
  })
})
