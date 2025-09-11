import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Upload, X, Plus, Hash, AlertCircle } from 'lucide-react';
import { BlogPost } from '../data/blogData';
import blogService from '../services/blogService';
import { useToast } from '../components/ui/Toast';

function BlogEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();
  const isEdit = id !== 'new';

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    date: '',
    readTime: '',
    category: '',
    image: '',
    tags: [],
  });

  const [newTag, setNewTag] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    'Elektrik',
    'Su Tesisatı',
    'Boyacı',
    'Temizlik',
    'Mobilya',
    'Bahçe',
    'Tamir',
    'Teknisyen',
    'Nakliye',
  ];

  useEffect(() => {
    if (isEdit && id) {
      loadBlog(id);
    } else {
      // Yeni blog yazısı için varsayılan değerler
      setFormData(prev => ({
        ...prev,
        date: new Date().toLocaleDateString('tr-TR'),
        author: 'Admin',
      }));
    }
  }, [id, isEdit]);

  const loadBlog = async (blogId: string) => {
    try {
      setLoading(true);
      setError(null);
      const blog = await blogService.getBlogById(blogId);
      if (blog) {
        setFormData(blog);
        setImagePreview(blog.image);
      } else {
        setError('Blog yazısı bulunamadı');
      }
    } catch (err) {
      setError('Blog yazısı yüklenirken hata oluştu');
      console.error('Blog load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof BlogPost, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (url: string) => {
    setFormData(prev => ({
      ...prev,
      image: url,
    }));
    setImagePreview(url);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || [],
    }));
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} dk`;
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content || !formData.category) {
      showToast({
        type: 'error',
        title: 'Eksik Bilgi',
        message: 'Lütfen zorunlu alanları doldurun.'
      });
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      // Read time hesapla


      const blogPost: Omit<BlogPost, 'id'> = {
        title: formData.title || '',
        excerpt: formData.excerpt || blogService.generateExcerpt(formData.content || ''),
        content: formData.content || '',
        author: formData.author || 'Admin',
        date: new Date().toISOString().split('T')[0],
        readTime: formData.readTime || blogService.calculateReadTime(formData.content || ''),
        category: formData.category || '',
        image: formData.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
        tags: formData.tags || [],
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (isEdit && id) {
        await blogService.updateBlog(id, blogPost);
      } else {
        await blogService.addBlog(blogPost);
      }

      navigate('/admin');
    } catch (err) {
      setError('Blog yazısı kaydedilirken hata oluştu');
      console.error('Save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    // Preview modunda yeni pencerede açılabilir
    const previewData = {
      ...formData,
      readTime: calculateReadTime(formData.content || ''),
    };
    console.log('Preview:', previewData);
    showToast({
      type: 'info',
      title: 'Bilgi',
      message: 'Preview özelliği geliştirme aşamasında'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-body text-gray-600">Blog yazısı yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Error Alert */}
      {error && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-body-sm text-red-700">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-h4 font-bold">
                  {isEdit ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
                </h1>
                <p className="text-body-sm text-gray-500">
                  {formData.title || 'Başlıksız yazı'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handlePreview}
                className="btn-secondary flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                Önizle
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="card p-6">
              <label className="block text-body-sm font-semibold text-gray-700 mb-2">
                Başlık *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Blog yazısının başlığını girin..."
                className="input text-h4 font-bold"
              />
            </div>

            {/* Content */}
            <div className="card p-6">
              <label className="block text-body-sm font-semibold text-gray-700 mb-2">
                İçerik *
              </label>
              <textarea
                value={formData.content || ''}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Blog yazısının içeriğini buraya yazın..."
                className="input min-h-[400px] resize-y"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-body-sm text-gray-500">
                  Yaklaşık okuma süresi: {calculateReadTime(formData.content || '')}
                </p>
                <p className="text-body-sm text-gray-500">
                  {formData.content?.length || 0} karakter
                </p>
              </div>
            </div>

            {/* Excerpt */}
            <div className="card p-6">
              <label className="block text-body-sm font-semibold text-gray-700 mb-2">
                Özet
              </label>
              <textarea
                value={formData.excerpt || ''}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Blog yazısının kısa bir özetini yazın... (Boş bırakılırsa otomatik oluşturulacak)"
                className="input h-24 resize-y"
              />
              <p className="text-body-sm text-gray-500 mt-2">
                Boş bırakılırsa içeriğin ilk 150 karakteri kullanılacak
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="card p-6">
              <h3 className="text-h5 mb-4">Yayın Ayarları</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-body-sm font-semibold text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="input"
                  >
                    <option value="">Kategori Seçin</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-body-sm font-semibold text-gray-700 mb-2">
                    Yazar
                  </label>
                  <input
                    type="text"
                    value={formData.author || ''}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="Yazar adı"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-body-sm font-semibold text-gray-700 mb-2">
                    Tarih
                  </label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    placeholder="Tarih"
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="card p-6">
              <h3 className="text-h5 mb-4">Öne Çıkan Görsel</h3>
              
              {imagePreview && (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-body-sm font-semibold text-gray-700 mb-2">
                  Görsel URL'si
                </label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => handleImageChange(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="input"
                />
              </div>

              <button className="btn-secondary w-full mt-3 flex items-center justify-center">
                <Upload className="w-4 h-4 mr-2" />
                Görsel Yükle
              </button>
            </div>

            {/* Tags */}
            <div className="card p-6">
              <h3 className="text-h5 mb-4">Etiketler</h3>
              
              {/* Existing Tags */}
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge badge-primary flex items-center"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Add New Tag */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Etiket ekle..."
                    className="input pl-10"
                  />
                </div>
                <button
                  onClick={addTag}
                  className="btn-outline flex items-center px-3"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogEditor;
