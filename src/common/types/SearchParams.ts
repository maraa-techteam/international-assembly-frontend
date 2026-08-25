/**
 * Query-string params as handed to a page by Next.
 *
 * Mirrors the type Next exports from `next/dist/server/request/search-params`,
 * which is a private path that can disappear in any release. Declaring it here
 * keeps the pages off that internal import.
 */
export type SearchParams = {
  [key: string]: string | string[] | undefined
}
