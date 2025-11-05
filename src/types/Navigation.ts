export type NavigationType = {
  name: string
  href: string
  showInHeader: boolean
  showInFooter: boolean
  subNav: SecondTierNavigationType[]
}

export type SecondTierNavigationType = {
  name: string
  href: string
  description: string
  isFrequentlyVisited: boolean
}

export type TransformedSecondTierNavigationType = {
  name: string
  href: string
  description: string
  isActive: boolean
}[]

export type TransformedNavigationType = NavigationType & {
  isActive: boolean
}
