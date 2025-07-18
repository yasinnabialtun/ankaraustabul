import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import type { Kategori } from '../types';

interface KategoriCardProps {
  kategori: Kategori;
}

function KategoriCard({ kategori }: KategoriCardProps) {
  return (
    <Link
      to={`/kategori/${kategori.id}`}
      className="group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 block"
    >
      <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {kategori.icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors">
        {kategori.name}
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{kategori.description}</p>
      <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
        <Users className="w-4 h-4 mr-2" />
        <span>{kategori.ustalar.length} usta</span>
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

export default KategoriCard; 