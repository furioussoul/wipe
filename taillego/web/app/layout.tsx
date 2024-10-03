'use client'
import React, { ReactNode } from 'react';
import './styles/globals.css'
import './page.module.css'

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html className="h-full">
      <body className="h-full select-auto">
        {children}
      </body>
    </html>
  );

};


export default MainLayout;