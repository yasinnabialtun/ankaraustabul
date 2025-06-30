'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Phone, Mail, MapPin, Clock, Shield, 
  Star, Users, Award, Building, Heart,
  Facebook, Twitter, Instagram, Linkedin,
  Youtube, ArrowRight, CheckCircle, Send
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Kategoriler', href: '/kategoriler' },
    { name: 'Firma/Usta Ekle', href: '/firma-ekle' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'İletişim', href: '/iletisim' },
    { name: 'Blog', href: '/blog' }
  ]

  const serviceCategories = [
    { name: 'Elektrik', href: '/kategori/elektrik' },
    { name: 'Su Tesisatı', href: '/kategori/su-tesisati' },
    { name: 'Temizlik', href: '/kategori/temizlik' },
    { name: 'Nakliye', href: '/kategori/nakliye' },
    { name: 'Bakım Onarım', href: '/kategori/bakim-onarim' },
    { name: 'Güvenlik', href: '/kategori/guvenlik' }
  ]

  const supportLinks = [
    { name: 'Yardım Merkezi', href: '/yardim' },
    { name: 'Sıkça Sorulan Sorular', href: '/sss' },
    { name: 'Güvenlik Politikası', href: '/guvenlik' },
    { name: 'Kullanım Şartları', href: '/kullanim-sartlari' },
    { name: 'Gizlilik Politikası', href: '/gizlilik' },
    { name: 'KVKK', href: '/kvkk' }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/ankaraustabul', color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/ankaraustabul', color: 'hover:bg-sky-500' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/ankaraustabul', color: 'hover:bg-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/ankaraustabul', color: 'hover:bg-blue-700' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/ankaraustabul', color: 'hover:bg-red-600' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Building className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ankara Usta Bul
                </h3>
                <p className="text-sm text-gray-400">Güvenilir Hizmet Platformu</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Ankara'nın en güvenilir usta ve firma platformu. 2,500+ doğrulanmış usta ile evinizdeki tüm işleriniz için profesyonel çözümler.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors duration-300 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-primary-400" />
                <span>+90 312 123 45 67</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors duration-300 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-primary-400" />
                <span>info@ankaraustabul.com</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors duration-300 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>Ankara, Türkiye</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors duration-300 cursor-pointer"
              >
                <Clock className="w-4 h-4 text-primary-400" />
                <span>7/24 Destek</span>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-gray-800 ${social.color} rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
              <ArrowRight className="w-5 h-5 mr-2 text-primary-400" />
              Hızlı Linkler
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Service Categories */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
              <Award className="w-5 h-5 mr-2 text-accent-400" />
              Hizmet Kategorileri
            </h4>
            <ul className="space-y-3">
              {serviceCategories.map((category, index) => (
                <motion.li 
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={category.href}
                    className="text-gray-300 hover:text-accent-400 transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>{category.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support & Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
              <Shield className="w-5 h-5 mr-2 text-success-400" />
              Destek & İletişim
            </h4>
            <ul className="space-y-3 mb-6">
              {supportLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-success-400 transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Newsletter */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 border border-gray-600 shadow-xl"
            >
              <h5 className="font-semibold mb-3 flex items-center">
                <Send className="w-4 h-4 mr-2 text-primary-400" />
                Bültenimize Katılın
              </h5>
              <p className="text-sm text-gray-400 mb-4">
                En son güncellemeleri ve özel teklifleri alın.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-500 text-white py-3 px-4 rounded-xl font-medium hover:from-primary-700 hover:to-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Abone Ol
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-gray-700 py-8 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">2,500+</div>
              <div className="text-sm text-gray-400">Kayıtlı Usta</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-success-600 to-success-700 rounded-xl flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">4.8/5</div>
              <div className="text-sm text-gray-400">Ortalama Puan</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-accent-600 to-accent-700 rounded-xl flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">25</div>
              <div className="text-sm text-gray-400">İlçe</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-warning-600 to-warning-700 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">30dk</div>
              <div className="text-sm text-gray-400">Ortalama Yanıt</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Ankara Usta Bul. Tüm hakları saklıdır.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/gizlilik" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-sartlari" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                Kullanım Şartları
              </Link>
              <Link href="/kvkk" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                KVKK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 