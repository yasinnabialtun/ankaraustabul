import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Ankara Usta | En İyi Ustalar ve Hizmet Sağlayıcıları 2025',
    template: '%s | Ankara Usta Bul'
  },
  description: 'Ankara usta arama platformu. Elektrik, su tesisatı, temizlik, mobilya, tadilat ve daha fazlası için güvenilir ankara usta bulun. 500+ kayıtlı usta, 25 ilçe, 7/24 hizmet.',
  keywords: 'ankara usta, ankara ustalar, ankara elektrik ustası, ankara su tesisatı ustası, ankara temizlik, ankara mobilya ustası, ankara tadilat ustası, ankara klima servisi, ankara boya badana, ankara bahçe peyzaj, ankara inşaat tadilat, usta ara ankara, güvenilir usta ankara, profesyonel usta ankara',
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
    title: 'Ankara Usta | En İyi Ustalar ve Hizmet Sağlayıcıları 2025',
    description: 'Ankara usta arama platformu. Elektrik, su tesisatı, temizlik ve daha fazlası için güvenilir ankara usta bulun.',
    url: 'https://ankaraustabul.com',
    siteName: 'Ankara Usta Bul',
    images: [
      {
        url: '/images/hero-usta.jpg',
        width: 1200,
        height: 630,
        alt: 'Ankara Usta - En İyi Ustalar Platformu',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ankara Usta | En İyi Ustalar ve Hizmet Sağlayıcıları 2025',
    description: 'Ankara usta arama platformu. Elektrik, su tesisatı, temizlik ve daha fazlası için güvenilir ankara usta bulun.',
    images: ['/images/hero-usta.jpg'],
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
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 