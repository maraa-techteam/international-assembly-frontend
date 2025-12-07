type CardBase = {
  title: string
  perex: string
  image: string | null
}
export type ArticleCardType = CardBase & {
  link: string
  date_created: string
}
