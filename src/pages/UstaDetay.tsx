import { useParams } from 'react-router-dom';
import { MapPin, Star, Clock, Phone, Mail, MessageCircle } from 'lucide-react';

function UstaDetay() {
  const { id } = useParams<{ id: string }>();
  
  // id parametresini kullan (şimdilik mock data kullanıyoruz)
  console.log('Usta ID:', id);

  // Mock data - gerçek uygulamada API'den gelecek
  const usta = {
    id: '1',
    name: 'Ahmet Yılmaz',
    category: 'Elektrik',
    location: 'Çankaya, Ankara',
    rating: 4.8,
    experience: '8 yıl',
    hourlyRate: '150 TL',
    phone: '+90 555 123 45 67',
    email: 'ahmet.yilmaz@email.com',
    description: 'Elektrik tesisatı, aydınlatma, priz montajı ve tüm elektrik işlerinde 8 yıllık deneyime sahibim. Güvenilir, kaliteli ve zamanında hizmet sunuyorum.',
    specialties: ['Elektrik Tesisatı', 'Aydınlatma', 'Priz Montajı', 'Elektrik Arıza', 'Güvenlik Sistemleri'],
    services: [
      'Elektrik tesisatı kurulumu',
      'Aydınlatma sistemleri',
      'Priz ve anahtar montajı',
      'Elektrik arıza giderme',
      'Güvenlik sistemleri kurulumu',
      'Enerji tasarruflu sistemler'
    ],
    reviews: [
      {
        id: '1',
        name: 'Mehmet K.',
        rating: 5,
        comment: 'Çok profesyonel ve güvenilir bir usta. İşini zamanında ve kaliteli yaptı.',
        date: '2025-01-10'
      },
      {
        id: '2',
        name: 'Ayşe M.',
        rating: 4,
        comment: 'Elektrik arızasını hızlıca çözdü. Fiyatı da makul.',
        date: '2025-01-08'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Usta Profile */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-semibold text-xl">
                {usta.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{usta.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{usta.category} Ustası</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{usta.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-600">{usta.rating} ({usta.experience} deneyim)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Saatlik: {usta.hourlyRate}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>Ara</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>Mesaj Gönder</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Hakkında</h2>
              <p className="text-gray-600 leading-relaxed">{usta.description}</p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Hizmetler</h2>
              <ul className="space-y-2">
                {usta.services.map((service, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-600">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Değerlendirmeler</h2>
              <div className="space-y-4">
                {usta.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{review.name}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">İletişim Bilgileri</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{usta.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{usta.email}</span>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Uzmanlık Alanları</h3>
              <div className="flex flex-wrap gap-2">
                {usta.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İletişim</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Hemen Ara
                </button>
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  WhatsApp
                </button>
                <button className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                  Mesaj Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UstaDetay; 