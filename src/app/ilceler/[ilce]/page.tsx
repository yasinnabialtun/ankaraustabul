import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StructuredData } from '@/components/seo'
import LocalSEO from '@/components/seo/LocalSEO'
import { districts } from '@/data/districts'
import { sectors } from '@/data/sectors'
import { ustaService } from '@/services/ustaService'
import { MapPin, Phone, Clock, Star, Users, Award, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface IlcePageProps {
  params: Promise<{
    ilce: string
  }>
}

// Generate static params for all districts
export async function generateStaticParams() {
  return districts.map((district) => ({
    ilce: district.slug
  }))
}

// Generate metadata for each district
export async function generateMetadata({ params }: IlcePageProps): Promise<Metadata> {
  const { ilce } = await params
  const district = districts.find(d => d.slug === ilce)
  
  if (!district) {
    return {
      title: 'İlçe Bulunamadı',
      description: 'Aradığınız ilçe bulunamadı.'
    }
  }

  const title = `${district.name} Ustaları | ${district.name} Elektrik, Su Tesisatı, Temizlik Ustaları | Ankara Usta Bul`
  const description = `${district.name} ilçesinde en iyi ustaları bulun! Elektrik, su tesisatı, temizlik, mobilya, tadilat hizmetleri. ${district.name} bölgesinde güvenilir ustalar, 7/24 hizmet, uygun fiyatlar.`

  return {
    title,
    description,
    keywords: [
      `${district.name} usta`,
      `${district.name} elektrik ustası`,
      `${district.name} su tesisatı`,
      `${district.name} temizlik`,
      `${district.name} mobilya`,
      `${district.name} tadilat`,
      `${district.name} klima`,
      `${district.name} boya`,
      `${district.name} inşaat`,
      `usta ara ${district.name}`,
      `güvenilir usta ${district.name}`,
      `profesyonel usta ${district.name}`,
      `hızlı usta ${district.name}`,
      `uygun fiyat usta ${district.name}`,
      `7/24 usta ${district.name}`,
      `AI usta arama ${district.name}`
    ].join(', '),
    openGraph: {
      title,
      description,
      url: `https://ankaraustabul.com/ilceler/${district.slug}`,
      siteName: 'Ankara Usta Bul',
      locale: 'tr_TR',
      type: 'website',
      images: [
        {
          url: `/images/ilceler/${district.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${district.name} Ustaları - Ankara Usta Bul`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/images/ilceler/${district.slug}.jpg`]
    },
    alternates: {
      canonical: `/ilceler/${district.slug}`
    }
  }
}

export default async function IlcePage({ params }: IlcePageProps) {
  const { ilce } = await params
  const district = districts.find(d => d.slug === ilce)
  
  if (!district) {
    notFound()
  }

  // Get ustalar for this district
  const ustalar = await ustaService.getUstalarByDistrict(district.name)
  
  // Get popular services in this district
  const popularServices = sectors.slice(0, 6)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Ankara Usta Bul - ${district.name}`,
    "description": `${district.name} ilçesinde en iyi ustaları bulun!`,
    "url": `https://ankaraustabul.com/ilceler/${district.slug}`,
    "telephone": "+90-312-123-45-67",
    "email": "info@ankaraustabul.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": district.name,
      "addressLocality": "Ankara",
      "addressRegion": "Ankara",
      "addressCountry": "TR",
      "postalCode": district.postalCode
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": district.coordinates.lat,
      "longitude": district.coordinates.lng
    },
    "areaServed": {
      "@type": "City",
      "name": district.name
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": district.coordinates.lat,
        "longitude": district.coordinates.lng
      },
      "geoRadius": "10000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Usta Hizmetleri",
      "itemListElement": popularServices.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description
        }
      }))
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$"
  }

  return (
    <>
      <StructuredData type="organization" data={structuredData} />
      <LocalSEO
        businessName={`Ankara Usta Bul - ${district.name}`}
        address={`${district.name}, Ankara, Türkiye`}
        phone="+90-312-123-45-67"
        email="info@ankaraustabul.com"
        services={popularServices.map(s => s.name)}
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
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {district.name} Ustaları
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                {district.name} ilçesinde en iyi ustaları bulun! Elektrik, su tesisatı, temizlik, mobilya, tadilat hizmetleri.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  {district.name}, Ankara
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

        {/* District Info */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {district.name} Hakkında
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">İlçe Bilgileri</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                      <span><strong>Konum:</strong> {district.name}, Ankara</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-blue-600 mr-3" />
                      <span><strong>Nüfus:</strong> {district.population.toLocaleString('tr-TR')}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-blue-600 mr-3" />
                      <span><strong>Posta Kodu:</strong> {district.postalCode}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Hizmet Alanları</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {popularServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/kategoriler/${service.slug}?ilce=${district.slug}`}
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">{service.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {district.name} Popüler Hizmetler
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {popularServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/kategoriler/${service.slug}?ilce=${district.slug}`}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 text-blue-600">⚡</div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <div className="text-blue-600 font-semibold">
                      {district.name} {service.name} Ustaları →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Top Ustalar */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {district.name} En İyi Ustalar
            </h2>
            {ustalar.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ustalar.slice(0, 6).map((usta) => (
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
                  {district.name} bölgesinde henüz usta kaydı bulunmuyor.
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {district.name} Ustası mı Arıyorsunuz?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Hemen usta bulun veya usta olarak kayıt olun!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/ustalar?ilce=${district.slug}`}
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
