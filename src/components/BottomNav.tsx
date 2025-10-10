'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Home as HomeIcon,
  Users as UsersIcon,
  Crown as CrownIcon,
  FileText as FileTextIcon,
  MessageCircle as MessageCircleIcon,
  Plus as PlusIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const BottomNav: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()

  const navigationItems = [
    { path: '/', label: 'Ana Sayfa', icon: HomeIcon },
    { path: '/ustalar', label: 'Ustalar', icon: UsersIcon },
    { path: '/one-cikan-ustalar', label: 'Öne Çıkanlar', icon: CrownIcon },
    { path: '/blog', label: 'Blog', icon: FileTextIcon },
    { path: '/iletisim', label: 'İletişim', icon: MessageCircleIcon },
  ]

  const isActive = (path: string) => {
    if (!pathname) return false
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-border shadow-lg"
    >
      <div className="flex items-center justify-around px-4 py-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon
          const active = isActive(item.path)
          
          return (
            <motion.button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300",
                active 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <IconComponent className={cn(
                "w-5 h-5 mb-1 transition-all duration-300",
                active && "scale-110"
              )} />
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                active && "font-semibold"
              )}>
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Floating Add Button */}
      <motion.div
        className="absolute -top-6 left-1/2 transform -translate-x-1/2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => router.push('/usta-ekle')}
          size="icon"
          variant="gradient"
          className="w-12 h-12 rounded-full shadow-lg"
          aria-label="Usta Ekle"
        >
          <PlusIcon className="w-6 h-6" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default BottomNav