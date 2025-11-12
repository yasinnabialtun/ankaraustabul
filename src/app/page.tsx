import { Suspense } from 'react'
import { StructuredData } from '@/components/seo'
import LocalSEO from '@/components/seo/LocalSEO'
import { PerformanceMonitor } from '@/components/ui'
import { NewsWidget } from '@/components/news'
import HomePageClient from './HomePageClient'

export const metadata = {
  title: 'Ankara Usta | En İyi Ustalar ve Hizmet Sağlayıcıları 2025',
  description: 'Ankara usta arama platformu. Elektrik, su tesisatı, temizlik, mobilya, tadilat ve daha fazlası için güvenilir ankara usta bulun. 500+ kayıtlı usta, 25 ilçe, 7/24 hizmet.',
  keywords: 'ankara usta, ankara ustalar, ankara elektrik ustası, ankara su tesisatı ustası, ankara temizlik, ankara mobilya ustası, ankara tadilat ustası, ankara klima servisi, ankara boya badana, ankara bahçe peyzaj, ankara inşaat tadilat, usta ara ankara, güvenilir usta ankara, profesyonel usta ankara',
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
  alternates: {
    canonical: 'https://ankaraustabul.com',
  },
}

export default function HomePage() {
  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData 
        type="website" 
        data={{
          name: "Ankara Usta Bul - En İyi Ustalar Platformu",
          description: "Ankara usta arama platformu. Elektrik, su tesisatı, temizlik ve daha fazlası için güvenilir ankara usta bulun.",
          url: "https://ankaraustabul.com"
        }} 
      />
      
      <StructuredData 
        type="organization" 
        data={{
          name: "Ankara Usta Bul",
          description: "Ankara usta arama platformu - En iyi ustalar ve hizmet sağlayıcıları"
        }} 
      />

      {/* Local SEO */}
      <LocalSEO 
        businessName="Ankara Usta Bul"
        address="Ankara, Türkiye"
        phone="+90-312-123-45-67"
        email="info@ankaraustabul.com"
        services={[
          "Elektrik Hizmetleri",
          "Su Tesisatı Hizmetleri", 
          "Temizlik Hizmetleri",
          "Mobilya Hizmetleri",
          "Tadilat Hizmetleri",
          "Klima Hizmetleri",
          "Boya Badana Hizmetleri",
          "İnşaat Hizmetleri"
        ]}
        openingHours="Mo-Su 00:00-23:59"
        priceRange="$$"
        rating={4.8}
        reviewCount={1250}
      />

      {/* Performance Monitor */}
      <PerformanceMonitor />

      {/* Client Component */}
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      }>
        <HomePageClient />
      </Suspense>
    </>
  )
} 