import { ArticleCard } from '@/types/components'
import { BaseSection } from '@/types/sections'

export type ArticleCardSectionProps = BaseSection & {
  article_cards: ArticleCard[]
}
