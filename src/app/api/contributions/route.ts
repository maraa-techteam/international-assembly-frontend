import { fetchContributionsPage } from '@/common/api/fetchContributionsPage'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const pageData = await fetchContributionsPage()
    if (!pageData.length) {
      return NextResponse.json(
        { error: 'Contributions page data not found' },
        { status: 404 },
      )
    }
    return NextResponse.json(pageData[0])
  } catch (error) {
    console.error('Failed to fetch contributions page data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contributions page data' },
      { status: 500 },
    )
  }
}
