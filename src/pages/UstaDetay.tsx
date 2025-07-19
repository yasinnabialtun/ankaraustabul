import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, MessageCircle, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';
import { ustalar } from '../data';
import { useSEO } from '../hooks/useSEO';
import Breadcrumb from '../components/Breadcrumb';

function UstaDetay() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'services'>('about');
  
  const usta = ustalar.find(u => u.id === id);

  // SEO hook'u kullan
  useSEO({
    title: usta ? `${usta.name} - ${usta.category} Ustası | Ankara Usta Bul` : 'Usta Bulunamadı',
    description: usta ? `${usta.name} - ${usta.category} ustası. ${usta.experience} yıl deneyim, ${usta.rating}/5 puan. ${usta.location} bölgesinde hizmet veriyor.` : 'Aradığınız usta bulunamadı.',
    keywords: usta ? `${usta.name}, ${usta.category} ustası, ${usta.location}, ankara usta, güvenilir usta` : 'usta bulunamadı',
    type: 'website'
  });

  if (!usta) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Usta Bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız usta mevcut değil.</p>
          <Link
            to="/ustalar"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tüm Ustaları Gör
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Ustalar', path: '/ustalar' },
    { label: usta.category, path: `/kategori/${usta.category.toLowerCase().replace(' ', '-')}` },
    { label: usta.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link
              to="/ustalar"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Usta Bilgileri */}
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img
                    src={usta.image}
                    alt={usta.name}
                    className="w-32 h-32 rounded-2xl object-cover shadow-lg"
                  />
                  {usta.verified && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h1 className="text-3xl font-bold text-gray-800 mr-4">{usta.name}</h1>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {usta.category}
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-6">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold text-gray-800">{usta.rating}/5</span>
                      <span className="text-gray-500 ml-1">({usta.reviews} değerlendirme)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{usta.experience} yıl deneyim</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{usta.location}</span>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {usta.description}
                  </p>
                  
                  {usta.specialties && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-800 mb-2">Uzmanlık Alanları:</h3>
                      <div className="flex flex-wrap gap-2">
                        {usta.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* İletişim ve Fiyat */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{usta.hourlyRate} ₺</div>
                  <div className="text-gray-600">Saatlik Ücret</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Müsaitlik:</span>
                    <span className="font-semibold text-gray-800">{usta.availability}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Doğrulama:</span>
                    <span className="font-semibold text-green-600">Doğrulanmış</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Yanıt Süresi:</span>
                    <span className="font-semibold text-gray-800">2 saat içinde</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {usta.phone}
                  </button>
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Mesaj Gönder
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors font-semibold flex items-center justify-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Randevu Al
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'about'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Hakkında
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'services'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Hizmetler
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Değerlendirmeler
              </button>
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'about' && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Hakkında</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {usta.name}, {usta.experience} yıllık deneyimi ile {usta.category} alanında uzmanlaşmış bir ustadır. 
                  {usta.location} bölgesinde hizmet vermekte olup, müşteri memnuniyetini ön planda tutarak kaliteli hizmet sunmaktadır.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Deneyim</h4>
                    <p className="text-gray-600">{usta.experience} yıllık profesyonel deneyim</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Hizmet Bölgesi</h4>
                    <p className="text-gray-600">{usta.location} ve çevre ilçeler</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Müşteri Memnuniyeti</h4>
                    <p className="text-gray-600">{usta.rating}/5 ortalama puan</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Tamamlanan İş</h4>
                    <p className="text-gray-600">{Math.floor(usta.reviews * 2.5)}+ başarılı proje</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Hizmetler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {usta.specialties?.map((specialty, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-800">{specialty}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Bu alanda uzmanlaşmış olup, kaliteli ve güvenilir hizmet sunmaktadır.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Müşteri Değerlendirmeleri</h3>
                <div className="space-y-6">
                  {/* Örnek değerlendirmeler */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Ahmet Y.</h4>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">2 hafta önce</span>
                    </div>
                    <p className="text-gray-700">
                      Çok güvenilir ve kaliteli iş yaptı. Zamanında geldi ve işini profesyonelce tamamladı. 
                      Kesinlikle tavsiye ederim.
                    </p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Fatma K.</h4>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <Star className="w-4 h-4 text-gray-300" />
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">1 ay önce</span>
                    </div>
                    <p className="text-gray-700">
                      İşini zamanında ve düzgün yaptı. Fiyatı da uygundu. 
                      Tekrar ihtiyaç duyarsam kesinlikle çağırırım.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benzer Ustalar */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Benzer Ustalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ustalar
              .filter(u => u.category === usta.category && u.id !== usta.id)
              .slice(0, 3)
              .map((similarUsta) => (
                <Link
                  key={similarUsta.id}
                  to={`/usta/${similarUsta.id}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={similarUsta.image}
                      alt={similarUsta.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{similarUsta.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>{similarUsta.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {similarUsta.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-blue-600">{similarUsta.hourlyRate} ₺/saat</span>
                    <span className="text-gray-500 text-sm">{similarUsta.location}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default UstaDetay; 