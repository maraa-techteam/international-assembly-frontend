import { render } from '@testing-library/react'

import { JsonLd } from './JsonLd'

const scriptOf = (container: HTMLElement) =>
  container.querySelector('script[type="application/ld+json"]')

describe('JsonLd', () => {
  it('renders the schema as a JSON-LD script', () => {
    const { container } = render(<JsonLd schema={{ '@type': 'NGO' }} />)

    expect(JSON.parse(scriptOf(container)?.innerHTML ?? '')).toEqual({
      '@type': 'NGO',
    })
  })

  it('escapes angle brackets so CMS prose cannot close the tag early', () => {
    const { container } = render(
      <JsonLd schema={{ description: 'a </script><img> b' }} />,
    )
    const html = scriptOf(container)?.innerHTML ?? ''

    expect(html).not.toContain('</script>')
    expect(html).toContain('\\u003c')
    // Still valid JSON, and the text survives intact once parsed.
    expect(JSON.parse(html)).toEqual({ description: 'a </script><img> b' })
  })

  it('renders nothing when there is no schema to emit', () => {
    const { container } = render(<JsonLd schema={undefined} />)

    expect(container.firstChild).toBeNull()
  })
})
