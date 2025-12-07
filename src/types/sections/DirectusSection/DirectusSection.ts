import {
  AccordionSectionProps,
  ArticleCardSectionProps,
  CallToActionSectionProps,
  ContentGuideSectionProps,
  FindGroupSectionProps,
  HeroSectionProps,
} from '@/types/sections'

export type DirectusSection =
  | {
      collection: 'cta_section'
      item: CallToActionSectionProps
    }
  | {
      collection: 'hero_section'
      item: HeroSectionProps
    }
  | {
      collection: 'find_group_section'
      item: FindGroupSectionProps
    }
  | {
      collection: 'accordion_section'
      item: AccordionSectionProps
    }
  | {
      collection: 'links_section'
      item: ContentGuideSectionProps
    }
  | {
      collection: 'article_card_section'
      item: ArticleCardSectionProps
    }
