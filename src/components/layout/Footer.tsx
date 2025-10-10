import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, MessageCircle, FileText } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AU</span>
              </div>
              <span className="text-xl font-bold">Ankara Usta Bul</span>
            </div>
            <p className="text-gray-400 text-sm">
              Ankara'da güvenilir ve profesyonel ustaları bulmanın en kolay yolu. 
              Elektrik, su tesisatı, temizlik ve daha fazla hizmet için tek adres.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/ustalar" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Ustalar
                </Link>
              </li>
              <li>
                <Link href="/one-cikan-ustalar" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Öne Çıkan Ustalar
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors text-sm">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/usta-ekle" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Usta Ol
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hizmet Kategorileri</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ustalar?category=elektrik" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Elektrik
                </Link>
              </li>
              <li>
                <Link href="/ustalar?category=su-tesisati" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Su Tesisatı
                </Link>
              </li>
              <li>
                <Link href="/ustalar?category=temizlik" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Temizlik
                </Link>
              </li>
              <li>
                <Link href="/ustalar?category=mobilya" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Mobilya
                </Link>
              </li>
              <li>
                <Link href="/ustalar?category=tadilat" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Tadilat
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">+90 312 XXX XX XX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">info@ankaraustabul.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-1" />
                <span className="text-gray-400 text-sm">
                  Çankaya, Ankara<br />
                  Türkiye
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Ankara Usta Bul. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Gizlilik Politikası
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Kullanım Şartları
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                Çerez Politikası
              </Link>
              <a 
                href="https://www.ynadijital.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Web Tasarım
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}