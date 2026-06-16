import { LiteratureCategory } from '../types/LiteratureItem.type'

export const LiteratureCategorys: LiteratureCategory[] = [
  'books',
  'brochures',
  'booklets',
  'leaflets',
  'workbooks',
]

export const literatureCategoryLabels: Record<LiteratureCategory, string> = {
  books: 'Книги',
  brochures: 'Брошюры',
  booklets: 'Буклеты',
  leaflets: 'Флаеры',
  workbooks: 'Рабочие тетради',
}

/** URL slug for each item type, e.g. book → "books" */
export const literatureCategorySlugs: Record<LiteratureCategory, string> = {
  books: 'books',
  brochures: 'brochures',
  booklets: 'booklets',
  leaflets: 'leaflets',
  workbooks: 'workbooks',
}
