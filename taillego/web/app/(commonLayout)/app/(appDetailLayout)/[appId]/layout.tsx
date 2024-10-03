'use client'
import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import s from './style.module.css'

export type IAppDetailLayoutProps = {
    children: React.ReactNode
}

const AppDetailLayout: FC<IAppDetailLayoutProps> = ({ children }) => {

    return (
        <div className={cn(s.app, 'flex', 'overflow-hidden')}>

            <div className="bg-white grow overflow-hidden">
                {children}
            </div>
        </div>
    )
}
export default React.memo(AppDetailLayout)
