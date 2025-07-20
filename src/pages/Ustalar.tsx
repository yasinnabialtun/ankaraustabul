import { useState } from 'react';
import { Search, MapPin, Star, Filter } from 'lucide-react';

function Ustalar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: '', name: 'Tümü' },
    { id: 'elektrik', name: 'Elektrik' },
    { id: 'su-tesisati', name: 'Su Tesisatı' },
    { id: 'temizlik', name: 'Temizlik' },
    { id: 'mobilya', name: 'Mobilya' },
    { id: 'boya-badana', name: 'Boya & Badana' },
    { id: 'insaat-tadilat', name: 'İnşaat & Tadilat' },
  ];

  const ustalar = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      category: 'Elektrik',
      location: 'Çankaya, Ankara',
      rating: 4.8,
      experience: '8 yıl',
      hourlyRate: '150 TL',
      description: 'Elektrik tesisatı, aydınlatma, priz montajı ve tüm elektrik işleri',
      specialties: ['Elektrik Tesisatı', 'Aydınlatma', 'Priz Montajı']
    },
    {
      id: '2',
      name: 'Mehmet Demir',
      category: 'Su Tesisatı',
      location: 'Keçiören, Ankara',
      rating: 4.9,
      experience: '12 yıl',
      hourlyRate: '180 TL',
      description: 'Su tesisatı, kanal açma, tesisat tamiri ve bakım işleri',
      specialties: ['Su Tesisatı', 'Kanal Açma', 'Tesisat Tamiri']
    },
    {
      id: '3',
      name: 'Ali Kaya',
      category: 'Temizlik',
      location: 'Mamak, Ankara',
      rating: 4.7,
      experience: '5 yıl',
      hourlyRate: '120 TL',
      description: 'Ev temizliği, ofis temizliği, derinlemesine temizlik hizmetleri',
      specialties: ['Ev Temizliği', 'Ofis Temizliği', 'Derinlemesine Temizlik']
    },
    {
      id: '4',
      name: 'Fatma Özkan',
      category: 'Mobilya',
      location: 'Yenimahalle, Ankara',
      rating: 4.6,
      experience: '6 yıl',
      hourlyRate: '140 TL',
      description: 'Mobilya montajı, tamiri, bakımı ve özel mobilya yapımı',
      specialties: ['Mobilya Montajı', 'Mobilya Tamiri', 'Özel Mobilya']
    },
    {
      id: '5',
      name: 'Hasan Yıldız',
      category: 'Boya & Badana',
      location: 'Etimesgut, Ankara',
      rating: 4.8,
      experience: '10 yıl',
      hourlyRate: '160 TL',
      description: 'İç ve dış cephe boya, dekoratif boya, badana işleri',
      specialties: ['İç Cephe Boya', 'Dış Cephe Boya', 'Dekoratif Boya']
    },
    {
      id: '6',
      name: 'Mustafa Çelik',
      category: 'İnşaat & Tadilat',
      location: 'Sincan, Ankara',
      rating: 4.9,
      experience: '15 yıl',
      hourlyRate: '200 TL',
      description: 'Tadilat, inşaat, yıkım ve tüm yapı işleri',
      specialties: ['Tadilat', 'İnşaat', 'Yıkım']
    },
  ];

  const filteredUstalar = ustalar.filter(usta => {
    const matchesSearch = usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usta.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || usta.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Ustalar
          </h1>
          <p className="text-gray-600">
            Ankara'da güvenilir ustalarımızla tanışın
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Usta ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center md:justify-end">
              <span className="text-gray-600">
                {filteredUstalar.length} usta bulundu
              </span>
            </div>
          </div>
        </div>

        {/* Ustalar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUstalar.map((usta) => (
            <div key={usta.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">
                    {usta.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{usta.name}</h3>
                  <p className="text-sm text-gray-600">{usta.category}</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {usta.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{usta.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{usta.rating} ({usta.experience} deneyim)</span>
                </div>
                <div className="text-sm text-gray-600">
                  Saatlik: {usta.hourlyRate}
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {usta.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Detayları Gör
              </button>
            </div>
          ))}
        </div>

        {filteredUstalar.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Usta Bulunamadı
            </h3>
            <p className="text-gray-600">
              Arama kriterlerinize uygun usta bulunamadı. Lütfen farklı kriterler deneyin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ustalar; 