import { useParams, Link } from 'react-router-dom';
import { kategoriler } from '../data';
import UstaCard from '../components/UstaCard';

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

      {kategoriData.ustalar.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kategoriData.ustalar.map((usta) => (
            <UstaCard key={usta.id} usta={usta} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Bu kategoride henüz usta bulunmuyor.</p>
          <Link
            to="/usta-ekle"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            İlk Usta Ol
          </Link>
        </div>
      )}
    </div>
  );
}

export default KategoriDetay; 