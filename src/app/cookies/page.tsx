import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Çerez Politikası | Ankara Usta Bul',
  description: 'Ankara Usta Bul çerez politikası. Web sitemizde kullanılan çerezler ve amaçları hakkında bilgiler.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Çerez Politikası
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Çerez Nedir?</h2>
              <p>
                Çerezler, web sitelerini ziyaret ettiğinizde cihazınıza kaydedilen küçük metin dosyalarıdır. 
                Bu dosyalar, web sitesinin düzgün çalışmasını sağlar ve kullanıcı deneyimini iyileştirir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Çerez Türleri</h2>
              <p>Web sitemizde aşağıdaki çerez türleri kullanılmaktadır:</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Zorunlu Çerezler</h3>
              <p>
                Web sitesinin temel işlevlerini sağlamak için gereklidir. Bu çerezler olmadan web sitesi 
                düzgün çalışmaz.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Performans Çerezleri</h3>
              <p>
                Web sitesinin performansını analiz etmek ve kullanıcı deneyimini iyileştirmek için kullanılır.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">İşlevsellik Çerezleri</h3>
              <p>
                Tercihlerinizi hatırlamak ve kişiselleştirilmiş deneyim sunmak için kullanılır.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Hedefleme Çerezleri</h3>
              <p>
                İlginizi çekebilecek içerik ve reklamlar göstermek için kullanılır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Kullanılan Çerezler</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 mt-4">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Çerez Adı</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Amaç</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Süre</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm">session_id</td>
                      <td className="px-4 py-3 text-sm">Oturum yönetimi</td>
                      <td className="px-4 py-3 text-sm">Oturum süresi</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">preferences</td>
                      <td className="px-4 py-3 text-sm">Kullanıcı tercihleri</td>
                      <td className="px-4 py-3 text-sm">1 yıl</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">analytics</td>
                      <td className="px-4 py-3 text-sm">Site analizi</td>
                      <td className="px-4 py-3 text-sm">2 yıl</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Çerez Yönetimi</h2>
              <p>
                Tarayıcı ayarlarınızdan çerezleri yönetebilir, silebilir veya engelleyebilirsiniz. 
                Ancak, bazı çerezleri engellemek web sitesinin işlevselliğini etkileyebilir.
              </p>
              <p className="mt-4">
                <strong>Tarayıcı Ayarları:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Chrome: Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
                <li>Firefox: Seçenekler → Gizlilik ve Güvenlik → Çerezler</li>
                <li>Safari: Tercihler → Gizlilik → Çerezler</li>
                <li>Edge: Ayarlar → Gizlilik → Çerezler</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Üçüncü Taraf Çerezler</h2>
              <p>
                Web sitemizde Google Analytics gibi üçüncü taraf hizmetlerin çerezleri de kullanılabilir. 
                Bu çerezlerin kullanımı ilgili hizmet sağlayıcıların gizlilik politikalarına tabidir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. İletişim</h2>
              <p>
                Çerez politikamız hakkında sorularınız için:
              </p>
              <p className="mt-4">
                <strong>E-posta:</strong> info@ankaraustabul.com<br />
                <strong>Telefon:</strong> +90 312 XXX XX XX
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Güncellemeler</h2>
              <p>
                Bu çerez politikası zaman zaman güncellenebilir. Güncel versiyon web sitemizde yayınlanır.
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

