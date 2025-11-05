import { ButtonType } from '@/ui/components/Button/Button'

import { ArticleCardType } from './Components'
import { SecondTierNavigationType } from './Navigation'

export type DirectusSection = {
  collection: 'cta_section'
  item: CallToActionSectionProps
}

export type BaseSectionProps = {
  title: string
}

export type HeroSectionProps = BaseSectionProps & {
  buttons: ButtonType[]
}

export type CallToActionSectionProps = BaseSectionProps & {
  text: string
  linkText: string
  linkHref: string
  linkIcon:
    | 'search'
    | 'arrow-right'
    | 'chevron-down'
    | 'close'
    | 'hamburger'
    | 'chevron-right'
    | 'arrow-left'
    | 'youtube'
    | 'telegram'
  actions: ButtonType[]
  image: string
}

export type ContentGuideSectionProps = BaseSectionProps & {
  data: SecondTierNavigationType[]
}

export type FindGroupSectionProps = BaseSectionProps & {
  text: string
}

export type CardSectionProps = BaseSectionProps & {
  type: 'article' | 'book' | 'brochure'
  cards: ArticleCardType[]
}
