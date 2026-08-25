import { AccordionProps } from '@/common/components/Accordion/Accordion'

import { IconType } from '../components/Icon/Icon.type'

/**
 * The page's illustration, with the intrinsic dimensions Directus records for
 * the file. They are what lets the image keep its own proportions instead of
 * being squeezed into a fixed box.
 */
export type PageImageType = {
  id: string
  width: number | null
  height: number | null
}

export type PageType = {
  meta_title: string
  meta_description: string
  title: string
  text: string
  image: PageImageType | null
  additional_link?: {
    text: string
    href: string
    icon?: IconType
  }
  button_left?: {
    label: string
    link: string
  }[]
  button_right?: {
    label: string
    link: string
  }[]
  faq?: AccordionProps
  rich_text?: string
}
