import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Ankara Usta Bul',
  description: 'Ankara Usta Bul gizlilik politikası. Kişisel verilerinizin korunması ve kullanımı hakkında bilgiler.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Gizlilik Politikası
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Genel Bilgiler</h2>
              <p>
                Ankara Usta Bul olarak, kullanıcılarımızın gizliliğini korumak bizim için önemlidir. 
                Bu gizlilik politikası, web sitemizi kullanırken topladığımız bilgiler ve bu bilgilerin 
                nasıl kullanıldığı hakkında bilgi vermektedir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Toplanan Bilgiler</h2>
              <p>
                Web sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>İsim, e-posta adresi, telefon numarası gibi kişisel bilgiler</li>
                <li>IP adresi ve tarayıcı bilgileri</li>
                <li>Site kullanım verileri ve analitik bilgiler</li>
                <li>Çerezler ve benzeri teknolojiler aracılığıyla toplanan bilgiler</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Bilgilerin Kullanımı</h2>
              <p>
                Topladığımız bilgiler aşağıdaki amaçlarla kullanılabilir:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hizmetlerimizi sağlamak ve geliştirmek</li>
                <li>Kullanıcı deneyimini iyileştirmek</li>
                <li>İletişim ve destek hizmetleri sunmak</li>
                <li>Yasal yükümlülüklerimizi yerine getirmek</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Bilgilerin Paylaşımı</h2>
              <p>
                Kişisel bilgileriniz, yasal yükümlülüklerimiz dışında üçüncü taraflarla paylaşılmaz. 
                Ancak, hizmet sağlayıcılarımız ve iş ortaklarımızla sınırlı olarak paylaşılabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Güvenlik</h2>
              <p>
                Bilgilerinizin güvenliğini sağlamak için uygun teknik ve idari önlemler alınmaktadır. 
                Ancak, internet üzerinden veri aktarımının %100 güvenli olmadığını unutmayın.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Çerezler</h2>
              <p>
                Web sitemizde çerezler kullanılmaktadır. Çerez kullanımı hakkında daha fazla bilgi için 
                <Link href="/cookies" className="text-blue-600 hover:underline"> Çerez Politikası</Link> sayfamızı ziyaret edebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Haklarınız</h2>
              <p>
                KVKK kapsamında, kişisel verileriniz hakkında bilgi alma, düzeltme, silme ve itiraz etme 
                haklarınız bulunmaktadır. Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. İletişim</h2>
              <p>
                Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
              </p>
              <p className="mt-4">
                <strong>E-posta:</strong> info@ankaraustabul.com<br />
                <strong>Telefon:</strong> +90 312 XXX XX XX<br />
                <strong>Adres:</strong> Ankara, Türkiye
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Değişiklikler</h2>
              <p>
                Bu gizlilik politikası zaman zaman güncellenebilir. Değişiklikler web sitemizde yayınlandığı 
                tarihte yürürlüğe girer.
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

