type LayoutPropsType = {
  children: React.ReactNode
}

export function Layout({ children }: LayoutPropsType) {
  return <main className='mt-21.5 flex flex-col'>{children}</main>
}
