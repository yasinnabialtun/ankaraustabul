import { Link } from 'react-router-dom';
import { Star, MapPin, Phone } from 'lucide-react';
import type { Usta } from '../types';

interface UstaCardProps {
  usta: Usta;
}

function UstaCard({ usta }: UstaCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <div className="text-4xl text-gray-400">👷</div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{usta.name}</h3>
        <p className="text-gray-600 mb-3">{usta.description}</p>
        
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span className="text-sm">{usta.rating} ({usta.experience} yıl deneyim)</span>
        </div>
        
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{usta.location}</span>
        </div>
        
        <div className="flex items-center mb-4 text-sm text-gray-500">
          <Phone className="w-4 h-4 mr-1" />
          <span>{usta.phone}</span>
        </div>
        
        <Link
          to={`/usta/${usta.id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Detayları Gör
        </Link>
      </div>
    </div>
  );
}

export default UstaCard; 