/**
 * Renders a JSON-LD block.
 *
 * `<` is escaped because the payload carries CMS prose: a group description
 * containing `</script>` would otherwise close the tag early and inject the rest
 * of the document as markup. JSON.stringify alone does not protect against that,
 * since the sequence is legal inside a JSON string.
 */
export function JsonLd({ schema }: { schema: object | undefined }) {
  if (!schema) return null

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  )
}
