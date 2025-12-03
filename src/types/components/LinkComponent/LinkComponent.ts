import { Color } from '@/types/base'
import { IconType } from '@/types/components'

export type LinkComponentProps = {
  icon?: IconType
  text: string
  href: string
  variant: 'icon-left' | 'icon-right' | 'icon-only'
  color?: Color
  className?: string
  isUnderlined?: boolean
}
