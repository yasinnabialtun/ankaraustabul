import { Metadata } from 'next';
import { Star, Phone, Mail, MapPin, Clock, CheckCircle, MessageCircle, Calendar } from 'lucide-react';
import SEO from '@/components/SEO';
import { notFound } from 'next/navigation';
import { getProviderById } from '@/data/providers';
import { getCategoryBySlug } from '@/data/categories';
import { getPopularDistricts } from '@/data/districts';
import Image from 'next/image';
import Link from 'next/link';
import { getWorkExamplesByCategory } from '@/data/workExamples';
import WorkGallery from '@/components/WorkGallery';
import ImageGallery from '@/components/ImageGallery';

interface CraftsmanDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: CraftsmanDetailPageProps): Promise<Metadata> {
  // Mock data - in real app, fetch from API
  const craftsman = {
    name: "Ahmet Usta Elektrik",
    category: "Elektrik",
    district: "Çankaya",
    rating: 4.8,
    reviewCount: 127
  };

  return {
    title: `${craftsman.name} - ${craftsman.category} Ustası | Ankara Usta Bul`,
    description: `${craftsman.district} bölgesinde ${craftsman.category} hizmeti veren ${craftsman.name}. ${craftsman.rating}/5 puan, ${craftsman.reviewCount} değerlendirme. Hemen iletişime geçin!`,
    keywords: `${craftsman.name}, ${craftsman.category} ustası, ${craftsman.district}, Ankara, elektrik ustası, güvenilir usta`,
  };
}

export default function CraftsmanDetailPage({ params }: CraftsmanDetailPageProps) {
  // Mock data - in real app, fetch from API based on params.id
  const craftsman = {
    id: params.id,
    name: "Ahmet Usta Elektrik",
    category: "Elektrik",
    district: "Çankaya",
    rating: 4.8,
    reviewCount: 127,
    experience: "15 yıl",
    phone: "+90 532 123 45 67",
    email: "ahmet@elektrikusta.com",
    address: "Çankaya Mahallesi, Atatürk Bulvarı No:123, Çankaya/Ankara",
    description: "15 yıllık deneyimimle Ankara'nın en güvenilir elektrik ustalarından biriyim. Ev, ofis, işyeri elektrik tesisatı, arıza giderme, yeni tesisat kurulumu gibi tüm elektrik işlerinizde hizmet veriyorum. Garantili ve uygun fiyatlı hizmet için hemen arayın.",
    services: [
      "Elektrik tesisatı kurulumu",
      "Arıza giderme ve onarım",
      "Aydınlatma sistemleri",
      "Elektrik panosu kurulumu",
      "Güvenlik sistemleri",
      "Enerji tasarrufu çözümleri"
    ],
    workingHours: {
      monday: "08:00 - 18:00",
      tuesday: "08:00 - 18:00",
      wednesday: "08:00 - 18:00",
      thursday: "08:00 - 18:00",
      friday: "08:00 - 18:00",
      saturday: "09:00 - 16:00",
      sunday: "Kapalı"
    },
    images: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300"
    ],
    reviews: [
      {
        id: 1,
        name: "Mehmet Yılmaz",
        rating: 5,
        date: "2024-01-15",
        comment: "Çok profesyonel ve hızlı hizmet aldım. Fiyatı da uygun. Kesinlikle tavsiye ederim."
      },
      {
        id: 2,
        name: "Ayşe Kaya",
        rating: 4,
        date: "2024-01-10",
        comment: "İşini çok düzgün yapıyor. Temiz ve düzenli çalışıyor. Teşekkürler."
      },
      {
        id: 3,
        name: "Ali Demir",
        rating: 5,
        date: "2024-01-05",
        comment: "Gece yarısı arıza durumunda bile geldi. Gerçekten güvenilir usta."
      }
    ]
  };

  // SEO için JSON-LD şeması
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: craftsman.name,
    jobTitle: `${craftsman.category} Ustası`,
    description: craftsman.description,
    telephone: craftsman.phone,
    email: craftsman.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: craftsman.address,
      addressLocality: craftsman.district,
      addressRegion: 'Ankara',
      addressCountry: 'TR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: craftsman.rating,
      reviewCount: craftsman.reviewCount,
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Ankara Usta Bul',
      url: 'https://ankaraustabul.com',
    },
    url: `https://ankaraustabul.com/usta/${craftsman.id}`,
  }

  const workExamples = getWorkExamplesByCategory(craftsman.category);
  const providerImages = [
    `/api/placeholder/800/600?text=${encodeURIComponent(craftsman.name)}`,
    `/api/placeholder/800/600?text=İş+Örnekleri`,
    `/api/placeholder/800/600?text=Çalışma+Alanı`
  ];

  return (
    <>
      <SEO
        title={`${craftsman.name} - ${craftsman.category} Ustası | Ankara Usta Bul`}
        description={`${craftsman.name} - Ankara'da güvenilir ${craftsman.category.toLowerCase()} ustası. ${craftsman.description} Hemen iletişime geçin.`}
        keywords={`${craftsman.name}, ankara ${craftsman.category.toLowerCase()}, ${craftsman.category.toLowerCase()} ustası, ${craftsman.district} usta`}
        canonical={`https://ankaraustabul.com/usta/${craftsman.id}`}
        image="/og-image.jpg"
        type="profile"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              {/* Provider Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">{craftsman.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{craftsman.name}</h1>
                    <p className="text-xl text-blue-100">{craftsman.category} • {craftsman.district}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold">{craftsman.rating}</span>
                    <span className="text-blue-100">({craftsman.reviewCount} değerlendirme)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{craftsman.experience} deneyim</span>
                  </div>
                </div>

                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  {craftsman.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`tel:${craftsman.phone}`}
                    className="btn-primary inline-flex items-center gap-2 px-6 py-3"
                  >
                    <Phone className="w-5 h-5" />
                    Hemen Ara
                  </Link>
                  <Link
                    href={`mailto:${craftsman.email}`}
                    className="btn-secondary inline-flex items-center gap-2 px-6 py-3"
                  >
                    <Mail className="w-5 h-5" />
                    Mesaj Gönder
                  </Link>
                </div>
              </div>

              {/* Provider Image */}
              <div className="relative">
                <div className="aspect-square bg-white/10 rounded-2xl overflow-hidden">
                  <Image
                    src={providerImages[0]}
                    alt={craftsman.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Hakkında</h2>
                <p className="text-gray-700 leading-relaxed">
                  {craftsman.description}
                </p>
              </div>

              {/* Services */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Hizmetler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {craftsman.services.map((service, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Çalışmalarımdan Örnekler</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {craftsman.images.map((image, index) => (
                    <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`Çalışma örneği ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Müşteri Değerlendirmeleri</h2>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Tümünü Gör
                  </button>
                </div>
                
                <div className="space-y-6">
                  {craftsman.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{review.name}</h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{review.date}</p>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Randevu Al
                  </button>
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Hemen Ara
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Mesaj Gönder
                  </button>
                </div>
              </div>

              {/* Similar Craftsmen */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Benzer Ustalar</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Mehmet Usta</h4>
                        <p className="text-sm text-gray-600">Elektrik • Çankaya</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">4.5 (23)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <ImageGallery
              images={providerImages}
              title={`${craftsman.name} - Çalışma Alanları`}
              description="Ustamızın çalışma alanları ve iş örnekleri"
            />
          </div>
        </section>

        {/* Work Examples */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <WorkGallery
              works={workExamples}
              title={`${craftsman.name} - Örnek İşler`}
              showFilters={false}
            />
          </div>
        </section>
      </div>
    </>
  );
} 