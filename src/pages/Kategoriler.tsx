import { Link } from 'react-router-dom';

function Kategoriler() {
  const categories = [
    { id: 'elektrik', name: 'Elektrik', icon: '⚡', count: 45, description: 'Elektrik tesisatı, aydınlatma, priz montajı ve tüm elektrik işleri' },
    { id: 'su-tesisati', name: 'Su Tesisatı', icon: '🚰', count: 32, description: 'Su tesisatı, kanal açma, tesisat tamiri ve bakım işleri' },
    { id: 'temizlik', name: 'Temizlik', icon: '🧹', count: 28, description: 'Ev temizliği, ofis temizliği, derinlemesine temizlik hizmetleri' },
    { id: 'mobilya', name: 'Mobilya', icon: '🪑', count: 23, description: 'Mobilya montajı, tamiri, bakımı ve özel mobilya yapımı' },
    { id: 'boya-badana', name: 'Boya & Badana', icon: '🎨', count: 19, description: 'İç ve dış cephe boya, dekoratif boya, badana işleri' },
    { id: 'insaat-tadilat', name: 'İnşaat & Tadilat', icon: '🏗️', count: 15, description: 'Tadilat, inşaat, yıkım ve tüm yapı işleri' },
    { id: 'bahce-peyzaj', name: 'Bahçe & Peyzaj', icon: '🌿', count: 12, description: 'Bahçe düzenleme, peyzaj tasarımı, çim ekimi ve bakım' },
    { id: 'klima-havalandirma', name: 'Klima & Havalandırma', icon: '❄️', count: 18, description: 'Klima montajı, bakımı, temizliği ve havalandırma sistemleri' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Hizmet Kategorileri
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            İhtiyacınız olan hizmeti seçin ve Ankara'da güvenilir ustalarımızla tanışın
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/kategoriler/${category.id}`}
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300 group"
            >
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-blue-600 font-semibold">
                    {category.count} usta
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-500">
                    Hemen görüntüle
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Usta mısınız?
            </h2>
            <p className="text-gray-600 mb-6">
              Müşterilerinizle buluşun ve işinizi büyütün. Hemen kayıt olun ve hizmetlerinizi sunmaya başlayın.
            </p>
            <Link
              to="/usta-ekle"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <span>Usta Olarak Kayıt Ol</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kategoriler; 