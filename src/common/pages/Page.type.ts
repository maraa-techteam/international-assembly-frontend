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

/**
 * A page singleton as the CMS returns it.
 *
 * The optional halves are `| null`, not `?`: Directus sends the key with a null
 * value for a field an editor has left empty, and never omits it.
 */
export type PageType = {
  meta_title: string
  meta_description: string
  title: string
  text: string
  image: PageImageType | null
  /**
   * A repeater in Directus, so it arrives as an array even though only the
   * first entry is rendered. `icon` is a multi-select dropdown and is an array
   * for the same reason.
   */
  additional_link:
    | {
        text: string
        href: string
        icon?: IconType[] | null
      }[]
    | null
  button_left:
    | {
        label: string
        link: string
      }[]
    | null
  button_right:
    | {
        label: string
        link: string
      }[]
    | null
  faq: AccordionProps | null
  rich_text: string | null
}
