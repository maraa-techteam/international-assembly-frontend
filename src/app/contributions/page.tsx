import {
  BankProvider,
  fetchContributionsPage,
  PayPalProvider,
  Provider,
} from '@/common/api/fetchContributionsPage'
import { Metadata } from 'next'

function isPayPalProvider(provider: Provider): provider is PayPalProvider {
  return provider.id === 'pay_pal'
}

function isBankProvider(provider: Provider): provider is BankProvider {
  return provider.id === 'bank_account'
}

const pageData = await fetchContributionsPage()

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageData.meta_title,
    description: pageData.meta_description,
  }
}

export default async function Contributions() {
  return (
    <>
      <h1>{pageData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageData.text }} />
      <div>
        {pageData.provider.map((provider) => (
          <div
            key={provider.id}
            className='bg-primary rounded text-white p-4'
          >
            <h2>{provider.name}</h2>
            {isPayPalProvider(provider) && (
              <a
                href={provider.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {provider.name}
              </a>
            )}
            {isBankProvider(provider) && (
              <>
                <p>{provider.account}</p>
                {provider.description && <p>{provider.description}</p>}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
