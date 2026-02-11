import { ColorType } from '@/common/types/Color'

import { IconType } from '../Icon/Icon.type'

export type LinkComponentType = {
  icon?: IconType
  text: string
  href: string
  variant: 'icon-left' | 'icon-right' | 'icon-only'
  color?: ColorType
  isUnderlined?: boolean
}
