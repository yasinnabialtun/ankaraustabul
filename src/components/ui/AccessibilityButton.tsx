'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accessibility, Eye, EyeOff, Volume2, VolumeX, Type, Contrast } from 'lucide-react'

interface AccessibilityButtonProps {
  className?: string
}

const AccessibilityButton: React.FC<AccessibilityButtonProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false
  })

  useEffect(() => {
    // Apply accessibility settings to document
    const root = document.documentElement
    
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    if (settings.largeText) {
      root.classList.add('large-text')
    } else {
      root.classList.remove('large-text')
    }
    
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }
  }, [settings])

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const accessibilityOptions = [
    {
      key: 'highContrast' as keyof typeof settings,
      label: 'Yüksek Kontrast',
      icon: Contrast,
      description: 'Renk kontrastını artırır'
    },
    {
      key: 'largeText' as keyof typeof settings,
      label: 'Büyük Metin',
      icon: Type,
      description: 'Metin boyutunu büyütür'
    },
    {
      key: 'reducedMotion' as keyof typeof settings,
      label: 'Azaltılmış Hareket',
      icon: EyeOff,
      description: 'Animasyonları azaltır'
    }
  ]

  return (
    <div className={`fixed bottom-20 right-4 z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 mb-4 w-80"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Erişilebilirlik Ayarları</h3>
            
            <div className="space-y-3">
              {accessibilityOptions.map((option) => {
                const Icon = option.icon
                const isActive = settings[option.key]
                
                return (
                  <button
                    key={option.key}
                    onClick={() => toggleSetting(option.key)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-medium ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-500">{option.description}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isActive 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-gray-300'
                    }`}>
                      {isActive && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Ayarlar tarayıcınızda saklanır
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Erişilebilirlik ayarlarını aç"
      >
        <Accessibility className="w-5 h-5" />
      </motion.button>
    </div>
  )
}

export default AccessibilityButton

