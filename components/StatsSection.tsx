import { Users, Star, MapPin, Clock } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: '2,500+',
      label: 'Kayıtlı Usta & Firma',
      description: 'Ankara genelinde hizmet veren güvenilir ustalar'
    },
    {
      icon: Star,
      number: '4.8/5',
      label: 'Ortalama Puan',
      description: 'Müşteri memnuniyeti ve kalite garantisi'
    },
    {
      icon: MapPin,
      number: '25',
      label: 'İlçe Kapsamı',
      description: 'Ankara\'nın tüm ilçelerinde hizmet ağı'
    },
    {
      icon: Clock,
      number: '24/7',
      label: 'Destek Hizmeti',
      description: 'Kesintisiz müşteri desteği ve danışmanlık'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Neden Bizi Tercih Ediyorlar?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ankara'nın en güvenilir usta ve firma platformu olarak, 
            kaliteli hizmet ve müşteri memnuniyetini ön planda tutuyoruz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 mx-auto">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Kalite Garantisi
            </h3>
            <p className="text-gray-600 mb-6">
              Tüm ustalarımız ve firmalarımız titiz bir değerlendirme sürecinden geçer. 
              Kalite standartlarımızı karşılayan, güvenilir ve deneyimli hizmet sağlayıcılarıyla çalışırız.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">%100</div>
                <div className="text-sm text-gray-600">Doğrulanmış Profiller</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">%95</div>
                <div className="text-sm text-gray-600">Müşteri Memnuniyeti</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">24s</div>
                <div className="text-sm text-gray-600">Ortalama Yanıt Süresi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection 