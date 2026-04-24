import { ArticleSearchResult as SearchResult } from '../../types/SearchResult.type'

export type SearchResultCardType = SearchResult & {
  url: string
  className?: string
}
