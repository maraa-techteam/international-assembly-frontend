import { Section } from '@/common/layouts/Section/Section'
import { SearchResultSkeleton } from '@/features/search/components/SearchResultSkeleton/SearchResultSkeleton'

export default function Loading() {
  return (
    <Section color='white'>
      <SearchResultSkeleton />
    </Section>
  )
}
