import { FC } from 'react'

type LayoutProps = {
  children: React.ReactNode
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return <main className='flex flex-col'>{children}</main>
}

export default Layout
