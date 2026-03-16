import { LinkComponent, Typography } from '@/common/components'
import { Section } from '@/common/layouts'
import { fetchSearchResults } from '@/features/search/api/fetchSearchResults'
import { SearchParams } from 'next/dist/server/request/search-params'

import { SearchGroupResultCard } from '../components/SearchGroupResultCard/SearchGroupResultCard'
import { SearchResultCard } from '../components/SearchResultCard/SearchResultCard'

export async function SearchResultsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const query = typeof params.search === 'string' ? params.search : ''

  const { articles, groups } = query
    ? await fetchSearchResults(query)
    : { articles: [], groups: [] }

  const hasResults = articles.length > 0 || groups.length > 0

  return (
    <Section color='white'>
      <LinkComponent
        href='/groups'
        icon='arrow-left'
        text='Назад'
        color='foreground'
        className='self-start'
        variant='icon-left'
      />
      <Typography variant='h1' font='roboto'>
        Результаты поиска <span className='text-primary'>{query}</span>
      </Typography>
      {!hasResults ? (
        <Typography variant='body' font='roboto'>
          По вашему запросу ничего не найдено.
        </Typography>
      ) : (
        <div className='flex flex-col gap-12'>
          {articles.length > 0 && (
            <div className='flex flex-col gap-4'>
              <Typography variant='h2' font='roboto'>
                Статьи
              </Typography>
              <div className='flex flex-col gap-8'>
                {articles.map((article) => (
                  <SearchResultCard key={article.id} {...article} />
                ))}
              </div>
            </div>
          )}
          {groups.length > 0 && (
            <div className='flex flex-col gap-4'>
              <Typography variant='h2' font='roboto'>
                Группы
              </Typography>
              <div className='divide-light-blue flex flex-col gap-8 divide-y'>
                {groups.map((group) => (
                  <SearchGroupResultCard
                    className='pb-8'
                    key={group.id}
                    {...group}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Section>
  )
}
