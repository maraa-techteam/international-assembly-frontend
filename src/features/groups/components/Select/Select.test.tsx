import { Select } from '@/common/components'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('should call onChange when option is selected', async () => {
  const user = userEvent.setup()
  const mockOnChange = jest.fn()

  render(
    <Select
      options={['Option 1', 'Option 2']}
      label='Select an option'
      value={[]}
      onChange={mockOnChange}
    />,
  )

  // open dropdown
  await user.click(screen.getByText('Select an option'))

  // select "Option 2"
  await user.click(screen.getByLabelText('Option 2'))

  expect(mockOnChange).toHaveBeenCalledWith(['Option 2'])
})

it('should remove option when it is clicked again', async () => {
  const user = userEvent.setup()
  const mockOnChange = jest.fn()

  render(
    <Select
      options={['Option 1', 'Option 2']}
      label='Select an option'
      value={['Option 2']}
      onChange={mockOnChange}
    />,
  )

  await user.click(screen.getByText('Select an option'))
  await user.click(screen.getByLabelText('Option 2'))

  expect(mockOnChange).toHaveBeenCalledWith([])
})

it('should not show search input when options count is 10 or fewer', async () => {
  const user = userEvent.setup()

  render(
    <Select
      options={Array.from({ length: 10 }, (_, i) => `Option ${i + 1}`)}
      label='Select an option'
      value={[]}
      onChange={jest.fn()}
    />,
  )

  await user.click(screen.getByText('Select an option'))

  expect(screen.queryByRole('textbox', { name: 'Поиск опций' })).toBeNull()
})

it('should show search input when options count is more than 10', async () => {
  const user = userEvent.setup()

  render(
    <Select
      options={Array.from({ length: 11 }, (_, i) => `Option ${i + 1}`)}
      label='Select an option'
      value={[]}
      onChange={jest.fn()}
    />,
  )

  await user.click(screen.getByText('Select an option'))

  expect(
    screen.getByRole('textbox', { name: 'Поиск опций' }),
  ).toBeInTheDocument()
})

it('should hide gradient overlay when scrolled to the bottom', async () => {
  const user = userEvent.setup()

  render(
    <Select
      options={Array.from({ length: 11 }, (_, i) => `Option ${i + 1}`)}
      label='Select an option'
      value={[]}
      onChange={jest.fn()}
    />,
  )

  await user.click(screen.getByText('Select an option'))

  const dropdownMenu = document.querySelector('[id^="dropdown-menu"]')
  const scrollContainer = dropdownMenu?.querySelector(
    '[class*="overflow-y-auto"]',
  ) as HTMLElement | null

  if (scrollContainer) {
    const height = 240
    Object.defineProperty(scrollContainer, 'scrollHeight', {
      value: height,
      configurable: true,
    })
    Object.defineProperty(scrollContainer, 'clientHeight', {
      value: height,
      configurable: true,
    })
    Object.defineProperty(scrollContainer, 'scrollTop', {
      value: 0,
      configurable: true,
    })

    act(() => {
      scrollContainer.dispatchEvent(new Event('scroll'))
    })
  }

  // When content fits exactly (scrollHeight === clientHeight), no gradient
  expect(screen.queryByTestId('scroll-gradient')).toBeNull()
})

it('should filter options by search query', async () => {
  const user = userEvent.setup()

  const options = Array.from({ length: 11 }, (_, i) => `Option ${i + 1}`)

  render(
    <Select
      options={options}
      label='Select an option'
      value={[]}
      onChange={jest.fn()}
    />,
  )

  await user.click(screen.getByText('Select an option'))

  const searchInput = screen.getByRole('textbox', { name: 'Поиск опций' })
  await user.type(searchInput, 'Option 1')

  // "Option 1", "Option 10", "Option 11" should be visible
  expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
  expect(screen.getByLabelText('Option 10')).toBeInTheDocument()
  expect(screen.getByLabelText('Option 11')).toBeInTheDocument()

  // "Option 2" through "Option 9" should not be visible
  expect(screen.queryByLabelText('Option 2')).toBeNull()
  expect(screen.queryByLabelText('Option 9')).toBeNull()
})
