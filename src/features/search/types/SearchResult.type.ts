export type ArticleSearchResult = {
  id: string
  title: string
  perex: string
  image: string | null
  date_created: string
  slug: string
}

export type GroupSearchResult = {
  id: string
  name: string
  country: string
  presence: string
  slug: string
  website?: string | null
  youtube?: string | null
  telegram?: string | null
  whatsapp?: string | null
}

/** @deprecated Use ArticleSearchResult instead */
export type SearchResult = ArticleSearchResult
