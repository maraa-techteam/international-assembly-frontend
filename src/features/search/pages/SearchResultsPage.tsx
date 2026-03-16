import { Typography } from '@/common/components'
import { Section } from '@/common/layouts'
import { fetchSearchResults } from '@/features/search/api/fetchSearchResults'
import { SearchParams } from 'next/dist/server/request/search-params'

import { SearchResultCard } from '../components/SearchResultCard/SearchResultCard'

export async function SearchResultsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const query = typeof params.search === 'string' ? params.search : ''

  const results = query ? await fetchSearchResults(query) : []

  return (
    <Section color='white'>
      <Typography variant='h1' font='roboto'>
        {query
          ? `Результаты поиска по запросу: «${query}»`
          : 'Результаты поиска'}
      </Typography>
      {results.length === 0 ? (
        <Typography variant='body' font='roboto'>
          По вашему запросу ничего не найдено.
        </Typography>
      ) : (
        <div className='flex flex-col gap-8'>
          {results.map((result) => (
            <SearchResultCard
              key={result.id}
              id={result.id}
              slug={result.slug}
              title={result.title}
              perex={result.perex}
              image={result.image}
              date_created={result.date_created}
            />
          ))}
        </div>
      )}
    </Section>
  )
}
