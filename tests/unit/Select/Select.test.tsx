import { Select } from '@/ui/components'
import { render, screen } from '@testing-library/react'
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
