import { useParams, Link } from 'react-router-dom';
import { ustalar } from '../data';
import { Star, MapPin, Phone, Clock, Award } from 'lucide-react';

function UstaDetay() {
  const { id } = useParams();
  const usta = ustalar.find(u => u.id === id);

  if (!usta) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Usta bulunamadı</h1>
        <Link to="/ustalar" className="text-blue-600 hover:underline">
          Ustalar listesine dön
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/ustalar" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Ustalar listesine dön
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600">
            {usta.name.charAt(0)}
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold mb-2">{usta.name}</h1>
            <p className="text-xl text-gray-600 mb-2">{usta.category}</p>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-lg font-semibold">{usta.rating}</span>
              <span className="ml-2 text-gray-500">({usta.experience} yıl deneyim)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">İletişim Bilgileri</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-gray-600" />
                <span className="text-lg">{usta.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-gray-600" />
                <span className="text-lg">{usta.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-gray-600" />
                <span className="text-lg">{usta.experience} yıl deneyim</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-3 text-gray-600" />
                <span className="text-lg">{usta.rating} puan</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Hakkında</h2>
            <p className="text-gray-700 leading-relaxed">{usta.description}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Hizmetler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Ana Hizmet</h3>
              <p className="text-gray-600">{usta.category} işleri</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Deneyim</h3>
              <p className="text-gray-600">{usta.experience} yıl aktif çalışma</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex-1">
            Hemen Ara
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex-1">
            Mesaj Gönder
          </button>
        </div>
      </div>
    </div>
  );
}

export default UstaDetay; 