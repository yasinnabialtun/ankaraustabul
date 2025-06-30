import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Ankara Usta Bul - Güvenilir Hizmet Platformu',
    template: '%s | Ankara Usta Bul'
  },
  description: 'Ankara\'da 2,500+ doğrulanmış usta ve firma ile evinizdeki tüm işleriniz için profesyonel çözümler. Elektrik, su tesisatı, temizlik, nakliye ve daha fazlası.',
  keywords: [
    'Ankara usta',
    'elektrik ustası',
    'su tesisatı',
    'temizlik',
    'nakliye',
    'tadilat',
    'bakım onarım',
    'güvenlik sistemleri',
    'Ankara hizmet',
    'usta bulma',
    'ev tamiratı',
    'profesyonel usta'
  ],
  authors: [{ name: 'Ankara Usta Bul' }],
  creator: 'Ankara Usta Bul',
  publisher: 'Ankara Usta Bul',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ankaraustabul.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ankara Usta Bul - Güvenilir Hizmet Platformu',
    description: 'Ankara\'da 2,500+ doğrulanmış usta ve firma ile evinizdeki tüm işleriniz için profesyonel çözümler.',
    url: 'https://ankaraustabul.com',
    siteName: 'Ankara Usta Bul',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ankara Usta Bul - Güvenilir Hizmet Platformu',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ankara Usta Bul - Güvenilir Hizmet Platformu',
    description: 'Ankara\'da 2,500+ doğrulanmış usta ve firma ile evinizdeki tüm işleriniz için profesyonel çözümler.',
    images: ['/og-image.jpg'],
    creator: '@ankaraustabul',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'business',
  classification: 'Service',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Ankara Usta Bul',
    'application-name': 'Ankara Usta Bul',
    'msapplication-TileColor': '#1e40af',
    'msapplication-config': '/browserconfig.xml',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Ankara Usta Bul',
  description: 'Ankara\'da güvenilir usta ve hizmet sağlayıcıları bulabileceğiniz platform',
  url: 'https://ankaraustabul.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://ankaraustabul.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
  sameAs: [
    'https://facebook.com/ankaraustabul',
    'https://twitter.com/ankaraustabul',
    'https://instagram.com/ankaraustabul',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ankara Usta Bul" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: {
                style: {
                  background: '#10b981',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
} 