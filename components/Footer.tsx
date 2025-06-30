'use client'

import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ankara Usta Bul</h3>
            <p className="text-gray-300">
              Ankara'nın en güvenilir usta ve firma platformu.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white">Ana Sayfa</Link></li>
              <li><Link href="/kategoriler" className="text-gray-300 hover:text-white">Kategoriler</Link></li>
              <li><Link href="/hakkimizda" className="text-gray-300 hover:text-white">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="text-gray-300 hover:text-white">İletişim</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hizmetler</h4>
            <ul className="space-y-2">
              <li><Link href="/kategori/elektrik" className="text-gray-300 hover:text-white">Elektrik</Link></li>
              <li><Link href="/kategori/su-tesisati" className="text-gray-300 hover:text-white">Su Tesisatı</Link></li>
              <li><Link href="/kategori/temizlik" className="text-gray-300 hover:text-white">Temizlik</Link></li>
              <li><Link href="/kategori/nakliye" className="text-gray-300 hover:text-white">Nakliye</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">İletişim</h4>
            <div className="space-y-2 text-gray-300">
              <p>+90 312 123 45 67</p>
              <p>info@ankaraustabul.com</p>
              <p>Ankara, Türkiye</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Ankara Usta Bul. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 