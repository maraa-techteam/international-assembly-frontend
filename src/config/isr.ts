/**
 * How long a prerendered page and its CMS data stay fresh, in seconds.
 *
 * The route-level counterpart is a literal `export const revalidate = 60` in
 * src/app/layout.tsx — Next requires that value to be statically analyzable,
 * so it cannot import this constant. Keep the two in sync.
 */
export const CMS_REVALIDATE_SECONDS = 60
