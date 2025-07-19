import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, CheckCircle, Star, MapPin, Sparkles } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

function BlogTemizlik() {
  useSEO({
    title: 'Ankara Temizlik Ustası - Profesyonel Ev ve Ofis Temizlik Hizmetleri',
    description: 'Ankara\'da temizlik ustası arıyorsanız doğru yerdesiniz. Ev temizliği, ofis temizliği, cam temizliği ve derinlemesine temizlik hizmetleri için uzman temizlik ustaları.',
    keywords: 'ankara temizlik ustası, ev temizliği ankara, ofis temizliği, cam temizliği, derinlemesine temizlik',
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
              Ankara'da Profesyonel Temizlik Hizmetleri Rehberi
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Ev ve ofis temizliği, cam temizliği ve derinlemesine temizlik için uzman tavsiyeleri
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Temizlik Uzmanı</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>10 Ocak 2024</span>
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
                  Ankara'da Profesyonel Temizlik Hizmetlerinin Önemi
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Temizlik sadece görsel bir ihtiyaç değil, aynı zamanda sağlık ve konfor için 
                  de gereklidir. Ankara'nın büyük şehir yaşamında, profesyonel temizlik hizmetleri 
                  zamandan tasarruf sağlar ve yaşam kalitesini artırır. Bu yazımızda Ankara'da 
                  temizlik hizmetleri hakkında detaylı bilgi veriyoruz.
                </p>
              </div>

              {/* Service Types */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'da Sunulan Temizlik Hizmetleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <Sparkles className="w-8 h-8 text-blue-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Ev Temizliği</h4>
                    <p className="text-gray-700 mb-4">
                      Günlük, haftalık ve aylık ev temizliği hizmetleri. 
                      Detaylı temizlik ve düzenleme.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Genel temizlik</li>
                      <li>• Mutfak temizliği</li>
                      <li>• Banyo temizliği</li>
                      <li>• Yatak odası düzenleme</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Ofis Temizliği</h4>
                    <p className="text-gray-700 mb-4">
                      İşyerleri için profesyonel temizlik hizmetleri. 
                      Hijyen standartlarına uygun temizlik.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Ofis temizliği</li>
                      <li>• Mağaza temizliği</li>
                      <li>• Endüstriyel temizlik</li>
                      <li>• Depo temizliği</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <Star className="w-8 h-8 text-yellow-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Cam Temizliği</h4>
                    <p className="text-gray-700 mb-4">
                      Pencere, vitrin ve yüksek cam temizliği. 
                      Güvenlik ekipmanları ile profesyonel hizmet.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Pencere temizliği</li>
                      <li>• Vitrin temizliği</li>
                      <li>• Yüksek cam temizliği</li>
                      <li>• Balkon cam temizliği</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <MapPin className="w-8 h-8 text-purple-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Derinlemesine Temizlik</h4>
                    <p className="text-gray-700 mb-4">
                      Halı yıkama, koltuk temizliği ve özel temizlik hizmetleri. 
                      Detaylı ve kapsamlı temizlik.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Halı yıkama</li>
                      <li>• Koltuk temizliği</li>
                      <li>• Perde temizliği</li>
                      <li>• Yat temizliği</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Profesyonel Temizlik Hizmetlerinin Avantajları
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Zaman Tasarrufu</h4>
                    <p className="text-gray-700">
                      Temizlik işleri zaman alıcıdır. Profesyonel hizmet alarak bu süreyi 
                      ailenizle geçirebilir veya işinize odaklanabilirsiniz.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Sağlık ve Hijyen</h4>
                    <p className="text-gray-700">
                      Profesyonel temizlik hizmetleri alerji ve hastalık riskini azaltır. 
                      Özellikle çocuklu aileler için önemlidir.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Kaliteli Malzeme</h4>
                    <p className="text-gray-700">
                      Uzman temizlik ustaları profesyonel malzemeler kullanır. 
                      Bu malzemeler hem etkili hem de güvenlidir.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Düzenli Hizmet</h4>
                    <p className="text-gray-700">
                      Düzenli temizlik hizmeti alarak eviniz her zaman temiz ve düzenli kalır. 
                      Misafirleriniz için hazır bir ortam sağlar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Temizlik Ustası Seçerken Dikkat Edilmesi Gerekenler
                </h3>
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Referans Kontrolü:</strong> Önceki müşterilerin yorumlarını okuyun ve referans isteyin.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Sigorta Durumu:</strong> Temizlik ustasının iş kazalarına karşı sigortalı olduğunu kontrol edin.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Malzeme Kalitesi:</strong> Kullanılan temizlik malzemelerinin kalitesini sorgulayın.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Fiyat Şeffaflığı:</strong> Fiyatlandırmanın şeffaf olduğundan emin olun.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Hizmet Kapsamı:</strong> Hangi işlerin dahil olduğunu net olarak belirleyin.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Cleaning Tips */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'da Ev Temizliği İpuçları
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Mutfak Temizliği</h4>
                    <p className="text-gray-700 mb-4">
                      Mutfak en çok kullanılan alandır. Düzenli temizlik hijyen için kritiktir.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Tezgah temizliği</li>
                      <li>• Bulaşık makinesi bakımı</li>
                      <li>• Ocak temizliği</li>
                      <li>• Buzdolabı temizliği</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Banyo Temizliği</h4>
                    <p className="text-gray-700 mb-4">
                      Banyo nemli ortam olduğu için küf ve bakteri oluşumuna dikkat edilmelidir.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Duşakabin temizliği</li>
                      <li>• Klozet temizliği</li>
                      <li>• Lavabo temizliği</li>
                      <li>• Havluluk temizliği</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Yatak Odası Temizliği</h4>
                    <p className="text-gray-700 mb-4">
                      Dinlenme alanı olduğu için alerji ve toz kontrolü önemlidir.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Nevresim değişimi</li>
                      <li>• Toz alma</li>
                      <li>• Yer temizliği</li>
                      <li>• Havalandırma</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Salon Temizliği</h4>
                    <p className="text-gray-700 mb-4">
                      Misafir ağırlama alanı olduğu için görsel temizlik önemlidir.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Koltuk temizliği</li>
                      <li>• TV ünitesi temizliği</li>
                      <li>• Dekorasyon temizliği</li>
                      <li>• Halı temizliği</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Frequency */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Temizlik Sıklığı Önerileri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Günlük Temizlik</h4>
                    <p className="text-gray-700 mb-4">
                      Mutfak tezgahı, banyo lavabosu, yatak düzenleme
                    </p>
                    <span className="text-sm text-blue-600 font-medium">15-30 dk</span>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Haftalık Temizlik</h4>
                    <p className="text-gray-700 mb-4">
                      Yer temizliği, toz alma, çamaşır yıkama
                    </p>
                    <span className="text-sm text-green-600 font-medium">2-3 saat</span>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Aylık Temizlik</h4>
                    <p className="text-gray-700 mb-4">
                      Derinlemesine temizlik, cam temizliği, halı yıkama
                    </p>
                    <span className="text-sm text-yellow-600 font-medium">4-6 saat</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-blue-600 text-white p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ankara'da Güvenilir Temizlik Ustası Arıyor musunuz?
                </h3>
                <p className="text-blue-100 mb-6">
                  Uzman temizlik ustalarımızla tanışın. Ev temizliği, ofis temizliği ve 
                  özel temizlik hizmetleri için kaliteli ve güvenilir hizmet.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/ustalar"
                    className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Temizlik Ustalarını Gör
                  </Link>
                  <Link
                    to="/kategori/3"
                    className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Temizlik Kategorisi
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

export default BlogTemizlik; 