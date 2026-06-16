import { ArticleSearchResult } from '../../types/SearchResult.type'

export type SearchPostCardProps = ArticleSearchResult & {
  url: string
  className?: string
}
