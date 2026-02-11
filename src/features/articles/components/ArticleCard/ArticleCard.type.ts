export type ArticleCardType = {
  id: string
  title: string
  perex: string
  image: string | null
  date_created: string
  isHighlighted?: boolean
  className?: string
  slug: string
  related_articles?: ArticleCardType[]
}
