import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, CheckCircle, Star, MapPin, Droplets } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

function BlogSuTesisati() {
  useSEO({
    title: 'Ankara Su Tesisatı Ustası - Su Kaçağı Tespiti ve Tesisat Tamiri Hizmetleri',
    description: 'Ankara\'da su tesisatı ustası arıyorsanız doğru yerdesiniz. Su kaçağı tespiti, tesisat tamiri, kanalizasyon ve ısıtma sistemleri için uzman su tesisatı ustaları.',
    keywords: 'ankara su tesisatı ustası, su kaçağı tespiti ankara, tesisat tamiri, kanalizasyon ankara, ısıtma sistemleri',
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
              Ankara'da Su Tesisatı Problemleri ve Çözüm Yöntemleri
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Su kaçağı tespiti, tesisat tamiri ve kanalizasyon sorunları için uzman rehberi
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Tesisat Uzmanı</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>12 Ocak 2024</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>10 dk okuma</span>
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
                  Ankara'da Su Tesisatı Sorunları ve Profesyonel Çözümler
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Su tesisatı problemleri hem maddi hem de yapısal zararlara neden olabilir. 
                  Ankara'nın iklim koşulları ve su kalitesi, tesisat sorunlarının sık yaşanmasına neden olur. 
                  Bu yazımızda Ankara'da su tesisatı problemleri ve çözüm yöntemlerini detaylı olarak inceliyoruz.
                </p>
              </div>

              {/* Common Problems */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'da En Sık Karşılaşılan Su Tesisatı Problemleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <Droplets className="w-8 h-8 text-blue-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Su Kaçağı</h4>
                    <p className="text-gray-700 mb-4">
                      Gizli su kaçakları duvarlarda nem, küf ve yapısal hasarlara neden olur.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Belirtiler:</strong> Nemli duvarlar, küf oluşumu, yüksek su faturası
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Tıkanıklık</h4>
                    <p className="text-gray-700 mb-4">
                      Lavabo, banyo ve tuvalet tıkanıklıkları günlük yaşamı olumsuz etkiler.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Çözüm:</strong> Profesyonel tıkanıklık açma hizmeti
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <Star className="w-8 h-8 text-yellow-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Kombi Sorunları</h4>
                    <p className="text-gray-700 mb-4">
                      Isıtma sistemlerindeki problemler konforu etkiler ve enerji kaybına neden olur.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Çözüm:</strong> Kombi servisi ve bakım hizmeti
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <MapPin className="w-8 h-8 text-purple-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Kanalizasyon</h4>
                    <p className="text-gray-700 mb-4">
                      Ana kanalizasyon hattı problemleri ciddi sağlık riskleri oluşturur.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Çözüm:</strong> Kanalizasyon hattı temizleme ve onarım
                    </p>
                  </div>
                </div>
              </div>

              {/* Detection Methods */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Su Kaçağı Tespiti Yöntemleri
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Görsel Kontrol</h4>
                    <p className="text-gray-700">
                      Duvarlarda nem, küf, boya kabarması gibi görsel belirtiler su kaçağının 
                      en yaygın göstergeleridir. Bu belirtileri fark ettiğinizde hemen uzman 
                      çağırmanız önemlidir.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Su Sayacı Kontrolü</h4>
                    <p className="text-gray-700">
                      Tüm su musluklarını kapatıp su sayacının dönüp dönmediğini kontrol edin. 
                      Sayaç dönüyorsa gizli bir su kaçağı var demektir.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Profesyonel Cihazlar</h4>
                    <p className="text-gray-700">
                      Termal kameralar, nem ölçerler ve akustik cihazlar ile gizli su kaçakları 
                      tespit edilebilir. Bu yöntemler %100 doğruluk sağlar.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Basınç Testi</h4>
                    <p className="text-gray-700">
                      Su tesisatına basınç uygulanarak kaçak noktaları tespit edilir. 
                      Bu yöntem özellikle yeni tesisatlarda etkilidir.
                    </p>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'da Su Tesisatı Ustalarının Sunduğu Hizmetler
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Su Kaçağı Tespiti</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Termal kamera ile tespit</li>
                      <li>• Akustik cihaz kullanımı</li>
                      <li>• Nem ölçümü</li>
                      <li>• Detaylı rapor hazırlama</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Tesisat Tamiri</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Boru değişimi</li>
                      <li>• Bağlantı noktası tamiri</li>
                      <li>• Vana değişimi</li>
                      <li>• Tesisat yenileme</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Tıkanıklık Açma</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Lavabo tıkanıklığı</li>
                      <li>• Banyo tıkanıklığı</li>
                      <li>• Tuvalet tıkanıklığı</li>
                      <li>• Ana kanalizasyon</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Isıtma Sistemleri</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Kombi servisi</li>
                      <li>• Kalorifer tesisatı</li>
                      <li>• Radyatör tamiri</li>
                      <li>• Sistem bakımı</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Prevention Tips */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Su Tesisatı Problemlerini Önleme Yöntemleri
                </h3>
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Düzenli Kontrol:</strong> Yılda en az bir kez su tesisatı kontrolü yaptırın.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Kaliteli Malzeme:</strong> Tesisat malzemelerinde kaliteyi öncelik edinin.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Su Basıncı:</strong> Su basıncının normal seviyede olduğundan emin olun.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Kış Önlemleri:</strong> Kış aylarında donma riskine karşı önlem alın.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Profesyonel Hizmet:</strong> Tesisat işlerini mutlaka uzman ustalara yaptırın.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Emergency Situations */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Acil Durumlar ve Yapılması Gerekenler
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Su Patlaması</h4>
                    <p className="text-gray-700 mb-4">
                      Ana su vanasını hemen kapatın ve elektrik şalterini indirin. 
                      Hemen profesyonel çağırın.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Öncelik:</strong> Güvenlik ve hasar kontrolü
                    </p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Kanalizasyon Taşması</h4>
                    <p className="text-gray-700 mb-4">
                      Sağlık riski oluşturur. Temas etmeyin ve hemen uzman çağırın.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Öncelik:</strong> Hızlı müdahale ve temizlik
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Kombi Arızası</h4>
                    <p className="text-gray-700 mb-4">
                      Kombiyi kapatın ve gaz vanasını kontrol edin. 
                      Güvenlik için uzman bekleyin.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Öncelik:</strong> Güvenlik ve ısınma ihtiyacı
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Gizli Su Kaçağı</h4>
                    <p className="text-gray-700 mb-4">
                      Nem ve küf belirtileri varsa hemen tespit yaptırın. 
                      Zaman kaybetmeyin.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Öncelik:</strong> Erken tespit ve onarım
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-blue-600 text-white p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ankara'da Güvenilir Su Tesisatı Ustası Arıyor musunuz?
                </h3>
                <p className="text-blue-100 mb-6">
                  Uzman su tesisatı ustalarımızla tanışın. Su kaçağı tespiti, tesisat tamiri 
                  ve kanalizasyon sorunları için hızlı ve kaliteli hizmet.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/ustalar"
                    className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Su Tesisatı Ustalarını Gör
                  </Link>
                  <Link
                    to="/kategori/2"
                    className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Su Tesisatı Kategorisi
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

export default BlogSuTesisati; 