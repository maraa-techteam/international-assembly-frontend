import { Socials } from '@/types/navigation'
import { TransformedNavigationType } from '@/types/navigation'

export type FooterNavItemProps = {
  name: string
  subNav: {
    name: string
    href: string
    description: string
    isFrequentlyVisited: boolean
  }[]
  isActive: boolean
  toggleSelect: () => void
}

export type FooterProps = {
  footerData: TransformedNavigationType[]
  socials: Socials[]
}
