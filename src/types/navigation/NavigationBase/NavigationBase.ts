import { SecondTierNavigationType } from '@/types/navigation'

export type NavigationType = {
  name: string
  href: string
  showInHeader: boolean
  showInFooter: boolean
  subNav: SecondTierNavigationType[]
}

export type TransformedNavigationType = NavigationType & {
  isActive: boolean
}
