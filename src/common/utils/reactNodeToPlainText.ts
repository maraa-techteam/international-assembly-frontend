import { Children, ReactNode, isValidElement } from 'react'

function collectText(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child)
      }
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return ` ${collectText(child.props.children)} `
      }
      return ''
    })
    .join('')
}

/**
 * The text of copy written as JSX, for places that need it plain: the FAQ answers
 * in JSON-LD are the same words the page shows, so they are read from the JSX
 * rather than kept as a second copy that could drift.
 *
 * Every element boundary becomes a space, the way `htmlToPlainText` treats a tag,
 * so words either side of a `<br />` or between two paragraphs do not run together.
 */
export function reactNodeToPlainText(node: ReactNode): string {
  return collectText(node).replace(/\s+/g, ' ').trim()
}
