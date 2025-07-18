import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import KategoriCard from '../components/KategoriCard';
import { hizmetKategorileri } from '../data';

const Kategoriler: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'ustaSayisi' | 'acilServis'>('ustaSayisi');
  const [filterAcilServis, setFilterAcilServis] = useState(false);

  // Filtreleme ve sıralama
  const filteredKategoriler = hizmetKategorileri
    .filter(kategori => {
      const matchesSearch = kategori.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           kategori.aciklama.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAcilServis = !filterAcilServis || kategori.acilServis;
      return matchesSearch && matchesAcilServis;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.ad.localeCompare(b.ad, 'tr');
        case 'ustaSayisi':
          return b.ustaSayisi - a.ustaSayisi;
        case 'acilServis':
          return (b.acilServis ? 1 : 0) - (a.acilServis ? 1 : 0);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hizmet <span className="gradient-text">Kategorileri</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            İhtiyacınız olan hizmeti seçin, size en yakın uzman ustalarla tanışın
          </p>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Arama */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Kategori ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Sıralama */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'ustaSayisi' | 'acilServis')}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="ustaSayisi">Usta Sayısına Göre</option>
                <option value="name">Alfabetik Sıra</option>
                <option value="acilServis">Acil Servis Öncelikli</option>
              </select>
            </div>

            {/* Acil Servis Filtresi */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="acilServis"
                checked={filterAcilServis}
                onChange={(e) => setFilterAcilServis(e.target.checked)}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="acilServis" className="text-gray-700 font-medium">
                Sadece 7/24 Acil Servis
              </label>
            </div>
          </div>
        </div>

        {/* Sonuç Sayısı */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredKategoriler.length}</span> kategori bulundu
          </p>
        </div>

        {/* Kategoriler Grid */}
        {filteredKategoriler.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredKategoriler.map((kategori) => (
              <KategoriCard key={kategori.id} kategori={kategori} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Kategori Bulunamadı
            </h3>
            <p className="text-gray-600 mb-6">
              Aradığınız kriterlere uygun kategori bulunamadı. 
              Lütfen farklı arama terimleri deneyin.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterAcilServis(false);
                setSortBy('ustaSayisi');
              }}
              className="btn-primary"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}

        {/* İstatistikler */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Kategori İstatistikleri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {hizmetKategorileri.length}
              </div>
              <div className="text-gray-600">Toplam Kategori</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {hizmetKategorileri.filter(k => k.acilServis).length}
              </div>
              <div className="text-gray-600">7/24 Acil Servis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {hizmetKategorileri.reduce((total, k) => total + k.ustaSayisi, 0)}
              </div>
              <div className="text-gray-600">Toplam Usta</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round(hizmetKategorileri.reduce((total, k) => total + k.ustaSayisi, 0) / hizmetKategorileri.length)}
              </div>
              <div className="text-gray-600">Ortalama Usta/Kategori</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kategoriler;