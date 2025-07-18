import { useParams } from 'react-router-dom';
import { Star, MapPin, Phone, Clock } from 'lucide-react';
import { ustalar } from '../data';

function UstaDetay() {
  const { id } = useParams();
  const usta = ustalar.find(u => u.id === id);

  if (!usta) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center">Usta bulunamadı</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <div className="text-8xl text-gray-400">👷</div>
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{usta.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{usta.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                <span className="text-lg">{usta.rating} Puan</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-lg">{usta.experience} Yıl Deneyim</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-lg">{usta.location}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-lg">{usta.phone}</span>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Hizmet Alanları</h3>
              <p className="text-gray-600 mb-4">{usta.category} alanında uzmanlaşmış olan {usta.name}, {usta.experience} yıllık deneyimi ile kaliteli hizmet sunmaktadır.</p>
              
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Hemen Ara
                </button>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
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