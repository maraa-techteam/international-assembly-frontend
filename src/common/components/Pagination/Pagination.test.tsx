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

  it('renders the load more button when fetchedCount equals the limit', () => {
    searchParamsMock.get.mockReturnValue('10')
    render(<Pagination fetchedCount={10} totalCount={10} />)

    expect(
      screen.getByRole('button', { name: /показать ещё/i }),
    ).toBeInTheDocument()
  })

  it('does not render when fetchedCount is less than the limit and totalCount is small', () => {
    searchParamsMock.get.mockReturnValue('10')
    const { container } = render(<Pagination fetchedCount={5} totalCount={5} />)

    expect(container.firstChild).toBeNull()
  })

  it('uses a default limit of 10 when no limit search param is set', () => {
    searchParamsMock.get.mockReturnValue(null)
    render(<Pagination fetchedCount={10} totalCount={10} />)

    expect(
      screen.getByRole('button', { name: /показать ещё/i }),
    ).toBeInTheDocument()
  })

  it('pushes updated limit to router when load more is clicked', async () => {
    searchParamsMock.get.mockReturnValue('10')
    const user = userEvent.setup()
    render(<Pagination fetchedCount={10} totalCount={10} />)

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
    render(<Pagination fetchedCount={10} totalCount={10} />)

    expect(screen.queryByRole('button', { name: '1' })).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /показать ещё/i }),
    ).toBeInTheDocument()
  })
})
