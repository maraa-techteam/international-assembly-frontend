import { Typography } from '@/common/components'
import { Section } from '@/common/layouts/Section/Section'

import { fetchLiteratureItems } from '../api/fetchLiteratureItems'
import { LiteratureSection } from '../components/LiteratureSection/LiteratureSection'
import {
  groupLiteratureByType,
  literatureCategoryLabels,
  literatureItemTypes,
} from '../utils/literature.utils'

export async function LiteraturePage() {
  const items = await fetchLiteratureItems()
  const grouped = groupLiteratureByType(items)

  return (
    <>
      <Section className='max-w-200' color='white'>
        <Typography variant='h1' font='roboto'>
          Литература
        </Typography>
        <Typography variant='body'>
          Официальная литература Анонимных Алкоголиков: книги, брошюры и другие
          материалы программы выздоровления.
        </Typography>
      </Section>
      <Section color='white' className='gap-10'>
        {literatureItemTypes.map((type) => {
          const sectionItems = grouped[type]
          if (sectionItems.length === 0) return null
          return (
            <LiteratureSection
              key={type}
              type={type}
              label={literatureCategoryLabels[type]}
              items={sectionItems}
            />
          )
        })}
      </Section>
    </>
  )
}
