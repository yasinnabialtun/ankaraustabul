import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import { BlogPost } from '../data/blogData';
import blogService from '../services/blogService';
import analyticsService from '../services/analyticsService';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';

function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    analyticsService.trackPageView('blog-detail');
    loadBlogPost();
  }, [slug]);

  const loadBlogPost = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const postData = await blogService.getBlogBySlug(slug);
      setPost(postData);
      
      if (postData) {
        // Related posts
        const allPosts = await blogService.getAllBlogs();
        const related = allPosts
          .filter(p => p.id !== postData.id && p.category === postData.category)
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } catch (err) {
      setError('Blog yazısı yüklenirken hata oluştu');
      console.error('Blog detail loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    }
  };

  const structuredData = post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'author': {
      '@type': 'Person',
      'name': post.author
    },
    'datePublished': post.publishedAt,
    'dateModified': post.updatedAt,
    'publisher': {
      '@type': 'Organization',
      'name': 'Ankara Usta Bul'
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://ankaraustabul.com/blog/${post.slug}`
    },
    'image': post.image,
    'keywords': post.tags.join(', ')
  } : undefined;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-gray-600 text-lg">Blog yazısı yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-6">
            <BookOpen className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Blog Yazısı Bulunamadı</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            {error || 'Aradığınız blog yazısı bulunamadı veya kaldırılmış olabilir.'}
          </p>
          <Button
            onClick={() => window.location.href = '/blog'}
            icon={<ArrowLeft className="w-5 h-5" />}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            Blog'a Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${post.title} - Ankara Usta Bul Blog`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        structured={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        {/* Hero Section */}
        <Section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-8">
                <Badge variant="white" className="mb-6">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {post.category}
                </Badge>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{post.readTime || '5 dk okuma'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.history.back()}
                  size="lg"
                  icon={<ArrowLeft className="w-5 h-5" />}
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
                >
                  Geri Dön
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="lg"
                  icon={<Share2 className="w-5 h-5" />}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Paylaş
                </Button>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Content Section */}
        <Section className="py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="border-0 bg-white shadow-2xl p-8">
                    {/* Featured Image */}
                    <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-8">
                      <BookOpen className="w-20 h-20" />
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="primary" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                      <div className="text-gray-700 leading-relaxed text-lg">
                        {post.content || (
                          <div className="space-y-6">
                            <p>
                              Bu blog yazısı Ankara ustaları ve ev bakımı hakkında faydalı bilgiler içermektedir. 
                              Profesyonel ustalarımızın deneyimlerini ve uzmanlıklarını paylaştığı bu içerik, 
                              ev sahiplerinin karşılaştığı yaygın sorunları çözmelerine yardımcı olmayı amaçlamaktadır.
                            </p>
                            <p>
                              Ev bakımı ve tamirat işlerinde dikkat edilmesi gereken önemli noktalar, 
                              doğru usta seçimi ve kaliteli hizmet alma konularında değerli ipuçları 
                              bu yazıda detaylı olarak ele alınmıştır.
                            </p>
                            <p>
                              Ankara'da güvenilir usta bulma konusunda yaşanan zorlukları anlayan 
                              platformumuz, hem ustalar hem de müşteriler için güvenli ve 
                              kaliteli bir ortam sağlamaktadır.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Author Info */}
                    <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                          <User className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{post.author}</h3>
                          <p className="text-gray-600">
                            Ankara Usta Bul platformunda uzman yazar ve ev bakımı konularında deneyimli profesyonel.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-8">
                {/* Share Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="border-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-6">Paylaş</h3>
                      <div className="space-y-3">
                        <Button
                          onClick={handleShare}
                          variant="white"
                          size="lg"
                          icon={<Share2 className="w-5 h-5" />}
                          className="w-full"
                        >
                          Paylaş
                        </Button>
                        <Button
                          onClick={() => window.print()}
                          variant="outline"
                          size="lg"
                          icon={<BookOpen className="w-5 h-5" />}
                          className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                        >
                          Yazdır
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
                
                {/* Stats Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="border-0 bg-white shadow-2xl">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">İstatistikler</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Görüntülenme</span>
                          <span className="font-bold text-gray-900">1.2K</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Beğeni</span>
                          <span className="font-bold text-gray-900">45</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Yorum</span>
                          <span className="font-bold text-gray-900">12</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Paylaşım</span>
                          <span className="font-bold text-gray-900">8</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </Section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <Section className="py-16 bg-gradient-to-br from-blue-50 to-white">
            <div className="text-center mb-16">
              <Badge variant="primary" className="mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                İlgili Yazılar
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Benzer İçerikler
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Bu kategoriye ait diğer faydalı blog yazıları
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <Card 
                      className="h-full cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden group"
                    >
                      <div className="relative">
                        <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                          <BookOpen className="w-16 h-16" />
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge 
                            variant="white" 
                            className="shadow-lg"
                          >
                            {relatedPost.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                          {relatedPost.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{relatedPost.author}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* CTA Section */}
        <Section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
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
                Daha Fazla İçerik mi Arıyorsunuz?
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Ankara ustaları ve ev bakımı hakkında 
                <span className="font-semibold text-white"> güncel bilgiler</span> için blogumuzu takip edin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/blog'}
                  size="xl"
                  icon={<BookOpen className="w-6 h-6" />}
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
                >
                  Tüm Yazılar
                </Button>
                <Button
                  onClick={() => window.location.href = '/ustalar'}
                  variant="outline"
                  size="xl"
                  icon={<TrendingUp className="w-6 h-6" />}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Usta Bul
                </Button>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </>
  );
}

export default BlogDetail; 