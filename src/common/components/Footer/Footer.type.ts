import { Socials } from '@/common/types/Socials'

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
  footerData: FooterNavItemType[]
}
