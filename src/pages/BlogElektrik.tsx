import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, CheckCircle, Star, MapPin, Phone } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

function BlogElektrik() {
  useSEO({
    title: 'Ankara Elektrik Ustası - Güvenilir Elektrik Tesisatı ve Arıza Giderme Hizmetleri',
    description: 'Ankara\'da elektrik ustası arıyorsanız doğru yerdesiniz. Elektrik tesisatı, arıza giderme, aydınlatma sistemleri ve güvenlik sistemleri için uzman elektrik ustaları.',
    keywords: 'ankara elektrik ustası, elektrik tesisatı ankara, elektrik arıza giderme, aydınlatma sistemleri, güvenlik sistemleri ankara',
    type: 'article'
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
              Ankara'da Elektrik Ustası Bulmanın Püf Noktaları
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Güvenilir elektrik tesisatı ve arıza giderme hizmetleri için uzman tavsiyeleri
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Elektrik Uzmanı</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>15 Ocak 2024</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>8 dk okuma</span>
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
                  Ankara'da Elektrik Ustası Seçerken Dikkat Edilmesi Gerekenler
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Ankara'da elektrik ustası ararken, sadece fiyat değil, güvenlik ve kalite de önemlidir. 
                  Yanlış elektrik tesisatı yangın riski oluşturabilir ve can güvenliğinizi tehlikeye atabilir. 
                  Bu yazımızda Ankara'da güvenilir elektrik ustası bulmanın püf noktalarını paylaşıyoruz.
                </p>
              </div>

              {/* Why Choose Professional */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Neden Profesyonel Elektrik Ustası Tercih Etmelisiniz?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-blue-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Güvenlik Garantisi</h4>
                    <p className="text-gray-700">
                      Profesyonel elektrik ustaları güvenlik standartlarına uygun çalışır ve 
                      yangın riskini minimize eder.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <Star className="w-8 h-8 text-green-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Kaliteli İşçilik</h4>
                    <p className="text-gray-700">
                      Uzman ustalar kaliteli malzeme kullanır ve uzun ömürlü tesisat yapar.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <Phone className="w-8 h-8 text-yellow-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">7/24 Hizmet</h4>
                    <p className="text-gray-700">
                      Acil elektrik arızalarında hızlı müdahale edebilirler.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <MapPin className="w-8 h-8 text-purple-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Yerel Bilgi</h4>
                    <p className="text-gray-700">
                      Ankara'nın elektrik altyapısını bilen ustalar daha doğru çözümler sunar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'da Elektrik Ustalarının Sunduğu Hizmetler
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Elektrik Tesisatı Kurulumu</h4>
                    <p className="text-gray-700">
                      Yeni binalar için elektrik tesisatı kurulumu, eski tesisatların yenilenmesi 
                      ve güvenlik standartlarına uygun elektrik sistemleri.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Arıza Giderme</h4>
                    <p className="text-gray-700">
                      Elektrik kesintileri, priz arızaları, sigorta problemleri ve diğer 
                      elektrik sorunlarının hızlı çözümü.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Aydınlatma Sistemleri</h4>
                    <p className="text-gray-700">
                      LED aydınlatma sistemleri, dekoratif aydınlatma, enerji tasarruflu 
                      aydınlatma çözümleri.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Güvenlik Sistemleri</h4>
                    <p className="text-gray-700">
                      Kamera sistemleri, alarm sistemleri, interkom sistemleri ve 
                      diğer güvenlik ekipmanlarının kurulumu.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Elektrik Ustası Seçerken Kontrol Edilmesi Gerekenler
                </h3>
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Belge Kontrolü:</strong> Elektrik ustasının gerekli belgelere sahip olduğunu kontrol edin.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Referans Araştırması:</strong> Önceki müşterilerin yorumlarını okuyun ve referans isteyin.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Sigorta Durumu:</strong> Ustanın iş kazalarına karşı sigortalı olduğunu kontrol edin.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Fiyat Karşılaştırması:</strong> En ucuz değil, en uygun fiyatlı hizmeti seçin.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Yazılı Sözleşme:</strong> İş detaylarını ve fiyatları yazılı olarak alın.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Common Problems */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'da Sık Karşılaşılan Elektrik Problemleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Elektrik Kesintileri</h4>
                    <p className="text-gray-700 mb-4">
                      Sık sık yaşanan elektrik kesintileri genellikle eski tesisat veya 
                      aşırı yüklenme nedeniyle oluşur.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Çözüm:</strong> Profesyonel elektrik ustası ile tesisat kontrolü yapılmalı.
                    </p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Priz Arızaları</h4>
                    <p className="text-gray-700 mb-4">
                      Prizlerin ısınması, kıvılcım çıkarması veya çalışmaması 
                      güvenlik riski oluşturur.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Çözüm:</strong> Hemen elektrik ustası çağrılmalı ve priz değişimi yapılmalı.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Sigorta Atması</h4>
                    <p className="text-gray-700 mb-4">
                      Sürekli sigorta atması, elektrik sisteminde problem olduğunu gösterir.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Çözüm:</strong> Elektrik tesisatının detaylı kontrolü gerekli.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Aydınlatma Sorunları</h4>
                    <p className="text-gray-700 mb-4">
                      Lambaların titremesi, sönmesi veya yanmaması elektrik problemidir.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Çözüm:</strong> Aydınlatma sisteminin kontrolü ve gerekirse yenilenmesi.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-blue-600 text-white p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ankara'da Güvenilir Elektrik Ustası Arıyor musunuz?
                </h3>
                <p className="text-blue-100 mb-6">
                  Uzman elektrik ustalarımızla tanışın. Güvenli, kaliteli ve uygun fiyatlı 
                  elektrik hizmetleri için hemen iletişime geçin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/ustalar"
                    className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Elektrik Ustalarını Gör
                  </Link>
                  <Link
                    to="/kategori/1"
                    className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Elektrik Kategorisi
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

export default BlogElektrik; 