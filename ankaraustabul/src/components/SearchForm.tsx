import React, { useState } from 'react';
import { Search, MapPin, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ilceler, hizmetKategorileri } from '../data';

interface SearchFormProps {
  className?: string;
  onSearch?: (filters: { ilce?: string; hizmet?: string; arama?: string }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ className = '', onSearch }) => {
  const [ilce, setIlce] = useState('');
  const [hizmet, setHizmet] = useState('');
  const [arama, setArama] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters = {
      ...(ilce && { ilce }),
      ...(hizmet && { hizmet }),
      ...(arama && { arama }),
    };

    if (onSearch) {
      onSearch(filters);
    } else {
      // URL parametreleri ile ustalar sayfasına yönlendir
      const params = new URLSearchParams();
      if (ilce) params.set('ilce', ilce);
      if (hizmet) params.set('hizmet', hizmet);
      if (arama) params.set('arama', arama);
      
      navigate(`/ustalar?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`search-form ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* İlçe Seçimi */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={ilce}
            onChange={(e) => setIlce(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="">Tüm İlçeler</option>
            {ilceler.map((ilceItem) => (
              <option key={ilceItem.id} value={ilceItem.ad}>
                {ilceItem.ad} ({ilceItem.ustaSayisi} usta)
              </option>
            ))}
          </select>
        </div>

        {/* Hizmet Seçimi */}
        <div className="relative">
          <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={hizmet}
            onChange={(e) => setHizmet(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="">Tüm Hizmetler</option>
            {hizmetKategorileri.map((kategori) => (
              <option key={kategori.id} value={kategori.ad}>
                {kategori.ad} ({kategori.ustaSayisi} usta)
              </option>
            ))}
          </select>
        </div>

        {/* Arama Terimi */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Usta adı, hizmet ara..."
            value={arama}
            onChange={(e) => setArama(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Arama Butonu */}
        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <Search size={20} />
          <span>Usta Bul</span>
        </button>
      </div>

      {/* Hızlı Filtreler */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-gray-600">Hızlı Filtreler:</span>
        <button
          type="button"
          onClick={() => {
            setHizmet('Elektrikçi');
            setIlce('');
            setArama('');
          }}
          className="px-3 py-1 text-xs bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-800 rounded-full transition-colors"
        >
          Elektrikçi
        </button>
        <button
          type="button"
          onClick={() => {
            setHizmet('Tesisatçı');
            setIlce('');
            setArama('');
          }}
          className="px-3 py-1 text-xs bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-800 rounded-full transition-colors"
        >
          Tesisatçı
        </button>
        <button
          type="button"
          onClick={() => {
            setHizmet('Klima Servisi');
            setIlce('');
            setArama('');
          }}
          className="px-3 py-1 text-xs bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-800 rounded-full transition-colors"
        >
          Klima Servisi
        </button>
        <button
          type="button"
          onClick={() => {
            setHizmet('');
            setIlce('');
            setArama('');
            const params = new URLSearchParams();
            params.set('acilServis', 'true');
            navigate(`/ustalar?${params.toString()}`);
          }}
          className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 rounded-full transition-colors"
        >
          🚨 Acil Servis
        </button>
      </div>
    </form>
  );
};

export default SearchForm;