import { Button, Icon } from '@/ui/components'
import Typography from '@/ui/components/Typography/Typography'
import { render, screen } from '@testing-library/react'

describe('Button', () => {
  it('should navigate when clicked if link', () => {
    render(
      <Button
        href='/test-link'
        as='link'
        variant={'contained'}
        type={'button'}
        size={'sm'}
        color={'primary'}
      >
        I am link button
      </Button>,
    )
    const button = screen.getByRole('link', { name: 'I am link button' })
    expect(button).toBeInTheDocument()
  })

  it('it should fire event if clicked when button', () => {
    const handleClick = jest.fn()
    render(
      <Button
        onClick={handleClick}
        as='button'
        variant={'contained'}
        type={'button'}
        size={'sm'}
        color={'primary'}
      >
        I am button
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'I am button' })
    button.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should not be clickable when disabled', () => {
    const handleClick = jest.fn()
    render(
      <Button
        onClick={handleClick}
        as='button'
        variant={'contained'}
        type={'button'}
        disabled
        size={'sm'}
        color={'primary'}
      >
        I am disabled button
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'I am disabled button' })
    button.click()
    expect(handleClick).toHaveBeenCalledTimes(0)
  })

  it('should have label as passed in props', () => {
    render(
      <Button
        as='button'
        variant={'contained'}
        type={'button'}
        label='Test label'
        size={'sm'}
        color={'primary'}
      />,
    )
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Test label')
  })

  it('should have children as passed in props', () => {
    render(
      <Button
        as='button'
        variant={'contained'}
        type={'button'}
        label='Test label'
        size={'sm'}
        color={'primary'}
      >
        <Typography variant='body'>Test label</Typography>
        <Icon icon='arrow-right' size='sm' />
      </Button>,
    )
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Test label')
  })
})
