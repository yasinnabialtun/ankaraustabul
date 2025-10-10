import { Suspense } from 'react'
import { StructuredData } from '@/components/seo'
import LocalSEO from '@/components/seo/LocalSEO'
import { PerformanceMonitor } from '@/components/ui'
import { NewsWidget } from '@/components/news'
import HomePageClient from './HomePageClient'

export default function HomePage() {
  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData 
        type="website" 
        data={{
          name: "Ankara Usta Bul",
          description: "Ankara'da güvenilir usta arama platformu",
          url: "https://ankaraustabul.com"
        }} 
      />
      
      <StructuredData 
        type="organization" 
        data={{
          name: "Ankara Usta Bul",
          description: "Ankara'da güvenilir usta arama platformu"
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