import { getPageData } from '@/lib/api/fetchPage'
import { DirectusSection } from '@/types/sections'
import { Accordion, Section } from '@/ui/components'
import {
  CallToActionSection,
  FindGroupSection,
  HeroSection,
} from '@/ui/sections'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageData('about-groups')
  return {
    title: pageData[0].meta_title,
    description: pageData[0].meta_description,
  }
}

export default async function AboutGroups() {
  const pageData = await getPageData('about-groups')

  return (
    <>
      {pageData[0].sections.map((section: DirectusSection, i: number) => {
        if (section.collection === 'cta_section') {
          return (
            <CallToActionSection
              key={i}
              title={section.item.title}
              text={section.item.text}
              linkText={section.item.linkText}
              linkHref={section.item.linkHref}
              linkIcon={section.item.linkIcon}
              actions={section.item.actions}
              image={section.item.image}
            />
          )
        }
        if (section.collection === 'hero_section') {
          return (
            <HeroSection
              key={i}
              title={section.item.title}
              actions={section.item.actions}
            />
          )
        }
        if (section.collection === 'find_group_section') {
          return (
            <FindGroupSection
              key={i}
              title={section.item.title}
              text={section.item.text}
            />
          )
        }
        if (section.collection === 'accordion_section') {
          return (
            <Section key={i} variant={'single-column'} color={'white'}>
              <Accordion items={section.item.accordion} />
            </Section>
          )
        }
        return null
      })}
    </>
  )
}
