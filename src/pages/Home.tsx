import { Link } from 'react-router-dom';
import { kategoriler, ustalar } from '../data';
import KategoriCard from '../components/KategoriCard';
import UstaCard from '../components/UstaCard';
import { Search } from 'lucide-react';

function Home() {
  const featuredUstalar = ustalar.slice(0, 6);
  const featuredKategoriler = kategoriler.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Ankara'da <span className="text-blue-600">Güvenilir Usta</span> Bulun
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Ev ve işyeri ihtiyaçlarınız için Ankara'nın en güvenilir ustalarına ulaşın.
          Elektrik, su tesisatı, inşaat ve daha fazlası için profesyonel hizmet.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Hangi hizmeti arıyorsunuz?"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-8 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{ustalar.length}+</div>
            <div className="text-gray-600">Güvenilir Usta</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{kategoriler.length}</div>
            <div className="text-gray-600">Hizmet Kategorisi</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">4.7</div>
            <div className="text-gray-600">Ortalama Puan</div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Hizmet Kategorileri</h2>
          <Link to="/kategoriler" className="text-blue-600 hover:text-blue-700 font-semibold">
            Tümünü Gör →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredKategoriler.map((kategori) => (
            <KategoriCard key={kategori.id} kategori={kategori} />
          ))}
        </div>
      </section>

      {/* Featured Ustalar Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Öne Çıkan Ustalar</h2>
          <Link to="/ustalar" className="text-blue-600 hover:text-blue-700 font-semibold">
            Tümünü Gör →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredUstalar.map((usta) => (
            <UstaCard key={usta.id} usta={usta} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 rounded-lg p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Usta mısınız? Hemen Kayıt Olun!</h3>
        <p className="text-blue-100 mb-6">
          Müşterilerinize ulaşmak için profilinizi oluşturun ve hizmetlerinizi tanıtın.
        </p>
        <Link
          to="/usta-ekle"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Usta Ekle
        </Link>
      </section>
    </div>
  );
}

export default Home; 