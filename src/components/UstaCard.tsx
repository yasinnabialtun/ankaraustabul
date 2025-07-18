import { Link } from 'react-router-dom';
import { Star, MapPin, Phone, ArrowRight } from 'lucide-react';
import type { Usta } from '../types';

interface UstaCardProps {
  usta: Usta;
}

function UstaCard({ usta }: UstaCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      <div className="h-56 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
        <div className="text-6xl text-blue-600 group-hover:scale-110 transition-transform duration-300">👷</div>
        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
          <Star className="w-3 h-3 mr-1 fill-current" />
          {usta.rating}
        </div>
        <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {usta.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
          {usta.name}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">{usta.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
            <span>{usta.rating} puan • {usta.experience} yıl deneyim</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{usta.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Phone className="w-4 h-4 mr-2" />
            <span>{usta.phone}</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Link
            to={`/usta/${usta.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
          >
            Detayları Gör
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={`tel:${usta.phone}`}
            className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition-colors"
            title="Hemen Ara"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default UstaCard; 