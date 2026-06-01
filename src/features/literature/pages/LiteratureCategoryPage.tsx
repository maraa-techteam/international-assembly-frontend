import { Grid } from '@/common/components/Grid/Grid'
import { LinkComponent } from '@/common/components/LinkComponent/LinkComponent'
import { Pagination } from '@/common/components/Pagination/Pagination'
import { Section } from '@/common/components/Section/Section'
import Typography from '@/common/components/Typography/Typography'
import { fetchLiteratureItemsByType } from '@/features/literature/api/fetchLiteratureItemsByType'
import { LiteratureCard } from '@/features/literature/components/LiteratureCard/LiteratureCard'
import { LiteratureItemType } from '@/features/literature/types/LiteratureItem.type'
import { literatureCategoryLabels } from '@/features/literature/utils/literature.utils'
import { SearchParams } from 'next/dist/server/request/search-params'

type LiteratureCategoryPageProps = {
  type: LiteratureItemType
  searchParams: SearchParams
}

export async function LiteratureCategoryPage({
  type,
  searchParams,
}: LiteratureCategoryPageProps) {
  const params = await searchParams
  const { data: items, totalCount } = await fetchLiteratureItemsByType(
    type,
    params,
  )
  const label = literatureCategoryLabels[type]

  return (
    <Section color='white'>
      <LinkComponent
        href='/literature'
        icon='arrow-left'
        text='Назад'
        color='foreground'
        className='self-start'
        variant='icon-left'
      />
      <Typography variant='h1' font='roboto'>
        {label}
      </Typography>
      {totalCount === 0 ? (
        <Typography variant='body' className='text-gray-500'>
          В этой категории пока нет материалов.
        </Typography>
      ) : (
        <>
          <Grid columns={4} gap={4} isScrollable={false}>
            {items.map((item) => (
              <LiteratureCard key={item.id} {...item} />
            ))}
          </Grid>
          <Pagination
            fetchedCount={items.length}
            pageSize={10}
            totalCount={totalCount}
          />
        </>
      )}
    </Section>
  )
}
