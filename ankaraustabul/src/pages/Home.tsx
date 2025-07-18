import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Grid3X3, 
  Clock, 
  TrendingUp, 
  Shield, 
  Zap, 
  CheckCircle,
  Star,
  ArrowRight,
  Calendar,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Award,
  Heart,
  ThumbsUp,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import SearchForm from '../components/SearchForm';
import KategoriCard from '../components/KategoriCard';
import LiveActivity from '../components/LiveActivity';
import { istatistikler, populerKategoriler, musteriYorumlari, oneCikanOzellikler, blogYazilari, ustalar } from '../data';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Öne çıkan ustalar (sadece ücretli ilan sahipleri)
  const oneCikanUstalar = ustalar
    .filter((u) => u.ilanPaketi === 'premium' || u.ilanPaketi === 'vip')
    .sort((a, b) => b.puan - a.puan)
    .slice(0, 6);

  // Otomatik slider
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(oneCikanUstalar.length / 3));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, oneCikanUstalar.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(oneCikanUstalar.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.ceil(oneCikanUstalar.length / 3) - 1 : prev - 1
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full float-animation"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full float-animation" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full float-animation" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white rounded-full float-animation" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-shadow-lg">
              Ankara'da
              <span className="block text-yellow-300">Güvenilir Usta</span>
              Bulmanın En Kolay Yolu
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-shadow">
              Elektrikçiden tesisatçıya, boyacıdan temizlikçiye kadar 
              tüm ihtiyaçlarınız için uzman ustalar bir tık uzağınızda.
            </p>
            
            {/* İstatistikler */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="stats-card">
                <Users className="mx-auto mb-2 text-yellow-300" size={32} />
                <div className="text-2xl font-bold">{istatistikler.toplamUsta}+</div>
                <div className="text-sm opacity-90">Uzman Usta</div>
              </div>
              <div className="stats-card">
                <Grid3X3 className="mx-auto mb-2 text-yellow-300" size={32} />
                <div className="text-2xl font-bold">{istatistikler.kategoriSayisi}</div>
                <div className="text-sm opacity-90">Hizmet Kategorisi</div>
              </div>
              <div className="stats-card">
                <Clock className="mx-auto mb-2 text-yellow-300" size={32} />
                <div className="text-2xl font-bold">{istatistikler.yediYirmidortHizmet}</div>
                <div className="text-sm opacity-90">7/24 Hizmet</div>
              </div>
              <div className="stats-card">
                <TrendingUp className="mx-auto mb-2 text-yellow-300" size={32} />
                <div className="text-2xl font-bold">%{istatistikler.memnuniyetOrani}</div>
                <div className="text-sm opacity-90">Memnuniyet</div>
              </div>
            </div>

            {/* Canlı İstatistikler */}
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center justify-center space-x-4 text-white">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">247 aktif kullanıcı</span>
                  </div>
                  <div className="text-white/70">•</div>
                  <div className="text-sm text-white/80">Son 5 dk: 23 arama</div>
                </div>
              </div>
            </div>
          </div>

          {/* Arama Formu */}
          <div className="max-w-4xl mx-auto">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Popüler Kategoriler */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popüler <span className="gradient-text">Hizmet Kategorileri</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              En çok talep gören hizmetlerimiz ve uzman ustalarımız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {populerKategoriler.map((kategori) => (
              <KategoriCard key={kategori.id} kategori={kategori} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/kategoriler" className="btn-primary inline-flex items-center space-x-2">
              <span>Tüm Kategorileri Görüntüle</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Ustalar Slider */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Öne Çıkan <span className="gradient-text">Ustalar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              En yüksek puanlı ve güvenilir ustalarımız
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative">
            {/* Slider */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(oneCikanUstalar.length / 3) }, (_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {oneCikanUstalar.slice(slideIndex * 3, (slideIndex + 1) * 3).map((usta) => (
                        <div key={usta.id} className="business-card p-6 hover-lift relative overflow-hidden">
                          {/* Premium/VIP Background Effect */}
                          {usta.ilanPaketi === 'vip' && (
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                          )}
                          {usta.ilanPaketi === 'premium' && (
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600"></div>
                          )}
                          
                          {/* VIP/Premium Üyelik Rozeti */}
                          {usta.ilanPaketi && (
                            <div className="absolute top-4 right-4">
                              {usta.ilanPaketi === 'vip' ? (
                                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                  VIP ÜYE
                                </div>
                              ) : (
                                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                  PREMIUM ÜYE
                                </div>
                              )}
                            </div>
                          )}

                          {/* Usta Resmi ve Bilgileri */}
                          <div className="flex items-center mb-4 mt-2">
                            <div className="relative">
                              <img
                                src={usta.resim}
                                alt={`${usta.ad} ${usta.soyad}`}
                                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-200"
                              />
                              {usta.ilanPaketi && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-bold text-yellow-800">⭐</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{usta.ad} {usta.soyad}</h3>
                              <p className="text-gray-600 text-sm">{usta.hizmetler.join(', ')}</p>
                              <div className="flex items-center mt-1">
                                <span className="text-xs text-gray-500">{usta.ilce}</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-xs text-gray-500">{usta.deneyim} yıl deneyim</span>
                              </div>
                            </div>
                          </div>

                          {/* Puan ve Yorum */}
                          <div className="flex items-center mb-3">
                            <div className="flex items-center mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(usta.puan) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {usta.puan} ({usta.yorumSayisi} yorum)
                            </span>
                          </div>

                          {/* Üyelik Özellikleri */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {usta.ilanPaketi === 'vip' && (
                              <>
                                <span className="badge badge-purple text-xs">Maksimum Görünürlük</span>
                                <span className="badge badge-purple text-xs">Özel Destek</span>
                                <span className="badge badge-purple text-xs">Reklam Kredisi</span>
                                <span className="badge badge-green text-xs">WhatsApp Entegrasyonu</span>
                              </>
                            )}
                            {usta.ilanPaketi === 'premium' && (
                              <>
                                <span className="badge badge-primary text-xs">Öne Çıkan İlan</span>
                                <span className="badge badge-primary text-xs">Üst Sıralama</span>
                                <span className="badge badge-primary text-xs">Özel Rozet</span>
                                <span className="badge badge-green text-xs">WhatsApp Entegrasyonu</span>
                              </>
                            )}
                            {usta.acilServis && (
                              <span className="badge badge-success text-xs">7/24</span>
                            )}
                            {usta.garanti && (
                              <span className="badge badge-warning text-xs">Garantili</span>
                            )}
                            <span className="badge badge-info text-xs">{usta.hizmetler[0]}</span>
                          </div>

                          {/* İletişim Butonları */}
                          <div className="flex gap-2">
                            <Link
                              to={`/usta/${usta.id}`}
                              className="btn-primary text-sm py-2 px-4 flex-1 text-center"
                            >
                              Detayları Gör
                            </Link>
                            <a
                              href={`tel:${usta.telefon}`}
                              className="btn-secondary text-sm py-2 px-4"
                            >
                              <Phone size={16} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Kontrolleri */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
            >
              <ChevronRight size={24} className="text-gray-600" />
            </button>

            {/* Slider Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(oneCikanUstalar.length / 3) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    i === currentSlide ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Tüm Ustalar Butonu */}
          <div className="text-center mt-12">
            <Link to="/ustalar" className="btn-secondary inline-flex items-center space-x-2">
              <span>Tüm Ustaları Görüntüle</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Özellikler */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden <span className="gradient-text">AnkaraUstaBul</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Güvenilir, hızlı ve kaliteli hizmet için doğru adrestesiniz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oneCikanOzellikler.map((ozellik) => (
              <div key={ozellik.id} className="feature-card">
                <div className={`w-16 h-16 bg-${ozellik.renk}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  {ozellik.icon === 'Clock' && <Clock className={`text-${ozellik.renk}-600`} size={32} />}
                  {ozellik.icon === 'Shield' && <Shield className={`text-${ozellik.renk}-600`} size={32} />}
                  {ozellik.icon === 'CheckCircle' && <CheckCircle className={`text-${ozellik.renk}-600`} size={32} />}
                  {ozellik.icon === 'TrendingUp' && <TrendingUp className={`text-${ozellik.renk}-600`} size={32} />}
                  {ozellik.icon === 'Zap' && <Zap className={`text-${ozellik.renk}-600`} size={32} />}
                  {ozellik.icon === 'Calendar' && <Calendar className={`text-${ozellik.renk}-600`} size={32} />}
                </div>
                <h3 className="text-xl font-semibold mb-4">{ozellik.baslik}</h3>
                <p className="text-gray-600">{ozellik.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Canlı Aktivite ve Blog Bölümü */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Canlı Aktivite */}
            <div className="lg:col-span-1">
              <LiveActivity />
            </div>

            {/* Blog Bölümü */}
            <div className="lg:col-span-3">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Son <span className="gradient-text">Blog Yazıları</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Ev bakımı, onarım ve hizmetler hakkında uzman tavsiyeleri
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {blogYazilari.slice(0, 3).map((blog) => (
                  <article key={blog.id} className="business-card hover-lift overflow-hidden">
                    {/* Blog Resmi */}
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={blog.resim}
                        alt={blog.baslik}
                        className="w-full h-full object-cover image-hover"
                      />
                    </div>

                    {/* Blog İçeriği */}
                    <div className="p-6">
                      {/* Kategori */}
                      <div className="mb-3">
                        <span className="badge badge-primary">{blog.kategori}</span>
                      </div>

                      {/* Başlık */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        <Link to={`/blog/${blog.slug}`} className="hover:text-primary-600 transition-colors">
                          {blog.baslik}
                        </Link>
                      </h3>

                      {/* Özet */}
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.ozet}
                      </p>

                      {/* Meta Bilgiler */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar size={16} />
                            <span>{formatDate(blog.tarih)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen size={16} />
                            <span>{blog.okumaSuresi} dk</span>
                          </div>
                        </div>
                      </div>

                      {/* Devamını Oku */}
                      <Link 
                        to={`/blog/${blog.slug}`}
                        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                      >
                        <span>Devamını Oku</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center">
                <Link to="/blog" className="btn-secondary inline-flex items-center space-x-2">
                  <span>Tüm Blog Yazılarını Görüntüle</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Müşteri Yorumları */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Müşteri <span className="gradient-text">Yorumları</span>
            </h2>
            <p className="text-xl text-gray-600">
              Memnun müşterilerimizin deneyimleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {musteriYorumlari.map((yorum) => (
              <div key={yorum.id} className="business-card p-8">
                <div className="flex items-center mb-4">
                  {[...Array(yorum.puan)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{yorum.yorum}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <div className="font-semibold">{yorum.ad}</div>
                      <div className="text-sm text-gray-500">{yorum.ilce}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">{yorum.hizmet}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İstatistikler Bölümü */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-yellow-300">Başarı</span> Hikayemiz
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ankara'nın en güvenilir usta bulma platformu olarak hizmet veriyoruz
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300 mb-2">{istatistikler.toplamUsta}+</div>
              <div className="text-gray-300">Kayıtlı Usta</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300 mb-2">{istatistikler.aylikMusteri}+</div>
              <div className="text-gray-300">Aylık Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300 mb-2">{istatistikler.gunlukHizmet}+</div>
              <div className="text-gray-300">Günlük Hizmet</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300 mb-2">%{istatistikler.memnuniyetOrani}</div>
              <div className="text-gray-300">Memnuniyet</div>
            </div>
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nasıl <span className="gradient-text">Çalışır?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              3 basit adımda usta bulun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary-800">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Hizmet Seçin</h3>
              <p className="text-gray-600">
                İhtiyacınız olan hizmet kategorisini seçin ve konumunuzu belirtin
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary-800">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Usta Seçin</h3>
              <p className="text-gray-600">
                Size en yakın ve en uygun ustaları inceleyin, puanlarına ve yorumlarına bakın
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary-800">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Hizmet Alın</h3>
              <p className="text-gray-600">
                Seçtiğiniz usta ile iletişime geçin ve kaliteli hizmet alın
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* İletişim Bilgileri */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="gradient-text">İletişim</span> Bilgileri
            </h2>
            <p className="text-xl text-gray-600">
              Bize ulaşın, size yardımcı olalım
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Telefon</h3>
              <p className="text-gray-600">0312 123 45 67</p>
              <p className="text-gray-600">7/24 Hizmet</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">E-posta</h3>
              <p className="text-gray-600">info@ankaraustabul.com</p>
              <p className="text-gray-600">Hızlı Yanıt</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Adres</h3>
              <p className="text-gray-600">Kızılay, Ankara</p>
              <p className="text-gray-600">Merkez Ofis</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Hemen Usta Bulmaya Başlayın
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Binlerce güvenilir usta arasından size en uygun olanı seçin. 
            Hızlı, güvenilir ve kaliteli hizmet garantisi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ustalar" className="btn-secondary">
              Usta Ara
            </Link>
            <Link to="/usta-ekle" className="btn-primary">
              Usta Ol
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;