import { 
  Users, Award, Star, MapPin, Clock, 
  Heart, Shield, Zap, TrendingUp, CheckCircle, 
  Phone, Mail, Building, Calendar, Globe, 
  ThumbsUp, Eye, Handshake, Lightbulb, Target
} from 'lucide-react'
import Link from 'next/link'

export default function HakkimizdaPage() {
  const stats = [
    {
      icon: Users,
      number: '2,500+',
      label: 'Kayıtlı Usta',
      description: 'Ankara genelinde aktif ustalar'
    },
    {
      icon: Star,
      number: '15,000+',
      label: 'Müşteri Değerlendirmesi',
      description: 'Güvenilir hizmet garantisi'
    },
    {
      icon: MapPin,
      number: '25',
      label: 'Ankara İlçesi',
      description: 'Tüm ilçelerde hizmet'
    },
    {
      icon: Clock,
      number: '24/7',
      label: 'Acil Durum',
      description: 'Kesintisiz hizmet'
    },
    {
      icon: ThumbsUp,
      number: '98%',
      label: 'Müşteri Memnuniyeti',
      description: 'Yüksek memnuniyet oranı'
    },
    {
      icon: Eye,
      number: '50,000+',
      label: 'Aylık Ziyaretçi',
      description: 'Güvenilir platform'
    }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Müşteri Odaklılık',
      description: 'Müşteri memnuniyeti bizim önceliğimizdir. Her hizmet kaliteli ve güvenilir olmalıdır.'
    },
    {
      icon: Shield,
      title: 'Güvenilirlik',
      description: 'Tüm ustalarımız doğrulanmış ve güvenilir kişilerdir. Kaliteli hizmet garantisi veriyoruz.'
    },
    {
      icon: Zap,
      title: 'Hızlı Yanıt',
      description: 'Acil durumlar için hızlı yanıt süresi. Müşterilerimizin ihtiyaçlarına anında çözüm.'
    },
    {
      icon: TrendingUp,
      title: 'Sürekli Gelişim',
      description: 'Teknolojimizi ve hizmet kalitemizi sürekli geliştiriyoruz.'
    },
    {
      icon: Award,
      title: 'Şeffaflık',
      description: 'Tüm işlemlerimizde şeffaf ve dürüst yaklaşım. Fiyat ve hizmet kalitesi konusunda netlik.'
    },
    {
      icon: Lightbulb,
      title: 'İnovasyon',
      description: 'Teknoloji ile hizmet sektörünü birleştirerek yenilikçi çözümler sunuyoruz.'
    }
  ]

  const team = [
    {
      name: 'Ahmet Yılmaz',
      position: 'Kurucu & CEO',
      description: '10+ yıl teknoloji ve hizmet sektörü deneyimi',
      experience: '15 yıl',
      education: 'Bilgisayar Mühendisliği',
      expertise: 'Strateji, Yönetim, Teknoloji'
    },
    {
      name: 'Fatma Demir',
      position: 'Operasyon Müdürü',
      description: 'Müşteri hizmetleri ve operasyon yönetimi uzmanı',
      experience: '12 yıl',
      education: 'İşletme Yönetimi',
      expertise: 'Operasyon, Müşteri Hizmetleri'
    },
    {
      name: 'Mehmet Kaya',
      position: 'Teknoloji Direktörü',
      description: 'Yazılım geliştirme ve sistem yönetimi',
      experience: '8 yıl',
      education: 'Yazılım Mühendisliği',
      expertise: 'Yazılım, Sistem Yönetimi'
    },
    {
      name: 'Zeynep Arslan',
      position: 'Pazarlama Müdürü',
      description: 'Dijital pazarlama ve marka yönetimi',
      experience: '10 yıl',
      education: 'Pazarlama',
      expertise: 'Dijital Pazarlama, Marka'
    }
  ]

  const milestones = [
    {
      year: '2020',
      title: 'Kuruluş',
      description: 'Ankara Usta Bul platformu kuruldu. İlk 100 usta kaydı alındı.'
    },
    {
      year: '2021',
      title: 'Büyüme',
      description: '1000+ usta kaydı. 10,000+ müşteri hizmeti. Mobil uygulama lansmanı.'
    },
    {
      year: '2022',
      title: 'Genişleme',
      description: 'Tüm Ankara ilçelerinde hizmet. Premium paketler eklendi. 25,000+ müşteri.'
    },
    {
      year: '2023',
      title: 'Teknoloji',
      description: 'AI destekli eşleştirme sistemi. 7/24 destek hattı. 50,000+ müşteri.'
    },
    {
      year: '2024',
      title: 'Liderlik',
      description: 'Ankara\'nın en büyük hizmet platformu. 2,500+ usta. 98% memnuniyet.'
    }
  ]

  const achievements = [
    {
      icon: Award,
      title: 'En İyi Hizmet Platformu 2023',
      description: 'Ankara Ticaret Odası tarafından verilen ödül'
    },
    {
      icon: Star,
      title: 'Müşteri Memnuniyeti Ödülü',
      description: 'Türkiye\'de en yüksek memnuniyet oranı'
    },
    {
      icon: Building,
      title: 'Teknoloji Ödülü',
      description: 'İnovatif çözümler için verilen ödül'
    },
    {
      icon: Globe,
      title: 'Sosyal Sorumluluk',
      description: 'Çevre dostu hizmet anlayışı ödülü'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ankara Usta Bul Hakkında
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Ankara'da güvenilir ustalar ve kaliteli hizmet arayanlar için kurulmuş 
            dijital platform. 2020'den beri müşteri memnuniyeti odaklı hizmet veriyoruz.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>2020'den beri</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Ankara merkezli</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>50+ çalışan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Misyonumuz</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Ankara'da yaşayan insanların güvenilir, kaliteli ve hızlı hizmet alabilmeleri için 
                teknoloji odaklı bir platform sunmak. Ustalar ve müşteriler arasında güvenilir 
                bir köprü kurarak, her iki tarafın da memnun kalacağı bir hizmet ekosistemi oluşturmak.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Güvenilir usta ağı</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Kaliteli hizmet garantisi</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">7/24 müşteri desteği</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-sky-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Vizyonumuz</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Türkiye'nin en güvenilir ve kapsamlı hizmet platformu olmak. 
                Teknoloji ve kaliteli hizmet anlayışımızla, tüm Türkiye'de 
                benzer platformların öncüsü olmak ve sektörde standart belirlemek.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Türkiye geneli hizmet</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Teknoloji liderliği</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Sektör standardı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Rakamlarla Ankara Usta Bul
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Kısa sürede elde ettiğimiz başarılar ve güvenilir hizmet anlayışımızla 
              Ankara'nın en tercih edilen platformu olduk.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{stat.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Değerlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Çalışma prensiplerimizi ve değerlerimizi sizlerle paylaşıyoruz. 
              Bu değerler her kararımızın temelini oluşturuyor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-center">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Hikayemiz
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Nasıl başladık, neler yaşadık ve nereye geldik
              </p>
            </div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ekibimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Deneyimli ve uzman kadromuzla sizlere en iyi hizmeti sunuyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.position}</p>
                <p className="text-gray-600 mb-4 leading-relaxed">{member.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div><strong>Deneyim:</strong> {member.experience}</div>
                  <div><strong>Eğitim:</strong> {member.education}</div>
                  <div><strong>Uzmanlık:</strong> {member.expertise}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Başarılarımız ve Ödüllerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Çalışmalarımızın karşılığını aldığımız ödüller ve başarılar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-sky-50 p-8 rounded-2xl border border-blue-200 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{achievement.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Siz de Ankara Usta Bul Ailesine Katılın
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Güvenilir ustalarımızla tanışın veya kendi hizmetinizi ekleyerek 
            daha fazla müşteriye ulaşın.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/firma-ekle"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Firma/Usta Ekle
            </Link>
            <Link
              href="/iletisim"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 