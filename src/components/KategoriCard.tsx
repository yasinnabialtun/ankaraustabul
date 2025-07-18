import { Link } from 'react-router-dom';
import type { Kategori } from '../types';

interface KategoriCardProps {
  kategori: Kategori;
}

function KategoriCard({ kategori }: KategoriCardProps) {
  return (
    <Link
      to={`/kategori/${kategori.id}`}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="text-4xl mb-4">{kategori.icon}</div>
      <h3 className="text-xl font-semibold mb-2">{kategori.name}</h3>
      <p className="text-gray-600 mb-4">{kategori.description}</p>
      <p className="text-sm text-gray-500">{kategori.ustalar.length} usta</p>
    </Link>
  );
}

export default KategoriCard; 