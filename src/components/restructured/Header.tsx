import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X, Home, Users, Grid3X3, FileText, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { path: '/', label: 'Ana Sayfa', icon: Home },
    { path: '/ustalar', label: 'Ustalar', icon: Users },
    { path: '/kategoriler', label: 'Kategoriler', icon: Grid3X3 },
    { path: '/blog', label: 'Blog', icon: FileText },
    { path: '/iletisim', label: 'İletişim', icon: MessageCircle },
  ]

  const isActive = (path: string) => {
    if (!pathname) return false
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            Ankara Usta Bul
          </Link>

          {!isMobile && (
            <nav className="flex items-center space-x-4">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    asChild
                    className={isActive(item.path) ? 'bg-primary/10 text-primary' : ''}
                  >
                    <Link href={item.path} className="flex items-center space-x-2">
                      <IconComponent className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                )
              })}
            </nav>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header