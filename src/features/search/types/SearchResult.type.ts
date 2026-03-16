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
  description: string
  country: string
  presence: string
  slug: string
}

/** @deprecated Use ArticleSearchResult instead */
export type SearchResult = ArticleSearchResult
