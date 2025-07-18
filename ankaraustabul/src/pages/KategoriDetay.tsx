import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Clock, TrendingUp } from 'lucide-react';
import UstaCard from '../components/UstaCard';
import { hizmetKategorileri, ustalar } from '../data';
import { createSlug } from '../utils';

const KategoriDetay: React.FC = () => {
  const { kategori: kategoriSlug } = useParams<{ kategori: string }>();
  
  // Slug'dan kategoriyi bul
  const kategori = hizmetKategorileri.find(k => 
    createSlug(k.ad) === kategoriSlug
  );

  if (!kategori) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Kategori Bulunamadı
          </h1>
          <p className="text-gray-600 mb-6">
            Aradığınız kategori mevcut değil.
          </p>
          <Link to="/kategoriler" className="btn-primary">
            Kategorilere Dön
          </Link>
        </div>
      </div>
    );
  }

  // Bu kategorideki ustalar
  const kategoriUstalar = ustalar.filter(usta => 
    usta.hizmetler.includes(kategori.ad)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-primary-600">Ana Sayfa</Link>
          <span>/</span>
          <Link to="/kategoriler" className="hover:text-primary-600">Kategoriler</Link>
          <span>/</span>
          <span className="text-gray-900">{kategori.ad}</span>
        </div>

        {/* Geri Dön Butonu */}
        <div className="mb-6">
          <Link 
            to="/kategoriler" 
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Kategorilere Dön</span>
          </Link>
        </div>

        {/* Kategori Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {kategori.ad} <span className="gradient-text">Ustaları</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {kategori.aciklama}
            </p>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Users className="mx-auto mb-2 text-blue-600" size={32} />
              <div className="text-2xl font-bold text-blue-600">{kategori.ustaSayisi}</div>
              <div className="text-gray-600">Uzman Usta</div>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Clock className="mx-auto mb-2 text-green-600" size={32} />
              <div className="text-2xl font-bold text-green-600">
                {kategori.acilServis ? '7/24' : 'Mesai'}
              </div>
              <div className="text-gray-600">
                {kategori.acilServis ? 'Acil Servis' : 'Saatleri'}
              </div>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <TrendingUp className="mx-auto mb-2 text-purple-600" size={32} />
              <div className="text-2xl font-bold text-purple-600">
                {kategori.ortalamaMaliyet ? 
                  `${kategori.ortalamaMaliyet.min}-${kategori.ortalamaMaliyet.max}₺` : 
                  'Değişken'
                }
              </div>
              <div className="text-gray-600">Ortalama Fiyat</div>
            </div>
          </div>

          {/* Acil Servis Uyarısı */}
          {kategori.acilServis && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-red-700">
                <Clock size={20} />
                <span className="font-medium">7/24 Acil Servis Mevcut</span>
              </div>
              <p className="text-red-600 text-sm mt-1">
                Bu kategorideki ustalarımız acil durumlarınızda 24 saat hizmet vermektedir.
              </p>
            </div>
          )}
        </div>

        {/* Ustalar Listesi */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {kategori.ad} Ustaları ({kategoriUstalar.length})
            </h2>
            <Link 
              to={`/ustalar?hizmet=${encodeURIComponent(kategori.ad)}`}
              className="btn-secondary"
            >
              Tümünü Görüntüle
            </Link>
          </div>

          {kategoriUstalar.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {kategoriUstalar.slice(0, 8).map((usta) => (
                <UstaCard key={usta.id} usta={usta} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Henüz Usta Bulunmuyor
              </h3>
              <p className="text-gray-600 mb-6">
                Bu kategoride henüz kayıtlı usta bulunmamaktadır.
              </p>
              <Link to="/usta-ekle" className="btn-primary">
                İlk Usta Ol
              </Link>
            </div>
          )}
        </div>

        {/* Kategori Hakkında */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {kategori.ad} Hizmeti Hakkında
          </h2>
          
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              {kategori.aciklama} Ankara'nın her ilçesinde güvenilir ve deneyimli 
              {kategori.ad.toLowerCase()} ustalarımız hizmetinizde.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Hizmet Kapsamı:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Profesyonel {kategori.ad.toLowerCase()} hizmeti</li>
                  <li>• Kaliteli malzeme kullanımı</li>
                  <li>• İşçilik garantisi</li>
                  <li>• Uygun fiyat garantisi</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Avantajlar:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Deneyimli ve sertifikalı ustalar</li>
                  <li>• Hızlı ve güvenilir hizmet</li>
                  <li>• Müşteri memnuniyeti odaklı yaklaşım</li>
                  {kategori.acilServis && <li>• 7/24 acil servis desteği</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KategoriDetay;