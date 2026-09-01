import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Pagination } from './Pagination'

const pushMock = jest.fn()
const searchParamsMock = {
  get: jest.fn(),
  toString: jest.fn(() => ''),
}

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => '/test',
  useSearchParams: () => searchParamsMock,
}))

describe('Pagination', () => {
  beforeEach(() => {
    pushMock.mockClear()
    searchParamsMock.get.mockReturnValue(null)
    searchParamsMock.toString.mockReturnValue('')
  })

  it('renders the load more button when more results exist', () => {
    searchParamsMock.get.mockReturnValue('10')
    render(<Pagination fetchedCount={10} totalCount={25} />)

    expect(
      screen.getByRole('button', { name: /показать ещё/i }),
    ).toBeInTheDocument()
  })

  it('does not render a load more button once every result is fetched', () => {
    // Regression: two countries matched exactly 10 groups, a full batch, and
    // the button appeared but had nothing left to load.
    searchParamsMock.get.mockReturnValue('10')
    const { container } = render(
      <Pagination fetchedCount={10} totalCount={10} />,
    )

    expect(container.firstChild).toBeNull()
  })

  it('does not render when fetchedCount is less than the limit and totalCount is small', () => {
    searchParamsMock.get.mockReturnValue('10')
    const { container } = render(<Pagination fetchedCount={5} totalCount={5} />)

    expect(container.firstChild).toBeNull()
  })

  it('pushes updated limit to router when load more is clicked', async () => {
    searchParamsMock.get.mockReturnValue('10')
    const user = userEvent.setup()
    render(<Pagination fetchedCount={10} totalCount={25} />)

    await user.click(screen.getByRole('button', { name: /показать ещё/i }))

    expect(pushMock).toHaveBeenCalledWith(
      expect.stringContaining('limit=20'),
      expect.anything(),
    )
  })

  it('renders page number buttons when totalCount exceeds PAGE_SIZE', () => {
    searchParamsMock.get.mockReturnValue(null)
    render(<Pagination fetchedCount={10} totalCount={25} />)

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
  })

  it('shows only 3 page numbers at a time when there are more total pages', () => {
    searchParamsMock.get.mockReturnValue(null)
    render(<Pagination fetchedCount={10} totalCount={50} />)

    // On page 1 with 5 total pages, only show pages 1–3
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '4' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '5' })).not.toBeInTheDocument()
  })

  it('slides the page window to show current page in the middle', () => {
    searchParamsMock.get.mockImplementation((key: string) => {
      if (key === 'page') return '3'
      return null
    })
    render(<Pagination fetchedCount={10} totalCount={50} />)

    expect(screen.queryByRole('button', { name: '1' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '5' })).not.toBeInTheDocument()
  })

  it('pushes correct page param when a page button is clicked', async () => {
    searchParamsMock.get.mockReturnValue(null)
    searchParamsMock.toString.mockReturnValue('')
    const user = userEvent.setup()
    render(<Pagination fetchedCount={10} totalCount={25} />)

    await user.click(screen.getByRole('button', { name: '2' }))

    expect(pushMock).toHaveBeenCalledWith(
      expect.stringContaining('page=2'),
      expect.anything(),
    )
  })

  it('disables the current page button', () => {
    searchParamsMock.get.mockImplementation((key: string) => {
      if (key === 'page') return '2'
      return null
    })
    render(<Pagination fetchedCount={10} totalCount={25} />)

    expect(screen.getByRole('button', { name: '2' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '1' })).not.toBeDisabled()
  })

  it('does not render page buttons when totalCount is within PAGE_SIZE', () => {
    searchParamsMock.get.mockReturnValue('10')
    render(<Pagination fetchedCount={8} totalCount={10} />)

    expect(screen.queryByRole('button', { name: '1' })).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /показать ещё/i }),
    ).toBeInTheDocument()
  })

  it('renders first, previous, next and last page nav buttons', () => {
    searchParamsMock.get.mockReturnValue(null)
    render(<Pagination fetchedCount={10} totalCount={25} />)

    expect(
      screen.getByRole('button', { name: 'Первая страница' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Предыдущая страница' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Следующая страница' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Последняя страница' }),
    ).toBeInTheDocument()
  })

  it('disables first and previous buttons on the first page', () => {
    searchParamsMock.get.mockReturnValue(null)
    render(<Pagination fetchedCount={10} totalCount={25} />)

    expect(
      screen.getByRole('button', { name: 'Первая страница' }),
    ).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Предыдущая страница' }),
    ).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Следующая страница' }),
    ).not.toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Последняя страница' }),
    ).not.toBeDisabled()
  })

  it('disables next and last buttons on the last page', () => {
    searchParamsMock.get.mockImplementation((key: string) => {
      if (key === 'page') return '3'
      return null
    })
    render(<Pagination fetchedCount={10} totalCount={25} />)

    expect(
      screen.getByRole('button', { name: 'Первая страница' }),
    ).not.toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Предыдущая страница' }),
    ).not.toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Следующая страница' }),
    ).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Последняя страница' }),
    ).toBeDisabled()
  })

  it('navigates to next page when next button is clicked', async () => {
    searchParamsMock.get.mockImplementation((key: string) => {
      if (key === 'page') return '2'
      return null
    })
    const user = userEvent.setup()
    render(<Pagination fetchedCount={10} totalCount={50} />)

    await user.click(screen.getByRole('button', { name: 'Следующая страница' }))

    expect(pushMock).toHaveBeenCalledWith(
      expect.stringContaining('page=3'),
      expect.anything(),
    )
  })

  it('navigates to previous page when previous button is clicked', async () => {
    searchParamsMock.get.mockImplementation((key: string) => {
      if (key === 'page') return '3'
      return null
    })
    const user = userEvent.setup()
    render(<Pagination fetchedCount={10} totalCount={50} />)

    await user.click(
      screen.getByRole('button', { name: 'Предыдущая страница' }),
    )

    expect(pushMock).toHaveBeenCalledWith(
      expect.stringContaining('page=2'),
      expect.anything(),
    )
  })

  it('navigates to first page when first page button is clicked', async () => {
    searchParamsMock.get.mockImplementation((key: string) => {
      if (key === 'page') return '3'
      return null
    })
    const user = userEvent.setup()
    render(<Pagination fetchedCount={10} totalCount={50} />)

    await user.click(screen.getByRole('button', { name: 'Первая страница' }))

    expect(pushMock).toHaveBeenCalledWith(
      expect.stringContaining('page=1'),
      expect.anything(),
    )
  })

  it('navigates to last page when last page button is clicked', async () => {
    searchParamsMock.get.mockReturnValue(null)
    const user = userEvent.setup()
    render(<Pagination fetchedCount={10} totalCount={50} />)

    await user.click(screen.getByRole('button', { name: 'Последняя страница' }))

    expect(pushMock).toHaveBeenCalledWith(
      expect.stringContaining('page=5'),
      expect.anything(),
    )
  })
})
