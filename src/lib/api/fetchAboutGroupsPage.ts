import { readItems } from '@directus/sdk'

import directus from '../utils/directus'

export async function fetchAboutGroupsPage() {
  const raw = await directus.request(
    readItems('about_groups_page', {
      fields: [
        'meta_title',
        'meta_description',
        'title',
        'text',
        'image',
        'additional_link',
        'button_left',
        'button_right',
        'faq',
      ],
    }),
  )
  return raw.map((item) => {
    return {
      meta_title: item.meta_title,
      meta_description: item.meta_description,
      title: item.title,
      text: item.text,
      image: item.image,
      additional_link: item.additional_link,
      button_left: item.button_left,
      button_right: item.button_right,
      faq: item.faq,
    }
  })
}
