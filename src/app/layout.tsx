import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomNav from '@/components/BottomNav'
import { AccessibilityButton } from '@/components/ui'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Ankara Usta Bul | En İyi Ustalar | Elektrik, Su Tesisatı, Temizlik | 2025',
    template: '%s | Ankara Usta Bul - Güvenilir Usta Arama Platformu'
  },
  description: "Ankara'da en iyi ustaları bulun! Elektrik, su tesisatı, temizlik, mobilya, tadilat hizmetleri. 7/24 hizmet, güvenilir ustalar, uygun fiyatlar. AI destekli arama ile hemen usta bulun.",
  keywords: 'ankara usta, ankara elektrik ustası, ankara su tesisatı, ankara temizlik, ankara mobilya, ankara tadilat, ankara klima, ankara boya, ankara inşaat, usta ara ankara, güvenilir usta ankara, profesyonel usta ankara, hızlı usta ankara, uygun fiyat usta ankara, 7/24 usta ankara, AI usta arama ankara',
  authors: [{ name: 'Ankara Usta Bul', url: 'https://ankaraustabul.com' }],
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
    type: 'website',
    locale: 'tr_TR',
    url: 'https://ankaraustabul.com',
    title: 'Ankara Usta Bul | En İyi Ustalar | Elektrik, Su Tesisatı, Temizlik',
    description: "Ankara'da en iyi ustaları bulun! Elektrik, su tesisatı, temizlik, mobilya, tadilat hizmetleri. 7/24 hizmet, güvenilir ustalar, uygun fiyatlar.",
    siteName: 'Ankara Usta Bul',
    images: [
      {
        url: '/images/og-image-2025.jpg',
        width: 1200,
        height: 630,
        alt: 'Ankara Usta Bul - En İyi Ustalar Platformu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ankara Usta Bul | En İyi Ustalar | Elektrik, Su Tesisatı, Temizlik',
    description: "Ankara'da en iyi ustaları bulun! Elektrik, su tesisatı, temizlik, mobilya, tadilat hizmetleri. 7/24 hizmet, güvenilir ustalar.",
    images: ['/images/og-image-2025.jpg'],
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
    google: 'google61edf2af12f96880',
  },
  category: 'Home Services',
  classification: 'Usta Arama Platformu',
  other: {
    'geo.region': 'TR-06',
    'geo.placename': 'Ankara',
    'geo.position': '39.9334;32.8597',
    'ICBM': '39.9334, 32.8597',
    // Mobile SEO
    'mobile-web-app-capable': 'yes',
    'mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Ankara Usta Bul',
    'application-name': 'Ankara Usta Bul',
    'msapplication-TileColor': '#2563eb',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#2563eb',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={inter.className}>
      <body className="antialiased">
        <Header />
        <main className="pb-20">
          {children}
        </main>
        <Footer />
        <BottomNav />
        <AccessibilityButton />
      </body>
    </html>
  )
}