'use client'

import React from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Header from './layout/Header'
import Footer from './layout/Footer'
import BottomNav from './BottomNav'
import SkipLink from './ui/SkipLink'
import ErrorBoundary from './ErrorBoundaryWrapper'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <ErrorBoundary>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {isMobile && <BottomNav />}
      </ErrorBoundary>
    </div>
  )
}

export default Layout