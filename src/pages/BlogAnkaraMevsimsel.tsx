import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Sun, Cloud, Snowflake, Leaf } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

function BlogAnkaraMevsimsel() {
  useSEO({
    title: 'Ankara\'da Mevsimsel Usta İhtiyaçları - Yaz, Kış, İlkbahar ve Sonbahar Rehberi',
    description: 'Ankara\'da mevsimlere göre değişen usta ihtiyaçları. Yaz aylarında klima servisi, kış aylarında ısıtma sistemleri, ilkbahar ve sonbahar bakım işleri.',
    keywords: 'ankara mevsimsel usta, yaz usta ihtiyaçları, kış usta ihtiyaçları, ankara klima servisi, ankara ısıtma sistemleri, ankara bakım işleri',
    type: 'article',
    publishedTime: '2024-01-16T10:00:00Z',
    modifiedTime: '2024-01-16T10:00:00Z',
    author: 'Ankara Usta Bul',
    section: 'Mevsimsel Rehber',
    tags: ['ankara', 'mevsimsel', 'yaz', 'kış', 'ilkbahar', 'sonbahar', 'usta', 'klima', 'ısıtma']
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="mb-8">
              <Link to="/blog" className="inline-flex items-center text-orange-100 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Blog'a Dön
              </Link>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ankara'da Mevsimsel Usta İhtiyaçları Rehberi
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Her mevsimin kendine özgü usta hizmetleri ve bakım ihtiyaçları
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Ankara Usta Bul</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>16 Ocak 2024</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>18 dk okuma</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Ankara'nın Mevsimsel Usta İhtiyaçları: Her Dönemin Kendine Özgü Gereksinimleri
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Ankara'nın karasal iklimi, her mevsimde farklı usta hizmet ihtiyaçlarını beraberinde getirir. 
                  Yaz aylarında klima servisi, kış aylarında ısıtma sistemleri, ilkbahar ve sonbahar aylarında 
                  bakım işleri yoğun talep görür. Bu yazımızda Ankara'nın mevsimsel usta ihtiyaçlarını detaylı olarak inceliyoruz.
                </p>
              </div>

              {/* Summer */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Yaz Aylarında Ankara'da Usta İhtiyaçları
                </h3>
                <div className="bg-orange-50 p-6 rounded-xl mb-6">
                  <div className="flex items-center mb-4">
                    <Sun className="w-8 h-8 text-orange-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Yaz Mevsimi (Haziran - Ağustos)</h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Ankara'nın sıcak yaz aylarında klima servisi, soğutma sistemleri ve elektrik arızaları 
                    en çok aranan usta hizmetleridir. Yüksek sıcaklıklar nedeniyle klima sistemlerine 
                    yoğun talep olur.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">En Çok Aranan Hizmetler:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Klima servisi ve bakımı</li>
                        <li>• Soğutma sistemleri</li>
                        <li>• Elektrik arıza giderme</li>
                        <li>• Su tesisatı tamiri</li>
                        <li>• Havalandırma sistemleri</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Ortalama Fiyat Aralığı:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Klima Servisi: 200-400 TL</li>
                        <li>• Elektrik: 120-250 TL/saat</li>
                        <li>• Su Tesisatı: 100-200 TL/saat</li>
                        <li>• Havalandırma: 150-300 TL/saat</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Klima Servisi</h4>
                    <p className="text-gray-700 mb-4">
                      Yaz aylarında klima sistemlerinin düzenli bakımı ve arıza giderme hizmetleri 
                      çok aranır. Filtre temizliği, gaz şarjı ve sistem kontrolü yapılır.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Filtre temizliği</li>
                      <li>• Gaz şarjı</li>
                      <li>• Sistem kontrolü</li>
                      <li>• Arıza giderme</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Elektrik Arızaları</h4>
                    <p className="text-gray-700 mb-4">
                      Yüksek sıcaklıklar nedeniyle elektrik sistemlerinde arızalar artar. 
                      Klima sistemlerinin yoğun kullanımı elektrik yükünü artırır.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Sigorta arızaları</li>
                      <li>• Priz problemleri</li>
                      <li>• Aşırı yüklenme</li>
                      <li>• Sistem kontrolü</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Winter */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Kış Aylarında Ankara'da Usta İhtiyaçları
                </h3>
                <div className="bg-blue-50 p-6 rounded-xl mb-6">
                  <div className="flex items-center mb-4">
                    <Snowflake className="w-8 h-8 text-blue-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Kış Mevsimi (Aralık - Şubat)</h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Ankara'nın soğuk kış aylarında ısıtma sistemleri, su tesisatı ve elektrik 
                    hizmetleri en çok aranan usta hizmetleridir. Donma riski nedeniyle su tesisatı 
                    problemleri sık yaşanır.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">En Çok Aranan Hizmetler:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Kombi servisi ve bakımı</li>
                        <li>• Su tesisatı tamiri</li>
                        <li>• Isıtma sistemleri</li>
                        <li>• Elektrik arıza giderme</li>
                        <li>• Su kaçağı tespiti</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Ortalama Fiyat Aralığı:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Kombi Servisi: 150-300 TL</li>
                        <li>• Su Tesisatı: 120-250 TL/saat</li>
                        <li>• Elektrik: 100-200 TL/saat</li>
                        <li>• Isıtma Sistemleri: 150-300 TL/saat</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Kombi Servisi</h4>
                    <p className="text-gray-700 mb-4">
                      Kış aylarında kombi arızaları ve bakım ihtiyaçları artar. 
                      Düzenli bakım yapılmayan kombiler donma riski taşır.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Kombi bakımı</li>
                      <li>• Arıza giderme</li>
                      <li>• Donma koruması</li>
                      <li>• Sistem kontrolü</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Su Tesisatı</h4>
                    <p className="text-gray-700 mb-4">
                      Donma riski nedeniyle su tesisatı problemleri sık yaşanır. 
                      Boru patlamaları ve su kaçakları acil müdahale gerektirir.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Donma koruması</li>
                      <li>• Boru tamiri</li>
                      <li>• Su kaçağı tespiti</li>
                      <li>• Acil müdahale</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Spring */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  İlkbahar Aylarında Ankara'da Usta İhtiyaçları
                </h3>
                <div className="bg-green-50 p-6 rounded-xl mb-6">
                  <div className="flex items-center mb-4">
                    <Leaf className="w-8 h-8 text-green-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">İlkbahar Mevsimi (Mart - Mayıs)</h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    İlkbahar aylarında genel bakım işleri, temizlik hizmetleri ve yeni sezon 
                    hazırlıkları yoğun talep görür. Evlerin genel bakımı ve temizliği yapılır.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">En Çok Aranan Hizmetler:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Genel temizlik hizmetleri</li>
                        <li>• Cam temizliği</li>
                        <li>• Mobilya bakımı</li>
                        <li>• Elektrik kontrolü</li>
                        <li>• Su tesisatı kontrolü</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Ortalama Fiyat Aralığı:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Temizlik: 80-150 TL/saat</li>
                        <li>• Cam Temizliği: 100-200 TL</li>
                        <li>• Mobilya Bakımı: 120-250 TL/saat</li>
                        <li>• Sistem Kontrolü: 100-180 TL/saat</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Genel Temizlik</h4>
                    <p className="text-gray-700 mb-4">
                      İlkbahar aylarında evlerin genel temizliği ve bakımı yapılır. 
                      Kış aylarının etkisini gidermek için detaylı temizlik hizmetleri aranır.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Detaylı ev temizliği</li>
                      <li>• Cam temizliği</li>
                      <li>• Halı yıkama</li>
                      <li>• Perde temizliği</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Sistem Kontrolleri</h4>
                    <p className="text-gray-700 mb-4">
                      Yaz aylarına hazırlık için elektrik ve su tesisatı kontrolleri yapılır. 
                      Klima sistemlerinin bakımı yapılır.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Elektrik kontrolü</li>
                      <li>• Su tesisatı kontrolü</li>
                      <li>• Klima bakımı</li>
                      <li>• Güvenlik kontrolü</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Autumn */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Sonbahar Aylarında Ankara'da Usta İhtiyaçları
                </h3>
                <div className="bg-yellow-50 p-6 rounded-xl mb-6">
                  <div className="flex items-center mb-4">
                    <Cloud className="w-8 h-8 text-yellow-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Sonbahar Mevsimi (Eylül - Kasım)</h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Sonbahar aylarında kış hazırlıkları ve ısıtma sistemlerinin kontrolü 
                    yoğun talep görür. Kombi bakımı ve ısıtma sistemlerinin hazırlanması önemlidir.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">En Çok Aranan Hizmetler:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Kombi bakımı ve kontrolü</li>
                        <li>• Isıtma sistemleri</li>
                        <li>• Su tesisatı kontrolü</li>
                        <li>• Elektrik kontrolü</li>
                        <li>• Genel bakım işleri</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Ortalama Fiyat Aralığı:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Kombi Bakımı: 150-300 TL</li>
                        <li>• Isıtma Sistemleri: 120-250 TL/saat</li>
                        <li>• Su Tesisatı: 100-200 TL/saat</li>
                        <li>• Elektrik Kontrolü: 80-150 TL/saat</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Kış Hazırlıkları</h4>
                    <p className="text-gray-700 mb-4">
                      Kış aylarına hazırlık için kombi bakımı ve ısıtma sistemlerinin kontrolü yapılır. 
                      Su tesisatının donma riskine karşı korunması sağlanır.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Kombi bakımı</li>
                      <li>• Isıtma kontrolü</li>
                      <li>• Donma koruması</li>
                      <li>• Sistem kontrolü</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Genel Bakım</h4>
                    <p className="text-gray-700 mb-4">
                      Sonbahar aylarında evlerin genel bakımı yapılır. Elektrik ve su tesisatı 
                      kontrolleri yapılarak kış aylarına hazırlık sağlanır.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Elektrik kontrolü</li>
                      <li>• Su tesisatı kontrolü</li>
                      <li>• Genel bakım</li>
                      <li>• Güvenlik kontrolü</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Seasonal Tips */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Mevsimlere Göre Usta Seçim Tavsiyeleri
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-orange-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Yaz Ayları İçin Tavsiyeler</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Klima servisi için sertifikalı ustalar tercih edin</li>
                      <li>• Acil servis hizmeti veren ustalar seçin</li>
                      <li>• Elektrik arızaları için 7/24 hizmet arayın</li>
                      <li>• Su tesisatı için deneyimli ustalar tercih edin</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Kış Ayları İçin Tavsiyeler</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Kombi servisi için yetkili servis tercih edin</li>
                      <li>• Donma koruması konusunda uzman ustalar seçin</li>
                      <li>• Acil müdahale edebilen ustalar arayın</li>
                      <li>• Isıtma sistemleri konusunda deneyimli ustalar tercih edin</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-green-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">İlkbahar Ayları İçin Tavsiyeler</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Temizlik hizmetleri için profesyonel ekipler tercih edin</li>
                      <li>• Cam temizliği için özel ekipman kullanan ustalar seçin</li>
                      <li>• Mobilya bakımı için ahşap uzmanı ustalar arayın</li>
                      <li>• Sistem kontrolleri için deneyimli ustalar tercih edin</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-yellow-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Sonbahar Ayları İçin Tavsiyeler</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Kombi bakımı için yetkili servis tercih edin</li>
                      <li>• Isıtma sistemleri konusunda uzman ustalar seçin</li>
                      <li>• Donma koruması konusunda deneyimli ustalar arayın</li>
                      <li>• Genel bakım için çok yönlü ustalar tercih edin</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Emergency Services by Season */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Mevsimlere Göre Acil Usta Hizmetleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-orange-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Yaz Acil Servisleri</h4>
                    <p className="text-gray-700 mb-4">
                      Klima arızaları, elektrik kesintileri ve su tesisatı problemleri için 
                      hızlı müdahale eden ustalar.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Müdahale Süresi:</strong> 30-60 dakika
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Kış Acil Servisleri</h4>
                    <p className="text-gray-700 mb-4">
                      Kombi arızaları, donma problemleri ve ısıtma sistemleri için 
                      acil müdahale eden ustalar.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Müdahale Süresi:</strong> 1-2 saat
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">İlkbahar Acil Servisleri</h4>
                    <p className="text-gray-700 mb-4">
                      Sistem kontrolleri ve genel bakım işleri için 
                      profesyonel ustalar.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Müdahale Süresi:</strong> 2-4 saat
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Sonbahar Acil Servisleri</h4>
                    <p className="text-gray-700 mb-4">
                      Kış hazırlıkları ve sistem kontrolleri için 
                      deneyimli ustalar.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Müdahale Süresi:</strong> 1-3 saat
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-orange-600 text-white p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ankara'da Mevsimsel Usta Hizmetleri Arıyor musunuz?
                </h3>
                <p className="text-orange-100 mb-6">
                  Her mevsimin kendine özgü ihtiyaçlarına uygun ustalar bulun. 
                  Mevsimsel bakım ve acil hizmetler için hemen iletişime geçin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/ustalar"
                    className="bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
                  >
                    Mevsimsel Ustalar
                  </Link>
                  <Link
                    to="/kategoriler"
                    className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-colors"
                  >
                    Hizmet Kategorileri
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogAnkaraMevsimsel; 