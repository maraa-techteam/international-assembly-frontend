import { LiteratureItem } from '../../types/LiteratureItem.type'

export type LiteratureCardType = Pick<
  LiteratureItem,
  'slug' | 'title' | 'subtitle' | 'price' | 'currency' | 'cover_image'
> & {
  className?: string
}
