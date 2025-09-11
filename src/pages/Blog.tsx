import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, RefreshCw, BookOpen, Sparkles, TrendingUp, Filter } from 'lucide-react';
import { BlogPost } from '../data/blogData';
import blogService from '../services/blogService';
import analyticsService from '../services/analyticsService';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import Input from '../components/ui/Input';

function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    analyticsService.trackPageView('blog');
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const blogData = await blogService.getAllBlogs();
      setPosts(blogData);
      setFilteredPosts(blogData);
    } catch (err) {
      setError('Blog yazıları yüklenirken hata oluştu');
      console.error('Blog loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = posts;

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    // Kategori filtresi
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.category.toLowerCase().includes(selectedCategory.toLowerCase()),
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  // Kategorileri dinamik olarak oluştur
  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Ankara Usta Bul Blog',
    'description': 'Ankara ustaları hakkında faydalı bilgiler, ev bakımı ipuçları ve profesyonel tavsiyeler.',
    'url': 'https://ankaraustabul.com/blog',
    'publisher': {
      '@type': 'Organization',
      'name': 'Ankara Usta Bul'
    },
    'blogPost': posts.map(post => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.excerpt,
      'author': {
        '@type': 'Person',
        'name': post.author
      },
      'datePublished': post.publishedAt,
      'dateModified': post.updatedAt,
      'url': `https://ankaraustabul.com/blog/${post.slug}`
    }))
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-gray-600 text-lg">Blog yazıları yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-6">
            <BookOpen className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hata Oluştu</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            {error}
          </p>
          <Button
            onClick={loadBlogs}
            icon={<RefreshCw className="w-5 h-5" />}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            Tekrar Dene
          </Button>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: BookOpen, value: `${posts.length}+`, label: 'Blog Yazısı', color: 'blue' },
    { icon: User, value: '5+', label: 'Yazar', color: 'green' },
    { icon: TrendingUp, value: '10K+', label: 'Okuma', color: 'yellow' },
    { icon: Sparkles, value: '100%', label: 'Kaliteli İçerik', color: 'purple' }
  ];

  return (
    <>
      <SEO 
        title="Blog - Ankara Usta Bul"
        description="Ankara ustaları hakkında faydalı bilgiler, ev bakımı ipuçları ve profesyonel tavsiyeler."
        keywords="ankara usta blog, ev bakımı, tamir ipuçları, ustalık tavsiyeleri"
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
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="white" className="mb-6">
                <BookOpen className="w-4 h-4 mr-2" />
                Blog & Makaleler
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Ankara Usta
                <span className="block bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                  Blog
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Ankara ustaları hakkında faydalı bilgiler, ev bakımı ipuçları ve profesyonel tavsiyeler
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg"
                  icon={<BookOpen className="w-5 h-5" />}
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
                >
                  Yazıları Gör
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Ana Sayfa
                </Button>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Stats Section */}
        <Section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg ${
                  stat.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                  stat.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                  stat.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                  stat.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                  'bg-gradient-to-br from-blue-500 to-blue-600'
                }`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Search and Filters */}
        <Section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-0 bg-white shadow-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <Input
                      type="text"
                      placeholder="Blog yazılarında ara..."
                      value={searchTerm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      size="lg"
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  >
                    <option value="">Tüm Kategoriler</option>
                    {categories.filter(cat => cat !== 'all').map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  
                  {/* Clear Filters */}
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    size="lg"
                    icon={<Filter className="w-5 h-5" />}
                    className="w-full"
                  >
                    Filtreleri Temizle
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </Section>

        {/* Blog Posts Section */}
        <Section id="blog-posts" className="py-16">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Blog Yazıları
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Faydalı İçerikler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ankara ustaları ve ev bakımı hakkında güncel ve faydalı bilgiler
            </p>
          </div>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
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
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR')}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <Link to={`/blog/${post.slug}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<ArrowRight className="w-4 h-4" />}
                          className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                        >
                          Devamını Oku
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6">
                <BookOpen className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Blog Yazısı Bulunamadı
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Arama kriterlerinize uygun blog yazısı bulunamadı. Filtreleri değiştirerek tekrar deneyin.
              </p>
              <Button
                onClick={clearFilters}
                icon={<Filter className="w-5 h-5" />}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Filtreleri Temizle
              </Button>
            </motion.div>
          )}
        </Section>

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
                  onClick={() => window.location.href = '/ustalar'}
                  size="xl"
                  icon={<TrendingUp className="w-6 h-6" />}
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
                >
                  Usta Bul
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  size="xl"
                  icon={<ArrowRight className="w-6 h-6" />}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Ana Sayfa
                </Button>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </>
  );
}

export default Blog; 