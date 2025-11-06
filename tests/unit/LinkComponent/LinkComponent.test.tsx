import LinkComponent from '@/ui/components/LinkComponent/LinkComponent'
import { render, screen } from '@testing-library/react'

describe('LinkComponent', () => {
  it('renders icon before text with icon-left variant', () => {
    render(
      <LinkComponent
        icon='search'
        text='Search here'
        href='/search'
        variant='icon-left'
      />,
    )
    const link = screen.getByRole('link')
    const children = Array.from(link.childNodes)

    expect(children[0]).toHaveAttribute('data-testid', 'icon')
    expect(children[1]).toHaveTextContent('Search here')
  })

  it('renders icon before text with icon-right variant', () => {
    render(
      <LinkComponent
        icon='search'
        text='Search here'
        href='/search'
        variant='icon-right'
      />,
    )
    const link = screen.getByRole('link')
    const children = Array.from(link.childNodes)
    expect(children[0]).toHaveTextContent('Search here')
    expect(children[1]).toHaveAttribute('data-testid', 'icon')
  })

  it('renders icon only variant', () => {
    render(
      <LinkComponent
        icon='search'
        text='Search here'
        href='/search'
        variant='icon-only'
      />,
    )
    const link = screen.getByRole('link')
    const children = Array.from(link.childNodes)
    expect(children.length).toBe(1)
    expect(children[0]).toHaveAttribute('data-testid', 'icon')
  })
})
