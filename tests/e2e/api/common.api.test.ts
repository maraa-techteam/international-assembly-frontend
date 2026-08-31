import { expect, test } from '@playwright/test'

const BASE_URL = process.env.DIRECTUS_CMS_URL
  ? `https://${process.env.DIRECTUS_CMS_URL}`
  : ''

const PAGE_FIELDS =
  'meta_title,meta_description,title,text,image,additional_link,button_left,button_right,rich_text,faq'

test.describe('Common API', () => {
  test('home_page collection returns valid data', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/home_page`, {
      params: { fields: 'meta_title,meta_description' },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    // Page collections are singletons, so the item comes back on its own
    // rather than wrapped in an array.
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(false)
    expect(json.data).toHaveProperty('meta_title')
    expect(json.data).toHaveProperty('meta_description')
  })

  test('social_media collection returns valid data', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/social_media`, {
      params: { fields: 'name,href,icon' },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    // Not a singleton: there is one row per social network.
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
    if (json.data.length > 0) {
      expect(json.data[0]).toHaveProperty('name')
      expect(json.data[0]).toHaveProperty('href')
    }
  })

  test('groups_page collection returns valid data', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/groups_page`, {
      params: { fields: 'meta_title,meta_description,title' },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(false)
    expect(json.data).toHaveProperty('meta_title')
    expect(json.data).toHaveProperty('title')
  })

  test('news_and_events_page collection returns valid data', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(
      `${BASE_URL}/items/news_and_events_page`,
      {
        params: {
          fields: 'meta_title,meta_description,title,text,highlighted_post.*',
        },
      },
    )

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(false)
    expect(json.data).toHaveProperty('meta_title')
    expect(json.data).toHaveProperty('title')
  })

  // Every collection `fetchPage` serves, so a page shipped against a renamed
  // or missing collection fails here rather than at request time.
  for (const collection of [
    'about_aa_page',
    'about_international_assembly_page',
    'about_groups_page',
    'to_professionals_page',
    'start_the_journey_page',
    'useful_links_page',
    'faq_page',
    'steps_and_traditions_page',
  ]) {
    test(`${collection} collection returns valid data`, async ({ request }) => {
      test.skip(
        !process.env.DIRECTUS_CMS_URL,
        'DIRECTUS_CMS_URL env var is not set',
      )

      const response = await request.get(`${BASE_URL}/items/${collection}`, {
        params: { fields: PAGE_FIELDS },
      })

      expect(response.ok()).toBeTruthy()
      const json = await response.json()
      expect(json.data).toBeDefined()
      expect(Array.isArray(json.data)).toBe(false)
      expect(json.data).toHaveProperty('meta_title')
      expect(json.data).toHaveProperty('title')
    })
  }
})
