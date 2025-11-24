import { Icon } from '@/ui/components'
import { render, screen } from '@testing-library/react'

describe('Icon component', () => {
  it('should render in small size', () => {
    render(<Icon icon='arrow-right' size='sm' className='test-icon' />)
    const iconElement = screen.getByTestId('icon')
    expect(iconElement).toHaveClass('h-4 w-4')
  })

  it('should render in medium size', () => {
    render(<Icon icon='arrow-right' size='md' className='test-icon' />)
    const iconElement = screen.getByTestId('icon')
    expect(iconElement).toHaveClass('h-6 w-6')
  })

  it('should render in large size', () => {
    render(<Icon icon='arrow-right' size='lg' className='test-icon' />)
    const iconElement = screen.getByTestId('icon')
    expect(iconElement).toHaveClass('h-8 w-8')
  })
})
