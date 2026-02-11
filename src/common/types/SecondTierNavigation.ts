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
