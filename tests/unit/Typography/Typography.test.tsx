import Typography from '@/ui/components/Typography/Typography'
import { render, screen } from '@testing-library/react'

describe('Typography', () => {
  it('should render with correct tag', () => {
    render(<Typography variant={'h1'}>I am a test!</Typography>)
    const element = screen.getByRole('heading', { level: 1 })
    expect(element).toBeInTheDocument()
  })

  it('should be of correct font', () => {
    render(
      <Typography variant={'h1'} font='roboto'>
        I am a test!
      </Typography>,
    )
    const element = screen.getByRole('heading', { level: 1 })
    expect(element).toHaveClass('font-roboto')
  })

  it('should render children correctly', () => {
    render(<Typography variant={'h1'}>I am a test!</Typography>)
    const element = screen.getByRole('heading', { level: 1 })
    expect(element).toHaveTextContent('I am a test!')
  })
})
