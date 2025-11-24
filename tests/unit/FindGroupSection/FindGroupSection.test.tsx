import { FindGroupSectionProps } from '@/types/sections'
import { FindGroupSection } from '@/ui/sections'
import { fireEvent, render, screen } from '@testing-library/react'

const mockProps: FindGroupSectionProps = {
  title: 'Найти группу',
  text: 'Выберите страну и формат встречи',
}

describe('FindGroupSection component', () => {
  it('renders title and text', () => {
    render(<FindGroupSection {...mockProps} />)

    expect(screen.getByText('Найти группу')).toBeInTheDocument()
    expect(
      screen.getByText('Выберите страну и формат встречи'),
    ).toBeInTheDocument()
  })

  it('renders selects', () => {
    render(<FindGroupSection {...mockProps} />)

    expect(screen.getAllByRole('combobox').length).toBe(2)
  })

  it('renders submit button', () => {
    render(<FindGroupSection {...mockProps} />)

    const button = screen.getByRole('button', { name: /Поиск/i })
    expect(button).toBeInTheDocument()
  })

  it('submit button is disabled initially', () => {
    render(<FindGroupSection {...mockProps} />)

    const button = screen.getByRole('button', { name: /Поиск/i })
    expect(button).toBeDisabled()
  })

  it('submit button is enabled when both selects have values', () => {
    render(<FindGroupSection {...mockProps} />)

    const [countryInput, presenceInput] = screen.getAllByRole('combobox')

    fireEvent.change(countryInput, { target: { value: 'China' } })
    fireEvent.change(presenceInput, { target: { value: 'Онлайн' } })

    const button = screen.getByRole('button', { name: /Поиск/i })
    expect(button).not.toBeDisabled()
  })

  it('submit button remains disabled when only one select has value', () => {
    render(<FindGroupSection {...mockProps} />)

    const countryInput = screen.getAllByRole('combobox')[0]

    fireEvent.change(countryInput, { target: { value: 'China' } })

    const button = screen.getByRole('button', { name: /Поиск/i })
    expect(button).toBeDisabled()
  })

  it('renders form element', () => {
    const { container } = render(<FindGroupSection {...mockProps} />)

    const form = container.querySelector('form')
    expect(form).toBeInTheDocument()
  })
})
