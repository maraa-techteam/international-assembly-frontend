import { AccordionProps } from '@/common/components/Accordion/Accordion'

import { IconType } from '../components/Icon/Icon.type'

export type PageType = {
  meta_title: string
  meta_description: string
  title: string
  text: string
  image: string
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
