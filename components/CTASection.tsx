import Link from 'next/link'
import { Plus, Phone, ArrowRight, Star, Users, Clock, CheckCircle, Shield } from 'lucide-react'

const CTASection = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'Doğrulanmış Ustalar',
      description: 'Tüm ustalarımız kimlik ve belge kontrolünden geçer'
    },
    {
      icon: Star,
      title: 'Kalite Garantisi',
      description: 'Memnun kalmazsanız ücretsiz düzeltme hizmeti'
    },
    {
      icon: Clock,
      title: 'Hızlı Yanıt',
      description: 'Ortalama 30 dakika içinde yanıt alırsınız'
    },
    {
      icon: Shield,
      title: 'Güvenli Ödeme',
      description: 'İş tamamlandıktan sonra ödeme yaparsınız'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ankara'nın En Güvenilir Usta Platformu
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Binlerce memnun müşteri, yüzlerce güvenilir usta. 
            Evinizdeki her türlü iş için profesyonel çözümler sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                Neden Bizi Tercih Etmelisiniz?
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-blue-100">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Hızlı Başlangıç
              </h3>
              <p className="text-blue-100 mb-6">
                Sadece 3 adımda ustanızı bulun ve işinizi halledin
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <span className="text-white">İhtiyacınızı belirtin ve konumunuzu seçin</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <span className="text-white">Size uygun ustaları inceleyin ve seçin</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <span className="text-white">Ustanızla iletişime geçin ve işinizi halledin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - CTA Cards */}
          <div className="space-y-6">
            {/* Main CTA */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Hemen Usta Bulun
              </h3>
              <p className="text-gray-600 mb-6">
                Ankara'nın en güvenilir ustalarından birini seçin ve işinizi profesyonelce halledin.
              </p>
              <div className="space-y-4">
                <Link
                  href="/kategoriler"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Usta Ara</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/firma-ekle"
                  className="w-full border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Usta/Firma Ekle</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="text-xl font-bold text-white mb-4 text-center">
                Platform İstatistikleri
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">2,500+</div>
                  <div className="text-sm text-blue-100">Kayıtlı Usta</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">15,000+</div>
                  <div className="text-sm text-blue-100">Tamamlanan İş</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">4.8/5</div>
                  <div className="text-sm text-blue-100">Ortalama Puan</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-blue-100">Destek</div>
                </div>
              </div>
            </div>

            {/* Trust Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="text-xl font-bold text-white mb-4 text-center">
                Güvenlik & Garanti
              </h4>
              <div className="space-y-3 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-blue-100">SSL Güvenlik Sertifikası</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-blue-100">Kimlik Doğrulama</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-blue-100">Kalite Garantisi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Hala Kararsız mısınız?
            </h3>
            <p className="text-blue-100 mb-6">
              Binlerce memnun müşterimizin deneyimlerini okuyun ve hemen bugün ustanızı bulun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/hakkimizda"
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                Hakkımızda
              </Link>
              <Link
                href="/iletisim"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                İletişime Geçin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 