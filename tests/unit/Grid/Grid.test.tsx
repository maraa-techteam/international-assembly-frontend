import { Grid } from '@/ui/components'
import { render, screen } from '@testing-library/react'

describe('Grid component', () => {
  it('renders children', () => {
    render(
      <Grid isScrollable={false} columns={2} gap={0}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>,
    )

    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })

  it('applies columns class', () => {
    const { container } = render(
      <Grid isScrollable={false} columns={2} gap={0}>
        <div>Content</div>
      </Grid>,
    )

    const gridElement = container.firstChild
    expect(gridElement).toHaveClass('lg:grid-cols-2')
  })

  it('applies gap class', () => {
    const { container } = render(
      <Grid isScrollable={false} columns={2} gap={4}>
        <div>Content</div>
      </Grid>,
    )

    const gridElement = container.firstChild
    expect(gridElement).toHaveClass('gap-4', 'lg:gap-6')
  })

  it('applies scrollable class when isScrollable is true', () => {
    const { container } = render(
      <Grid isScrollable columns={2} gap={0}>
        <div>Content</div>
      </Grid>,
    )
    const gridElement = container.firstChild
    expect(gridElement).toHaveClass('overflow-x-auto')
  })

  it('does not apply scrollable class when isScrollable is false', () => {
    const { container } = render(
      <Grid isScrollable={false} columns={2} gap={0}>
        <div>Content</div>
      </Grid>,
    )
    const gridElement = container.firstChild
    expect(gridElement).not.toHaveClass('overflow-x-auto')
  })
})
