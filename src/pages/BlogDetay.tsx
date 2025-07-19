import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Heart, BookOpen, ArrowRight, MessageCircle } from 'lucide-react';
import { blogPosts } from '../data';

function BlogDetay() {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);

  const post = blogPosts.find((p: any) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Yazısı Bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız blog yazısı mevcut değil.</p>
          <Link
            to="/blog"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Blog Listesine Dön
          </Link>
        </div>
      </div>
    );
  }

  // Related posts (same category)
  const relatedPosts = blogPosts
    .filter((p: any) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/blog"
                className="flex items-center text-blue-100 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Blog Listesine Dön
              </Link>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleFavorite}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
                <BookOpen className="w-12 h-12" />
              </div>
              <div className="flex items-center justify-center gap-4 mb-6 text-blue-100">
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  <span>{post.category}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{post.readTime} dk okuma</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in leading-tight">
                {post.title}
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed animate-fade-in-delay max-w-3xl mx-auto">
                {post.content.substring(0, 150)}...
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 animate-fade-in-delay-2">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in-up">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Giriş</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {post.content}
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Ana İçerik</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Ev ve işyeri bakımı konusunda uzman tavsiyeleri ve pratik çözümler sunuyoruz. 
                    Bu yazımızda, {post.category.toLowerCase()} konusunda dikkat edilmesi gereken 
                    önemli noktaları ve profesyonel ipuçlarını paylaşıyoruz.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mb-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Önemli Not</h3>
                    <p className="text-blue-700">
                      Bu yazıda paylaşılan bilgiler genel bilgilendirme amaçlıdır. 
                      Özel durumlarınız için mutlaka uzman bir usta ile görüşmenizi öneririz.
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Uzman Tavsiyeleri</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-3">✅ Doğru Yaklaşım</h4>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Düzenli bakım yapın</li>
                        <li>• Kaliteli malzeme kullanın</li>
                        <li>• Uzman desteği alın</li>
                        <li>• Güvenlik önlemlerini unutmayın</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-red-800 mb-3">❌ Kaçınılması Gerekenler</h4>
                      <ul className="text-red-700 space-y-2">
                        <li>• Amatör işçilik</li>
                        <li>• Kalitesiz malzeme</li>
                        <li>• Güvenlik ihmali</li>
                        <li>• Plansız işlemler</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Sonuç</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {post.category} konusunda bilgi sahibi olmak, ev ve işyerinizin 
                    bakımını doğru şekilde yapmanızı sağlar. Bu yazımızda paylaştığımız 
                    bilgiler ışığında, ihtiyaçlarınız için en uygun çözümü bulabilirsiniz.
                  </p>
                </div>
              </div>

              {/* Article Footer */}
              <div className="border-t border-gray-200 pt-8 mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleFavorite}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isFavorite 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                      <span>{isFavorite ? 'Favorilere Eklendi' : 'Favorilere Ekle'}</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Paylaş</span>
                    </button>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{post.readTime} dakika okuma süresi</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Author Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in-up">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Yazar Hakkında</h3>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{post.author}</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {post.category} konusunda uzmanlaşmış deneyimli yazarımız. 
                    Ev ve işyeri bakımı konusunda pratik çözümler ve uzman tavsiyeleri sunmaktadır.
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>İletişime Geç</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Benzer Yazılar
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Aynı kategorideki diğer blog yazılarımızı da inceleyebilirsiniz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: any, index: number) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-300">📖</div>
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {relatedPost.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {relatedPost.readTime} dk
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(relatedPost.date)}</span>
                      <span className="mx-2">•</span>
                      <User className="w-4 h-4 mr-2" />
                      <span>{relatedPost.author}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                      {relatedPost.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                        <span className="font-semibold">Devamını Oku</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{relatedPost.readTime} dk</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Usta mı Arıyorsunuz?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Blog yazımızı okuduktan sonra, ihtiyacınız olan ustayı bulmak için 
            sitemizi kullanabilirsiniz. Deneyimli ve güvenilir ustalarımız size yardımcı olacaktır.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ustalar"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Usta Ara
            </Link>
            <Link
              to="/kategoriler"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-400 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Kategorileri Gör
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogDetay;