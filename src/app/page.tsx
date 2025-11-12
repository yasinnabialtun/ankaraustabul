import { Suspense } from 'react'
import { StructuredData } from '@/components/seo'
import LocalSEO from '@/components/seo/LocalSEO'
import { PerformanceMonitor } from '@/components/ui'
import { NewsWidget } from '@/components/news'
import HomePageClient from './HomePageClient'

export const metadata = {
  title: 'Usta | Ankara Usta Bul - Türkiye\'nin En Büyük Usta Platformu 2025',
  description: 'Usta arama ve bulma platformu. Ankara\'da elektrik usta, su tesisatı usta, temizlik usta, mobilya usta, tadilat usta ve tüm hizmetler için profesyonel usta bulun. 1000+ kayıtlı usta, 25 ilçe, 7/24 usta hizmeti. Usta ara, usta bul, usta değerlendir.',
  keywords: 'usta, usta ara, usta bul, ankara usta, usta ankara, elektrik usta, su tesisatı usta, temizlik usta, mobilya usta, tadilat usta, klima usta, boya usta, inşaat usta, bahçe usta, usta değerlendirme, güvenilir usta, profesyonel usta, usta fiyatları, usta yorumları, usta tavsiye, en iyi usta, usta platformu, usta arama, usta hizmeti, usta servisi',
  openGraph: {
    title: 'Usta | Ankara Usta Bul - Türkiye\'nin En Büyük Usta Platformu 2025',
    description: 'Usta arama ve bulma platformu. Ankara\'da elektrik usta, su tesisatı usta, temizlik usta, mobilya usta, tadilat usta ve tüm hizmetler için profesyonel usta bulun. 1000+ kayıtlı usta, 25 ilçe, 7/24 usta hizmeti.',
    url: 'https://ankaraustabul.com',
    siteName: 'Usta - Ankara Usta Bul',
    images: [
      {
        url: '/images/hero-usta.jpg',
        width: 1200,
        height: 630,
        alt: 'Usta - Türkiye\'nin En Büyük Usta Platformu',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Usta | Ankara Usta Bul - Türkiye\'nin En Büyük Usta Platformu 2025',
    description: 'Usta arama ve bulma platformu. Ankara\'da elektrik usta, su tesisatı usta, temizlik usta, mobilya usta, tadilat usta ve tüm hizmetler için profesyonel usta bulun.',
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
          description: "Usta arama ve bulma platformu - Türkiye'nin en büyük usta platformu"
        }} 
      />
      
      <StructuredData 
        type="faq" 
        data={[
          {
            question: "Usta nedir?",
            answer: "Usta, belirli bir meslek dalında uzmanlaşmış, deneyimli ve profesyonel hizmet sağlayan kişidir. Elektrik usta, su tesisatı usta, temizlik usta, mobilya usta, tadilat usta gibi farklı alanlarda hizmet veren ustalar bulunmaktadır."
          },
          {
            question: "Usta nasıl bulunur?",
            answer: "Usta bulmak için Ankara Usta Bul platformunu kullanabilirsiniz. Kategori, ilçe veya arama terimi ile istediğiniz usta'yı bulabilir, değerlendirmeleri inceleyebilir ve doğrudan iletişime geçebilirsiniz."
          },
          {
            question: "Güvenilir usta nasıl seçilir?",
            answer: "Güvenilir usta seçmek için değerlendirmeleri, deneyim yıllarını, yorumları ve fiyatları inceleyin. Platformumuzda tüm ustalar kimlik doğrulaması yapılmış ve referansları kontrol edilmiştir."
          },
          {
            question: "Usta fiyatları nasıl belirlenir?",
            answer: "Usta fiyatları hizmet türüne, işin kapsamına, usta'nın deneyimine ve bölgeye göre değişiklik gösterebilir. Platformumuzda her usta'nın saatlik ücret bilgisi bulunmaktadır."
          },
          {
            question: "Usta değerlendirme nasıl yapılır?",
            answer: "Usta hizmeti aldıktan sonra platformumuzda usta'yı değerlendirebilir, yorum yazabilir ve puan verebilirsiniz. Bu değerlendirmeler diğer kullanıcılar için önemli bir referans kaynağıdır."
          }
        ]} 
      />
      
      <StructuredData 
        type="service" 
        data={{
          name: "Usta Arama Hizmeti",
          description: "Ankara'da elektrik usta, su tesisatı usta, temizlik usta, mobilya usta, tadilat usta ve tüm hizmetler için profesyonel usta bulma hizmeti",
          serviceType: "Usta Arama ve Bulma Platformu",
          price: "0"
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