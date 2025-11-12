import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kullanım Şartları | Ankara Usta Bul',
  description: 'Ankara Usta Bul kullanım şartları. Web sitemizi kullanırken uyulması gereken kurallar ve şartlar.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Kullanım Şartları
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Genel Hükümler</h2>
              <p>
                Ankara Usta Bul web sitesini kullanarak, aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. 
                Bu şartları kabul etmiyorsanız, lütfen web sitesini kullanmayın.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Hizmet Tanımı</h2>
              <p>
                Ankara Usta Bul, Ankara'da hizmet veren ustalar ve hizmet arayan kullanıcılar arasında 
                bir platform sağlar. Platform, usta bilgileri, iletişim bilgileri ve hizmet detayları 
                sunmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Kullanıcı Yükümlülükleri</h2>
              <p>Kullanıcılar aşağıdaki yükümlülüklere uymalıdır:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Doğru ve güncel bilgiler sağlamak</li>
                <li>Yanıltıcı veya yanlış bilgi paylaşmamak</li>
                <li>Başkalarının haklarını ihlal etmemek</li>
                <li>Yasalara ve düzenlemelere uymak</li>
                <li>Platformu kötüye kullanmamak</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Usta Kayıtları</h2>
              <p>
                Platforma usta olarak kayıt olan kişiler, sağladıkları bilgilerin doğruluğundan sorumludur. 
                Yanlış veya yanıltıcı bilgi veren hesaplar askıya alınabilir veya silinebilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Fikri Mülkiyet</h2>
              <p>
                Web sitesindeki tüm içerik, tasarım, logo ve markalar Ankara Usta Bul'a aittir. 
                İzinsiz kullanım yasaktır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Sorumluluk Reddi</h2>
              <p>
                Ankara Usta Bul, platform üzerinden sağlanan hizmetlerin kalitesi veya sonuçlarından 
                sorumlu değildir. Usta ve müşteri arasındaki anlaşmalar taraflar arasındadır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Hizmet Değişiklikleri</h2>
              <p>
                Ankara Usta Bul, herhangi bir zamanda hizmetleri değiştirme, askıya alma veya sonlandırma 
                hakkını saklı tutar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. İletişim</h2>
              <p>
                Kullanım şartları hakkında sorularınız için:
              </p>
              <p className="mt-4">
                <strong>E-posta:</strong> info@ankaraustabul.com<br />
                <strong>Telefon:</strong> +90 312 XXX XX XX
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Değişiklikler</h2>
              <p>
                Bu kullanım şartları zaman zaman güncellenebilir. Güncel versiyon web sitemizde yayınlanır.
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

