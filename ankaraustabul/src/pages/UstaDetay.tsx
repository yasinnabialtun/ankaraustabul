import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Star, 
  Heart,
  Zap,
  CheckCircle,
  Award,
  Calendar
} from 'lucide-react';
import { ustalar } from '../data';
import { 
  formatPhoneNumber, 
  getExperienceText, 
  isWorkingHours,
  addToFavorites,
  removeFromFavorites,
  isFavorite
} from '../utils';

const UstaDetay: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [favorite, setFavorite] = useState(false);
  
  const usta = ustalar.find(u => u.id === id);

  useEffect(() => {
    if (usta) {
      setFavorite(isFavorite(usta.id));
    }
  }, [usta]);

  if (!usta) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Usta Bulunamadı
          </h1>
          <p className="text-gray-600 mb-6">
            Aradığınız usta mevcut değil.
          </p>
          <Link to="/ustalar" className="btn-primary">
            Ustalara Dön
          </Link>
        </div>
      </div>
    );
  }

  const handleFavoriteClick = () => {
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-primary-600">Ana Sayfa</Link>
          <span>/</span>
          <Link to="/ustalar" className="hover:text-primary-600">Ustalar</Link>
          <span>/</span>
          <span className="text-gray-900">{usta.ad} {usta.soyad}</span>
        </div>

        {/* Geri Dön Butonu */}
        <div className="mb-6">
          <Link 
            to="/ustalar" 
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Ustalara Dön</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Kolon - Usta Bilgileri */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ana Bilgiler */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                {/* Profil Resmi */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                    {usta.resim ? (
                      <img
                        src={usta.resim}
                        alt={`${usta.ad} ${usta.soyad}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-bold">
                        {usta.ad.charAt(0)}{usta.soyad.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  {/* Acil Servis Badge */}
                  {usta.acilServis && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                      <Zap size={12} />
                      <span>Acil</span>
                    </div>
                  )}
                </div>

                {/* Temel Bilgiler */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {usta.ad} {usta.soyad}
                      </h1>
                      
                      {/* Hizmetler */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {usta.hizmetler.map((hizmet, index) => (
                          <span
                            key={index}
                            className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {hizmet}
                          </span>
                        ))}
                      </div>

                      {/* Puan ve Yorumlar */}
                      {usta.puan && (
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`${
                                  i < Math.floor(usta.puan!)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                                size={20}
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-gray-900">{usta.puan}</span>
                          {usta.yorumSayisi && (
                            <span className="text-gray-500">({usta.yorumSayisi} yorum)</span>
                          )}
                        </div>
                      )}

                      {/* Çalışma Durumu */}
                      <div className={`flex items-center space-x-2 ${isWorking ? 'text-green-600' : 'text-gray-500'}`}>
                        <div className={`w-3 h-3 rounded-full ${isWorking ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="font-medium">
                          {isWorking ? 'Şu an müsait' : 'Mesai dışı'}
                        </span>
                      </div>
                    </div>

                    {/* Favori Butonu */}
                    <button
                      onClick={handleFavoriteClick}
                      className={`p-3 rounded-full transition-colors ${
                        favorite 
                          ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                          : 'text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-500'
                      }`}
                    >
                      <Heart size={24} fill={favorite ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hakkında */}
            {usta.hakkinda && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Hakkında</h2>
                <p className="text-gray-600 leading-relaxed">{usta.hakkinda}</p>
              </div>
            )}

            {/* Sertifikalar */}
            {usta.sertifikalar && usta.sertifikalar.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Award className="text-primary-600" size={24} />
                  <span>Sertifikalar</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {usta.sertifikalar.map((sertifika, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="text-green-600" size={20} />
                      <span className="text-gray-700">{sertifika}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sağ Kolon - İletişim ve Detaylar */}
          <div className="space-y-6">
            {/* İletişim Bilgileri */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">İletişim</h2>
              
              <div className="space-y-4">
                {/* Telefon */}
                <div className="flex items-center space-x-3">
                  <Phone className="text-primary-600" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">
                      {formatPhoneNumber(usta.telefon)}
                    </div>
                    <div className="text-sm text-gray-500">Telefon</div>
                  </div>
                </div>

                {/* Email */}
                {usta.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="text-primary-600" size={20} />
                    <div>
                      <div className="font-medium text-gray-900">{usta.email}</div>
                      <div className="text-sm text-gray-500">E-posta</div>
                    </div>
                  </div>
                )}

                {/* Konum */}
                <div className="flex items-center space-x-3">
                  <MapPin className="text-primary-600" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">{usta.ilce}</div>
                    <div className="text-sm text-gray-500">
                      {usta.adres || 'Ankara'}
                    </div>
                  </div>
                </div>
              </div>

              {/* İletişim Butonları */}
              <div className="mt-6 space-y-3">
                <a
                  href={`tel:${usta.telefon}`}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Phone size={20} />
                  <span>Hemen Ara</span>
                </a>
                
                {usta.email && (
                  <a
                    href={`mailto:${usta.email}`}
                    className="btn-secondary w-full flex items-center justify-center space-x-2"
                  >
                    <Mail size={20} />
                    <span>E-posta Gönder</span>
                  </a>
                )}
              </div>
            </div>

            {/* Çalışma Bilgileri */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Çalışma Bilgileri</h2>
              
              <div className="space-y-4">
                {/* Deneyim */}
                <div className="flex items-center space-x-3">
                  <Calendar className="text-primary-600" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">
                      {getExperienceText(usta.deneyim)}
                    </div>
                    <div className="text-sm text-gray-500">Deneyim</div>
                  </div>
                </div>

                {/* Çalışma Saatleri */}
                <div className="flex items-center space-x-3">
                  <Clock className="text-primary-600" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">
                      {usta.calismaSaatleri.baslangic === '00:00' && usta.calismaSaatleri.bitis === '23:59'
                        ? '7/24 Hizmet'
                        : `${usta.calismaSaatleri.baslangic} - ${usta.calismaSaatleri.bitis}`
                      }
                    </div>
                    <div className="text-sm text-gray-500">Çalışma Saatleri</div>
                  </div>
                </div>

                {/* Garanti */}
                {usta.garanti && (
                  <div className="flex items-center space-x-3">
                    <Shield className="text-green-600" size={20} />
                    <div>
                      <div className="font-medium text-gray-900">
                        {usta.garantiSuresi} ay garanti
                      </div>
                      <div className="text-sm text-gray-500">İşçilik Garantisi</div>
                    </div>
                  </div>
                )}

                {/* Acil Servis */}
                {usta.acilServis && (
                  <div className="flex items-center space-x-3">
                    <Zap className="text-red-600" size={20} />
                    <div>
                      <div className="font-medium text-gray-900">Mevcut</div>
                      <div className="text-sm text-gray-500">7/24 Acil Servis</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Özellikler */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Özellikler</h2>
              
              <div className="space-y-3">
                {usta.garanti && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-sm">İşçilik Garantisi</span>
                  </div>
                )}
                
                {usta.acilServis && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <CheckCircle size={16} />
                    <span className="text-sm">7/24 Acil Servis</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 text-blue-600">
                  <CheckCircle size={16} />
                  <span className="text-sm">Güvenilir Usta</span>
                </div>
                
                <div className="flex items-center space-x-2 text-purple-600">
                  <CheckCircle size={16} />
                  <span className="text-sm">Profesyonel Hizmet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UstaDetay;