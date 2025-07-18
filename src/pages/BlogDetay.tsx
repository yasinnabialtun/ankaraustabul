import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Heart, 
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

function BlogDetay() {
  const { slug } = useParams<{ slug: string }>();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Ahmet Yılmaz',
      content: 'Çok faydalı bir yazı olmuş. Ben de evimde bu yöntemleri deneyeceğim.',
      date: '2024-01-15',
      rating: 5
    },
    {
      id: 2,
      author: 'Fatma Demir',
      content: 'Usta önerileri gerçekten çok değerli. Teşekkürler!',
      date: '2024-01-14',
      rating: 4
    }
  ]);

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Yazısı Bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız blog yazısı mevcut değil.</p>
          <Link
            to="/blog"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Blog'a Dön
          </Link>
        </div>
      </div>
    );
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link kopyalandı!');
        break;
    }
    setShowShare(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: 'Anonim Kullanıcı',
        content: comment,
        date: new Date().toISOString().split('T')[0],
        rating: 5
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Blog'a Dön
            </Link>
            
            <div className="flex items-center space-x-4 mb-6 text-sm">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString('tr-TR')}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {getReadingTime(post.content)} dk okuma
              </span>
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-green-100 leading-relaxed">
              {post.content.substring(0, 200)}...
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Article Header */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
                        liked 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                      <span>{liked ? 'Beğenildi' : 'Beğen'}</span>
                    </button>
                    
                    <button
                      onClick={() => setBookmarked(!bookmarked)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
                        bookmarked 
                          ? 'bg-yellow-100 text-yellow-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                      <span>{bookmarked ? 'Kaydedildi' : 'Kaydet'}</span>
                    </button>
                  </div>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShowShare(!showShare)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>Paylaş</span>
                    </button>
                    
                    {showShare && (
                      <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleShare('facebook')}
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                          >
                            <Facebook className="w-4 h-4" />
                            <span className="text-sm">Facebook</span>
                          </button>
                          <button
                            onClick={() => handleShare('twitter')}
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50 text-blue-400"
                          >
                            <Twitter className="w-4 h-4" />
                            <span className="text-sm">Twitter</span>
                          </button>
                          <button
                            onClick={() => handleShare('linkedin')}
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50 text-blue-700"
                          >
                            <Linkedin className="w-4 h-4" />
                            <span className="text-sm">LinkedIn</span>
                          </button>
                          <button
                            onClick={() => handleShare('copy')}
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 text-gray-600"
                          >
                            <Copy className="w-4 h-4" />
                            <span className="text-sm">Kopyala</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Article Body */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  <div className="mb-8">
                    <div className="text-6xl mb-6 text-center">📝</div>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      {post.content}
                    </p>
                    
                    <div className="bg-gray-50 rounded-xl p-6 my-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">💡 Önemli Notlar</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          Profesyonel ustalarımızın önerileri
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          Güvenli ve etkili yöntemler
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          Uzun ömürlü çözümler
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{post.author}</h3>
                  <p className="text-gray-600">Uzman Usta & Yazar</p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">4.8/5 (127 değerlendirme)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Yorumlar ({comments.length})
              </h3>
              
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Yorumunuzu yazın..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
                  >
                    Gönder
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                          {comment.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{comment.author}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-green-600">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-gray-800 mb-8">İlgili Yazılar</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <div className="h-40 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                        <div className="text-4xl group-hover:scale-110 transition-transform duration-300">📝</div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-lg font-semibold mb-3 text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {relatedPost.content}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{relatedPost.author}</span>
                          <span>{getReadingTime(relatedPost.content)} dk</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogDetay;