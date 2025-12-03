import { ArticleCardType } from '@/types/components'
import { BaseSection } from '@/types/sections'

export type ArticleCardSectionProps = BaseSection & {
  type: 'article'
  article_cards: ArticleCardType[]
}
