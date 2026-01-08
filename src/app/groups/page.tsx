import { Section, Typography } from '@/ui/components'
import GroupsFilterDashboard from '@/ui/components/Groups/GroupsFilterDashboard'
import GroupsTable from '@/ui/components/Groups/GroupsTable'

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
      <Section className='py-0' color={'white'}>
        <Typography variant='h1'>Поиск группы</Typography>
      </Section>
      <Section className='px-0 lg:pt-0' color={'white'}>
        <GroupsFilterDashboard />
      </Section>
      <Section className='px-0 pt-0 lg:pt-0' color={'white'}>
        <GroupsTable />
      </Section>
    </>
  )
}
