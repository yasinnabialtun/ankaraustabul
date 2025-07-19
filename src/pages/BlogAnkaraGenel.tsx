import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, CheckCircle, MapPin, Shield, Clock4, Award } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

function BlogAnkaraGenel() {
  useSEO({
    title: 'Ankara Usta Bul - Ankara\'da Güvenilir Usta Arama Rehberi',
    description: 'Ankara\'da usta arıyorsanız doğru yerdesiniz. Elektrik, su tesisatı, temizlik, mobilya ve daha fazlası için güvenilir ustalar. Ankara\'nın en iyi ustalarını bulun.',
    keywords: 'ankara usta, ankara elektrik ustası, ankara su tesisatı, ankara temizlik, ankara mobilya ustası, güvenilir usta ankara, usta arama ankara',
    type: 'article',
    publishedTime: '2024-01-20T10:00:00Z',
    modifiedTime: '2024-01-20T10:00:00Z',
    author: 'Ankara Usta Bul',
    section: 'Usta Rehberi',
    tags: ['ankara', 'usta', 'elektrik', 'su tesisatı', 'temizlik', 'mobilya', 'güvenilir usta']
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="mb-8">
              <Link to="/blog" className="inline-flex items-center text-blue-100 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Blog'a Dön
              </Link>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ankara'da Güvenilir Usta Bulmanın Püf Noktaları
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Başkent Ankara'da evinizdeki her iş için güvenilir, kaliteli ve profesyonel ustalar
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Ankara Usta Bul</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>20 Ocak 2024</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>12 dk okuma</span>
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
                  Ankara'da Usta Arama Rehberi: Güvenilir Hizmet İçin Bilmeniz Gerekenler
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Ankara, Türkiye'nin başkenti olarak hem nüfus yoğunluğu hem de çeşitli hizmet sektörleri açısından zengin bir şehirdir. 
                  Evinizdeki her türlü iş için güvenilir usta bulmak, hem zaman hem de maddi açıdan önemlidir. 
                  Bu yazımızda Ankara'da usta ararken dikkat edilmesi gereken önemli noktaları ve güvenilir hizmet alma yöntemlerini paylaşıyoruz.
                </p>
              </div>

              {/* Why Ankara */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'da Usta Hizmetlerinin Önemi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <MapPin className="w-8 h-8 text-blue-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Büyük Şehir Avantajı</h4>
                    <p className="text-gray-700">
                      Ankara'nın büyük şehir olması, çok sayıda uzman usta bulmanızı sağlar. 
                      Rekabet ortamı kaliteli hizmet sunulmasını destekler.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <Shield className="w-8 h-8 text-green-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Güvenlik Standartları</h4>
                    <p className="text-gray-700">
                      Başkent olması nedeniyle yüksek güvenlik standartları ve belge kontrolü 
                      yapılan ustalar daha güvenilir hizmet sunar.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <Clock4 className="w-8 h-8 text-yellow-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">7/24 Hizmet</h4>
                    <p className="text-gray-700">
                      Acil durumlar için 7/24 hizmet veren ustalar bulunur. 
                      Özellikle elektrik ve su tesisatı acil durumları için kritik öneme sahip.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <Award className="w-8 h-8 text-purple-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Kaliteli Malzeme</h4>
                    <p className="text-gray-700">
                      Büyük şehir avantajı ile kaliteli malzeme temin edebilen ustalar 
                      uzun ömürlü işçilik yapar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Popular Services */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'da En Çok Aranan Usta Hizmetleri
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Elektrik Ustası</h4>
                    <p className="text-gray-700 mb-4">
                      Elektrik tesisatı, aydınlatma sistemleri, güvenlik sistemleri ve arıza giderme hizmetleri. 
                      Ankara'nın eski binalarında elektrik tesisatı yenileme ihtiyacı yüksektir.
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      <span>Güvenlik belgeli ustalar</span>
                      <span className="mx-2">•</span>
                      <span>7/24 acil servis</span>
                      <span className="mx-2">•</span>
                      <span>Garantili işçilik</span>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Su Tesisatı Ustası</h4>
                    <p className="text-gray-700 mb-4">
                      Su kaçağı tespiti, tesisat tamiri, kanalizasyon ve ısıtma sistemleri. 
                      Ankara'nın sert su yapısı tesisat problemlerine neden olabilir.
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      <span>Modern tespit cihazları</span>
                      <span className="mx-2">•</span>
                      <span>Gizli kaçak tespiti</span>
                      <span className="mx-2">•</span>
                      <span>Kombi servisi</span>
                    </div>
                  </div>
                  <div className="border-l-4 border-yellow-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Temizlik Hizmetleri</h4>
                    <p className="text-gray-700 mb-4">
                      Ev temizliği, ofis temizliği, cam temizliği ve özel temizlik hizmetleri. 
                      Çalışan nüfusun yoğun olduğu Ankara'da temizlik hizmetleri çok aranır.
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      <span>Profesyonel ekipman</span>
                      <span className="mx-2">•</span>
                      <span>Çevre dostu ürünler</span>
                      <span className="mx-2">•</span>
                      <span>Düzenli hizmet</span>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Mobilya Ustası</h4>
                    <p className="text-gray-700 mb-4">
                      Mobilya montajı, tamiri, özel tasarım ve restorasyon hizmetleri. 
                      Yeni ev alanların mobilya montaj ihtiyacı yüksektir.
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      <span>Ahşap işçiliği</span>
                      <span className="mx-2">•</span>
                      <span>Özel tasarım</span>
                      <span className="mx-2">•</span>
                      <span>Restorasyon</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Districts */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'nın Popüler İlçelerinde Usta Hizmetleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Çankaya</h4>
                    <p className="text-gray-700 mb-4">
                      Ankara'nın merkezi ilçesi. Yüksek gelir grubu ve eski binalar nedeniyle 
                      kaliteli usta hizmetleri çok aranır.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Elektrik tesisatı yenileme</li>
                      <li>• Lüks ev temizliği</li>
                      <li>• Özel mobilya tasarımı</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Keçiören</h4>
                    <p className="text-gray-700 mb-4">
                      Yoğun nüfuslu ilçe. Uygun fiyatlı usta hizmetleri tercih edilir. 
                      Çok sayıda usta bulunur.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Su tesisatı tamiri</li>
                      <li>• Ev temizliği</li>
                      <li>• Mobilya montajı</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Yenimahalle</h4>
                    <p className="text-gray-700 mb-4">
                      Yeni yerleşim alanları. Yeni ev alanların mobilya montaj ihtiyacı yüksek. 
                      Modern usta hizmetleri aranır.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Yeni ev elektrik tesisatı</li>
                      <li>• Mobilya montajı</li>
                      <li>• İlk temizlik hizmeti</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Mamak</h4>
                    <p className="text-gray-700 mb-4">
                      Orta gelir grubu ilçe. Uygun fiyatlı ve kaliteli usta hizmetleri aranır. 
                      Çeşitli usta seçenekleri mevcut.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Genel tamirat işleri</li>
                      <li>• Düzenli temizlik</li>
                      <li>• Küçük onarım işleri</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'da Usta Seçerken Dikkat Edilmesi Gerekenler
                </h3>
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Belge Kontrolü:</strong> Ustanın gerekli belgelere sahip olduğunu kontrol edin. Ankara'da belge kontrolü sıkı yapılır.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Referans Araştırması:</strong> Önceki müşterilerin yorumlarını okuyun. Ankara'da sosyal medya üzerinden referans araştırması yapılabilir.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Sigorta Durumu:</strong> Ustanın iş kazalarına karşı sigortalı olduğunu kontrol edin. Ankara'da bu konu önemlidir.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Fiyat Karşılaştırması:</strong> En ucuz değil, en uygun fiyatlı hizmeti seçin. Ankara'da fiyat farkları bölgelere göre değişir.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Yazılı Sözleşme:</strong> İş detaylarını ve fiyatları yazılı olarak alın. Bu Ankara'da yasal bir zorunluluktur.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Yerel Bilgi:</strong> Ankara'nın iklim koşullarını ve yapı özelliklerini bilen ustalar tercih edin.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Emergency Services */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'da Acil Usta Hizmetleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Elektrik Arızaları</h4>
                    <p className="text-gray-700 mb-4">
                      Elektrik kesintileri, priz arızaları, sigorta problemleri gibi acil durumlar 
                      için 7/24 hizmet veren ustalar.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Ortalama Müdahale Süresi:</strong> 30-60 dakika
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Su Tesisatı Acilleri</h4>
                    <p className="text-gray-700 mb-4">
                      Su kaçağı, tıkanıklık, kombi arızaları gibi acil durumlar için 
                      hızlı müdahale eden ustalar.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Ortalama Müdahale Süresi:</strong> 1-2 saat
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Temizlik Acilleri</h4>
                    <p className="text-gray-700 mb-4">
                      Su baskını sonrası temizlik, yangın sonrası temizlik gibi acil durumlar 
                      için profesyonel temizlik hizmetleri.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Ortalama Müdahale Süresi:</strong> 2-4 saat
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Mobilya Acilleri</h4>
                    <p className="text-gray-700 mb-4">
                      Mobilya çökmesi, kapı kilitlenmesi gibi acil durumlar için 
                      hızlı müdahale eden mobilya ustaları.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Ortalama Müdahale Süresi:</strong> 2-3 saat
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-blue-600 text-white p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ankara'da Güvenilir Usta Arıyor musunuz?
                </h3>
                <p className="text-blue-100 mb-6">
                  Ankara'nın en iyi ustalarıyla tanışın. Güvenli, kaliteli ve uygun fiyatlı 
                  hizmetler için hemen iletişime geçin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/ustalar"
                    className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Ustaları Gör
                  </Link>
                  <Link
                    to="/kategoriler"
                    className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Kategoriler
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

export default BlogAnkaraGenel; 