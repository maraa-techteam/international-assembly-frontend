import { expect, test } from '@playwright/test'

const BASE_URL = process.env.DIRECTUS_CMS_URL
  ? `https://${process.env.DIRECTUS_CMS_URL}`
  : ''

test.describe('Literature API', () => {
  test('literature_page collection returns valid data', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/literature_page`, {
      params: { fields: 'meta_title,meta_description,title,text' },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    // literature_page is a singleton: the item is returned directly.
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(false)
    expect(json.data).toHaveProperty('meta_title')
    expect(json.data).toHaveProperty('title')
  })

  test('literature_items collection returns a list of items', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/literature_items`, {
      params: {
        fields:
          'id,slug,title,subtitle,category,language,author,cover_image,price,currency',
        limit: '5',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
    if (json.data.length > 0) {
      const item = json.data[0]
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('title')
      expect(item).toHaveProperty('slug')
    }
  })

  test('literature_items can be fetched by slug filter', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const listResponse = await request.get(
      `${BASE_URL}/items/literature_items`,
      {
        params: { fields: 'slug', limit: '1' },
      },
    )

    expect(listResponse.ok()).toBeTruthy()
    const listJson = await listResponse.json()
    expect(Array.isArray(listJson.data)).toBe(true)

    if (listJson.data.length > 0) {
      const slug = listJson.data[0].slug

      const response = await request.get(`${BASE_URL}/items/literature_items`, {
        params: {
          'filter[slug][_eq]': slug,
          fields:
            'id,slug,isbn,title,subtitle,description,category,language,binding_type,page_count,price,currency,author,cover_image',
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

  test('literature_items endpoint returns 200 for invalid slug with empty result', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/literature_items`, {
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

  test('literature_items collection supports category filter', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/literature_items`, {
      params: {
        'filter[category][_eq]': 'books',
        fields: 'id,slug,title,category',
        limit: '5',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
    if (json.data.length > 0) {
      expect(json.data[0]).toHaveProperty('category')
    }
  })

  test('literature_items collection supports pagination', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/literature_items`, {
      params: {
        fields: 'id,slug,title',
        limit: '10',
        page: '1',
        'aggregate[count]': '*',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
  })
})
