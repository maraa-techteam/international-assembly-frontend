import { LiteratureItem } from '../../types/LiteratureItem.type'

export type LiteratureCardType = Pick<
  LiteratureItem,
  | 'id'
  | 'title'
  | 'subtitle'
  | 'author'
  | 'edition_name'
  | 'page_count'
  | 'price'
  | 'currency'
  | 'cover_image'
> & {
  className?: string
}
