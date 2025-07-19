import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, CheckCircle, Star, MapPin, Hammer } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

function BlogMobilya() {
  useSEO({
    title: 'Ankara Mobilya Ustası - Mobilya Montajı, Tamiri ve Özel Tasarım Hizmetleri',
    description: 'Ankara\'da mobilya ustası arıyorsanız doğru yerdesiniz. Mobilya montajı, tamiri, özel tasarım ve mobilya bakımı için uzman mobilya ustaları.',
    keywords: 'ankara mobilya ustası, mobilya montajı ankara, mobilya tamiri, özel mobilya tasarımı, mobilya bakımı',
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
              Ankara'da Mobilya Montajı ve Tamiri Rehberi
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Mobilya montajı, tamiri ve özel tasarım hizmetleri için uzman tavsiyeleri
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Mobilya Uzmanı</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>8 Ocak 2024</span>
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
                  Ankara'da Mobilya Hizmetleri ve Profesyonel Çözümler
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Mobilya montajı ve tamiri hassasiyet gerektiren işlerdir. Yanlış montaj 
                  mobilyanın ömrünü kısaltır ve güvenlik riskleri oluşturabilir. Ankara'da 
                  mobilya hizmetleri hakkında detaylı bilgi ve uzman tavsiyeleri sunuyoruz.
                </p>
              </div>

              {/* Service Types */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'da Mobilya Ustalarının Sunduğu Hizmetler
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <Hammer className="w-8 h-8 text-blue-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Mobilya Montajı</h4>
                    <p className="text-gray-700 mb-4">
                      Yeni mobilyaların profesyonel montajı. 
                      Güvenli ve kaliteli montaj hizmeti.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Mutfak mobilyası montajı</li>
                      <li>• Yatak odası mobilyası</li>
                      <li>• Salon mobilyası montajı</li>
                      <li>• Ofis mobilyası montajı</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Mobilya Tamiri</h4>
                    <p className="text-gray-700 mb-4">
                      Hasar görmüş mobilyaların onarımı. 
                      Profesyonel tamir ve bakım hizmeti.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Kapı tamiri</li>
                      <li>• Çekmece tamiri</li>
                      <li>• Ayak değişimi</li>
                      <li>• Cila yenileme</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <Star className="w-8 h-8 text-yellow-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Özel Tasarım</h4>
                    <p className="text-gray-700 mb-4">
                      Kişiye özel mobilya tasarımı ve üretimi. 
                      Hayalinizdeki mobilyayı gerçeğe dönüştürme.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Özel mutfak tasarımı</li>
                      <li>• Gardrop tasarımı</li>
                      <li>• Özel mobilya üretimi</li>
                      <li>• Dekorasyon projeleri</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <MapPin className="w-8 h-8 text-purple-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Mobilya Bakımı</h4>
                    <p className="text-gray-700 mb-4">
                      Mobilyaların düzenli bakımı ve korunması. 
                      Uzun ömürlü mobilya kullanımı için gerekli.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Cila bakımı</li>
                      <li>• Temizlik ve koruma</li>
                      <li>• Nem kontrolü</li>
                      <li>• Periyodik bakım</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Common Problems */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'da Sık Karşılaşılan Mobilya Problemleri
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Montaj Hataları</h4>
                    <p className="text-gray-700">
                      Yanlış montaj mobilyanın dengesini bozar ve güvenlik riski oluşturur. 
                      Özellikle yüksek mobilyalarda dikkatli montaj gerekir.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Nem ve Çürüme</h4>
                    <p className="text-gray-700">
                      Ankara'nın iklim koşulları mobilyalarda nem ve çürüme problemlerine neden olabilir. 
                      Düzenli bakım ve nem kontrolü önemlidir.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Cila Bozulması</h4>
                    <p className="text-gray-700">
                      Zamanla mobilya cilası bozulur ve görünümü etkiler. 
                      Profesyonel cila yenileme hizmeti gerekir.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Mekanik Arızalar</h4>
                    <p className="text-gray-700">
                      Çekmeceler, kapılar ve menteşeler zamanla bozulabilir. 
                      Düzenli kontrol ve bakım ile önlenebilir.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Mobilya Ustası Seçerken Dikkat Edilmesi Gerekenler
                </h3>
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Deneyim Kontrolü:</strong> Ustanın mobilya alanında deneyimini sorgulayın.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Referans Araştırması:</strong> Önceki işlerini inceleyin ve müşteri yorumlarını okuyun.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Malzeme Kalitesi:</strong> Kullanılan malzemelerin kalitesini kontrol edin.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Güvenlik Önlemleri:</strong> Montaj sırasında güvenlik önlemlerini alıp almadığını kontrol edin.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Garanti Durumu:</strong> İş sonrası garanti verip vermediğini öğrenin.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Furniture Types */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Ankara'da Popüler Mobilya Türleri ve Özellikleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Mutfak Mobilyası</h4>
                    <p className="text-gray-700 mb-4">
                      Mutfak mobilyaları en çok kullanılan mobilya türüdür. 
                      Nem ve ısıya dayanıklı malzeme seçimi önemlidir.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Tezgah montajı</li>
                      <li>• Dolap montajı</li>
                      <li>• Çekmece sistemleri</li>
                      <li>• Aksesuar montajı</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Yatak Odası Mobilyası</h4>
                    <p className="text-gray-700 mb-4">
                      Dinlenme alanı olduğu için konfor ve estetik önemlidir. 
                      Ergonomik tasarım tercih edilmelidir.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Gardrop montajı</li>
                      <li>• Yatak montajı</li>
                      <li>• Komodin montajı</li>
                      <li>• Şifonyer montajı</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Salon Mobilyası</h4>
                    <p className="text-gray-700 mb-4">
                      Misafir ağırlama alanı olduğu için görsel estetik önemlidir. 
                      Dayanıklı ve şık mobilyalar tercih edilir.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Koltuk takımları</li>
                      <li>• TV ünitesi</li>
                      <li>• Vitrin dolabı</li>
                      <li>• Sehpa takımları</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Ofis Mobilyası</h4>
                    <p className="text-gray-700 mb-4">
                      Çalışma alanı olduğu için ergonomik tasarım kritiktir. 
                      Verimlilik odaklı mobilya seçimi yapılmalıdır.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Masa takımları</li>
                      <li>• Ofis koltuğu</li>
                      <li>• Dosya dolabı</li>
                      <li>• Toplantı masası</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Maintenance Tips */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Mobilya Bakımı ve Koruma İpuçları
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Düzenli Temizlik</h4>
                    <p className="text-gray-700 mb-4">
                      Mobilyaları düzenli olarak temizleyin ve tozunu alın
                    </p>
                    <span className="text-sm text-blue-600 font-medium">Haftalık</span>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Nem Kontrolü</h4>
                    <p className="text-gray-700 mb-4">
                      Mobilyaları nemli ortamlardan uzak tutun
                    </p>
                    <span className="text-sm text-green-600 font-medium">Sürekli</span>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Cila Bakımı</h4>
                    <p className="text-gray-700 mb-4">
                      Ahşap mobilyaların cilasını düzenli olarak yenileyin
                    </p>
                    <span className="text-sm text-yellow-600 font-medium">Yıllık</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-blue-600 text-white p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ankara'da Güvenilir Mobilya Ustası Arıyor musunuz?
                </h3>
                <p className="text-blue-100 mb-6">
                  Uzman mobilya ustalarımızla tanışın. Mobilya montajı, tamiri ve özel tasarım 
                  hizmetleri için kaliteli ve güvenilir çözümler.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/ustalar"
                    className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Mobilya Ustalarını Gör
                  </Link>
                  <Link
                    to="/kategori/4"
                    className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Mobilya Kategorisi
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

export default BlogMobilya; 