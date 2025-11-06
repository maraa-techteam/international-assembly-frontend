type CardBase = {
  title: string
  text: string
  image: string | null
}
export type ArticleCardType = CardBase & {
  href: string
  publishedAt: string
}
