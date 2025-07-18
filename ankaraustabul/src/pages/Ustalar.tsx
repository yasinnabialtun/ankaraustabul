import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Users } from 'lucide-react';
import UstaCard from '../components/UstaCard';
import SearchForm from '../components/SearchForm';
import { ustalar, ilceler, hizmetKategorileri } from '../data';
import { filterUstalar, sortUstalar } from '../utils';
import { AramaFiltreleri } from '../types';

const Ustalar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'puan' | 'deneyim' | 'yorumSayisi'>('puan');
  
  // URL parametrelerinden filtreleri al
  const [filters, setFilters] = useState<AramaFiltreleri>({
    ilce: searchParams.get('ilce') || '',
    hizmet: searchParams.get('hizmet') || '',
    arama: searchParams.get('arama') || '',
    acilServis: searchParams.get('acilServis') === 'true',
    garanti: searchParams.get('garanti') === 'true',
    minDeneyim: searchParams.get('minDeneyim') ? parseInt(searchParams.get('minDeneyim')!) : undefined,
    minPuan: searchParams.get('minPuan') ? parseFloat(searchParams.get('minPuan')!) : undefined,
  });

  // Filtrelenmiş ve sıralanmış ustalar
  const filteredUstalar = sortUstalar(filterUstalar(ustalar, filters), sortBy);

  // URL parametrelerini güncelle
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.ilce) params.set('ilce', filters.ilce);
    if (filters.hizmet) params.set('hizmet', filters.hizmet);
    if (filters.arama) params.set('arama', filters.arama);
    if (filters.acilServis) params.set('acilServis', 'true');
    if (filters.garanti) params.set('garanti', 'true');
    if (filters.minDeneyim) params.set('minDeneyim', filters.minDeneyim.toString());
    if (filters.minPuan) params.set('minPuan', filters.minPuan.toString());
    
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters: Partial<AramaFiltreleri>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchParams({});
  };

  const activeFilterCount = Object.values(filters).filter(value => 
    value !== '' && value !== undefined && value !== false
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Uzman <span className="gradient-text">Ustalar</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ankara'nın en güvenilir ve deneyimli ustalarını keşfedin
          </p>
        </div>

        {/* Arama Formu */}
        <div className="mb-8">
          <SearchForm 
            onSearch={(searchFilters) => handleFilterChange(searchFilters)}
          />
        </div>

        {/* Filtreler ve Sıralama */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Sol Taraf - Filtre Butonu ve Aktif Filtre Sayısı */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  showFilters 
                    ? 'bg-primary-50 border-primary-200 text-primary-700' 
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <SlidersHorizontal size={20} />
                <span>Filtreler</span>
                {activeFilterCount > 0 && (
                  <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Filtreleri Temizle
                </button>
              )}
            </div>

            {/* Sağ Taraf - Sıralama ve Sonuç Sayısı */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users size={20} />
                <span>{filteredUstalar.length} usta bulundu</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Sırala:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'puan' | 'deneyim' | 'yorumSayisi')}
                  className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="puan">Puana Göre</option>
                  <option value="deneyim">Deneyime Göre</option>
                  <option value="yorumSayisi">Yorum Sayısına Göre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Gelişmiş Filtreler */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* İlçe Filtresi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlçe
                  </label>
                  <select
                    value={filters.ilce || ''}
                    onChange={(e) => handleFilterChange({ ilce: e.target.value || undefined })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Tüm İlçeler</option>
                    {ilceler.map((ilce) => (
                      <option key={ilce.id} value={ilce.ad}>
                        {ilce.ad}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hizmet Filtresi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hizmet
                  </label>
                  <select
                    value={filters.hizmet || ''}
                    onChange={(e) => handleFilterChange({ hizmet: e.target.value || undefined })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Tüm Hizmetler</option>
                    {hizmetKategorileri.map((kategori) => (
                      <option key={kategori.id} value={kategori.ad}>
                        {kategori.ad}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Minimum Deneyim */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Deneyim
                  </label>
                  <select
                    value={filters.minDeneyim || ''}
                    onChange={(e) => handleFilterChange({ 
                      minDeneyim: e.target.value ? parseInt(e.target.value) : undefined 
                    })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Tüm Deneyimler</option>
                    <option value="1">1+ yıl</option>
                    <option value="3">3+ yıl</option>
                    <option value="5">5+ yıl</option>
                    <option value="10">10+ yıl</option>
                    <option value="15">15+ yıl</option>
                  </select>
                </div>

                {/* Minimum Puan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Puan
                  </label>
                  <select
                    value={filters.minPuan || ''}
                    onChange={(e) => handleFilterChange({ 
                      minPuan: e.target.value ? parseFloat(e.target.value) : undefined 
                    })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Tüm Puanlar</option>
                    <option value="4.5">4.5+ ⭐</option>
                    <option value="4.0">4.0+ ⭐</option>
                    <option value="3.5">3.5+ ⭐</option>
                    <option value="3.0">3.0+ ⭐</option>
                  </select>
                </div>
              </div>

              {/* Checkbox Filtreler */}
              <div className="mt-4 flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.acilServis || false}
                    onChange={(e) => handleFilterChange({ acilServis: e.target.checked || undefined })}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">7/24 Acil Servis</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.garanti || false}
                    onChange={(e) => handleFilterChange({ garanti: e.target.checked || undefined })}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Garanti Veren</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Ustalar Grid */}
        {filteredUstalar.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUstalar.map((usta) => (
              <UstaCard key={usta.id} usta={usta} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Usta Bulunamadı
            </h3>
            <p className="text-gray-600 mb-6">
              Aradığınız kriterlere uygun usta bulunamadı. 
              Lütfen farklı filtreler deneyin.
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ustalar;