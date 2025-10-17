type CardBase = {
  title: string
  text: string
  image: string | null
}
export type ArticleCardType = CardBase & {
  href: string
  publishedAt: string
}

export type CardGroupProps = {
  type: 'article' | 'book' | 'brochure'
  isScrollable: boolean
  columns: 2 | 3 | 4
  cards: ArticleCardType[]
}
