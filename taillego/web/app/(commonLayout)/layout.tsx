import React from 'react'
import type { ReactNode } from 'react'
import BrowserInitor from '@/app/components/browser-initor'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserInitor>
      {children}
    </BrowserInitor>
  )
}

export const metadata = {
  title: 'Dify',
}

export default Layout
