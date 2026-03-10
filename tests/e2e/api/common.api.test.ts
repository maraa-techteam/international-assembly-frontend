import { expect, test } from '@playwright/test'

const BASE_URL = process.env.DIRECTUS_CMS_URL
  ? `https://${process.env.DIRECTUS_CMS_URL}`
  : ''

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
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
    if (json.data.length > 0) {
      expect(json.data[0]).toHaveProperty('meta_title')
      expect(json.data[0]).toHaveProperty('meta_description')
    }
  })

  test('navigation collection returns valid data', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/navigation`, {
      params: { fields: 'name,href,showInHeader,showInFooter' },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
    if (json.data.length > 0) {
      expect(json.data[0]).toHaveProperty('name')
      expect(json.data[0]).toHaveProperty('href')
    }
  })

  test('sub_nav collection returns valid data', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/sub_nav`, {
      params: { fields: 'name,href,description,isFrequentlyVisited' },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
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
    expect(Array.isArray(json.data)).toBe(true)
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
        params: { fields: 'meta_title,meta_description,title,text' },
      },
    )

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
  })

  test('about_groups_page collection returns valid data', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/about_groups_page`, {
      params: {
        fields:
          'meta_title,meta_description,title,text,image,additional_link,button_left,button_right,faq',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
  })

  test('to_professionals_page collection returns valid data', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(
      `${BASE_URL}/items/to_professionals_page`,
      {
        params: {
          fields:
            'meta_title,meta_description,title,text,image,additional_link,button_left,button_right,faq',
        },
      },
    )

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
  })

  test('useful_links_page collection returns valid data', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/useful_links_page`, {
      params: {
        fields:
          'meta_title,meta_description,title,text,image,additional_link,button_left,button_right,rich_text,faq',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
  })

  test('start_the_journey_page collection returns valid data', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(
      `${BASE_URL}/items/start_the_journey_page`,
      {
        params: {
          fields:
            'meta_title,meta_description,title,text,image,additional_link,button_left,button_right,rich_text,faq',
        },
      },
    )

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
  })

  test('faq_page collection returns valid data', async ({ request }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(`${BASE_URL}/items/faq_page`, {
      params: {
        fields:
          'meta_title,meta_description,title,text,image,additional_link,button_left,button_right,rich_text,faq',
      },
    })

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
  })

  test('steps_and_traditions_page collection returns valid data', async ({
    request,
  }) => {
    test.skip(
      !process.env.DIRECTUS_CMS_URL,
      'DIRECTUS_CMS_URL env var is not set',
    )

    const response = await request.get(
      `${BASE_URL}/items/steps_and_traditions_page`,
      {
        params: {
          fields:
            'meta_title,meta_description,title,text,image,additional_link,button_left,button_right,rich_text,faq',
        },
      },
    )

    expect(response.ok()).toBeTruthy()
    const json = await response.json()
    expect(json.data).toBeDefined()
    expect(Array.isArray(json.data)).toBe(true)
  })
})
