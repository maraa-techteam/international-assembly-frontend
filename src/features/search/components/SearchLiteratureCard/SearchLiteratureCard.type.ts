import { LiteratureSearchResult } from '../../types/SearchResult.type'

export type SearchLiteratureCardProps = LiteratureSearchResult & {
  url: string
  className?: string
}
