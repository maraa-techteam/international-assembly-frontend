type CardBase = {
  title: string
  perex: string
  image: string | null
}
export type ArticleCard = CardBase & {
  date_created: string
  isHighlighted?: boolean
  className?: string
  related_articles?: ArticleCard[]
}
