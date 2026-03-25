import { Typography } from '@/common/components'
import { Section } from '@/common/layouts/Section/Section'

import { fetchLiteratureItems } from '../api/fetchLiteratureItems'
import { LiteratureSection } from '../components/LiteratureSection/LiteratureSection'
import {
  LITERATURE_CATEGORY_LABELS,
  LITERATURE_ITEM_TYPES,
  groupLiteratureByType,
} from '../utils/literature.utils'

export async function LiteraturePage() {
  const items = await fetchLiteratureItems()
  const grouped = groupLiteratureByType(items)

  return (
    <>
      <Section color='white'>
        <Typography variant='h1' font='roboto'>
          Литература
        </Typography>
        <Typography variant='body'>
          Официальная литература Анонимных Алкоголиков: книги, брошюры и другие
          материалы программы выздоровления.
        </Typography>
      </Section>
      <Section color='white' className='gap-10'>
        {LITERATURE_ITEM_TYPES.map((type) => {
          const sectionItems = grouped[type]
          if (sectionItems.length === 0) return null
          return (
            <LiteratureSection
              key={type}
              label={LITERATURE_CATEGORY_LABELS[type]}
              items={sectionItems}
            />
          )
        })}
      </Section>
    </>
  )
}
