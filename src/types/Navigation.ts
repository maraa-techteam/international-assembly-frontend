export type NavigationDataType = {
  name: string
  href: string
  showInHeader: boolean
  showInFooter: boolean
  subNav: {
    name: string
    href: string
    description: string
  }[]
}

export type TransformedNavigationDataType = NavigationDataType & {
  isActive: boolean
}
