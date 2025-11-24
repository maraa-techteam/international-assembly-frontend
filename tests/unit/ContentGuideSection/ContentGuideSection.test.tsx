import { ContentGuideSectionProps } from '@/types/sections'
import { ContentGuideSection } from '@/ui/sections'
import { render, screen } from '@testing-library/react'

const mockData = [
  {
    name: 'Раздел 1',
    href: '/section-1',
    description: 'Описание первого раздела',
    isFrequentlyVisited: true,
  },
  {
    name: 'Раздел 2',
    href: '/section-2',
    description: 'Описание второго раздела',
    isFrequentlyVisited: true,
  },
]

const mockProps: ContentGuideSectionProps = {
  title: 'Руководство по контенту',
  data: mockData,
}

describe('ContentGuideSection component', () => {
  it('renders title', () => {
    render(<ContentGuideSection {...mockProps} />)

    expect(screen.getByText('Руководство по контенту')).toBeInTheDocument()
  })

  it('renders ContentGuide when data is not empty', () => {
    render(<ContentGuideSection {...mockProps} />)

    expect(screen.getByText('Раздел 1')).toBeInTheDocument()
  })
})
