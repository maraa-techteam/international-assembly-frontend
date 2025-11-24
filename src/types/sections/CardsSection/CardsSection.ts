import { ArticleCardType } from '@/types/components'
import { BaseSection } from '@/types/sections'

export type CardSectionProps = BaseSection & {
  type: 'article' | 'book' | 'brochure'
  cards: ArticleCardType[]
}
