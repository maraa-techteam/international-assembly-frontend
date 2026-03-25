export type LiteratureItemType =
  | 'book'
  | 'brochure'
  | 'booklet'
  | 'leaflet'
  | 'workbook'

export type LiteratureItem = {
  id: string
  isbn: string | null
  title: string
  subtitle: string | null
  description: string | null
  item_type: LiteratureItemType
  language: string | null
  binding_type: string | null
  page_count: number | null
  edition_name: string | null
  price: number | null
  currency: string | null
  is_approved: boolean
  author: string | null
  cover_image: string | null
}
