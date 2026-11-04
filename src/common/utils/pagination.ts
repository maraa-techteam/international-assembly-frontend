import type { SearchParams } from '@/common/types/SearchParams'

export const PAGE_SIZE = 10

/**
 * Reads the `page` query param, which a visitor can edit by hand.
 *
 * Anything that isn't a positive whole number falls back to the first page.
 * Passing it through unchecked sent `NaN` to Directus and failed the whole
 * render.
 */
export function parsePageParam(value: string | string[] | null | undefined) {
  const raw = Array.isArray(value) ? value[0] : value
  if (!raw || !/^\d+$/.test(raw)) return 1

  const page = Number(raw)
  return page >= 1 && Number.isSafeInteger(page) ? page : 1
}

export function getTotalPages(totalCount: number) {
  return Math.ceil(totalCount / PAGE_SIZE)
}

/**
 * Where to send a visitor whose `page` is past the end of the results, or
 * `null` when the page is in range. Other query params, such as the group
 * filters, are kept.
 */
export function getLastPageRedirect(
  pathname: string,
  params: SearchParams,
  totalCount: number,
): string | null {
  const totalPages = getTotalPages(totalCount)
  if (totalPages === 0 || parsePageParam(params.page) <= totalPages) return null

  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (key === 'page' || key === 'limit' || value === undefined) continue
    for (const item of Array.isArray(value) ? value : [value]) {
      query.append(key, item)
    }
  }
  query.set('page', String(totalPages))

  return `${pathname}?${query.toString()}`
}
