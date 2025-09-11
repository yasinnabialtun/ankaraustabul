import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Shield, Zap, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import Input from '../components/ui/Input';

function Iletisim() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      value: '+90 (312) XXX XX XX',
      description: '7/24 müşteri hizmetleri',
      color: 'blue'
    },
    {
      icon: Mail,
      title: 'E-posta',
      value: 'info@ankaraustabul.com',
      description: 'Hızlı yanıt garantisi',
      color: 'green'
    },
    {
      icon: MapPin,
      title: 'Adres',
      value: 'Çankaya, Ankara',
      description: 'Merkezi ofis',
      color: 'purple'
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      value: '7/24 Hizmet',
      description: 'Her zaman yanınızdayız',
      color: 'orange'
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Uzman Destek",
      description: "Deneyimli müşteri hizmetleri ekibimiz size yardımcı olur"
    },
    {
      icon: Shield,
      title: "Güvenli İletişim",
      description: "Tüm iletişim bilgileriniz güvenle korunur"
    },
    {
      icon: Zap,
      title: "Hızlı Yanıt",
      description: "En kısa sürede size geri dönüş yaparız"
    }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'İletişim - Ankara Usta Bul',
    'description': 'Ankara Usta Bul ile iletişime geçin. Telefon, e-posta ve adres bilgileri.',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Ankara Usta Bul',
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'telephone': '+90-312-XXX-XXXX',
          'contactType': 'customer service',
          'availableLanguage': 'Turkish',
          'hoursAvailable': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'opens': '00:00',
            'closes': '23:59'
          }
        },
        {
          '@type': 'ContactPoint',
          'email': 'info@ankaraustabul.com',
          'contactType': 'customer service'
        }
      ],
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Çankaya',
        'addressRegion': 'Ankara',
        'addressCountry': 'TR'
      }
    }
  };

  return (
    <>
      <SEO 
        title="İletişim - Ankara Usta Bul"
        description="Ankara Usta Bul ile iletişime geçin. Telefon, e-posta ve adres bilgileri ile bize ulaşın."
        keywords="ankara usta iletişim, telefon, e-posta, adres, müşteri hizmetleri"
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
                İletişim
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Bizimle İletişime
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Geçin
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Sorularınız, önerileriniz veya herhangi bir konuda yardıma ihtiyacınız varsa 
                <span className="font-semibold text-white"> bizimle iletişime geçin</span>. Size yardımcı olmaktan mutluluk duyarız.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Contact Info Section */}
        <Section className="py-20">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              <MessageSquare className="w-4 h-4 mr-2" />
              İletişim Bilgileri
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bize Ulaşın
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Size en hızlı ve etkili şekilde yardımcı olmak için buradayız
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${info.color}-500 to-${info.color}-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg`}>
                    <info.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {info.title}
                  </h3>
                  <p className="text-lg font-semibold text-blue-600 mb-2">
                    {info.value}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {info.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center border-0 bg-gradient-to-br from-gray-50 to-white shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Contact Form Section */}
        <Section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Send className="w-4 h-4 mr-2" />
                Mesaj Gönderin
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Mesaj Formu
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Aşağıdaki formu doldurarak bize mesaj gönderebilirsiniz. En kısa sürede size geri dönüş yaparız.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className="border-0 bg-white shadow-2xl p-8">
                  {success ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Mesajınız Gönderildi!
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Mesajınız başarıyla gönderildi. En kısa sürede size geri dönüş yapacağız.
                      </p>
                      <Button
                        onClick={() => setSuccess(false)}
                        variant="outline"
                        size="lg"
                      >
                        Yeni Mesaj Gönder
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ad Soyad *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Adınız ve soyadınız"
                            size="lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            E-posta *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="E-posta adresiniz"
                            size="lg"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Telefon
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Telefon numaranız"
                            size="lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Konu *
                          </label>
                          <Input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            placeholder="Mesaj konusu"
                            size="lg"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mesaj *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                          placeholder="Mesajınızı buraya yazın..."
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        loading={loading}
                        size="xl"
                        icon={<Send className="w-6 h-6" />}
                        className="w-full"
                      >
                        {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                      </Button>
                    </form>
                  )}
                </Card>
              </motion.div>
              
              {/* Map & Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Map Placeholder */}
                <Card className="border-0 bg-white shadow-2xl overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <MapPin className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Harita</h3>
                      <p className="text-blue-100">Çankaya, Ankara</p>
                    </div>
                  </div>
                </Card>
                
                {/* Additional Info */}
                <Card className="border-0 bg-white shadow-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Neden Bizi Seçmelisiniz?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Hızlı Yanıt</h4>
                        <p className="text-sm text-gray-600">24 saat içinde yanıt garantisi</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Uzman Destek</h4>
                        <p className="text-sm text-gray-600">Deneyimli müşteri hizmetleri</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Güvenli İletişim</h4>
                        <p className="text-sm text-gray-600">Kişisel bilgileriniz korunur</p>
                      </div>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Hemen Başlayın
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-10">
                Ankara'da güvenilir usta arama platformu ile ihtiyacınız olan tüm hizmetler için 
                <span className="font-semibold text-white"> profesyonel ustalarla</span> tanışın.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  onClick={() => window.location.href = '/ustalar'}
                  size="xl"
                  icon={<ArrowRight className="w-6 h-6" />}
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
                >
                  Usta Ara
                </Button>
                <Button
                  onClick={() => window.location.href = '/usta-ekle'}
                  variant="outline"
                  size="xl"
                  icon={<Users className="w-6 h-6" />}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Usta Ol
                </Button>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </>
  );
}

export default Iletisim;
