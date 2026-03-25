import {
  LiteratureItem,
  LiteratureItemType,
} from '../types/LiteratureItem.type'

export const LITERATURE_ITEM_TYPES: LiteratureItemType[] = [
  'book',
  'brochure',
  'booklet',
  'leaflet',
  'workbook',
]

export const LITERATURE_CATEGORY_LABELS: Record<LiteratureItemType, string> = {
  book: 'Книги',
  brochure: 'Брошюры',
  booklet: 'Буклеты',
  leaflet: 'Флаеры',
  workbook: 'Рабочие тетради',
}

export function groupLiteratureByType(
  items: LiteratureItem[],
): Record<LiteratureItemType, LiteratureItem[]> {
  const grouped = {} as Record<LiteratureItemType, LiteratureItem[]>

  for (const type of LITERATURE_ITEM_TYPES) {
    grouped[type] = []
  }

  for (const item of items) {
    if (grouped[item.item_type] !== undefined) {
      grouped[item.item_type].push(item)
    }
  }

  return grouped
}
