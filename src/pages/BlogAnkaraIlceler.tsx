import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Building, Users, Home, MapPin } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

function BlogAnkaraIlceler() {
  useSEO({
    title: 'Ankara İlçelerinde Usta Hizmetleri - Çankaya, Keçiören, Yenimahalle ve Diğer İlçeler',
    description: 'Ankara\'nın tüm ilçelerinde usta hizmetleri. Çankaya, Keçiören, Yenimahalle, Mamak ve diğer ilçelerde elektrik, su tesisatı, temizlik ve mobilya ustaları.',
    keywords: 'ankara ilçeleri usta, çankaya usta, keçiören usta, yenimahalle usta, mamak usta, ankara elektrik ustası, ankara su tesisatı',
    type: 'article',
    publishedTime: '2024-01-18T10:00:00Z',
    modifiedTime: '2024-01-18T10:00:00Z',
    author: 'Ankara Usta Bul',
    section: 'Ankara İlçeleri',
    tags: ['ankara', 'ilçeler', 'çankaya', 'keçiören', 'yenimahalle', 'mamak', 'usta', 'elektrik', 'su tesisatı']
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="mb-8">
              <Link to="/blog" className="inline-flex items-center text-green-100 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Blog'a Dön
              </Link>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ankara İlçelerinde Usta Hizmetleri Rehberi
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Her ilçenin kendine özgü ihtiyaçları ve uzman ustaları
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Ankara Usta Bul</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>18 Ocak 2024</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>15 dk okuma</span>
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
                  Ankara'nın İlçelerinde Usta Hizmetleri: Her Bölgenin Kendine Özgü İhtiyaçları
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Ankara'nın 25 ilçesi, her biri farklı sosyo-ekonomik yapıya ve farklı usta hizmet ihtiyaçlarına sahiptir. 
                  Bu yazımızda Ankara'nın en popüler ilçelerini ve bu ilçelerde en çok aranan usta hizmetlerini detaylı olarak inceliyoruz.
                </p>
              </div>

              {/* Çankaya */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Çankaya İlçesi: Lüks ve Kaliteli Hizmet Arayanların Tercihi
                </h3>
                <div className="bg-blue-50 p-6 rounded-xl mb-6">
                  <div className="flex items-center mb-4">
                    <Building className="w-8 h-8 text-blue-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Çankaya Genel Özellikler</h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Ankara'nın merkezi ilçesi olan Çankaya, yüksek gelir grubu nüfusu ve eski binaları ile 
                    kaliteli usta hizmetleri arayanların tercih ettiği bölgedir. Eski binaların yoğun olduğu 
                    bölgelerde elektrik tesisatı yenileme ihtiyacı yüksektir.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">En Çok Aranan Hizmetler:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Elektrik tesisatı yenileme</li>
                        <li>• Lüks ev temizliği</li>
                        <li>• Özel mobilya tasarımı</li>
                        <li>• Güvenlik sistemleri</li>
                        <li>• Su tesisatı modernizasyonu</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Ortalama Fiyat Aralığı:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Elektrik: 150-300 TL/saat</li>
                        <li>• Su Tesisatı: 120-250 TL/saat</li>
                        <li>• Temizlik: 100-200 TL/saat</li>
                        <li>• Mobilya: 120-280 TL/saat</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keçiören */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Keçiören İlçesi: Yoğun Nüfus ve Uygun Fiyatlı Hizmetler
                </h3>
                <div className="bg-green-50 p-6 rounded-xl mb-6">
                  <div className="flex items-center mb-4">
                    <Users className="w-8 h-8 text-green-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Keçiören Genel Özellikler</h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Ankara'nın en kalabalık ilçelerinden biri olan Keçiören, yoğun nüfus yapısı nedeniyle 
                    çok sayıda usta bulunur. Uygun fiyatlı hizmetler tercih edilir ve rekabet ortamı 
                    fiyatları düşük tutar.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">En Çok Aranan Hizmetler:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Su tesisatı tamiri</li>
                        <li>• Ev temizliği</li>
                        <li>• Mobilya montajı</li>
                        <li>• Elektrik arıza giderme</li>
                        <li>• Küçük tamirat işleri</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Ortalama Fiyat Aralığı:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Elektrik: 100-180 TL/saat</li>
                        <li>• Su Tesisatı: 80-150 TL/saat</li>
                        <li>• Temizlik: 60-120 TL/saat</li>
                        <li>• Mobilya: 80-160 TL/saat</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Yenimahalle */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Yenimahalle İlçesi: Yeni Yerleşim ve Modern Hizmetler
                </h3>
                <div className="bg-yellow-50 p-6 rounded-xl mb-6">
                  <div className="flex items-center mb-4">
                    <Home className="w-8 h-8 text-yellow-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Yenimahalle Genel Özellikler</h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Yeni yerleşim alanları ve modern sitelerin yoğun olduğu Yenimahalle, yeni ev alanların 
                    mobilya montaj ihtiyacı yüksektir. Modern usta hizmetleri ve yeni teknolojiler tercih edilir.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">En Çok Aranan Hizmetler:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Yeni ev elektrik tesisatı</li>
                        <li>• Mobilya montajı</li>
                        <li>• İlk temizlik hizmeti</li>
                        <li>• Güvenlik sistemleri</li>
                        <li>• Dekorasyon hizmetleri</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Ortalama Fiyat Aralığı:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Elektrik: 120-220 TL/saat</li>
                        <li>• Su Tesisatı: 100-180 TL/saat</li>
                        <li>• Temizlik: 80-150 TL/saat</li>
                        <li>• Mobilya: 100-200 TL/saat</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mamak */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Mamak İlçesi: Orta Gelir Grubu ve Uygun Fiyatlı Kaliteli Hizmetler
                </h3>
                <div className="bg-purple-50 p-6 rounded-xl mb-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-8 h-8 text-purple-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Mamak Genel Özellikler</h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Orta gelir grubu nüfusun yoğun olduğu Mamak, uygun fiyatlı ve kaliteli usta hizmetleri aranır. 
                    Çeşitli usta seçenekleri mevcut ve rekabet ortamı fiyatları makul seviyede tutar.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">En Çok Aranan Hizmetler:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Genel tamirat işleri</li>
                        <li>• Düzenli temizlik</li>
                        <li>• Küçük onarım işleri</li>
                        <li>• Elektrik arıza giderme</li>
                        <li>• Su tesisatı tamiri</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Ortalama Fiyat Aralığı:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Elektrik: 90-160 TL/saat</li>
                        <li>• Su Tesisatı: 70-140 TL/saat</li>
                        <li>• Temizlik: 50-100 TL/saat</li>
                        <li>• Mobilya: 70-150 TL/saat</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Districts */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Diğer İlçelerde Usta Hizmetleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Etimesgut</h4>
                    <p className="text-gray-700 mb-4">
                      Yeni yerleşim alanları ve siteler. Mobilya montajı ve temizlik hizmetleri çok aranır.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Mobilya montajı</li>
                      <li>• Ev temizliği</li>
                      <li>• Elektrik tesisatı</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Sincan</h4>
                    <p className="text-gray-700 mb-4">
                      Endüstriyel bölge. Elektrik ve su tesisatı hizmetleri yoğun talep görür.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Endüstriyel elektrik</li>
                      <li>• Su tesisatı</li>
                      <li>• Genel tamirat</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Polatlı</h4>
                    <p className="text-gray-700 mb-4">
                      Tarım bölgesi. Basit tamirat işleri ve temizlik hizmetleri tercih edilir.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Basit tamirat</li>
                      <li>• Ev temizliği</li>
                      <li>• Küçük onarımlar</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Gölbaşı</h4>
                    <p className="text-gray-700 mb-4">
                      Lüks villalar ve siteler. Kaliteli usta hizmetleri aranır.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Lüks ev hizmetleri</li>
                      <li>• Özel tasarım</li>
                      <li>• Güvenlik sistemleri</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tips by District */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  İlçelere Göre Usta Seçim Tavsiyeleri
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Çankaya İçin Tavsiyeler</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Belge kontrolüne özel önem verin</li>
                      <li>• Referans araştırması yapın</li>
                      <li>• Kaliteli malzeme kullanan ustalar tercih edin</li>
                      <li>• Sigorta durumunu kontrol edin</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-green-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Keçiören İçin Tavsiyeler</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Fiyat karşılaştırması yapın</li>
                      <li>• Yerel ustaları tercih edin</li>
                      <li>• Hızlı hizmet veren ustalar seçin</li>
                      <li>• Yazılı sözleşme yapın</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-yellow-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Yenimahalle İçin Tavsiyeler</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Modern ekipman kullanan ustalar tercih edin</li>
                      <li>• Yeni teknolojileri bilen ustalar seçin</li>
                      <li>• Garantili hizmet veren ustalar arayın</li>
                      <li>• Deneyimli ustalar tercih edin</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Mamak İçin Tavsiyeler</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Uygun fiyatlı kaliteli hizmet arayın</li>
                      <li>• Yerel ustaları tercih edin</li>
                      <li>• Düzenli hizmet veren ustalar seçin</li>
                      <li>• Referans kontrolü yapın</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Emergency Services by District */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  İlçelere Göre Acil Usta Hizmetleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Çankaya Acil Servis</h4>
                    <p className="text-gray-700 mb-4">
                      Yüksek kaliteli acil hizmetler. 7/24 profesyonel ustalar.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Müdahale Süresi:</strong> 15-30 dakika
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Keçiören Acil Servis</h4>
                    <p className="text-gray-700 mb-4">
                      Hızlı müdahale eden yerel ustalar. Uygun fiyatlı acil hizmetler.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Müdahale Süresi:</strong> 20-45 dakika
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Yenimahalle Acil Servis</h4>
                    <p className="text-gray-700 mb-4">
                      Modern ekipmanlı acil hizmetler. Yeni teknoloji kullanan ustalar.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Müdahale Süresi:</strong> 25-40 dakika
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Mamak Acil Servis</h4>
                    <p className="text-gray-700 mb-4">
                      Uygun fiyatlı acil hizmetler. Yerel ustaların hızlı müdahalesi.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Müdahale Süresi:</strong> 30-60 dakika
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-green-600 text-white p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ankara'nın Hangi İlçesinde Usta Arıyorsunuz?
                </h3>
                <p className="text-green-100 mb-6">
                  İlçenize özel usta hizmetleri için hemen iletişime geçin. 
                  Her ilçenin kendine özgü ihtiyaçlarına uygun ustalar bulun.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/ustalar"
                    className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
                  >
                    İlçenize Özel Ustalar
                  </Link>
                  <Link
                    to="/kategoriler"
                    className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors"
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

export default BlogAnkaraIlceler; 