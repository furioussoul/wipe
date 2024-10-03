import type { FC } from "react";
import React from 'react'


export type IAppDetailLayoutProps = {
  children: React.ReactNode
  params: { appId: string }
}


const AppDetailLayout: FC<IAppDetailLayoutProps> = (props) => {
  const {
    children,
    params: { appId }, // get appId in path
  } = props

  return (
    { children }
  )
}
export default React.memo(AppDetailLayout)