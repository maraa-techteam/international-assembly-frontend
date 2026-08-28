/**
 * Normalises the payload of a Directus page collection.
 *
 * A collection marked as a singleton answers `/items/<collection>` with the
 * item itself, while a regular collection answers with an array of items. Page
 * collections are singletons in the CMS, but a collection that has not been
 * switched over yet still comes back as a one-element array, and reading
 * `.meta_title` off that array silently yields `undefined` — a blank page that
 * still builds. Tolerating both shapes keeps a page rendering either way.
 */
export function unwrapSingleton<T>(raw: T | T[]): T {
  return Array.isArray(raw) ? raw[0] : raw
}
