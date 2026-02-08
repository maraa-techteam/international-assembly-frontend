import { Socials } from '@/types/navigation'
import { TransformedNavigationType } from '@/types/navigation'

export type FooterNavItemType = {
  name: string
  subNav: {
    name: string
    href: string
    description: string
    isFrequentlyVisited: boolean
  }[]
}

export type FooterType = {
  footerData: TransformedNavigationType[]
  socials: Socials[]
}
