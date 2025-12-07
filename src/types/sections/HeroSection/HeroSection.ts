import { ButtonType } from '@/types/components'
import { BaseSection } from '@/types/sections'

export type HeroSectionProps = BaseSection & {
  actions: ButtonType[]
}
