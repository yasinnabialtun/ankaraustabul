import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StructuredData } from '@/components/seo'
import LocalSEO from '@/components/seo/LocalSEO'
import { sectors } from '@/data/sectors'
import { districts } from '@/data/districts'
import { ustaService } from '@/services/ustaService'
import { MapPin, Phone, Clock, Star, Users, Award, CheckCircle, Wrench, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

interface KategoriPageProps {
  params: Promise<{
    kategori: string
  }>
  searchParams: Promise<{
    ilce?: string
  }>
}

// Generate static params for all categories
export async function generateStaticParams() {
  return sectors.map((sector) => ({
    kategori: sector.slug
  }))
}

// Generate metadata for each category
export async function generateMetadata({ params, searchParams }: KategoriPageProps): Promise<Metadata> {
  const { kategori } = await params
  const { ilce: ilceSlug } = await searchParams
  
  const sector = sectors.find(s => s.slug === kategori)
  
  if (!sector) {
    return {
      title: 'Kategori Bulunamadı',
      description: 'Aradığınız kategori bulunamadı.'
    }
  }

  const ilce = ilceSlug ? districts.find(d => d.slug === ilceSlug) : null
  const locationText = ilce ? ` ${ilce.name} ilçesinde` : ' Ankara\'da'
  
  const title = `${sector.name} Ustaları${locationText} | ${sector.name} Hizmetleri | Ankara Usta Bul`
  const description = `${sector.name} hizmetleri için${locationText} en iyi ustaları bulun! Profesyonel ${sector.name.toLowerCase()} ustaları, 7/24 hizmet, güvenilir çözümler.`

  return {
    title,
    description,
    keywords: [
      `${sector.name.toLowerCase()} ustası`,
      `${sector.name.toLowerCase()} ankara`,
      `${sector.name.toLowerCase()} hizmeti`,
      `${sector.name.toLowerCase()} servisi`,
      `ankara ${sector.name.toLowerCase()}`,
      `güvenilir ${sector.name.toLowerCase()} ustası`,
      `profesyonel ${sector.name.toLowerCase()}`,
      `7/24 ${sector.name.toLowerCase()}`,
      `uygun fiyat ${sector.name.toLowerCase()}`,
      `hızlı ${sector.name.toLowerCase()}`
    ].join(', '),
    openGraph: {
      title,
      description,
      url: `https://ankaraustabul.com/kategoriler/${sector.slug}${ilce ? `?ilce=${ilce.slug}` : ''}`,
      siteName: 'Ankara Usta Bul',
      locale: 'tr_TR',
      type: 'website',
      images: [
        {
          url: `/images/kategoriler/${sector.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${sector.name} Ustaları - Ankara Usta Bul`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/images/kategoriler/${sector.slug}.jpg`]
    },
    alternates: {
      canonical: `/kategoriler/${sector.slug}${ilce ? `?ilce=${ilce.slug}` : ''}`
    }
  }
}

export default async function KategoriPage({ params, searchParams }: KategoriPageProps) {
  const { kategori } = await params
  const { ilce: ilceSlug } = await searchParams
  
  const sector = sectors.find(s => s.slug === kategori)
  
  if (!sector) {
    notFound()
  }

  const ilce = ilceSlug ? districts.find(d => d.slug === ilceSlug) : null
  
  // Get ustalar for this category and district
  const ustalar = await ustaService.getUstalarByCategory(sector.name)
  
  // Get related services
  const relatedServices = sectors.filter(s => s.slug !== sector.slug).slice(0, 4)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${sector.name} Hizmetleri`,
    "description": sector.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Ankara Usta Bul",
      "url": "https://ankaraustabul.com",
      "telephone": "+90-312-123-45-67",
      "email": "info@ankaraustabul.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ankara",
        "addressRegion": "Ankara",
        "addressCountry": "TR"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": ilce ? ilce.name : "Ankara"
    },
    "serviceType": sector.name,
    "category": sector.name,
    "offers": {
      "@type": "Offer",
      "description": `${sector.name} hizmetleri`,
      "priceRange": "$$",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250"
    }
  }

  return (
    <>
      <StructuredData type="service" data={structuredData} />
      <LocalSEO
        businessName={`Ankara Usta Bul - ${sector.name}`}
        address={ilce ? `${ilce.name}, Ankara, Türkiye` : "Ankara, Türkiye"}
        phone="+90-312-123-45-67"
        email="info@ankaraustabul.com"
        services={[sector.name]}
        openingHours="Mo-Su 00:00-23:59"
        priceRange="$$"
        rating={4.8}
        reviewCount={1250}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">⚡</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {sector.name} Ustaları
                {ilce && ` - ${ilce.name}`}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                {sector.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  {ilce ? ilce.name : 'Ankara'}
                </div>
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                  <Users className="w-4 h-4 mr-2" />
                  {ustalar.length}+ Usta
                </div>
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 mr-2" />
                  4.8/5 Puan
                </div>
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 mr-2" />
                  7/24 Hizmet
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Info */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {sector.name} Hizmetleri Hakkında
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Hizmet Detayları</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Wrench className="w-5 h-5 text-blue-600 mr-3" />
                      <span><strong>Kategori:</strong> {sector.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-blue-600 mr-3" />
                      <span><strong>Güvenlik:</strong> Sigortalı ve güvenilir ustalar</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-5 h-5 text-blue-600 mr-3" />
                      <span><strong>Hız:</strong> 7/24 acil müdahale</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Neden Bizi Seçmelisiniz?</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                      <span>Profesyonel ve deneyimli ustalar</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                      <span>Uygun fiyat garantisi</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                      <span>7/24 hizmet desteği</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                      <span>Müşteri memnuniyeti garantisi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Ustalar */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              En İyi {sector.name} Ustaları
              {ilce && ` - ${ilce.name}`}
            </h2>
            {ustalar.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ustalar.slice(0, 9).map((usta) => (
                  <Link
                    key={usta.id}
                    href={`/usta/${usta.id}`}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{usta.name}</h3>
                        <p className="text-sm text-gray-600">{usta.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">{usta.rating}</span>
                      <span className="text-gray-600 ml-2">({usta.reviewCount} değerlendirme)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{usta.experience}</p>
                    <div className="flex items-center text-blue-600 font-semibold">
                      <Phone className="w-4 h-4 mr-2" />
                      {usta.phone}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">
                  {ilce ? `${ilce.name} bölgesinde` : 'Bu kategoride'} henüz usta kaydı bulunmuyor.
                </p>
                <Link
                  href="/usta-ekle"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  İlk Usta Ol
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Diğer Hizmet Kategorileri
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/kategoriler/${service.slug}${ilce ? `?ilce=${ilce.slug}` : ''}`}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-colors text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {sector.name} Ustası mı Arıyorsunuz?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Hemen usta bulun veya usta olarak kayıt olun!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/ustalar?category=${sector.slug}${ilce ? `&ilce=${ilce.slug}` : ''}`}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Usta Ara
              </Link>
              <Link
                href="/usta-ekle"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Usta Ol
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
