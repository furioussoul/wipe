import React from 'react'
import type { ReactNode } from 'react'


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
    </>
  )
}

export const metadata = {
  title: 'Dify',
}

export default Layout
