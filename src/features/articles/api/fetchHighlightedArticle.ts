import { readSingleton, withOptions } from '@directus/sdk'

import directus from '../../../common/lib/directus'
import { Article } from '../types/Article.type'

/**
 * The article editors have picked to lead `/news-and-events`, if any.
 *
 * `news_and_events_page` is the one page singleton the site still reads: the
 * rest of that page is hardcoded, but which article leads it is an editor's call.
 * The SDK client has no schema generic, so the shape here is an assertion.
 */
export async function fetchHighlightedArticle(): Promise<Article | null> {
  try {
    const page = await directus.request(
      withOptions(
        readSingleton('news_and_events_page', {
          fields: ['highlighted_post.*'],
        }),
        { cache: 'no-store' },
      ),
    )

    return (page.highlighted_post as Article | null) ?? null
  } catch (error) {
    throw new Error(
      `Failed to fetch the highlighted article: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
