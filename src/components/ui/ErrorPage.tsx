'use client'

import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ErrorPageProps {
  title?: string
  message?: string
  showRetry?: boolean
  showHome?: boolean
  fullScreen?: boolean
}

const ErrorPage: React.FC<ErrorPageProps> = ({ 
  title = "Bir Hata Oluştu",
  message = "Üzgünüz, beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
  showRetry = true,
  showHome = true,
  fullScreen = true
}) => {
  const router = useRouter()

  const containerClass = fullScreen 
    ? "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center"
    : "py-12 flex items-center justify-center"

  const handleRetry = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <div className={containerClass}>
      <motion.div 
        className="text-center max-w-md mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AlertCircle className="w-10 h-10 text-red-600" />
        </motion.div>
        
        <motion.h1 
          className="text-2xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {title}
        </motion.h1>
        
        <motion.p 
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {message}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {showRetry && (
            <button
              onClick={handleRetry}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Tekrar Dene</span>
            </button>
          )}
          
          {showHome && (
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Ana Sayfa</span>
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ErrorPage

