import { useParams, Link } from 'react-router-dom';
import { kategoriler } from '../data';
import { Star, MapPin, Phone } from 'lucide-react';

function KategoriDetay() {
  const { kategori } = useParams();
  const kategoriData = kategoriler.find(k => k.id === kategori);

  if (!kategoriData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Kategori bulunamadı</h1>
        <Link to="/kategoriler" className="text-blue-600 hover:underline">
          Kategorilere dön
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/kategoriler" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Kategorilere dön
        </Link>
        <h1 className="text-3xl font-bold mb-4">{kategoriData.name}</h1>
        <p className="text-gray-600">{kategoriData.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kategoriData.ustalar.map((usta) => (
          <div key={usta.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                {usta.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">{usta.name}</h3>
                <p className="text-gray-600">{usta.category}</p>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{usta.rating}</span>
              <span className="ml-2 text-sm text-gray-500">({usta.experience} yıl deneyim)</span>
            </div>
            <div className="flex items-center mb-4 text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {usta.location}
            </div>
            <p className="text-gray-600 mb-4">{usta.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-1" />
                {usta.phone}
              </div>
              <Link
                to={`/usta/${usta.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Detay
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KategoriDetay; 