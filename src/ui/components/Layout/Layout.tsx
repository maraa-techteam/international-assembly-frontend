type LayoutProps = {
  children: React.ReactNode
}
export function Layout({ children }: LayoutProps) {
  return <main className='mt-21.5 flex flex-col'>{children}</main>
}
