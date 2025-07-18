import KategoriCard from '../components/KategoriCard';
import { kategoriler } from '../data';

function Kategoriler() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Hizmet Kategorileri</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {kategoriler.map((kategori) => (
          <KategoriCard key={kategori.id} kategori={kategori} />
        ))}
      </div>
    </div>
  );
}

export default Kategoriler; 