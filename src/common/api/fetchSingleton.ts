import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { readSingleton, withOptions } from '@directus/sdk'

import directus from '../lib/directus'

/** Meta fields every page collection carries. */
export const META_FIELDS = ['meta_title', 'meta_description']

export type PageMetaType = {
  meta_title: string
  meta_description: string
}

/**
 * Reads one page singleton from the CMS.
 *
 * Every `*_page` collection is flagged as a singleton in Directus, so
 * `/items/<collection>` answers with the item itself and there is nothing to
 * unwrap.
 *
 * The caller names the shape it expects. That is an assertion, not a check: the
 * client in `lib/directus` is created without a schema generic, so the SDK hands
 * back `any` whichever way this is written. Declaring the type here at least
 * puts the expected shape next to the field list that is meant to produce it,
 * which the field-by-field re-mapping this replaced never did — every property
 * it returned was `any` too.
 */
export async function fetchSingleton<T>(
  collection: string,
  fields: string[],
): Promise<T> {
  try {
    const item = await directus.request(
      withOptions(readSingleton(collection, { fields }), {
        next: {
          revalidate: CMS_REVALIDATE_SECONDS,
          tags: ['cms', `cms:${collection}`],
        },
      }),
    )

    return item as T
  } catch (error) {
    throw new Error(
      `Failed to fetch "${collection}" page data: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
