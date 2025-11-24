import { getFrequentlyVisitedLinks } from '@/lib/api/fetchFrequentlyVisitedLinks'
import { getPageData } from '@/lib/api/fetchPage'
import { DirectusSection } from '@/types/sections'
import {
  CallToActionSection,
  CardSection,
  ContentGuideSection,
  FindGroupSection,
  HeroSection,
} from '@/ui/sections'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageData('home')
  return {
    title: pageData[0].meta_title,
    description: pageData[0].meta_description,
  }
}
export default async function Home() {
  const frequentlyVisitedLinks = await getFrequentlyVisitedLinks()
  const pageData = await getPageData('home')
  return (
    <>
      {pageData[0].sections.map((section: DirectusSection, i: number) => {
        const sectionData = section.item
        if (section.collection === 'cta_section') {
          return (
            <CallToActionSection
              key={i}
              title={sectionData.title}
              text={sectionData.text}
              linkText={sectionData.linkText}
              linkHref={sectionData.linkHref}
              linkIcon={sectionData.linkIcon}
              actions={sectionData.actions}
              image={sectionData.image}
            />
          )
        } else if (section.collection === 'hero_section') {
          return (
            <HeroSection
              key={i}
              title={sectionData.title}
              buttons={sectionData.actions}
            />
          )
        } else if (section.collection === 'links_section') {
          return (
            <ContentGuideSection
              key={i}
              title={sectionData.title}
              data={frequentlyVisitedLinks}
            />
          )
        } else if (section.collection === 'find_group_section') {
          return (
            <FindGroupSection
              key={i}
              title={sectionData.title}
              text={sectionData.text}
            />
          )
        }
        return <></>
      })}
      <CardSection
        title={'Новости и события'}
        type={'article'}
        cards={[
          {
            title:
              'Семинар "Молясь лишь о знании Его воли и силе Его величия" проходит каждый месяц где-то в мире!',
            text: 'Международная онлайн группа АА"Только Сегодня" Приглашает вас на семинар под девизом: "Молясь лишь о знании Его Воли" который проходит каждый месяц в разных странах мира.',
            image: null,
            href: '/',
            publishedAt: '20 января 2024',
          },
          {
            title:
              'Новая статья в блоге: Технологические новости и обновления от Международной Ассамблеи',
            text: 'Оставайтесь в курсе последних технологических достижений и инноваций, которые формируют будущее нашей организации и сообщества.',
            image: null,
            href: '/articles/tech-news',
            publishedAt: '15 января 2024',
          },
        ]}
      />
    </>
  )
}
