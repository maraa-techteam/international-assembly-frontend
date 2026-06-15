import { LiteratureItemType } from '../types/LiteratureItem.type'

export const literatureItemTypes: LiteratureItemType[] = [
  'book',
  'brochure',
  'booklet',
  'leaflet',
  'workbook',
]

export const literatureCategoryLabels: Record<LiteratureItemType, string> = {
  book: 'Книги',
  brochure: 'Брошюры',
  booklet: 'Буклеты',
  leaflet: 'Флаеры',
  workbook: 'Рабочие тетради',
}

/** URL slug for each item type, e.g. book → "books" */
export const literatureCategorySlugs: Record<LiteratureItemType, string> = {
  book: 'books',
  brochure: 'brochures',
  booklet: 'booklets',
  leaflet: 'leaflets',
  workbook: 'workbooks',
}
