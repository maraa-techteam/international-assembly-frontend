import { getFrequentlyVisitedLinks } from '@/lib/api/fetchFrequentlyVisitedLinks'
import { ArticleCard } from '@/types/components'
import { DirectusSection } from '@/types/sections'
import { Accordion, Section } from '@/ui/components'
import {
  ArticleCardSection,
  CallToActionSection,
  ContentGuideSection,
  FindGroupSection,
  HeroSection,
} from '@/ui/sections'
import { HighlightedElementSection } from '@/ui/sections/HighlightedElementSection/HighlightedElementSection'

type PageData = {
  meta_title: string
  meta_description: string
  slug: string
  sections: DirectusSection[]
}

type PageBuilderProps = {
  pageData: PageData
}

export default async function PageBuilder({ pageData }: PageBuilderProps) {
  const frequentlyVisitedLinks = await getFrequentlyVisitedLinks()
  return (
    <>
      {pageData.sections.map((section: DirectusSection, i: number) => {
        const headingLevel = i === 0 ? 'h1' : 'h2'
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
              headingLevel={headingLevel}
            />
          )
        } else if (section.collection === 'hero_section') {
          return (
            <HeroSection
              key={i}
              title={section.item.title}
              actions={section.item.actions}
              headingLevel={headingLevel}
            />
          )
        } else if (section.collection === 'links_section') {
          return (
            <ContentGuideSection
              key={i}
              title={'Все что вас интересует'}
              headingLevel={headingLevel}
              data={frequentlyVisitedLinks}
            />
          )
        } else if (section.collection === 'find_group_section') {
          return (
            <FindGroupSection
              key={i}
              title={section.item.title}
              text={section.item.text}
              headingLevel={headingLevel}
            />
          )
        } else if (section.collection === 'article_card_section') {
          const flattened = section.item.article_cards.map(
            (junction: ArticleCard | { article_id: ArticleCard }) => {
              return {
                ...('article_id' in junction ? junction.article_id : junction),
              }
            },
          )
          return (
            <ArticleCardSection
              key={i}
              title={section.item.title}
              article_cards={flattened}
              headingLevel={headingLevel}
            />
          )
        } else if (section.collection === 'highlighted_element_section') {
          return (
            <HighlightedElementSection
              key={i}
              title={section.item.title}
              primary_item={section.item.primary_item}
              headingLevel={headingLevel}
              text={section.item.text}
            />
          )
        } else if (section.collection === 'accordion_section') {
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
