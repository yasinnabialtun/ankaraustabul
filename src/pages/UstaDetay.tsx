import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Star, ArrowLeft, MessageCircle, Award, Users, CheckCircle, Shield, Zap, Heart, Sparkles, TrendingUp } from 'lucide-react';
import { ustaService } from '../services/ustaService';
import type { Usta } from '../types';
import analyticsService from '../services/analyticsService';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';

function UstaDetay() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [usta, setUsta] = useState<Usta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    analyticsService.trackPageView('usta-detay');
    const loadUsta = async () => {
      if (id) {
        try {
          setLoading(true);
          setError(null);
          const ustaData = await ustaService.getUstaById(id);
          setUsta(ustaData);
        } catch (error) {
          console.error('Usta yüklenemedi:', error);
          setError('Usta bilgileri yüklenirken bir hata oluştu.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Geçersiz usta ID\'si.');
        setLoading(false);
      }
    };

    loadUsta();
  }, [id]);

  const handleCall = () => {
    if (usta) {
      window.open(`tel:${usta.phone}`);
      analyticsService.trackSimpleEvent('usta_call');
    }
  };

  const handleWhatsApp = () => {
    if (usta) {
      const message = `Merhaba ${usta.name}, hizmetiniz hakkında bilgi almak istiyorum.`;
      const whatsappUrl = `https://wa.me/${usta.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl);
      analyticsService.trackSimpleEvent('usta_whatsapp');
    }
  };

  const handleEmail = () => {
    if (usta) {
      const subject = 'Hizmet Talebi';
      const body = `Merhaba ${usta.name},\n\nHizmetiniz hakkında bilgi almak istiyorum.\n\nSaygılarımla.`;
      window.open(`mailto:${usta.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      analyticsService.trackSimpleEvent('usta_email');
    }
  };

  const structuredData = usta ? {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': usta.name,
    'jobTitle': `${usta.category} Ustası`,
    'description': `${usta.category} hizmeti veren güvenilir usta`,
    'telephone': usta.phone,
    'email': usta.email,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': usta.location,
      'addressRegion': 'Ankara',
      'addressCountry': 'TR'
    },
    'knowsAbout': usta.specialties,
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `${usta.category} Hizmetleri`,
      'itemListElement': usta.specialties.map(specialty => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': specialty
        }
      }))
    }
  } : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-gray-600 text-lg">Usta bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !usta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-6">
            <Users className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Usta Bulunamadı</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            {error || 'Aradığınız usta bulunamadı veya kaldırılmış olabilir.'}
          </p>
          <Button
            onClick={() => navigate('/ustalar')}
            icon={<ArrowLeft className="w-5 h-5" />}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Tüm Ustaları Gör
          </Button>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: Award, value: usta.experience, label: 'Deneyim', color: 'blue' },
    { icon: Users, value: `${usta.completedJobs}+`, label: 'Tamamlanan İş', color: 'green' },
    { icon: Star, value: usta.rating, label: 'Puan', color: 'yellow' },
    { icon: Clock, value: usta.responseTime, label: 'Yanıt Süresi', color: 'purple' }
  ];

  const features = [
    {
      icon: Shield,
      title: "Güvenilir",
      description: "Kimlik doğrulaması yapılmış"
    },
    {
      icon: Zap,
      title: "Hızlı",
      description: "Hızlı yanıt süresi"
    },
    {
      icon: Heart,
      title: "Kaliteli",
      description: "Yüksek müşteri memnuniyeti"
    }
  ];

  return (
    <>
      <SEO 
        title={`${usta.name} - ${usta.category} Ustası`}
        description={`${usta.name} - Ankara'da ${usta.category.toLowerCase()} hizmeti veren güvenilir usta. ${usta.experience} deneyim, ${usta.hourlyRate} saatlik ücret.`}
        keywords={`${usta.name}, ${usta.category.toLowerCase()}, usta, ankara, ${usta.specialties.join(', ')}`}
        structured={structuredData || undefined}
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
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Usta Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex-shrink-0"
              >
                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl">
                  <Users className="w-16 h-16 lg:w-20 lg:h-20" />
                </div>
              </motion.div>
              
              {/* Usta Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 text-center lg:text-left"
              >
                <Badge variant="white" className="mb-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {usta.category} Ustası
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  {usta.name}
                </h1>
                
                <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                  {usta.specialties.join(' • ')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    onClick={handleCall}
                    size="lg"
                    icon={<Phone className="w-5 h-5" />}
                    className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
                  >
                    Hemen Ara
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    variant="outline"
                    size="lg"
                    icon={<MessageCircle className="w-5 h-5" />}
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    WhatsApp
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Stats Section */}
        <Section className="py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
                  stat.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                  'bg-gradient-to-br from-blue-500 to-blue-600'
                }`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Main Content */}
        <Section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Usta Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className="border-0 bg-white shadow-2xl">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Hakkında</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Award className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Deneyim</p>
                          <p className="text-gray-600">{usta.experience}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Konum</p>
                          <p className="text-gray-600">{usta.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <Clock className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Saatlik Ücret</p>
                          <p className="text-gray-600">{usta.hourlyRate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Specialties Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="border-0 bg-white shadow-2xl">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Uzmanlık Alanları</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {usta.specialties.map((specialty, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{specialty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Contact & Features */}
            <div className="space-y-8">
              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className="border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-6">İletişim</h3>
                    <div className="space-y-4">
                      <Button
                        onClick={handleCall}
                        variant="white"
                        size="lg"
                        icon={<Phone className="w-5 h-5" />}
                        className="w-full"
                      >
                        {usta.phone}
                      </Button>
                      <Button
                        onClick={handleWhatsApp}
                        variant="outline"
                        size="lg"
                        icon={<MessageCircle className="w-5 h-5" />}
                        className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                      >
                        WhatsApp
                      </Button>
                      <Button
                        onClick={handleEmail}
                        variant="outline"
                        size="lg"
                        icon={<Mail className="w-5 h-5" />}
                        className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                      >
                        E-posta
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Features Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="border-0 bg-white shadow-2xl">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Özellikler</h3>
                    <div className="space-y-4">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                            <feature.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{feature.title}</p>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* CTA Section */}
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Hemen İletişime Geçin
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                {usta.name} ile iletişime geçerek {usta.category.toLowerCase()} hizmetiniz için 
                <span className="font-semibold text-white"> profesyonel destek</span> alın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleCall}
                  size="xl"
                  icon={<Phone className="w-6 h-6" />}
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
                >
                  Hemen Ara
                </Button>
                <Button
                  onClick={() => navigate('/ustalar')}
                  variant="outline"
                  size="xl"
                  icon={<TrendingUp className="w-6 h-6" />}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Diğer Ustalar
                </Button>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </>
  );
}

export default UstaDetay; 