import { Link } from 'react-router-dom';
import { kategoriler } from '../data';

function Kategoriler() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Hizmet Kategorileri</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {kategoriler.map((kategori) => (
          <Link
            key={kategori.id}
            to={`/kategori/${kategori.id}`}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4">{kategori.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{kategori.name}</h3>
            <p className="text-gray-600 mb-4">{kategori.description}</p>
            <p className="text-sm text-gray-500">{kategori.ustalar.length} usta</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Kategoriler; 