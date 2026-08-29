import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { GroupsFilterDashboard } from './GroupsFilterDashboard'

const pushMock = jest.fn()
let mockSearchParams = new URLSearchParams()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, prefetch: jest.fn() }),
  usePathname: () => '/groups',
  useSearchParams: () => mockSearchParams,
}))

const dropdownOptions = {
  country: ['Germany', 'France'],
  presence: ['Online', 'Offline'],
  schedule: ['Monday', 'Tuesday'],
}

const renderDashboard = (query = '') => {
  mockSearchParams = new URLSearchParams(query)
  return render(<GroupsFilterDashboard dropdownOptions={dropdownOptions} />)
}

const resetLink = () => screen.getByRole('link', { name: /сбросить фильтры/i })

describe('GroupsFilterDashboard', () => {
  it('lets the last selected option be unchecked when nothing is applied yet', async () => {
    // Regression: clearing the last option used to navigate to the current URL
    // instead of updating the draft, so the checkbox stayed stuck on.
    const user = userEvent.setup()
    renderDashboard()

    await user.click(screen.getByRole('button', { name: /страна/i }))
    const option = screen.getByRole('checkbox', { name: 'Germany' })

    await user.click(option)
    expect(option).toBeChecked()

    await user.click(option)
    expect(option).not.toBeChecked()
    expect(pushMock).not.toHaveBeenCalled()
  })

  it('disables the reset link while there is nothing to reset', () => {
    renderDashboard()

    expect(resetLink()).toHaveAttribute('aria-disabled', 'true')
  })

  it('enables the reset link for filters that are only in the draft', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await user.click(screen.getByRole('button', { name: /страна/i }))
    await user.click(screen.getByRole('checkbox', { name: 'Germany' }))

    expect(resetLink()).toHaveAttribute('aria-disabled', 'false')
  })

  it('enables the reset link for applied filters the draft has already cleared', async () => {
    const user = userEvent.setup()
    renderDashboard('country=Germany')

    await user.click(screen.getByRole('button', { name: /страна/i }))
    await user.click(screen.getByRole('checkbox', { name: 'Germany' }))

    expect(screen.getByRole('checkbox', { name: 'Germany' })).not.toBeChecked()
    expect(resetLink()).toHaveAttribute('aria-disabled', 'false')
  })

  it('clears an unapplied draft without navigating', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await user.click(screen.getByRole('button', { name: /страна/i }))
    await user.click(screen.getByRole('checkbox', { name: 'Germany' }))
    expect(screen.getByText('+1')).toBeInTheDocument()

    await user.click(resetLink())

    expect(screen.queryByText('+1')).not.toBeInTheDocument()
    expect(resetLink()).toHaveAttribute('aria-disabled', 'true')
  })

  it('keeps a selection in the draft until the form is submitted', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await user.click(screen.getByRole('button', { name: /страна/i }))
    await user.click(screen.getByRole('checkbox', { name: 'Germany' }))
    expect(pushMock).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: /поиск/i }))
    expect(pushMock).toHaveBeenCalledWith('/groups?country=Germany')
  })

  it('does not navigate when submitting the filters that are already applied', async () => {
    // A push to the current URL never settles, which used to leave the submit
    // button stuck behind its loader.
    const user = userEvent.setup()
    renderDashboard('country=Germany')

    await user.click(screen.getByRole('button', { name: /поиск/i }))

    expect(pushMock).not.toHaveBeenCalled()
  })

  it('drops pagination params when re-submitting the applied filters', async () => {
    const user = userEvent.setup()
    renderDashboard('country=Germany&page=2')

    await user.click(screen.getByRole('button', { name: /поиск/i }))

    expect(pushMock).toHaveBeenCalledWith('/groups?country=Germany')
  })
})
