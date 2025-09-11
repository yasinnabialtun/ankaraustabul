import { useEffect } from 'react';
import React, { useEffect } from 'react';
import { Users, Award, Shield, Heart, Target, Zap, Star, CheckCircle, MapPin, Phone, Mail, Clock, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import analyticsService from '../services/analyticsService';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';

function Hakkimizda() {
  useEffect(() => {
    analyticsService.trackPageView('hakkimizda');
  }, []);

  const stats = [
    { icon: Users, value: '1000+', label: 'Kayıtlı Usta', color: 'blue' },
    { icon: Award, value: '5000+', label: 'Tamamlanan İş', color: 'green' },
    { icon: Star, value: '4.9', label: 'Ortalama Puan', color: 'yellow' },
    { icon: Heart, value: '98%', label: 'Müşteri Memnuniyeti', color: 'red' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Güvenilirlik',
      description: 'Tüm ustalarımızı detaylı şekilde kontrol ediyor ve güvenilirliklerini garanti ediyoruz.',
      color: 'blue'
    },
    {
      icon: Target,
      title: 'Kalite',
      description: 'En yüksek kalitede hizmet sunmak için sürekli olarak ustalarımızı değerlendiriyoruz.',
      color: 'green'
    },
    {
      icon: Zap,
      title: 'Hız',
      description: 'Hızlı yanıt süreleri ve zamanında hizmet sunma konusunda hassasiyet gösteriyoruz.',
      color: 'yellow'
    },
    {
      icon: Heart,
      title: 'Müşteri Odaklılık',
      description: 'Müşteri memnuniyeti bizim için en önemli önceliktir.',
      color: 'red'
    }
  ];

  const team = [
    {
      name: 'Ahmet Yılmaz',
      role: 'Kurucu & CEO',
      image: '/images/team/ceo.jpg',
      description: '10+ yıl teknoloji ve hizmet sektörü deneyimi',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'ahmet@ankaraustabul.com'
      }
    },
    {
      name: 'Ayşe Demir',
      role: 'Operasyon Müdürü',
      image: '/images/team/operations.jpg',
      description: 'Usta kalite kontrolü ve müşteri hizmetleri uzmanı',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'ayse@ankaraustabul.com'
      }
    },
    {
      name: 'Mehmet Kaya',
      role: 'Teknoloji Müdürü',
      image: '/images/team/tech.jpg',
      description: 'Platform geliştirme ve teknoloji altyapısı',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mehmet@ankaraustabul.com'
      }
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Platform Kuruluşu',
      description: 'Ankara Usta Bul platformu kuruldu ve ilk ustalar kayıt oldu.'
    },
    {
      year: '2021',
      title: '1000+ Usta',
      description: 'Platformda 1000\'den fazla güvenilir usta kayıt oldu.'
    },
    {
      year: '2022',
      title: 'Mobil Uygulama',
      description: 'iOS ve Android mobil uygulamaları yayınlandı.'
    },
    {
      year: '2023',
      title: '5000+ İş',
      description: '5000\'den fazla başarılı iş tamamlandı.'
    },
    {
      year: '2024',
      title: 'Yeni Özellikler',
      description: 'Canlı destek, video görüşme ve gelişmiş filtreleme eklendi.'
    }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Ankara Usta Bul',
    'description': "Ankara'da güvenilir usta arama platformu",
    'url': 'https://ankaraustabul.com',
    'logo': 'https://ankaraustabul.com/images/logo.png',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+90-312-XXX-XXXX',
      'contactType': 'customer service',
      'areaServed': 'TR',
      'availableLanguage': 'Turkish'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Ankara',
      'addressRegion': 'Ankara',
      'addressCountry': 'TR'
    },
    'sameAs': [
      'https://facebook.com/ankaraustabul',
      'https://twitter.com/ankaraustabul',
      'https://instagram.com/ankaraustabul'
    ]
  };

  return (
    <>
      <SEO 
        title="Hakkımızda - Ankara Usta Bul"
        description="Ankara'da güvenilir usta arama platformu. Misyonumuz, kaliteli hizmet sunan ustalar ile müşterileri buluşturmak."
        keywords="ankara usta platformu, güvenilir usta, hizmet kalitesi, müşteri memnuniyeti"
        structured={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <Section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="white" className="mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Hakkımızda
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Ankara'nın En Güvenilir
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Usta Platformu
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                2020 yılından bu yana Ankara'da güvenilir usta arama platformu olarak 
                <span className="font-semibold text-white"> kaliteli hizmet</span> sunuyoruz.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="white"
                  size="lg"
                  icon={<TrendingUp className="w-5 h-5" />}
                >
                  İstatistiklerimizi Görün
                </Button>
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  İletişime Geçin
                </Button>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Stats Section */}
        <Section id="stats" className="py-20">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              Başarılarımız
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Rakamlarla Başarılarımız
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Yılların deneyimi ve güvenilir hizmet anlayışımızla elde ettiğimiz başarılar
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                                   <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg ${
                     stat.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                     stat.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                     stat.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                     stat.color === 'red' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                     'bg-gradient-to-br from-blue-500 to-blue-600'
                   }`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Mission & Vision */}
        <Section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full border-0 bg-white shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Ankara'da yaşayan insanların güvenilir, kaliteli ve hızlı hizmet alabilmeleri için 
                  profesyonel ustalar ile müşterileri buluşturmak. Teknoloji ve güvenilirlik odaklı 
                  yaklaşımımızla sektörde öncü olmak.
                </p>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full border-0 bg-white shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Türkiye'nin en güvenilir ve kullanıcı dostu usta arama platformu olmak. 
                  Teknoloji ve inovasyon ile hizmet kalitesini sürekli artırarak, 
                  müşteri memnuniyetinde sektör lideri olmak.
                </p>
              </Card>
            </motion.div>
          </div>
        </Section>

        {/* Values Section */}
        <Section className="py-20">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Değerlerimiz
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Temel Değerlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Her işimizde bizi yönlendiren temel değerler ve prensiplerimiz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                                     <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg ${
                     value.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                     value.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                     value.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                     value.color === 'red' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                     'bg-gradient-to-br from-blue-500 to-blue-600'
                   }`}>
                    <value.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Timeline Section */}
        <Section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              <Clock className="w-4 h-4 mr-2" />
              Yolculuğumuz
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Başarı Yolculuğumuz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              2020'den bugüne kadar geçirdiğimiz önemli dönüm noktaları
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 hidden lg:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className="flex-1 lg:pr-8 lg:pl-0">
                    <Card className="border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <Badge variant="primary" className="mr-3">
                            {milestone.year}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </Card>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden lg:flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg z-10">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 lg:pl-8 lg:pr-0" />
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Team Section */}
        <Section className="py-20">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Users className="w-4 h-4 mr-2" />
              Ekibimiz
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Uzman Ekibimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Platformumuzun başarısı için çalışan deneyimli ve uzman ekibimiz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden group">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Users className="w-16 h-16" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {member.description}
                  </p>
                  
                  <div className="flex justify-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`mailto:${member.social.email}`, '_self')}
                      icon={<Mail className="w-4 h-4" />}
                    >
                      İletişim
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <Badge variant="white" className="mb-4">
                <Phone className="w-4 h-4 mr-2" />
                İletişim
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Bizimle İletişime Geçin
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Sorularınız için bize ulaşın, size yardımcı olmaktan mutluluk duyarız
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Telefon</h3>
                <p className="text-blue-100">+90 (312) XXX XX XX</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">E-posta</h3>
                <p className="text-blue-100">info@ankaraustabul.com</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Adres</h3>
                <p className="text-blue-100">Çankaya, Ankara, Türkiye</p>
              </motion.div>
            </div>
            
            <div className="text-center mt-12">
              <Button
                onClick={() => window.location.href = '/iletisim'}
                size="xl"
                icon={<ArrowRight className="w-6 h-6" />}
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
              >
                İletişim Sayfasına Git
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

export default Hakkimizda;
