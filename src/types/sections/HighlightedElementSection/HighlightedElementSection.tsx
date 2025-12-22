import { Article } from '@/types/base'
import { BaseSection } from '@/types/sections'

export type HighlightedElementSection = BaseSection & {
  text: string
  primary_item: Article
}
