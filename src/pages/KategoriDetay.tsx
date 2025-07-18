import { useParams } from 'react-router-dom';
import UstaCard from '../components/UstaCard';
import { kategoriler } from '../data';

function KategoriDetay() {
  const { kategori } = useParams();
  const kategoriData = kategoriler.find(k => k.id === kategori);

  if (!kategoriData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center">Kategori bulunamadı</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{kategoriData.icon}</div>
        <h1 className="text-3xl font-bold mb-4">{kategoriData.name}</h1>
        <p className="text-gray-600 text-lg">{kategoriData.description}</p>
      </div>
      
      {kategoriData.ustalar.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kategoriData.ustalar.map((usta) => (
            <UstaCard key={usta.id} usta={usta} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Bu kategoride henüz usta bulunmuyor.</p>
        </div>
      )}
    </div>
  );
}

export default KategoriDetay; 