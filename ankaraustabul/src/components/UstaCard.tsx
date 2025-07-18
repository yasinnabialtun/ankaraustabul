import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Clock, Shield, Phone, Zap } from 'lucide-react';
import { Usta } from '../types';
import { 
  formatPhoneNumber, 
  getExperienceText, 
  isWorkingHours,
  addToFavorites,
  removeFromFavorites,
  isFavorite
} from '../utils';

interface UstaCardProps {
  usta: Usta;
  className?: string;
}

const UstaCard: React.FC<UstaCardProps> = ({ usta, className = '' }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(usta.id));
  }, [usta.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorites(usta.id);
      setFavorite(false);
    } else {
      addToFavorites(usta.id);
      setFavorite(true);
    }
  };

  const isWorking = isWorkingHours(usta.calismaSaatleri);

  return (
    <Link to={`/usta/${usta.id}`} className={`usta-card block ${className}`}>
      {/* Usta Resmi ve Favori Butonu */}
      <div className="relative mb-4">
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gray-200">
          {usta.resim ? (
            <img
              src={usta.resim}
              alt={`${usta.ad} ${usta.soyad}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-bold">
              {usta.ad.charAt(0)}{usta.soyad.charAt(0)}
            </div>
          )}
        </div>
        
        {/* Favori Butonu */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-0 right-0 p-2 rounded-full transition-colors ${
            favorite 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
        </button>

        {/* Acil Servis Badge */}
        {usta.acilServis && (
          <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
            <Zap size={12} />
            <span>Acil</span>
          </div>
        )}
      </div>

      {/* Usta Bilgileri */}
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">
          {usta.ad} {usta.soyad}
        </h3>
        
        {/* Hizmetler */}
        <div className="flex flex-wrap justify-center gap-1 mb-2">
          {usta.hizmetler.slice(0, 2).map((hizmet, index) => (
            <span
              key={index}
              className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full"
            >
              {hizmet}
            </span>
          ))}
          {usta.hizmetler.length > 2 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              +{usta.hizmetler.length - 2}
            </span>
          )}
        </div>

        {/* Puan ve Yorumlar */}
        {usta.puan && (
          <div className="flex items-center justify-center space-x-1 mb-2">
            <Star className="text-yellow-400 fill-current" size={16} />
            <span className="font-medium text-gray-900">{usta.puan}</span>
            {usta.yorumSayisi && (
              <span className="text-gray-500 text-sm">({usta.yorumSayisi})</span>
            )}
          </div>
        )}
      </div>

      {/* Alt Bilgiler */}
      <div className="space-y-2 text-sm text-gray-600">
        {/* Konum */}
        <div className="flex items-center space-x-2">
          <MapPin size={14} className="text-gray-400" />
          <span>{usta.ilce}</span>
        </div>

        {/* Deneyim */}
        <div className="flex items-center space-x-2">
          <Clock size={14} className="text-gray-400" />
          <span>{getExperienceText(usta.deneyim)}</span>
        </div>

        {/* Garanti */}
        {usta.garanti && (
          <div className="flex items-center space-x-2">
            <Shield size={14} className="text-green-500" />
            <span className="text-green-600">
              {usta.garantiSuresi} ay garanti
            </span>
          </div>
        )}

        {/* Çalışma Durumu */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-1 ${isWorking ? 'text-green-600' : 'text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${isWorking ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-xs">
              {isWorking ? 'Şu an müsait' : 'Mesai dışı'}
            </span>
          </div>
          
          {/* Telefon */}
          <div className="flex items-center space-x-1 text-primary-600">
            <Phone size={12} />
            <span className="text-xs">{formatPhoneNumber(usta.telefon).slice(-7)}</span>
          </div>
        </div>
      </div>

      {/* Hover Efekti için Alt Çizgi */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <span className="text-primary-600 text-sm font-medium">
            Detayları Görüntüle →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default UstaCard;