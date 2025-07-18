import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Clock, ArrowLeft, MessageCircle, Calendar } from 'lucide-react';
import { ustalar } from '../data';

function UstaDetay() {
  const { id } = useParams();
  const usta = ustalar.find(u => u.id === id);

  if (!usta) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Usta bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız usta sistemde kayıtlı değil.</p>
          <Link
            to="/ustalar"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Tüm Ustaları Gör
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/ustalar" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Ustalar Listesine Dön
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="h-80 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
            <div className="text-8xl text-blue-600">👷</div>
            <div className="absolute top-6 right-6 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-lg font-semibold flex items-center">
              <Star className="w-4 h-4 mr-2 fill-current" />
              {usta.rating} Puan
            </div>
            <div className="absolute bottom-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-semibold">
              {usta.category}
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">{usta.name}</h1>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">{usta.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <Star className="w-6 h-6 text-yellow-400 fill-current mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800">{usta.rating} Puan</p>
                      <p className="text-sm text-gray-600">Müşteri değerlendirmesi</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <Clock className="w-6 h-6 text-blue-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800">{usta.experience} Yıl</p>
                      <p className="text-sm text-gray-600">Deneyim</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <MapPin className="w-6 h-6 text-green-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800">{usta.location}</p>
                      <p className="text-sm text-gray-600">Hizmet bölgesi</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <Phone className="w-6 h-6 text-red-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800">{usta.phone}</p>
                      <p className="text-sm text-gray-600">İletişim</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">Hizmet Alanları</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {usta.category} alanında uzmanlaşmış olan {usta.name}, {usta.experience} yıllık deneyimi ile 
                    kaliteli hizmet sunmaktadır. Müşteri memnuniyeti odaklı çalışma prensibi ile 
                    her projede en iyi sonucu hedeflemektedir.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={`tel:${usta.phone}`}
                      className="flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors font-semibold text-lg"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Hemen Ara
                    </a>
                    <button className="flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Mesaj Gönder
                    </button>
                    <button className="flex items-center justify-center border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-colors font-semibold text-lg">
                      <Calendar className="w-5 h-5 mr-2" />
                      Randevu Al
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Hızlı İletişim</h3>
                  
                  <div className="space-y-4 mb-6">
                    <a
                      href={`tel:${usta.phone}`}
                      className="flex items-center justify-center w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Hemen Ara
                    </a>
                    <button className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp
                    </button>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Çalışma Saatleri</h4>
                    <p className="text-gray-600 text-sm">Pazartesi - Cumartesi: 08:00 - 18:00</p>
                    <p className="text-gray-600 text-sm">Pazar: 09:00 - 16:00</p>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Hizmet Bölgesi</h4>
                    <p className="text-gray-600 text-sm">{usta.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UstaDetay; 