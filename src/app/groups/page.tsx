import { Section, Typography } from '@/ui/components'
import GroupsFilterDashboard from '@/ui/components/Groups/GroupsFilterDashboard'
import { Metadata } from 'next'

// export async function generateMetadata(): Promise<Metadata> {
//   const pageData = await getPageData('groups')
//   return {
//     title: pageData[0].meta_title,
//     description: pageData[0].meta_description,
//   }
// }

export default async function GroupsPage() {
  return (
    <>
      <Section
        leftColumn={<GroupsFilterDashboard />}
        variant={'double-column'}
        color={'white'}
      >
        <Typography variant='h1'>Поиск группы</Typography>
      </Section>
    </>
  )
}
