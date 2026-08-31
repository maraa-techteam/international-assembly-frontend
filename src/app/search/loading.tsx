import { Section } from '@/common/components/Section/Section'
import { SearchResultSkeleton } from '@/features/search/components/SearchResultSkeleton/SearchResultSkeleton'

export default function Loading() {
  return (
    <Section color='white'>
      <SearchResultSkeleton />
    </Section>
  )
}
