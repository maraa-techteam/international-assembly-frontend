import { Section } from '@/common/layouts'
import { SearchResultSkeleton } from '@/features/search/components/SearchResultSkeleton/SearchResultSkeleton'

export default function Loading() {
  return (
    <Section color='white'>
      <SearchResultSkeleton />
    </Section>
  )
}
