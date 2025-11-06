import { SecondTierNavigationType } from '@/types/navigation'
import { BaseSection } from '@/types/sections'

export type ContentGuideSectionProps = BaseSection & {
  data: SecondTierNavigationType[]
}
