export type ArticleSearchResult = {
  id: string
  title: string
  perex?: string | null
  image: string | null
  date_created?: string
  slug: string
}

export type GroupSearchResult = {
  id: string
  name: string
  description?: string | null
  country: string
  presence: string
  slug: string
  website?: string | null
  youtube?: string | null
  telegram?: string | null
  whatsapp?: string | null
}

export type LiteratureSearchResult = {
  id: string
  title: string
  subtitle?: string | null
  author?: string | null
  cover_image: string | null
  description?: string | null
  slug: string
}
