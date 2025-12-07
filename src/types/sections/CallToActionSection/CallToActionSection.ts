import { ButtonType, IconType } from '@/types/components'
import { BaseSection } from '@/types/sections'

export type CallToActionSectionProps = BaseSection & {
  text: string
  linkText?: string
  linkHref?: string
  linkIcon?: IconType
  actions: ButtonType[]
  image: string
}
