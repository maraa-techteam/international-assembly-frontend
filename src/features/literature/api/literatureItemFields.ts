import { LiteratureItem } from '../types/LiteratureItem.type'

/** Every field the literature pages read. Shared by all three fetchers. */
export const LITERATURE_ITEM_FIELDS = [
  'id',
  'slug',
  'isbn',
  'title',
  'subtitle',
  'description',
  'category',
  'language',
  'binding_type',
  'page_count',
  'edition_name',
  'price',
  'currency',
  'is_approved',
  'author',
  'cover_image',
]

/**
 * Fills in the optional fields of one CMS row.
 *
 * Directus omits a key entirely when the column is empty, so the optional
 * fields arrive as `undefined` rather than the `null` the type promises, and
 * `is_approved` — which the detail page reads as a boolean — arrives as
 * nothing at all. Required fields pass through the spread untouched.
 *
 * The row arrives untyped — the SDK client is built without a schema generic,
 * so `readItems` describes it only as a bag of keys. Naming the expected shape
 * here is an assertion, the same one `fetchSingleton` makes for page records.
 */
export function toLiteratureItem(row: Record<string, unknown>): LiteratureItem {
  const item = row as LiteratureItem

  return {
    ...item,
    isbn: item.isbn ?? null,
    subtitle: item.subtitle ?? null,
    description: item.description ?? null,
    language: item.language ?? null,
    binding_type: item.binding_type ?? null,
    page_count: item.page_count ?? null,
    edition_name: item.edition_name ?? null,
    price: item.price ?? null,
    currency: item.currency ?? null,
    is_approved: item.is_approved ?? false,
    author: item.author ?? null,
    cover_image: item.cover_image ?? null,
  }
}
