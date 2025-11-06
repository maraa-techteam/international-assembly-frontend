import { Select } from '@/ui/components'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('should call onChange when option is selected', async () => {
  const user = userEvent.setup()
  const mockOnChange = jest.fn()

  render(
    <Select
      options={['Option 1', 'Option 2']}
      label={'Select an option'}
      value={''}
      onChange={mockOnChange}
    />,
  )

  await user.selectOptions(screen.getByRole('combobox'), 'Option 2')

  expect(mockOnChange).toHaveBeenCalledWith('Option 2')
})
