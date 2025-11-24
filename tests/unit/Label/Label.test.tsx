import { Label } from '@/ui/components'
import { render, screen } from '@testing-library/react'

it('should render label text', () => {
  render(<Label text='Test label' />)
  const label = screen.getByText('Test label')
  expect(label).toBeInTheDocument()
})
