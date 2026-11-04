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

  it('does not render when the results fit on one page', () => {
    const { container } = render(<Pagination totalCount={10} />)

    expect(container.firstChild).toBeNull()
  })

  it('does not render when there are no results', () => {
    const { container } = render(<Pagination totalCount={0} />)

    expect(container.firstChild).toBeNull()
  })

  it('never offers a load more button', () => {
    render(<Pagination totalCount={25} />)

    expect(
      screen.queryByRole('button', { name: /показать ещё/i }),
    ).not.toBeInTheDocument()
  })

  it('drops a stale limit when changing page', async () => {
    searchParamsMock.toString.mockReturnValue('limit=20&country=Germany')
    const user = userEvent.setup()
    render(<Pagination totalCount={25} />)

    await user.click(screen.getByRole('button', { name: '2' }))

    expect(pushMock).toHaveBeenCalledWith(
      '/test?country=Germany&page=2',
      expect.anything(),
    )
  })

  it('treats an invalid page param as the first page', () => {
    searchParamsMock.get.mockReturnValue('abc')
    render(<Pagination totalCount={25} />)

    expect(screen.getByRole('button', { name: '1' })).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Предыдущая страница' }),
    ).toBeDisabled()
  })

  it('disables next and last when the page is past the end', () => {
    searchParamsMock.get.mockReturnValue('99')
    render(<Pagination totalCount={25} />)

    expect(
      screen.getByRole('button', { name: 'Следующая страница' }),
    ).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Последняя страница' }),
    ).toBeDisabled()
  })

  it('renders page number buttons when totalCount exceeds PAGE_SIZE', () => {
    searchParamsMock.get.mockReturnValue(null)
    render(<Pagination totalCount={25} />)

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
  })

  it('shows only 3 page numbers at a time when there are more total pages', () => {
    searchParamsMock.get.mockReturnValue(null)
    render(<Pagination totalCount={50} />)

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
    render(<Pagination totalCount={50} />)

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
    render(<Pagination totalCount={25} />)

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
    render(<Pagination totalCount={25} />)

    expect(screen.getByRole('button', { name: '2' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '1' })).not.toBeDisabled()
  })

  it('renders first, previous, next and last page nav buttons', () => {
    searchParamsMock.get.mockReturnValue(null)
    render(<Pagination totalCount={25} />)

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
    render(<Pagination totalCount={25} />)

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
    render(<Pagination totalCount={25} />)

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
    render(<Pagination totalCount={50} />)

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
    render(<Pagination totalCount={50} />)

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
    render(<Pagination totalCount={50} />)

    await user.click(screen.getByRole('button', { name: 'Первая страница' }))

    expect(pushMock).toHaveBeenCalledWith(
      expect.stringContaining('page=1'),
      expect.anything(),
    )
  })

  it('navigates to last page when last page button is clicked', async () => {
    searchParamsMock.get.mockReturnValue(null)
    const user = userEvent.setup()
    render(<Pagination totalCount={50} />)

    await user.click(screen.getByRole('button', { name: 'Последняя страница' }))

    expect(pushMock).toHaveBeenCalledWith(
      expect.stringContaining('page=5'),
      expect.anything(),
    )
  })
})
