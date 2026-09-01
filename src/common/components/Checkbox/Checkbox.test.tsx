import { Checkbox } from '@/common/components/Checkbox/Checkbox'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('should expose the label as the accessible name', () => {
  render(<Checkbox id='terms' label='Я согласен' onChange={jest.fn()} />)

  expect(screen.getByRole('checkbox', { name: 'Я согласен' })).toBeVisible()
})

it('should call onChange when the label is clicked', async () => {
  const user = userEvent.setup()
  const onChange = jest.fn()

  render(<Checkbox id='terms' label='Я согласен' onChange={onChange} />)

  await user.click(screen.getByLabelText('Я согласен'))

  expect(onChange).toHaveBeenCalledTimes(1)
})

it('should toggle with the keyboard', async () => {
  const user = userEvent.setup()
  const onChange = jest.fn()

  render(<Checkbox id='terms' label='Я согласен' onChange={onChange} />)

  await user.tab()
  await user.keyboard(' ')

  expect(onChange).toHaveBeenCalledTimes(1)
})

it('should render the error message', () => {
  render(
    <Checkbox
      id='terms'
      label='Я согласен'
      error='Требуется согласие'
      onChange={jest.fn()}
    />,
  )

  expect(screen.getByText('Требуется согласие')).toBeVisible()
})

it('should accept markup in the label', () => {
  render(
    <Checkbox
      id='terms'
      label={
        <>
          Подробнее в <a href='/privacy'>уведомлении</a>.
        </>
      }
      onChange={jest.fn()}
    />,
  )

  expect(screen.getByRole('link', { name: 'уведомлении' })).toBeVisible()
})
