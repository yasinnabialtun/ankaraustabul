import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Wrench, 
  Paintbrush, 
  Hammer, 
  Wind, 
  Key, 
  Sparkles, 
  TreePine, 
  Home, 
  Square,
  Users,
  Clock
} from 'lucide-react';
import { HizmetKategorisi } from '../types';
import { createSlug } from '../utils';

interface KategoriCardProps {
  kategori: HizmetKategorisi;
  className?: string;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  Zap,
  Wrench,
  Paintbrush,
  Hammer,
  Wind,
  Key,
  Sparkles,
  TreePine,
  Home,
  Square,
};

const KategoriCard: React.FC<KategoriCardProps> = ({ kategori, className = '' }) => {
  const IconComponent = iconMap[kategori.icon] || Wrench;
  const slug = createSlug(kategori.ad);

  return (
    <Link 
      to={`/kategori/${slug}`} 
      className={`kategori-card group ${className}`}
    >
      {/* Icon */}
      <div className="mb-4">
        <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors">
          <IconComponent className="text-primary-600" size={32} />
        </div>
      </div>

      {/* Kategori Adı */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-800 transition-colors">
        {kategori.ad}
      </h3>

      {/* Açıklama */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {kategori.aciklama}
      </p>

      {/* İstatistikler */}
      <div className="space-y-2 mb-4">
        {/* Usta Sayısı */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Users size={16} />
          <span>{kategori.ustaSayisi} usta</span>
        </div>

        {/* Acil Servis */}
        {kategori.acilServis && (
          <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
            <Clock size={16} />
            <span>7/24 Acil Servis</span>
          </div>
        )}

        {/* Ortalama Maliyet */}
        {kategori.ortalamaMaliyet && (
          <div className="text-center">
            <span className="text-sm text-gray-500">
              {kategori.ortalamaMaliyet.min}₺ - {kategori.ortalamaMaliyet.max}₺
            </span>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <div className="bg-primary-50 group-hover:bg-primary-100 text-primary-700 px-4 py-2 rounded-lg text-center transition-colors">
          <span className="font-medium">Ustalar →</span>
        </div>
      </div>

      {/* Acil Servis Badge */}
      {kategori.acilServis && (
        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Acil
        </div>
      )}
    </Link>
  );
};

export default KategoriCard;