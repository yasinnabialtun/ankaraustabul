import React from 'react';
import { UstaData } from '../types';
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Crown, 
  Shield, 
  Zap,
  MessageCircle,
  Calendar,
  Award,
  TrendingUp,
  CheckCircle,
  Users
} from 'lucide-react';

interface UstaCardProps {
  usta: UstaData;
  onContact?: (usta: UstaData) => void;
  onWhatsApp?: (usta: UstaData) => void;
  onViewProfile?: (usta: UstaData) => void;
  isFeatured?: boolean;
  showBadges?: boolean;
}

const UstaCard: React.FC<UstaCardProps> = ({ 
  usta, 
  onContact, 
  onWhatsApp, 
  onViewProfile,
  isFeatured = false,
  showBadges = true
}) => {
  const handleWhatsApp = () => {
    if (usta.whatsappEnabled && usta.whatsappNumber) {
      const message = `Merhaba ${usta.name}, hizmetleriniz hakkında bilgi almak istiyorum.`;
      const whatsappUrl = `https://wa.me/${usta.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const getPackageIcon = (packageType: string) => {
    switch (packageType) {
      case 'BASIC': return <Users className="w-4 h-4 text-blue-500" />;
      case 'PREMIUM': return <Star className="w-4 h-4 text-yellow-500" />;
      default: return <Users className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      case 'unavailable': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Müsait';
      case 'busy': return 'Meşgul';
      case 'unavailable': return 'Müsait Değil';
      default: return 'Durum Bilinmiyor';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg ${
      isFeatured ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50' : 'border-gray-200'
    }`}>
      {/* Featured Badge */}
      {isFeatured && (
        <div className="relative">
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            ÖNE ÇIKAN
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{usta.name}</h3>
              {usta.verifiedBadge && (
                <Shield className="w-4 h-4 text-blue-500" title="Doğrulanmış Usta" />
              )}
              {getPackageIcon(usta.packageType)}
            </div>
            <p className="text-sm text-gray-600">{usta.category}</p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">
              {usta.rating ? usta.rating.toFixed(1) : '0.0'}
            </span>
            {usta.reviewCount && (
              <span className="text-xs text-gray-500">({usta.reviewCount})</span>
            )}
          </div>
        </div>

        {/* Badges */}
        {showBadges && (
          <div className="flex flex-wrap gap-2 mb-4">
            {usta.isFeatured && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                <TrendingUp className="w-3 h-3" />
                Öne Çıkan
              </span>
            )}
            {usta.emergencyService && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                <Zap className="w-3 h-3" />
                Acil Servis
              </span>
            )}
            {usta.instantBooking && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                <Calendar className="w-3 h-3" />
                Anında Rezervasyon
              </span>
            )}
            {usta.premiumProfile && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                <Crown className="w-3 h-3" />
                Premium
              </span>
            )}
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getAvailabilityColor(usta.availability || 'available')}`}>
              <CheckCircle className="w-3 h-3" />
              {getAvailabilityText(usta.availability || 'available')}
            </span>
          </div>
        )}

        {/* Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{usta.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{usta.experience} yıl deneyim</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MessageCircle className="w-4 h-4" />
            <span>Ortalama {usta.responseTime || 60} dk yanıt</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">{usta.profileViews || 0}</div>
            <div className="text-xs text-gray-500">Görüntülenme</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{usta.contactClicks || 0}</div>
            <div className="text-xs text-gray-500">İletişim</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{usta.hourlyRate} ₺</div>
            <div className="text-xs text-gray-500">Saatlik</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {onViewProfile && (
            <button
              onClick={() => onViewProfile(usta)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Profili Görüntüle
            </button>
          )}
          
          {usta.whatsappEnabled && usta.whatsappNumber && (
            <button
              onClick={handleWhatsApp}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
              title="WhatsApp ile İletişim"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          )}
          
          {onContact && (
            <button
              onClick={() => onContact(usta)}
              className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
              title="Telefon ile İletişim"
            >
              <Phone className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Special Features */}
        {usta.specialBadges && usta.specialBadges.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex flex-wrap gap-1">
              {usta.specialBadges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UstaCard; 